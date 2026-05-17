# 🎬 CineVault — Sistema de Filmes

Sistema web completo para gerenciamento de filmes, desenvolvido com Node.js, Express, Supabase e Tailwind CSS.

---

## 📋 Descrição do Sistema

O **CineVault** permite que usuários cadastrem, editem, visualizem e excluam filmes de sua coleção pessoal. Cada usuário possui login próprio e pode organizar seus filmes por categorias, dar notas e adicionar posters.

### Funcionalidades
- ✅ Cadastro e Login de usuários (com JWT)
- ✅ Listar filmes
- ✅ Cadastrar filmes
- ✅ Editar filmes
- ✅ Excluir filmes
- ✅ Pesquisar/filtrar filmes por título e categoria
- ✅ Gerenciar categorias
- ✅ Interface responsiva com Tailwind CSS
- ✅ Uso de localStorage para manter sessão

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| Node.js | Servidor back-end |
| Express | Framework HTTP / API REST |
| Supabase | Banco de dados PostgreSQL em nuvem |
| JWT (jsonwebtoken) | Autenticação de usuários |
| bcryptjs | Hash de senhas |
| Tailwind CSS | Estilização do front-end |
| HTML + CSS + JS | Interface do usuário |
| fetch() + async/await | Consumo da API |

---

## 🗄️ Banco de Dados (Supabase)

Crie as seguintes tabelas no Supabase:

### Tabela `usuarios`
```sql
create table usuarios (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  email text unique not null,
  senha text not null,
  created_at timestamptz default now()
);
```

### Tabela `categorias`
```sql
create table categorias (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  created_at timestamptz default now()
);
```

### Tabela `filmes`
```sql
create table filmes (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  diretor text not null,
  ano integer not null,
  sinopse text,
  nota numeric(3,1),
  poster_url text,
  categoria_id uuid references categorias(id) on delete set null,
  created_at timestamptz default now()
);
```

---

## ⚙️ Como Executar o Projeto

### 1. Pré-requisitos
- Node.js instalado (v18+)
- Conta no [Supabase](https://supabase.com) (gratuito)

### 2. Configurar o Supabase
1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Vá em **SQL Editor** e execute os scripts SQL acima
4. Vá em **Project Settings → API** e copie:
   - `Project URL`
   - `anon public key`

### 3. Configurar o projeto
```bash
# Clone ou baixe o projeto
cd sistema-filmes

# Instale as dependências
npm install

# Crie o arquivo .env baseado no exemplo
cp .env.example .env
```

Edite o arquivo `.env`:
```
SUPABASE_URL=https://SEU_PROJETO.supabase.co
SUPABASE_KEY=SUA_CHAVE_ANON_AQUI
JWT_SECRET=qualquer_senha_secreta_aqui
PORT=3000
```

### 4. Rodar o servidor
```bash
# Produção
npm start

# Desenvolvimento (com auto-reload)
npm run dev
```

### 5. Acessar
Abra o navegador em: **http://localhost:3000**

---

## 📁 Estrutura do Projeto

```
sistema-filmes/
│
├── index.js                  # Entrada do servidor
├── package.json
├── .env.example              # Modelo de variáveis de ambiente
│
├── config/
│   └── supabase.js           # Cliente Supabase
│
├── middleware/
│   └── auth.js               # Validação JWT
│
├── routes/
│   ├── auth.js               # Login e cadastro
│   ├── filmes.js             # CRUD de filmes
│   └── categorias.js         # CRUD de categorias
│
└── front/
    ├── index.html            # Página de login/cadastro
    └── paginas/
        └── filmes.html       # Sistema principal
```

---

## 🔗 Rotas da API

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | /api/auth/register | Cadastrar usuário | ❌ |
| POST | /api/auth/login | Login | ❌ |
| GET | /api/filmes | Listar filmes | ✅ |
| GET | /api/filmes/:id | Buscar filme | ✅ |
| POST | /api/filmes | Cadastrar filme | ✅ |
| PUT | /api/filmes/:id | Editar filme | ✅ |
| DELETE | /api/filmes/:id | Excluir filme | ✅ |
| GET | /api/categorias | Listar categorias | ✅ |
| POST | /api/categorias | Criar categoria | ✅ |
| DELETE | /api/categorias/:id | Excluir categoria | ✅ |

---

## 👨‍💻 Desenvolvido para
Atividade Prática — Desenvolvimento Full Stack com JavaScript, Node.js + Supabase  
Curso: Desenvolvimento Full Stack — UNIFSA
## 👨‍💻 Desenvolvido por

**Rodofo Dheymison Ferreira Silva**
