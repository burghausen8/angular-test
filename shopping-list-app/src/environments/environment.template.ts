export const environment = {
  production: false,
  supabase: {
    url: 'YOUR_SUPABASE_URL', // Ex: https://xxxxx.supabase.co
    key: 'YOUR_SUPABASE_PUBLISHABLE_KEY', // Ex: sb_publishable_xxxxx
  },
};

// INSTRUÇÕES:
// 1. Copie este arquivo para: environment.ts
// 2. Substitua YOUR_SUPABASE_URL pela URL do seu projeto Supabase
// 3. Substitua YOUR_SUPABASE_PUBLISHABLE_KEY pela sua Publishable Key
// 
// Onde encontrar as credenciais:
// 1. Acesse: https://supabase.com/dashboard
// 2. Selecione seu projeto
// 3. Vá em Settings → API
// 4. Copie:
//    - Project URL → url
//    - Publishable Key (anon public) → key
