-- Script SQL para criar a estrutura do banco de dados no Supabase
-- Execute este script no SQL Editor do Supabase

-- ========================================
-- 1. Criar tabela de itens de compras
-- ========================================
CREATE TABLE IF NOT EXISTS shopping_items (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 2. Habilitar Row Level Security (RLS)
-- ========================================
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 3. Criar políticas de segurança
-- ========================================

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

-- ========================================
-- 4. Criar índices para melhor performance
-- ========================================
CREATE INDEX IF NOT EXISTS idx_shopping_items_user_id 
  ON shopping_items(user_id);

CREATE INDEX IF NOT EXISTS idx_shopping_items_created_at 
  ON shopping_items(created_at DESC);

-- ========================================
-- 5. Inserir dados de exemplo (opcional)
-- ========================================
-- Descomente as linhas abaixo e substitua 'YOUR_USER_ID' pelo seu ID de usuário
-- para adicionar alguns itens de exemplo

-- INSERT INTO shopping_items (name, quantity, user_id) VALUES
--   ('Arroz', 2, 'YOUR_USER_ID'),
--   ('Feijão', 1, 'YOUR_USER_ID'),
--   ('Macarrão', 3, 'YOUR_USER_ID'),
--   ('Leite', 2, 'YOUR_USER_ID'),
--   ('Pão', 5, 'YOUR_USER_ID');
