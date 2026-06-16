# ALLiA LAB — MCPs, Skills & Ferramentas Recomendadas

## MCPs para Claude Code (instalar localmente)

### 🔴 Essenciais — instale antes de começar

| MCP | Uso no projeto | Instalação |
|---|---|---|
| **GitHub MCP** | Criar PRs, revisar diffs, gerenciar branches, criar issues | `claude mcp add github-mcp` (requer GitHub CLI) |
| **Vercel MCP** | Deploy status, logs, env vars, preview URLs | `claude mcp add @vercel/mcp-adapter` |
| **Filesystem MCP** | Leitura/escrita de arquivos locais (já embutido no Claude Code) | Nativo |
| **Brave Search MCP** | Pesquisa técnica sem sair do terminal (docs, erros, libs) | `claude mcp add @modelcontextprotocol/server-brave-search` |

### 🟡 Muito úteis — adicione na Fase 1

| MCP | Uso no projeto | Instalação |
|---|---|---|
| **Playwright MCP** | Testes end-to-end, screenshots para verificar UI | `claude mcp add @playwright/mcp` |
| **Sentry MCP** | Monitorar erros em produção pós-launch | Após deploy |
| **Figma MCP** | Se criar mockups no Figma antes de codar | `claude mcp add figma-developer-mcp` |

### 🟢 Fase 2+

| MCP | Uso no projeto | Instalação |
|---|---|---|
| **Notion/Obsidian MCP** | Base de conhecimento expandida | Fase 2 |
| **HubSpot MCP** | CRM integration para leads do diagnóstico | Fase 2 |
| **Resend MCP** | Gerenciar templates de email | Fase 2 |

---

## Skills Recomendadas (Claude Code)

### Já disponíveis (use agora)

| Skill | Como usar no projeto |
|---|---|
| `frontend-design` | Antes de criar qualquer componente visual. Valida escolhas estéticas. |
| `engineering:code-review` | Antes de cada PR. Pede "review this component for accessibility and performance". |
| `engineering:testing-strategy` | Na Fase 1 final. "Write tests for the diagnostico form submission". |
| `engineering:documentation` | Após finalizar componentes. "Document the Button component API". |
| `marketing:brand-review` | Após escrever qualquer copy nova. Valida contra o brandbook. |
| `marketing:seo-audit` | Antes de cada deploy. "Audit the homepage for SEO completeness". |
| `design:accessibility-review` | Fase 1 final. "Check WCAG AA compliance for the homepage". |
| `engineering:deploy-checklist` | Antes do primeiro deploy em produção. |

---

## Configuração `.claude/settings.json`

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(npx:*)",
      "Bash(git:*)",
      "Bash(vercel:*)",
      "Read(**)",
      "Write(app/**)",
      "Write(components/**)",
      "Write(lib/**)",
      "Write(docs/**)",
      "Write(public/**)"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(curl:*)",
      "Write(.env*)"
    ]
  }
}
```

> Nunca deixe Claude Code escrever em `.env` diretamente. Configure env vars manualmente no Vercel dashboard.

---

## Hooks Recomendados

### `.claude/hooks/pre-commit.sh`
```bash
#!/bin/bash
# Bloqueia commit com secrets
if git diff --cached | grep -E "(RESEND_API_KEY|GA_ID|HOTJAR)=" | grep -v "NEXT_PUBLIC_"; then
  echo "❌ Possível secret detectado. Verifique antes de commitar."
  exit 1
fi
echo "✅ Sem secrets detectados"
```

### `.claude/hooks/post-write-format.sh`
```bash
#!/bin/bash
# Auto-format após write em tsx/ts
if [[ "$1" =~ \.(tsx|ts)$ ]]; then
  npx prettier --write "$1"
fi
```

---

## Stack de Ferramentas Externas

| Ferramenta | Plano | Uso |
|---|---|---|
| **Vercel** | Free → Pro quando crescer | Deploy, Edge Config, Analytics |
| **Resend** | Free (3k emails/mês) | Form do diagnóstico + newsletter |
| **Google Analytics 4** | Free | Analytics |
| **Hotjar** | Free (35 sessions/day) | Heatmaps Fase 1 |
| **HubSpot Free** | Free (CRM) | Lead tracking Fase 2 |
| **Calendly** | Free | Agendamento |
| **WhatsApp Business API** | Free tier | CTA de contato |

---

## Estrutura de Pastas Completa do Projeto

```
allia-lab/
├── CLAUDE.md                    ← lido em TODA sessão do Claude Code
├── TODO.md                      ← fase atual e tarefas
├── .claude/
│   ├── settings.json            ← permissões
│   └── hooks/                   ← automações
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 ← homepage
│   ├── globals.css              ← tokens + base styles
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx
│   ├── sobre/page.tsx
│   ├── servicos/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── cases/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── diagnostico/page.tsx
│   ├── contato/page.tsx
│   ├── blog/                    ← Fase 2
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── api/
│       ├── diagnostico/route.ts
│       └── newsletter/route.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Pillars.tsx
│   │   ├── Services.tsx
│   │   ├── Method.tsx
│   │   ├── CaseAnchor.tsx
│   │   ├── Differentials.tsx
│   │   └── CTAFinal.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── fonts.ts
│   ├── motion.ts
│   └── seo.ts
├── public/
│   ├── logo.svg
│   ├── logo-mark.svg
│   └── images/
└── docs/
    ├── INITIAL_PROMPT.md        ← este arquivo
    ├── mcps-skills.md           ← este arquivo
    └── knowledge-base/
        ├── brand.md
        ├── copy.md
        ├── design-system.md
        └── seo.md
```
