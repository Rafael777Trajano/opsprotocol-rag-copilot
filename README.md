Bashcat << 'EOF' > README.md
<div align="center">

<img src="https://img.shields.io/badge/AI_BUILDER_PORTFOLIO-PROJETO_05%2F05-06B6D4?style=for-the-badge&logo=probot&logoColor=white" alt="Projeto 05/05" />

# 📚 OpsProtocol RAG Copilot
### Copiloto de Conformidade Operacional, Consulta a POPs & Mediação de Crises com Strict Grounding

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://opsprotocol-rag-copilot.netlify.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-0F172A?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)](https://tailwindcss.com/)
[![RAG Architecture](https://img.shields.io/badge/RAG_Engine-Strict_Grounding-10B981?style=for-the-badge&logo=databricks&logoColor=white)](https://opsprotocol-rag-copilot.netlify.app/)

**Sistema de Retrieval-Augmented Generation (RAG) com guardrail anti-alucinação para consulta instantânea a Procedimentos Operacionais Padrão (POPs), execução de checklists de contenção e geração de scripts de mediação em cenários críticos.**

[🚀 Acessar Aplicação ao Vivo](https://opsprotocol-rag-copilot.netlify.app/) • [🧠 Arquitetura RAG](#-arquitetura-rag--strict-grounding) • [⚡ Funcionalidades](#-arquitetura-funcional) • [📖 Base de POPs](#-base-documental-nativa-pops-indexados) • [💻 Como Executar](#-como-executar-localmente) • [🏆 Portfólio 5/5](#-ecossistema-de-projetos-trilha-ai-builder--5-soluções)

</div>

---

## 🧠 Arquitetura RAG & Strict Grounding

```mermaid
flowchart LR
    A["Ocorrencia ou Crise<br/>Portaria - NOC - SecOps - CX"] --> B["Semantic Retrieval Engine<br/>Normalizacao e Score por Chunk"]
    B --> C{"Strict Grounding Gate<br/>Score >= 25%?"}
    C -->|"Sim (Validado)"| D["Diretriz Homologada<br/>Checklist SLA + Script Mediacao"]
    C -->|"Nao (Sem Lastro)"| E["Bloqueio Anti-Alucinacao<br/>Prevencao de Resposta Fora da Base"]
    D --> F["Auditoria e Exportacao<br/>Evidencias + Parecer Tecnico .MD"]
⚡ Arquitetura FuncionalMóduloDescrição TécnicaImpacto Operacional🔍 Semantic Retrieval EngineNormaliza consultas em português (remoção de acentos, stop words e radicais), calcula relevância ponderada entre título e corpo e ranqueia os chunks mais aderentes.Recupera o procedimento exato em milissegundos mesmo quando o operador digita em linguagem natural sob pressão.🛡️ Guardrail Anti-AlucinaçãoAplica limiar mínimo de confiança documental (Strict Grounding). Consultas fora do escopo operacional são bloqueadas preventivamente em vez de gerar respostas inventadas.Garante conformidade normativa e zero improviso em operações críticas de segurança, redes e atendimento.📋 Checklist & Mediação de CriseExtrai automaticamente o passo a passo de contenção imediata, o SLA alvo e um script pronto de comunicação empática e assertiva para acalmar solicitantes.Padroniza a resposta da equipe de linha de frente e reduz o tempo médio de atendimento (TMA) em crises.➕ Indexador Dinâmico de POPsPermite cadastrar novos Procedimentos Operacionais Padrão diretamente na interface, segmentando em chunks e tornando-os consultáveis em tempo real.Facilita a atualização contínua da base de conhecimento sem necessidade de redeploy de código.📄 Auditoria & Parecer .MDExibe os trechos recuperados com score percentual, termos correspondentes (#tags) e exporta laudo técnico completo em Markdown (.md).Assegura rastreabilidade documental para auditorias internas, turnos operacionais e compliance.📖 Base Documental Nativa (POPs Indexados)CódigoProcedimento Operacional PadrãoDomínioSLA AlvoPOP-SEC-01Controle de Acesso, Visitantes & Prestadores Não AgendadosSegurança & AcessoResposta Imediata (< 3 min)POP-NOC-04Contingência de Queda de Link WAN, Switch & Isolamento OSIRedes & InfraestruturaContenção em até 15 minPOP-LGPD-07Resposta a Incidentes de Segurança, Phishing & Exposição de DadosSecOps & LGPDContenção Crítica (< 10 min)POP-CX-12Mediação de Crises de Atendimento, Atraso Crítico & Estorno SLAAtendimento & CXResolução Prioritária (< 8 min)🛠️ Stack TecnológicaFrontend & UI: React 19, TypeScript 5, Tailwind CSS v4, Lucide IconsMotor RAG & NLP: Tokenização léxica em português, chunking estruturado por seção, scoring ponderado e filtro de Strict GroundingExportação & Relatórios: Geração dinâmica de pareceres operacionais em Markdown (.md) via Blob APIBuild & CI/CD: Vite + Deploy contínuo via GitHub e Netlify💻 Como Executar LocalmenteBash# 1. Clone o repositório
git clone [https://github.com/Rafael777Trajano/opsprotocol-rag-copilot.git](https://github.com/Rafael777Trajano/opsprotocol-rag-copilot.git)

# 2. Acesse o diretório do projeto
cd opsprotocol-rag-copilot

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
🏆 Ecossistema de Projetos (Trilha AI Builder — 5 Soluções)#ProjetoFoco TécnicoStatus01SentinelAI SOC DashboardMonitoramento SOC, visualização de alertas e triagem de segurança✅ No Ar02NetPulse AI OrchestratorOrquestração multi-agente para logs de redes, diagnóstico OSI e SecOps✅ No Ar03StructuraAI EngineExtração estruturada de dados e classificação operacional a partir de textos livres✅ No Ar04FlowBridge AI ConnectorIntegração ágil de eventos operacionais via webhooks (n8n / Make / Zapier)✅ No Ar05OpsProtocol RAG Copilot (Este repositório)Copiloto de conformidade, consulta rápida a POPs e mediação de crises em tempo real✅ No Ar👨‍💻 Desenvolvido por Rafael TrajanoTecnólogo em Redes de Computadores (Média 9,83) • Graduando em Sistemas de InformaçãoAI Builder | Orquestração de Agentes | Automação de Sistemas | Segurança da Informação
