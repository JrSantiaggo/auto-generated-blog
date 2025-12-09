#!/bin/bash

# URL do backend
BACKEND_URL="${BACKEND_URL:-http://localhost:3000}"

# Diretório para logs
LOG_DIR="/home/jrsan/auto-generate-blog/scripts/logs"
mkdir -p "$LOG_DIR"

LOG_FILE="$LOG_DIR/generate-article.log"

# Gera um artigo via API
HTTP_CODE=$(curl -s -o /tmp/article_response.json -w "%{http_code}" -X POST "$BACKEND_URL/articles/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "technology",
    "style": "light and informal",
    "paragraphs": 3
  }')

# Verifica se a requisição foi bem-sucedida (código 201 = Created)
if [ "$HTTP_CODE" -eq 201 ]; then
  echo "[$(date)] Article generated successfully (HTTP $HTTP_CODE)" >> "$LOG_FILE"
  if [ -f /tmp/article_response.json ]; then
    ARTICLE_ID=$(cat /tmp/article_response.json | grep -o '"id":[0-9]*' | cut -d: -f2)
    echo "[$(date)] Article ID: $ARTICLE_ID" >> "$LOG_FILE"
    rm -f /tmp/article_response.json
  fi
else
  echo "[$(date)] Error generating article (HTTP $HTTP_CODE)" >> "$LOG_FILE"
  if [ -f /tmp/article_response.json ]; then
    echo "[$(date)] Error response: $(cat /tmp/article_response.json)" >> "$LOG_FILE"
    rm -f /tmp/article_response.json
  fi
fi

