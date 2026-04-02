# Lamuvi

- `Trabalho de IHC`

- `Participantes:`
Gabriel Rios Parméra,
Elian Gabriel Andrade Cunha,
Luiz Eduardo Martins Braga,
João Pedro Queiroz de Nogueira,
Luís Felipe Higino Moura,
Matheus Guerra Britto e
Ivon Buarque.

## Executando localmente (branch feature/auth-backend)

Requisitos:
- Node.js 18+
- npm

Passo a passo:
1. `git checkout feature/auth-backend`
2. `npm install`
3. `npm start`
4. Acesse `http://localhost:3000` e use login/cadastro

O novo fluxo de cadastro usa:
- `POST /api/register` (salva no SQLite com senha em hash bcrypt)
- `POST /api/login` (valida e retorna usuário)

Outras rotas existentes continuam no mesmo esquema do app.
-
