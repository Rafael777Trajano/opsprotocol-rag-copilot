BT=$(printf '\x60\x60\x60')
cat << EOF > README.md
<div align="center">

<img src="[https://img.shields.io/badge/AI_BUILDER_PORTFOLIO-PROJETO_05%2F05-06B6D4?style=for-the-badge&logo=probot&logoColor=white](https://img.shields.io/badge/AI_BUILDER_PORTFOLIO-PROJETO_05%2F05-06B6D4?style=for-the-badge&logo=probot&logoColor=white)" alt="Projeto 05/05" />

# 📚 OpsProtocol RAG Copilot
### Copiloto de Conformidade Operacional, Consulta a POPs & Mediação de Crises com Strict Grounding

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://opsprotocol-rag-copilot.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-0F172A?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)](https://tailwindcss.com/)
[![RAG Architecture](https://img.shields.io/badge/RAG_Engine-Strict_Grounding-10B981?style=for-the-badge&logo=databricks&logoColor=white)](https://opsprotocol-rag-copilot.vercel.app/)

**Sistema de Retrieval-Augmented Generation (RAG) com guardrail anti-alucinação para consulta instantânea a Procedimentos Operacionais Padrão (POPs), execução de checklists de contenção e geração de scripts de mediação em cenários críticos.**

[🚀 Acessar Aplicação ao Vivo](https://opsprotocol-rag-copilot.vercel.app/) • [🧠 Arquitetura RAG](#-arquitetura-rag--strict-grounding) • [⚡ Funcionalidades](#-arquitetura-funcional) • [📖 Base de POPs](#-base-documental-nativa-pops-indexados) • [💻 Como Executar](#-como-executar-localmente) • [🏆 Portfólio 5/5](#-ecossistema-de-projetos-trilha-ai-builder--5-soluções)

</div>

---

## 🧠 Arquitetura RAG & Strict Grounding

${BT}mermaid
flowchart LR
    A["Ocorrencia ou Crise<br/>Portaria - NOC - SecOps - CX"] --> B["Semantic Retrieval Engine<br/>Normalizacao e Score por Chunk"]
    B --> C{"Strict Grounding Gate<br/>Score >= 25%?"}
    C -->|"Sim (Validado)"| D["Diretriz Homologada<br/>Checklist SLA + Script Mediacao"]
    C -->|"Nao (Sem Lastro)"| E["Bloqueio Anti-Alucinacao<br/>Prevencao de Resposta Fora da Base"]
    D --> F["Auditoria e Exportacao<br/>Evidencias + Parecer Tecnico .MD"]
${BT}

---

## ⚡ Arquitetura Funcional

| Módulo | Descrição Técnica | Impacto Operacional |
| :--- | :--- | :--- |
| **🔍 Semantic Retrieval Engine** | Normaliza consultas em português (remoção de acentos, *stop words* e radicais), calcula relevância ponderada entre título e corpo e ranqueia os *chunks* mais aderentes. | Recupera o procedimento exato em milissegundos mesmo quando o operador digita em linguagem natural sob pressão. |
| **🛡️ Guardrail Anti-Alucinação** | Aplica limiar mínimo de confiança documental (*Strict Grounding*). Consultas fora do escopo operacional são bloqueadas preventivamente em vez de gerar respostas inventadas. | Garante conformidade normativa e zero improviso em operações críticas de segurança, redes e atendimento. |
| **📋 Checklist & Mediação de Crise** | Extrai automaticamente o passo a passo de contenção imediata, o SLA alvo e um script pronto de comunicação empática e assertiva para acalmar solicitantes. | Padroniza a resposta da equipe de linha de frente e reduz o tempo médio de atendimento (TMA) em crises. |
| **➕ Indexador Dinâmico de POPs** | Permite cadastrar novos Procedimentos Operacionais Padrão diretamente na interface, segmentando em *chunks* e tornando-os consultáveis em tempo real. | Facilita a atualização contínua da base de conhecimento sem necessidade de redeploy de código. |
| **📄 Auditoria & Parecer .MD** | Exibe os trechos recuperados com *score* percentual, termos correspondentes (tags) e exporta laudo técnico completo em Markdown (.md). | Assegura rastreabilidade documental para auditorias internas, turnos operacionais e compliance. |

---

## 📖 Base Documental Nativa (POPs Indexados)

| Código | Procedimento Operacional Padrão | Domínio | SLA Alvo |
| :--- | :--- | :--- | :--- |
| **POP-SEC-01** | Controle de Acesso, Visitantes & Prestadores Não Agendados | Segurança & Acesso | Resposta Imediata (< 3 min) |
| **POP-NOC-04** | Contingência de Queda de Link WAN, Switch & Isolamento OSI | Redes & Infraestrutura | Contenção em até 15 min |
| **POP-LGPD-07** | Resposta a Incidentes de Segurança, Phishing & Exposição de Dados | SecOps & LGPD | Contenção Crítica (< 10 min) |
| **POP-CX-12** | Mediação de Crises de Atendimento, Atraso Crítico & Estorno SLA | Atendimento & CX | Resolução Prioritária (< 8 min) |

---

## 🛠️ Stack Tecnológica

* **Frontend & UI:** React 19, TypeScript 5, Tailwind CSS v4, Lucide Icons
* **Motor RAG & NLP:** Tokenização léxica em português, *chunking* estruturado por seção, *scoring* ponderado e filtro de *Strict Grounding*
* **Exportação & Relatórios:** Geração dinâmica de pareceres operacionais em Markdown (.md) via Blob API
* **Build & CI/CD:** Vite + Deploy contínuo via GitHub e [Vercel](https://opsprotocol-rag-copilot.vercel.app/)

---

## 💻 Como Executar Localmente

${BT}bash
# 1. Clone o repositório
git clone [https://github.com/Rafael777Trajano/opsprotocol-rag-copilot.git](https://github.com/Rafael777Trajano/opsprotocol-rag-copilot.git)

# 2. Acesse o diretório do projeto
cd opsprotocol-rag-copilot

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
${BT}

---

## 🏆 Ecossistema de Projetos (Trilha AI Builder — 5 Soluções)

| # | Projeto | Foco Técnico | Status |
| :---: | :--- | :--- | :---: |
| **01** | [**SentinelAI SOC Dashboard**](https://sentinelai-soc-dashboard.netlify.app/) | Monitoramento SOC, visualização de alertas e triagem de segurança | ✅ No Ar |
| **02** | [**NetPulse AI Orchestrator**](https://orquestrador-multi-agente-de-logs-dia.netlify.app/) | Orquestração multi-agente para logs de redes, diagnóstico OSI e SecOps | ✅ No Ar |
| **03** | [**StructuraAI Engine**](https://estrutura-ai-extrator.netlify.app/) | Extração estruturada de dados e classificação operacional a partir de textos livres | ✅ No Ar |
| **04** | [**FlowBridge AI Connector**](https://flowbridge-webhook-connector.netlify.app/) | Integração ágil de eventos operacionais via webhooks (n8n / Make / Zapier) | ✅ No Ar |
| **05** | [**OpsProtocol RAG Copilot**](https://opsprotocol-rag-copilot.vercel.app/) *(Este repositório)* | Copiloto de conformidade, consulta rápida a POPs e mediação de crises em tempo real | ✅ No Ar |

---

<div align="center">

### 👨‍💻 Desenvolvido por **Rafael Trajano**
*Tecnólogo em Redes de Computadores  • Graduando em Sistemas de Informação*  
**AI Builder | Orquestração de Agentes | Automação de Sistemas | Segurança da Informação**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)]([https://www.linkedin.com/in/rafaatrjnbpbs47](https://www.linkedin.com/in/rafaatrjnbpbs47))
[![GitHub](https://img.shields.io/badge/GitHub-Rafael777Trajano-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rafael777Trajano)

</div>
EOF

git add README.md && git commit -m "fix: corrige fechamento do bloco Mermaid no README" && git push
