# 🔧 Guia de Configuração - Shopping List App

## 🚨 IMPORTANTE: Segurança das Credenciais

Este projeto **NÃO commita as credenciais do Supabase** no GitHub. 
Os arquivos `environment.ts` e `environment.prod.ts` estão no `.gitignore`.

---

## 📦 1. Clonar o Repositório

```bash
git clone <seu-repositorio>
cd shopping-list-app
```

---

## 🔐 2. Configurar Variáveis de Ambiente

### Opção A: Script Automático (Recomendado)

```bash
./setup.sh
```

O script vai copiar os templates automaticamente.

### Opção B: Manual

```bash
# Copiar os templates
cp src/environments/environment.template.ts src/environments/environment.ts
cp src/environments/environment.prod.template.ts src/environments/environment.prod.ts
```

### 3. Adicionar suas Credenciais do Supabase

Edite os arquivos criados e adicione suas credenciais:

**src/environments/environment.ts:**
```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'https://sua-url.supabase.co',     // ← Sua URL aqui
    key: 'sua-publishable-key-aqui',         // ← Sua Key aqui
  },
};
```

**src/environments/environment.prod.ts:**
```typescript
export const environment = {
  production: true,
  supabase: {
    url: 'https://sua-url.supabase.co',     // ← Sua URL aqui
    key: 'sua-publishable-key-aqui',         // ← Sua Key aqui
  },
};
```

### 📍 Onde Encontrar as Credenciais:

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** → use em `url`
   - **Publishable Key** (não a secret!) → use em `key`

⚠️ **Use a Publishable Key, NÃO a Secret Key!**

---

## 📦 3. Instalar Dependências

```bash
npm install
```

---

## 🗄️ 4. Configurar Banco de Dados

### No Supabase SQL Editor:

1. Acesse: https://supabase.com/dashboard
2. Abra seu projeto
3. Vá em **SQL Editor**
4. Clique em **New query**
5. Cole e execute este SQL:

```sql
-- Criar tabela de itens de compras
CREATE TABLE shopping_items (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can view own items" ON shopping_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own items" ON shopping_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own items" ON shopping_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own items" ON shopping_items
  FOR DELETE USING (auth.uid() = user_id);

-- Índices para performance
CREATE INDEX idx_shopping_items_user_id ON shopping_items(user_id);
CREATE INDEX idx_shopping_items_created_at ON shopping_items(created_at DESC);
```

**Ou execute o arquivo pronto:**
O SQL também está disponível em: `supabase-setup.sql`

---

## 🔓 5. Habilitar Autenticação por Email

1. No Supabase: **Authentication** → **Providers**
2. Clique em **Email**
3. Certifique-se que está **ATIVO** (toggle verde)
4. **Opcional para testes:** Desabilite "Confirm email" temporariamente

---

## 🚀 6. Rodar o Projeto

```bash
npm start
```

Acesse: **http://localhost:4200**

---

## ✅ Checklist de Configuração

- [ ] Repositório clonado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `environment.ts` criado a partir do template
- [ ] Arquivo `environment.prod.ts` criado a partir do template
- [ ] Credenciais do Supabase adicionadas aos arquivos
- [ ] Tabela `shopping_items` criada no Supabase
- [ ] Políticas RLS configuradas
- [ ] Email authentication habilitado no Supabase
- [ ] Servidor iniciado (`npm start`)

---

## 🔒 Segurança

### ✅ O QUE ESTÁ PROTEGIDO:

- `src/environments/environment.ts` → No `.gitignore`
- `src/environments/environment.prod.ts` → No `.gitignore`
- `.env` → No `.gitignore`

### ✅ O QUE VAI PARA O GITHUB:

- `src/environments/environment.template.ts` → Template sem credenciais
- `src/environments/environment.prod.template.ts` → Template sem credenciais
- `.env.example` → Exemplo sem credenciais

### ⚠️ NUNCA FAÇA:

```bash
# ❌ NÃO faça isso!
git add src/environments/environment.ts
git add src/environments/environment.prod.ts
```

Os arquivos já estão protegidos pelo `.gitignore`.

---

## 🧪 Testar a Aplicação

1. Abra: http://localhost:4200
2. Clique em **"Criar nova conta"**
3. Digite:
   - Email: teste@exemplo.com
   - Senha: 123456 (mínimo 6 caracteres)
4. Se confirmação de email estiver ativa, verifique seu email
5. Faça login
6. Adicione itens à sua lista de compras! 🛒

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm start                 # Inicia servidor dev (porta 4200)
npm run build            # Build para produção
npm test                 # Testes unitários

# Setup
./setup.sh               # Configura arquivos de environment
```

---

## 🐛 Troubleshooting

### Erro 401 ao criar conta

1. Verifique se as credenciais estão corretas em `environment.ts`
2. Confirme que Email Auth está habilitado no Supabase
3. Verifique se usou a **Publishable Key** (não a Secret)

### Credenciais não funcionam

1. Acesse o Supabase e copie as credenciais novamente
2. Cole em `environment.ts` e salve
3. Reinicie o servidor (`Ctrl+C` e `npm start`)

### "environment.ts not found"

Execute o setup:
```bash
./setup.sh
```

Ou copie manualmente os templates.

---

## 📚 Documentação Adicional

- [README.md](README.md) - Visão geral do projeto
- [START-HERE.md](START-HERE.md) - Guia rápido
- [CONFIGURACAO-COMPLETA.md](CONFIGURACAO-COMPLETA.md) - Status completo

---

## 🤝 Contribuindo

Ao contribuir:

1. **NUNCA** commite arquivos com credenciais
2. Use os templates fornecidos
3. Teste localmente antes de fazer PR
4. Documente qualquer mudança nas instruções

---

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ usando Angular e Supabase**
