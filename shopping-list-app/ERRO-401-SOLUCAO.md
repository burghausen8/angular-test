# ⚠️ ERRO 401 - CHECKLIST DE SOLUÇÃO

## ✅ Chave API atualizada!

A chave `sb_publishable_pwDfKehD6z0NZXhxBLT8HQ_5ol21kja` foi configurada em:

- ✅ `.env`
- ✅ `src/environments/environment.ts`
- ✅ `src/environments/environment.prod.ts`

---

## 🔍 Próximos passos para resolver o erro 401:

### 1️⃣ Verificar se Email Auth está habilitado no Supabase

1. Acesse: https://supabase.com/dashboard/project/axdoupitwwybjwwqdcho
2. Vá em **Authentication** → **Providers**
3. Clique em **Email**
4. Verifique se:
   - ✅ **Enable Email provider** está LIGADO (toggle verde)
   - ✅ **Confirm email** pode estar DESLIGADO para testes (facilita)

### 2️⃣ Verificar configurações de Email

1. Ainda em **Authentication** → **Providers** → **Email**
2. Role para baixo até **Email Settings**
3. Recomendado para testes:
   - ✅ **Disable email confirmations** (para testar sem confirmar email)

### 3️⃣ Verificar se o projeto está ativo

1. No dashboard do Supabase
2. Verifique se o projeto não está pausado
3. Status deve estar verde/ativo

---

## 🧪 Testar a conexão

1. **Reinicie o servidor Angular** (importante!):

   ```bash
   # Pare o servidor (Ctrl+C)
   # Depois inicie novamente:
   npm start
   ```

2. **Abra o navegador** em: http://localhost:4200

3. **Teste criar uma conta**:

   - Email: teste@exemplo.com
   - Senha: 123456 (mínimo 6 caracteres)

4. **Abra o Console do navegador** (F12 → Console) para ver se há erros detalhados

---

## 🔍 Verificar erros no Console

Pressione **F12** no navegador e vá na aba **Console** ou **Network**:

Na aba **Network**:

- Procure pela requisição `signup`
- Clique nela
- Veja a resposta (Response)
- Me informe o que aparece se ainda der erro

---

## 📞 Se ainda der erro 401

Me informe:

1. A mensagem exata que aparece no console do navegador
2. Se o Email Auth está habilitado no Supabase
3. Se o projeto está ativo (não pausado)

---

## 🎯 Checklist Rápido

- [ ] Email provider habilitado no Supabase
- [ ] Projeto ativo (não pausado)
- [ ] Servidor Angular reiniciado
- [ ] Console do navegador aberto para ver erros
- [ ] Testou criar conta novamente
