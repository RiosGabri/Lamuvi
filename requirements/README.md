# Requisitos do Projeto Lamuvi

Este projeto agora usa um backend Node.js + SQLite e está implementado na branch `feature/auth-backend`.

## Requisitos de ambiente

- Windows 10/11
- Node.js 18+ (ou 20/22/25)
- npm (instalado junto com Node.js)

## Instalação (usando winget)

1. Abra PowerShell como Administrador.
2. `winget install --id OpenJS.NodeJS --exact --accept-package-agreements --accept-source-agreements`
3. Feche e reabra o terminal para garantir que `node` e `npm` estejam no PATH.
4. Execute `node -v` e `npm -v` para confirmar.

## Execute o projeto

No diretório do projeto:

1. `git checkout feature/auth-backend`
2. `npm install`
3. `npm start`
4. Abra `http://localhost:3000` no navegador.

## O que foi incluído

- `server.js` com Express, SQLite, bcrypt e CORS.
- `package.json` com dependências.
- APIs:
  - `POST /api/register`
  - `POST /api/login`
  - `GET /api/me`

## Observações

- Mantenha as alterações na branch `feature/auth-backend`.
- Para voltar ao código antigo em `main`, use `git checkout main`.
