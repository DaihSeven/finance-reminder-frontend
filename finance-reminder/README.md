# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

 [this documentation](https://react.dev/learn/react-compiler/installation).

[eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

# FASES DO DESENVOLVIMENTO:


- Instalação e configuração de dependências;

- Limpeza de arquivos e códigos;

- Criação de pastas: 

```
src/
├── api/              ← camada de serviço (faz as requisições HTTP)
├── controllers/      ← lógica de cada página (custom hooks)
├── views/            ← páginas
├── components/       ← componentes reutilizáveis
├── context/          ← estado global (autenticação)
├── routes/           ← definição das rotas
├── types/            ← tipagens TypeScript
```
- Configuração de alias @;

-  Tipagens TypeScript `src/types/index.ts`;

- Instância do axios com interceptor de token;//nosso midleware automático para tokens antes/depois das requisições

- Criado o AuthContext e o useAuth: para evitar props e reenvios

- Montado as rotas protegidas

- Criado as páginas de Login e Register

- Montado as pastas/páginas de view

Montar o layout: 

┌─────┬─────────────┐

│ Sidebar│  Conteúdo da página   │

└─────┴─────────────┘
- Componentes Sidebar e MainLayout: 

- Dashboard : total, contas a pagar e pendentes

- Export's de pdf e csv: verificar opção do e-mail

- Contas :  o CRUD bills completo

- Perfil do usuário

- Deplou na Netlify

