# 🔒 SEGURANÇA - Informações Importantes

## ⚠️ ATENÇÃO: Este Projeto Protege Suas Credenciais

Os arquivos com credenciais do Supabase **NÃO são commitados** no GitHub.

---

## 📂 Arquivos Protegidos (no .gitignore)

Estes arquivos **NUNCA** vão para o GitHub:

```
src/environments/environment.ts          ← Suas credenciais de DEV
src/environments/environment.prod.ts     ← Suas credenciais de PROD
.env                                     ← Backup de variáveis
```

---

## 📝 Arquivos Públicos (vão para o GitHub)

Estes arquivos são **templates** sem credenciais:

```
src/environments/environment.template.ts       ← Template seguro
src/environments/environment.prod.template.ts  ← Template seguro
.env.example                                   ← Exemplo seguro
```

---

## 🔐 Como Funciona

### 1. Para você (desenvolvedor original):

Seus arquivos `environment.ts` já existem com as credenciais:

```typescript
export const environment = {
  production: false,
  supabase: {
    url: "https://axdoupitwwybjwwqdcho.supabase.co",
    key: "sb_publishable_pwDfKehD6z0NZXhxBLT8HQ_5ol21kja",
  },
};
```

✅ Esses arquivos estão **protegidos** pelo `.gitignore`

### 2. Para novos desenvolvedores:

Quando clonarem o repositório, precisarão:

```bash
# 1. Executar o setup
./setup.sh

# 2. Editar os arquivos criados com suas próprias credenciais
# Cada desenvolvedor usa suas próprias credenciais do Supabase
```

---

## 🚨 O Que NÃO Fazer

### ❌ NUNCA faça isso:

```bash
# NÃO force add de arquivos no gitignore
git add -f src/environments/environment.ts

# NÃO remova do gitignore
# NÃO commite credenciais
```

### ❌ NUNCA compartilhe:

- Secret Keys (chaves que começam com `sb_secret_`)
- Service Role Keys
- Credenciais em mensagens, emails ou Slack

### ✅ Pode compartilhar:

- Publishable Keys (chaves que começam com `sb_publishable_`)
- Project URL
- Templates sem credenciais

---

## 🔍 Verificar Se Está Seguro

### Antes de commitar, verifique:

```bash
# 1. Ver o que será commitado
git status

# 2. Verificar se não há arquivos de environment
# Você NÃO deve ver:
# - src/environments/environment.ts
# - src/environments/environment.prod.ts

# 3. Ver diferenças
git diff --cached

# 4. Se estiver tudo certo, commite
git commit -m "Sua mensagem"
```

---

## 📋 Checklist de Segurança

Antes de fazer push para o GitHub:

- [ ] `environment.ts` está no `.gitignore`
- [ ] `environment.prod.ts` está no `.gitignore`
- [ ] Templates (`.template.ts`) não contêm credenciais reais
- [ ] `.env` está no `.gitignore`
- [ ] Não há credenciais em comentários do código
- [ ] Não há credenciais em logs do console
- [ ] `git status` não mostra arquivos com credenciais

---

## 🆘 E Se Eu Já Commitei Credenciais?

### Se as credenciais foram commitadas acidentalmente:

1. **URGENTE:** Rotacione as chaves no Supabase imediatamente

   - Vá em Settings → API
   - Clique em "Rotate keys"

2. **Remova do histórico do Git:**

   ```bash
   # Para o arquivo específico
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch src/environments/environment.ts" \
     --prune-empty --tag-name-filter cat -- --all

   # Force push (cuidado!)
   git push origin --force --all
   ```

3. **Use uma ferramenta especializada:**

   - [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
   - [git-filter-repo](https://github.com/newren/git-filter-repo)

4. **Avise outros desenvolvedores** para fazer novo clone

---

## 🎓 Boas Práticas

### ✅ Faça:

1. Use sempre templates para novos desenvolvedores
2. Cada dev tem suas próprias credenciais (projetos separados)
3. Rotacione chaves periodicamente
4. Use diferentes projetos Supabase para dev/staging/prod
5. Revise código antes de commitar

### ❌ Não faça:

1. Compartilhar credenciais por email/chat
2. Usar production keys em desenvolvimento
3. Commitar credenciais "só por enquanto"
4. Desabilitar o `.gitignore`

---

## 📚 Recursos Adicionais

- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [GitHub Security](https://docs.github.com/en/code-security)
- [Environment Variables Best Practices](https://12factor.net/config)

---

## ✅ Resumo

✅ **Suas credenciais estão seguras**  
✅ **Templates fornecidos para novos devs**  
✅ **`.gitignore` configurado corretamente**  
✅ **Scripts de setup automatizados**

🔒 **Seu código está protegido!**

---

**Dúvidas sobre segurança? Abra uma issue no projeto.**
