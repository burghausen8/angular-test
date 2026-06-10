#!/bin/bash

echo "🚀 Configurando Shopping List App..."
echo ""

# Verificar se os arquivos de environment já existem
if [ -f "src/environments/environment.ts" ]; then
  echo "⚠️  environment.ts já existe. Pulando..."
else
  echo "📝 Criando environment.ts a partir do template..."
  cp src/environments/environment.template.ts src/environments/environment.ts
  echo "✅ Criado! Agora edite src/environments/environment.ts com suas credenciais"
fi

echo ""

if [ -f "src/environments/environment.prod.ts" ]; then
  echo "⚠️  environment.prod.ts já existe. Pulando..."
else
  echo "📝 Criando environment.prod.ts a partir do template..."
  cp src/environments/environment.prod.template.ts src/environments/environment.prod.ts
  echo "✅ Criado! Agora edite src/environments/environment.prod.ts com suas credenciais"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 PRÓXIMOS PASSOS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Edite os arquivos de environment com suas credenciais:"
echo "    - src/environments/environment.ts"
echo "    - src/environments/environment.prod.ts"
echo ""
echo "2️⃣  Instale as dependências:"
echo "    npm install"
echo ""
echo "3️⃣  Configure o banco de dados no Supabase"
echo "    (Execute o SQL do arquivo supabase-setup.sql)"
echo ""
echo "4️⃣  Inicie o servidor:"
echo "    npm start"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📖 Veja SETUP.md para instruções detalhadas"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
