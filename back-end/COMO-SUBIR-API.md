# 🚀 Como Subir a API - Guia Rápido

## ✅ Status Atual
- ✅ Backend configurado
- ✅ Banco de dados SQLite criado
- ✅ Prisma Client gerado
- ✅ API rodando na porta 3000

---

## 📝 Passos para Subir a API

### 1. Instalar Dependências
```bash
npm install
```

### 2. Gerar Prisma Client
```bash
npx prisma generate
```

### 3. Executar Migrations (primeira vez)
```bash
npx prisma migrate dev --name init
```

### 4. Iniciar o Servidor

**Modo desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

### 5. Verificar se está funcionando
Acesse no navegador ou use curl:
```
http://localhost:3000/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2026-01-06T18:46:56.395Z"
}
```

---

## 🎯 Endpoints Disponíveis

### Health Check
- **GET** `http://localhost:3000/health`

### Autenticação
- **POST** `http://localhost:3000/api/auth/register` - Criar conta
- **POST** `http://localhost:3000/api/auth/login` - Login
- **GET** `http://localhost:3000/api/auth/profile` - Perfil (autenticado)

### Bonecas (todas autenticadas)
- **GET** `http://localhost:3000/api/dolls` - Listar todas
- **GET** `http://localhost:3000/api/dolls/stats` - Estatísticas  
- **GET** `http://localhost:3000/api/dolls/:id` - Buscar por ID
- **POST** `http://localhost:3000/api/dolls` - Criar nova
- **PUT** `http://localhost:3000/api/dolls/:id` - Atualizar
- **DELETE** `http://localhost:3000/api/dolls/:id` - Deletar

---

## 🧪 Testando a API

### 1. Registrar um Usuário

**PowerShell:**
```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/auth/register `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"name":"Maria","email":"maria@exemplo.com","password":"senha123"}' `
  -UseBasicParsing | Select-Object -Expand Content
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "maria@exemplo.com",
    "name": "Maria",
    "createdAt": "2026-01-06T18:50:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login

**PowerShell:**
```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/auth/login `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"maria@exemplo.com","password":"senha123"}' `
  -UseBasicParsing | Select-Object -Expand Content
```

### 3. Criar uma Boneca (use o token recebido)

**PowerShell:**
```powershell
$token = "SEU_TOKEN_AQUI"
Invoke-WebRequest -Uri http://localhost:3000/api/dolls `
  -Method POST `
  -Headers @{
    "Content-Type"="application/json"
    "Authorization"="Bearer $token"
  } `
  -Body '{"name":"Sailor Moon","line":"S.H.Figuarts","price":299.90,"priority":1}' `
  -UseBasicParsing | Select-Object -Expand Content
```

### 4. Listar Bonecas

**PowerShell:**
```powershell
$token = "SEU_TOKEN_AQUI"
Invoke-WebRequest -Uri http://localhost:3000/api/dolls `
  -Method GET `
  -Headers @{"Authorization"="Bearer $token"} `
  -UseBasicParsing | Select-Object -Expand Content
```

---

## ⚙️ Variáveis de Ambiente (.env)

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="minha-chave-secreta-super-segura-123"
PORT=3000
NODE_ENV=development
```

---

## 🛠️ Comandos Úteis

### Ver logs do Prisma
```bash
npx prisma studio
```
- Abre uma interface visual para ver e editar dados do banco

### Resetar banco de dados
```bash
npx prisma migrate reset
```
⚠️ **Cuidado:** Isso apaga todos os dados!

### Ver estrutura do banco
```bash
npx prisma db push
```

### Parar o servidor
- Pressione `Ctrl + C` no terminal

---

## 🔧 Troubleshooting

### Erro: "Port 3000 is already in use"
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Erro: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Erro de migração
```bash
npx prisma migrate reset
npx prisma migrate dev --name init
```

### Servidor não responde
1. Verifique se o `.env` existe e está configurado
2. Verifique se a porta 3000 está livre
3. Veja os logs de erro no terminal

---

## 📊 Estrutura do Banco de Dados

### Tabela: User
```
id          INTEGER PRIMARY KEY
email       TEXT UNIQUE
password    TEXT (hashed)
name        TEXT
createdAt   DATETIME
updatedAt   DATETIME
```

### Tabela: Doll
```
id          INTEGER PRIMARY KEY
name        TEXT
line        TEXT
price       REAL
acquired    BOOLEAN (default: false)
priority    INTEGER (default: 3)
imageUrl    TEXT (nullable)
notes       TEXT (nullable)
acquiredAt  DATETIME (nullable)
userId      INTEGER (FK → User.id)
createdAt   DATETIME
updatedAt   DATETIME
```

---

## 🎨 Próximo Passo: Conectar com Front-end

Agora que a API está rodando, você pode:

1. Criar o front-end React
2. Copiar os arquivos de `examples/` para o front-end:
   - `frontend-api.example.js` → `src/services/api.js`
   - `frontend-authService.example.js` → `src/services/authService.js`
   - `frontend-dollService.example.js` → `src/services/dollService.js`

3. Usar os serviços nos componentes React

Ver [API-DOCUMENTATION.md](./API-DOCUMENTATION.md) para mais detalhes!
