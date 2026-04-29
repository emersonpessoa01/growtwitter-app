OUTPUT="projeto_completo.txt"
> "$OUTPUT"

echo "========================================" >> "$OUTPUT"
echo "PROJETO GROWTWITTER - CÓDIGO COMPLETO" >> "$OUTPUT"
echo "========================================" >> "$OUTPUT"

find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) | sort | while read file; do
  echo "" >> "$OUTPUT"
  echo "========================================" >> "$OUTPUT"
  echo "ARQUIVO: $file" >> "$OUTPUT"
  echo "========================================" >> "$OUTPUT"
  cat "$file" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
done

echo "Concluído! Arquivo gerado: $OUTPUT"
