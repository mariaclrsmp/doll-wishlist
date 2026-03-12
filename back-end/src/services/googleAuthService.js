import axios from 'axios';

export const googleAuthService = {
    async validateGoogleToken(googleToken) {
        try {
            const { data } = await axios.get(
                `https://oauth2.googleapis.com/tokeninfo?id_token=${googleToken}`
            );

            if (data.aud !== process.env.GOOGLE_CLIENT_ID) {
                throw new Error('Token Google inválido para esta aplicação');
            }

            return {
                googleId: data.sub,
                email: data.email,
                name: data.name,
                picture: data.picture
            };
        } catch (error) {
            if (error.response) {
                throw new Error('Token Google inválido ou expirado');
            }
            throw error;
        }
    },

    async getUserInfoFromAccessToken(accessToken) {
        try {
            const { data } = await axios.get(
                'https://www.googleapis.com/oauth2/v2/userinfo',
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            );

            return {
                googleId: data.id,
                email: data.email,
                name: data.name,
                picture: data.picture
            };
        } catch (error) {
            throw new Error('Erro ao obter informações do usuário Google');
        }
    },

    async exchangeCodeForToken(code) {
        try {
            const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5173/google-callback';
            
            const { data } = await axios.post('https://oauth2.googleapis.com/token', {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            });

            return await this.getUserInfoFromAccessToken(data.access_token);
        } catch (error) {
            if (error.response?.data?.error) {
                throw new Error(`Erro ao trocar código: ${error.response.data.error_description}`);
            }
            throw new Error('Erro ao processar código de autorização');
        }
    }
};
