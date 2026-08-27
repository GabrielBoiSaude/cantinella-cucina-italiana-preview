# QA visual — Cantinella Cucina Italiana

Data: 2026-08-27

## Matriz executada

- Desktop: 1440 × 1050; captura integral de 5.977 px de altura.
- Mobile: 390 × 844 (DPR 2); captura integral de 6.421 px de altura.
- Seções revisadas: hero, história, menu, ambiente, adega, eventos, contato e rodapé.

## Falhas encontradas e corrigidas

1. **Hero desktop:** o título quebrava em linhas excessivas e empurrava os CTAs abaixo da dobra.
   - Correção: largura editorial ampliada e escala tipográfica recalibrada.
2. **Revelações de conteúdo:** elementos podiam ficar invisíveis se a animação/JavaScript falhasse.
   - Correção: conteúdo fica visível por padrão; as animações são ativadas somente quando a classe `motion-enabled` é aplicada pelo JavaScript.
3. **Hero mobile:** o CTA flutuante encobria parte dos metadados de endereço/atendimento.
   - Correção: o CTA flutuante só aparece depois que a hero deixa de estar visível.

## Verificações automáticas

- 0 referências de imagem ausentes.
- 7 CTAs de WhatsApp com `data-wa`.
- Sintaxe de `app.js` validada por `node --check`.
- Capturas integrais salvas em `qa-visual/full/`.

## Resultado

**Aprovado para publicação.** A versão aprovada é a revisada após as três correções acima.
