# 💜 Doll Wishlist

Sistema de gerenciamento de wishlist para colecionadores de bonecas, permitindo organizar suas peças desejadas, controlar investimentos e acompanhar aquisições.

## Sobre o Projeto

A **Doll Wishlist** é uma aplicação web desenvolvida para auxiliar colecionadores de bonecas a gerenciar suas listas de desejos. Com ele, você pode:

- ✨ Cadastrar bonecas desejadas com informações detalhadas
- 💲 Acompanhar quanto dinheiro precisa investir em cada peça
- ✅ Marcar bonecas como adquiridas
- 🎯 Definir prioridades de aquisição
- 📊 Visualizar estatísticas da sua coleção
- 🔐 Manter seus dados seguros com autenticação

##  ⚡ Funcionalidades

### Autenticação
- ✅ Registro de usuário
- ✅ Login seguro com JWT
- ✅ Proteção de rotas

### Gerenciamento de Bonecas
- ✅ Adicionar bonecas à wishlist
- ✅ Editar informações das bonecas
- ✅ Excluir bonecas da lista
- ✅ Marcar como adquirida
- ✅ Definir prioridade (1-5)
- ✅ Adicionar notas personalizadas
- ✅ Upload de imagens

### Dashboard
- ✅ Total de bonecas na wishlist
- ✅ Bonecas adquiridas
- ✅ Valor total investido
- ✅ Lista organizada por prioridade

## 🛠️ Tecnologias Utilizadas

### Front-end
- **Vue 3** - Framework JavaScript progressivo
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS v4** - Framework CSS utilitário
- **Pinia** - Gerenciamento de estado
- **Vue Router** - Roteamento
- **Axios** - Cliente HTTP
- **Lucide Vue Next** - Biblioteca de ícones

### Back-end
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM moderno
- **SQLite** - Banco de dados (desenvolvimento)
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/mariaclrsmp/doll-wishlist.git
cd doll-wishlist
```

### 2. Configuração do Back-end

```bash
# Navegue para a pasta do back-end
cd back-end

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here-change-in-production"
PORT=3000
NODE_ENV=development
```

```bash
# Execute as migrations do banco de dados
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

O back-end estará rodando em `http://localhost:3000`

### 3. Configuração do Front-end

Abra um novo terminal:

```bash
# Navegue para a pasta do front-end
cd front-end

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O front-end estará rodando em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
doll-wishlist/
├── back-end/
│   ├── prisma/
│   │   ├── migrations/      # Migrations do banco de dados
│   │   └── schema.prisma    # Schema do Prisma
│   ├── src/
│   │   ├── config/          # Configurações (database)
│   │   ├── controllers/     # Controladores (auth, doll)
│   │   ├── middlewares/     # Middlewares (auth, errorHandler)
│   │   ├── routes/          # Rotas da API
│   │   ├── services/        # Lógica de negócio
│   │   └── server.js        # Entrada da aplicação
│   ├── .env                 # Variáveis de ambiente
│   └── package.json
│
└── front-end/
    ├── src/
    │   ├── assets/          # Recursos estáticos
    │   ├── components/      # Componentes reutilizáveis
    │   ├── router/          # Configuração de rotas
    │   ├── services/        # Serviços (API)
    │   ├── stores/          # Stores Pinia
    │   ├── views/           # Páginas
    │   ├── App.vue          # Componente raiz
    │   └── main.js          # Entrada da aplicação
    ├── index.html
    └── package.json
```

## 🔌 Endpoints da API

### Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/register` | Registrar novo usuário |
| POST | `/api/auth/login` | Fazer login |
| GET | `/api/auth/profile` | Obter perfil do usuário | 

### Bonecas

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/dolls` | Listar todas as bonecas |
| GET | `/api/dolls/:id` | Obter boneca por ID |
| POST | `/api/dolls` | Criar nova boneca |
| PUT | `/api/dolls/:id` | Atualizar boneca |
| DELETE | `/api/dolls/:id` | Excluir boneca | 

## 📊 Modelo de Dados

### User
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  dolls     Doll[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Doll
```prisma
model Doll {
  id          Int       @id @default(autoincrement())
  name        String
  line        String
  price       Float
  acquired    Boolean   @default(false)
  priority    Int       @default(3)
  imageUrl    String?
  notes       String?
  acquiredAt  DateTime?
  userId      Int
  user        User      @relation(fields: [userId], references: [id])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Tokens com expiração de 7 dias
- Proteção de rotas no front e back-end
- Validação de dados em todas as requisições


## 📝 Licença

Este projeto está sob a licença MIT.

## 👩‍💻 Autora

Desenvolvido com 💜 por [Maria Clara](https://github.com/mariaclrsmp)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!
