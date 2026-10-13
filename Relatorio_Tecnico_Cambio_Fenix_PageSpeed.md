# Relatório técnico — Auditoria PageSpeed Insights: Cambio Fénix

**URL analisada:** https://cambiofenix.com/  
**Dispositivo:** celular / mobile  
**Captura exibida no Lighthouse:** 13/10/2026, 18:05 BRT  
**Origem dos dados:** capturas de tela fornecidas pelo usuário (Google PageSpeed Insights).  
**Escopo:** apenas a análise mobile mostrada nos prints. Os dados de desktop e o conteúdo de painéis recolhidos não foram fornecidos.  
**Observação de URL:** o relatório mostra “Mostrando resultados para a URL: https://cambiofenix.com/” e opção “Executar com URL original”, sugerindo que a ferramenta normalizou/redirecionou a URL informada; sem dados suficientes para caracterizar a cadeia de redirecionamento.

## 1. Resumo executivo

O site **reprovou na avaliação dos Core Web Vitals** em dados reais de usuários móveis. O Lighthouse atribuiu **59/100 em desempenho mobile**, com **LCP de laboratório de 14,0 s**, **Speed Index de 22,2 s** e **payload total de rede de 3.167 KiB**. A principal frente de trabalho é melhorar a renderização do conteúdo principal (LCP) e reduzir o custo de fontes, recursos bloqueantes, código não usado e imagens, além de avaliar a latência do servidor. Há questões de acessibilidade e navegação semântica, apesar de pontuações altas em SEO e boas práticas.

**Cuidado:** pontuações e números de laboratório são observações de uma execução simulada; métricas reais de campo representam múltiplos usuários e conexões durante 28 dias. Não comparar diretamente os dois LCPs como se fossem a mesma amostra.

## 2. Pontuações gerais (Lighthouse mobile)

| Dimensão | Pontuação / resultado |
|---|---|
| Desempenho | **59 / 100** (necessita melhorias) |
| Acessibilidade | **90 / 100** |
| Práticas recomendadas | **96 / 100** |
| SEO | **100 / 100** |
| Navegação agêntica | **2 / 3** (indicador exibido, não corresponde a uma nota /100) |
| Core Web Vitals (dados de campo) | **Reprovado** |

## 3. Dados reais de usuários (CrUX — janela de 28 dias)

Aparecem no cabeçalho “Entender a experiência dos seus usuários”, agrupando várias amostras de dispositivos móveis, conexões de rede e versões do Chrome; dados de visitas completas.

| Métrica | Resultado mostrado | Interpretação |
|---|---:|---|
| LCP — Largest Contentful Paint | **4,5 s** | Ruim; conteúdo principal demora a aparecer. Recomendado até 2,5 s. |
| INP — Interaction to Next Paint | **274 ms** | Necessita melhorias; meta até 200 ms. |
| CLS — Cumulative Layout Shift | **0,06** | Bom; meta até 0,1. |
| FCP — First Contentful Paint | **4,0 s** | Ruim; primeiro conteúdo demora. |
| TTFB — Time to First Byte | **3,0 s** | Ruim; elevado tempo até o primeiro byte. |

**Interpretação:** a reprovação dos Core Web Vitals se justifica pelo LCP de 4,5 s e INP de 274 ms; o CLS está bom. As métricas de campo são agregadas e não indicam isoladamente a causa raiz.

## 4. Métricas de laboratório (Lighthouse — mobile)

| Métrica | Resultado mostrado | Diagnóstico |
|---|---:|---|
| Performance score | **59** | Precisa melhorar |
| First Contentful Paint (FCP) | **2,4 s** | Necessita melhorias |
| Largest Contentful Paint (LCP) | **14,0 s** | Muito ruim; prioridade máxima |
| Total Blocking Time (TBT) | **170 ms** | Bom na amostra |
| Cumulative Layout Shift (CLS) | **0,057** | Bom na amostra |
| Speed Index | **22,2 s** | Muito lento |

**Condições mostradas:** emulação **Moto G Power**, **Lighthouse 13.5.0**, **limitação de 4G lenta**, carregamento inicial da página, sessão de uma única página, Chromium headless. O relatório exibe capturas do carregamento (filmstrip), com demora até o conteúdo completo visível.

## 5. Oportunidades e insights sinalizados

A tabela abaixo transcreve os avisos visíveis. Economias estimadas pelo Lighthouse **não são aditivas** nem garantem ganho igual após implementar correções.

| Aviso | Quantificação exibida | Próximo passo técnico sugerido |
|---|---|---|
| Exibição de fontes | Economia estimada **3.000 ms** | Investigar fontes web, uso de `font-display: swap` ou `optional`, preload criterioso de fonte principal, fontes locais e redução de pesos/variantes. |
| Solicitações que bloquearam a renderização | Economia estimada **2.190 ms** | Identificar CSS/JS crítico, CSS acima da dobra, `defer`/`async` para scripts compatíveis, carregamento condicional. |
| Latência da solicitação de documentos | Economia estimada **870 ms** | Melhorar resposta do documento HTML, cache apropriado, CDN, backend/hosting e TTFB. |
| Use ciclos de vida eficientes de cache | Economia estimada **657 KiB** | Ajustar `Cache-Control` para ativos versionados e políticas seguras para HTML/dados dinâmicos. |
| JavaScript legado | Economia estimada **69 KiB** | Revisar alvo de transpilation/polyfills e bundle moderno, sem quebrar compatibilidade. |
| Melhorar entrega de imagens | Economia estimada **329 KiB** | AVIF/WebP, `srcset`/`sizes`, dimensões corretas, compressão e evitar lazy-load da imagem LCP. |
| Detalhamento da LCP | Sem valores expandidos nos prints | Identificar elemento LCP e divisão TTFB / atraso de carregamento / download / renderização. |
| Descoberta de solicitações de LCP | Sem valores expandidos | Verificar descoberta antecipada de recurso LCP; considerar preload/prioridade (`fetchpriority="high"`) quando aplicável. |
| Árvore de dependência da rede | Sem valores expandidos | Verificar cadeias críticas e recursos de terceiros. |
| Causas da troca de layout | Sem valores expandidos | Conferir mudanças de layout apesar do CLS agregado bom. |
| Otimizar o tamanho do DOM | Sem valores expandidos | Avaliar estrutura complexa, wrappers de construtor visual e elementos dispensáveis. |
| Terceiros | Sem valores expandidos | Medir impacto de scripts/widgets externos. |

**Detalhe do HTML inicial visto no painel “Latência da solicitação de documentos”:**
- **Sem redirecionamentos** — aprovado na auditoria específica dessa execução.
- **O servidor respondeu lentamente — observado: 968 ms** — falha sinalizada nessa auditoria.
- **Compactação de texto aplicada** — aprovado.

O número de **968 ms é uma medição de laboratório do documento inicial**, enquanto o **TTFB 3,0 s é um valor agregado de campo**; diferenças são esperadas por ambiente/metodologia.

## 6. Diagnósticos complementares

| Diagnóstico | Evidência do relatório |
|---|---|
| Minimizar trabalho da thread principal | **2,6 s** |
| Reduzir JavaScript não usado | Economia estimada **491 KiB** |
| Imagens sem atributos explícitos `width` e `height` | Aviso presente |
| Reduzir CSS não usado | Economia estimada **138 KiB** |
| Evitar payloads grandes | Total transferido **3.167 KiB** (~3,09 MiB) |
| Evitar tarefas longas na thread principal | **8 tarefas longas** encontradas |
| Evitar animações não compostas | **2 elementos animados** encontrados |

Estas oportunidades sugerem um front-end com recursos acima do necessário para a primeira renderização. O relatório de acessibilidade também mostra classes `elementor-...`, sinal de que **Elementor está presente ao menos no botão auditado**; não é prova de que todo o site foi feito com Elementor, nem de que um plugin específico é responsável pelos gargalos.

## 7. Acessibilidade: falhas mostradas

**Nota global:** 90/100. Advertências visíveis:

1. **Contraste insuficiente** entre cores de primeiro e segundo plano. Elemento exemplificado: texto `CONTACTO` em botão dourado/amarelo, com `<span class="elementor-button-text">` e link Elementor para WhatsApp. Revisar contraste do texto/fundo de acordo com WCAG e estados de foco/hover.
2. **Áreas de toque pequenas ou próximas demais.** Aumentar tamanho efetivo e espaçamento dos alvos móveis.
3. **Links idênticos têm a mesma finalidade** — item aparece com ícone neutro/informativo no print; verificar se é falha concreta antes de priorizar.
4. **Hierarquia de títulos fora de sequência descendente.** Corrigir níveis H1, H2, H3 conforme a estrutura semântica.
5. **Links de salto não são focalizáveis.** Validar navegação por teclado e comportamento de `skip links`.
6. **Outros itens para verificação manual: 10** — conteúdo não expandido no material enviado.

## 8. Hipóteses técnicas (não confirmadas)

- Fontes web podem estar impedindo ou atrasando a exibição de texto no topo da página, dada a oportunidade estimada de 3.000 ms.
- Scripts e estilos associados ao tema/construtor visual/plugins podem compor recursos bloqueantes e parte do JS/CSS não usado. **É necessário inspecionar os arquivos listados na auditoria expandida antes de atribuir responsabilidade.**
- Imagem principal, plano de fundo do hero, transições ou descoberta tardia do elemento LCP podem explicar parte dos 14 s de laboratório. **Não é possível identificar o elemento LCP exato pelos prints disponíveis.**
- O desempenho de servidor pode contribuir para a demora inicial, mas o impacto real deve ser validado com waterfall e dados de hospedagem.
- O aviso inicial de “não foi possível resolver o URL” ocorreu em outra tentativa, mas uma execução posterior gerou relatório. Portanto, **não há evidência suficiente para afirmar uma falha DNS persistente**.

## 9. Plano de ação priorizado

### P0 — LCP e carregamento inicial

1. Abrir no PageSpeed a seção **“Detalhamento da LCP”** e anotar o elemento LCP, URL do recurso e divisão de tempos.
2. Expandir **“Exibição de fontes”** e **“Solicitações que bloquearam a renderização”**: listar exatamente URLs, tamanhos e bloqueios.
3. Para imagem LCP, aplicar formato/dimensões apropriados, entrega responsiva, não usar `loading="lazy"`, testar `fetchpriority="high"` e preload apenas quando justificado.
4. Para texto LCP, garantir exibição rápida das fontes (`font-display`), alternativas locais adequadas e CSS crítico.
5. Minimizar CSS/JS de renderização inicial, preservando menu, formulário, cotações e navegação.

### P1 — Backend, rede e peso

6. Investigar latência HTML: TTFB por região, cache, CDN, DNS/TLS, hosting e eventuais aplicações dinâmicas.
7. Auditar **491 KiB de JS não usado**, **138 KiB de CSS não usado**, **69 KiB de JS legado** e dependências de terceiros.
8. Corrigir cache estático (**657 KiB** estimados), melhorar imagens (**329 KiB** estimados), reduzir o total de **3.167 KiB**.
9. Inspecionar e reduzir as **8 tarefas longas**; rever as **2 animações não compostas**.

### P2 — Acessibilidade, UX e validação

10. Corrigir contraste do botão `CONTACTO`, tamanhos de toque, semântica de títulos e links de salto.
11. Fixar dimensões de imagens para evitar possíveis instabilidades de layout.
12. Testar mobile real em condições limitadas e validar fluxo de WhatsApp/cotações após otimizações.
13. Rodar PageSpeed mobile/desktop novamente e comparar métricas de laboratório; acompanhar dados reais de 28 dias para confirmar tendência de Core Web Vitals.

**Metas técnicas orientativas:** LCP de campo <= 2,5 s; INP <= 200 ms; CLS <= 0,1. Pontuação Lighthouse mobile >= 90 pode ser usada como objetivo secundário, sem substituir métricas reais.

## 10. Evidências ainda necessárias para diagnóstico conclusivo

- Link completo e/ou arquivo JSON exportado da execução PageSpeed.
- Conteúdo expandido dos painéis “Detalhamento da LCP”, “Descoberta de solicitações de LCP”, “Exibição de fontes”, “Solicitações que bloquearam a renderização” e “Árvore de dependência da rede”.
- Lista de arquivos CSS/JS e imagens apontados como mais pesados.
- Dados do relatório desktop.
- Informações sobre hospedagem, cache, CDN e CMS/tema/plugins (verificar em vez de assumir).
- Waterfall de rede, identificação do elemento LCP e waterfall das fontes.

## 11. Instrução sugerida para outra LLM

> Atue como engenheiro sênior de performance web e auditor técnico de Lighthouse/Google PageSpeed Insights. Utilize exclusivamente os dados medidos deste relatório como evidência; separe fatos, hipóteses e testes propostos. Produza um plano de otimização para https://cambiofenix.com/, priorizado por impacto esperado em LCP/INP/TTFB, esforço e risco de regressão. Para cada ação, indique como verificar a causa no Chrome DevTools, como implementar (inclusive no WordPress/Elementor somente se a stack for confirmada), como medir antes/depois e quais cuidados tomar para não quebrar o layout e as funções de conversão. Não afirme que oportunidades estimadas são ganhos garantidos ou somáveis. Peça capturas/JSON dos painéis expandidos antes de atribuir responsabilidade a arquivos ou plugins específicos.

---

**Nota sobre fidelidade:** todas as métricas quantitativas acima foram transcritas das capturas fornecidas. Recomendações e causas potenciais são análises técnicas, não fatos comprovados pela auditoria visível. Não houve acesso ao código-fonte, hosting ou JSON integral do Lighthouse.
