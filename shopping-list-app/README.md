# 🛒 Lista de Compras - Angular + Supabase

![Angular](https://img.shields.io/badge/Angular-17-red?logo=angular)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)

Aplicação completa de lista de compras com autenticação, paginação e integração com Supabase.

## ✨ Funcionalidades

- 🔐 **Autenticação completa** - Login e cadastro de usuários
- 📝 **CRUD de itens** - Adicionar e excluir itens da lista
- 📄 **Paginação** - Navegação eficiente entre páginas
- 🎨 **UI Moderna** - Design responsivo com gradientes e animações
- 🔒 **Segurança** - Row Level Security (RLS) no Supabase

## 🚀 Início Rápido

### O aplicativo está rodando em: http://localhost:4200

**Credenciais já configuradas/Users/fabricioburghausen/Desktop/lala/angular-test/shopping-list-app && npm install dotenv* ✅

Próximo passo: Criar a tabela no Supabase (veja seção abaixo)

## 📋 Configuração do Banco de Dados

Execute este SQL no Supabase SQL Editor:

\`\`\`sql
CREATE TABLE shopping_items (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own items" ON shopping_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own items" ON shopping_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own items" ON shopping_items
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_shopping_items_user_id ON shopping_items(user_id);
\`\`\`

## 🔐 Variáveis de Ambiente

Configuradas em:
- `.env` (local, não commitado)
- `src/environments/environment.ts`

## 🛠️ Comandos

\`\`\`bash
npm start        # Dev server
npm run build    # Build produção
npm test         # Testes
\`\`\`

## 📁 Estrutura

\`\`\`
src/app/
├── components/
│   ├── login/
│   └── shopping-list/
├── services/
│   └── supabase.service.ts
└── guards/
    └── auth.guard.ts
\`\`\`

## 📄 Licença

MIT
