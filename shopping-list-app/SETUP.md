# 🛒 Lista de Compras - Angular + Supabase

Projeto Angular com autenticação e lista de compras paginada integrada ao Supabase.

## 📋 Funcionalidades

- ✅ Login e cadastro de usuários
- ✅ Adicionar itens à lista de compras
- ✅ Excluir itens da lista
- ✅ Paginação da lista
- ✅ Interface moderna e responsiva

## 🚀 Como Configurar

### 1. Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Aguarde a criação do projeto (~2 minutos)

### 2. Criar a Tabela no Supabase

No SQL Editor do Supabase, execute:

```sql
-- Criar tabela de itens de compras
CREATE TABLE shopping_items (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seus próprios itens
CREATE POLICY "Users can view their own items"
  ON shopping_items
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Usuários podem inserir seus próprios itens
CREATE POLICY "Users can insert their own items"
  ON shopping_items
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem atualizar seus próprios itens
CREATE POLICY "Users can update their own items"
  ON shopping_items
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Política: Usuários podem deletar seus próprios itens
CREATE POLICY "Users can delete their own items"
  ON shopping_items
  FOR DELETE
  USING (auth.uid() = user_id);

-- Criar índice para melhor performance
CREATE INDEX idx_shopping_items_user_id ON shopping_items(user_id);
CREATE INDEX idx_shopping_items_created_at ON shopping_items(created_at DESC);
```

### 3. Obter as Credenciais do Supabase

1. No Supabase, vá em **Settings** → **API**
2. Copie:
   - **Project URL**
   - **anon/public key**

### 4. Configurar as Variáveis de Ambiente

Edite o arquivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabase: {
    url: "SUA_URL_DO_SUPABASE",
    key: "SUA_CHAVE_ANON_DO_SUPABASE",
  },
};
```

### 5. Instalar Dependências

```bash
npm install
```

### 6. Executar o Projeto

```bash
npm start
```

Acesse: [http://localhost:4200](http://localhost:4200)

## 📱 Como Usar

### Criar Conta

1. Clique em "Criar nova conta"
2. Preencha email e senha
3. Confirme o email (verifique sua caixa de entrada)

### Fazer Login

1. Digite seu email e senha
2. Clique em "Entrar"

### Gerenciar Lista de Compras

- **Adicionar**: Digite o nome do item, quantidade e clique em "Adicionar"
- **Excluir**: Clique no ícone de lixeira 🗑️
- **Navegar**: Use os botões de paginação para ver mais itens

## 🛠️ Tecnologias Utilizadas

- **Angular 17** - Framework frontend
- **Supabase** - Backend as a Service (autenticação + banco de dados)
- **TypeScript** - Linguagem de programação
- **CSS3** - Estilização

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── login/          # Tela de login
│   │   └── shopping-list/  # Lista de compras
│   ├── services/
│   │   └── supabase.service.ts  # Integração com Supabase
│   ├── guards/
│   │   └── auth.guard.ts   # Proteção de rotas
│   └── environments/
│       └── environment.ts  # Configurações
```

## 🔒 Segurança

- Autenticação via Supabase Auth
- Row Level Security (RLS) habilitado
- Cada usuário vê apenas seus próprios itens
- Proteção de rotas com guard

## 📝 Próximas Melhorias

- [ ] Editar itens existentes
- [ ] Marcar itens como comprados
- [ ] Filtros e busca
- [ ] Categorias de produtos
- [ ] Modo offline
- [ ] Compartilhar listas com outros usuários

## 🤝 Contribuindo

Sinta-se à vontade para fazer fork e melhorar o projeto!

## 📄 Licença

MIT
