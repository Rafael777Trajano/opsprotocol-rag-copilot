export interface SopSection {
  sectionId: string;
  heading: string;
  content: string;
  actionSteps: string[];
  mediationTemplate: string;
}

export interface SopDocument {
  id: string;
  code: string;
  title: string;
  category: 'Segurança & Acesso' | 'Redes & Infra' | 'SecOps & LGPD' | 'Atendimento & CX' | 'Custom POP';
  version: string;
  slaTarget: string;
  sections: SopSection[];
}

export interface RetrievedChunk {
  docCode: string;
  docTitle: string;
  category: string;
  sectionId: string;
  heading: string;
  content: string;
  actionSteps: string[];
  mediationTemplate: string;
  relevanceScore: number;
  matchedTerms: string[];
}

export interface RagCopilotResponse {
  queryId: string;
  timestamp: string;
  query: string;
  grounded: boolean;
  confidencePct: number;
  latencyMs: number;
  primaryCitation: string;
  slaTarget: string;
  executiveGuidance: string;
  actionChecklist: string[];
  mediationScript: string;
  retrievedChunks: RetrievedChunk[];
}

export const INITIAL_SOPS: SopDocument[] = [
  {
    id: 'pop-sec-01',
    code: 'POP-SEC-01',
    title: 'Controle de Acesso, Visitantes & Prestadores Não Agendados',
    category: 'Segurança & Acesso',
    version: 'v3.4 · Compliance Operacional',
    slaTarget: 'Resposta Imediata (< 3 min)',
    sections: [
      {
        sectionId: 'SEC-1.1',
        heading: 'Entrada de Prestadores ou Visitantes sem Autorização Prévia',
        content:
          'É estritamente proibida a liberação de acesso veicular ou pedestre sem validação nominal junto ao morador, gestor da unidade ou ordem de serviço registrada no sistema. Em caso de insistência ou atitude hostil na portaria, manter as eclusas e cancelas travadas.',
        actionSteps: [
          'Manter portão e cancela de acesso bloqueados durante toda a triagem.',
          'Solicitar documento oficial com foto e registrar placa/modelo do veículo sem abrir a eclusa.',
          'Realizar contato ativo via interfone ou canal homologado com o responsável pela unidade.',
          'Caso não haja confirmação em até 5 minutos, orientar o aguardamento na área externa e registrar ocorrência no livro digital.'
        ],
        mediationTemplate:
          'Olá! Para sua segurança e de todos no local, nosso protocolo exige confirmação direta com o responsável antes da liberação do acesso. Já acionei a unidade e, assim que recebermos o aval, liberarei sua entrada imediatamente.'
      },
      {
        sectionId: 'SEC-1.2',
        heading: 'Falha de Interfone, Biometria ou Controladora de Acesso',
        content:
          'Na indisponibilidade temporária do sistema biométrico ou interfone IP, aplicar contingência manual com dupla checagem documental e registro fotográfico/textual no log de turno para auditoria.',
        actionSteps: [
          'Verificar status do link local e alimentação PoE da controladora de acesso.',
          'Acionar contingência manual exigindo documento com foto para todos os não residentes.',
          'Abrir chamado técnico para equipe de infraestrutura informando o código da controladora.'
        ],
        mediationTemplate:
          'Estamos realizando uma validação adicional de segurança no sistema de controle de acesso. Por gentileza, informe seu documento e o destino para concluirmos sua liberação com agilidade.'
      }
    ]
  },
  {
    id: 'pop-noc-04',
    code: 'POP-NOC-04',
    title: 'Contingência de Queda de Link WAN, Switch & Isolamento OSI',
    category: 'Redes & Infra',
    version: 'v2.8 · NOC & Conectividade',
    slaTarget: 'Contenção em até 15 min',
    sections: [
      {
        sectionId: 'NOC-4.1',
        heading: 'Indisponibilidade de Link Principal (WAN Down / Perda de Pacotes 100%)',
        content:
          'Ao detectar queda de interface WAN no roteador de borda ou perda total de pacotes ICMP/SNMP, validar inicialmente a camada física (transceiver SFP, LEDs de link e energia) antes de acionar a operadora de telecomunicações com protocolo.',
        actionSteps: [
          'Executar diagnóstico em camadas: testar gateway local (Camada 3) e verificar status físico da porta WAN (Camada 1/2).',
          'Confirmar ativação automática do link de backup (Failover 4G/5G ou Link Secundário).',
          'Coletar logs de interface (show interfaces / syslog) e abrir chamado na operadora com número de circuito.',
          'Comunicar stakeholders internos sobre operação em modo contingência.'
        ],
        mediationTemplate:
          'Identificamos uma instabilidade no link principal de internet e já ativamos nossa rota de contingência para manter os serviços críticos operando. A equipe técnica está atuando junto à operadora com previsão de normalização monitorada.'
      }
    ]
  },
  {
    id: 'pop-lgpd-07',
    code: 'POP-LGPD-07',
    title: 'Resposta a Incidentes de Segurança, Phishing & Exposição de Dados (LGPD)',
    category: 'SecOps & LGPD',
    version: 'v4.0 · Governança & Privacidade',
    slaTarget: 'Contenção Crítica (< 10 min)',
    sections: [
      {
        sectionId: 'SEC-7.1',
        heading: 'Suspeita de Credencial Comprometida, Phishing ou Vazamento de Dados',
        content:
          'Qualquer suspeita de clique em link malicioso, acesso anômalo fora de horário ou compartilhamento indevido de dados pessoais (CPF, placas, registros de acesso) exige revogação imediata de sessões ativas e preservação de evidências.',
        actionSteps: [
          'Isolar o endpoint afetado da rede corporativa sem desligar a máquina (preservar memória volátil).',
          'Revogar tokens ativos, forçar redefinição de senha e validar autenticação multifator (MFA).',
          'Registrar linha do tempo do incidente para avaliação de impacto conforme diretrizes da LGPD.',
          'Nunca compartilhar dados cadastrais de terceiros por telefone ou mensagens sem autenticação.'
        ],
        mediationTemplate:
          'Por medida preventiva de segurança da informação e conformidade com a LGPD, bloqueamos temporariamente a sessão para validação de identidade. Nossa equipe de segurança já iniciou a análise e orientará os próximos passos.'
      }
    ]
  },
  {
    id: 'pop-cx-12',
    code: 'POP-CX-12',
    title: 'Mediação de Crises de Atendimento, Atraso Crítico & Estorno SLA',
    category: 'Atendimento & CX',
    version: 'v2.1 · Excelência Operacional',
    slaTarget: 'Resolução Prioritária (< 8 min)',
    sections: [
      {
        sectionId: 'CX-12.1',
        heading: 'Cliente Insatisfeito por Atraso Severo, Divergência ou Falha na Entrega',
        content:
          'Em atendimentos de alta tensão emocional, aplicar escuta ativa sem confrontar o cliente, validar objetivamente o protocolo/pedido e oferecer solução imediata dentro da alçada operacional (reenvio prioritário, cupom compensatório ou estorno integral).',
        actionSteps: [
          'Reconhecer o transtorno imediatamente com empatia objetiva, evitando justificativas defensivas.',
          'Validar número do pedido, horário de ocorrência e status logístico em tela única.',
          'Aplicar a compensação autorizada pelo nível de atraso ou processar estorno imediato se solicitado.',
          'Registrar tag de causa raiz para retroalimentar a operação.'
        ],
        mediationTemplate:
          'Peço desculpas pelo transtorno causado com o atraso no seu pedido. Já localizei seu protocolo e estou priorizando a resolução imediata para você — posso seguir com o reenvio expresso agora ou com o estorno integral, como preferir.'
      }
    ]
  }
];

export const CRISIS_PRESETS = [
  {
    label: 'Portaria · Prestador sem agendamento',
    query: 'Prestador de serviço chegou na portaria com veículo mas não tem agendamento e o morador não atende. Como proceder?'
  },
  {
    label: 'Redes · Queda de link WAN no roteador',
    query: 'O roteador de borda apresentou queda de interface WAN com 100% de perda de pacotes. Qual o protocolo NOC?'
  },
  {
    label: 'SecOps · Suspeita de phishing e senha',
    query: 'Um colaborador clicou em link suspeito de phishing e informou a senha corporativa. O que fazer segundo a LGPD?'
  },
  {
    label: 'CX · Cliente exaltado por atraso de pedido',
    query: 'Cliente muito irritado reclamando de atraso severo na entrega e pedindo solução ou estorno imediato.'
  },
  {
    label: 'Teste Anti-Alucinação (Fora da Base)',
    query: 'Qual é a receita de bolo de cenoura ou a cotação do dólar hoje?'
  }
];

const STOP_WORDS = new Set([
  'a', 'o', 'as', 'os', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
  'um', 'uma', 'uns', 'umas', 'para', 'por', 'com', 'sem', 'sob', 'sobre', 'e', 'ou',
  'que', 'qual', 'quais', 'como', 'quando', 'onde', 'se', 'mas', 'mais', 'muito', 'ja',
  'foi', 'sao', 'esta', 'estao', 'ter', 'fazer', 'proceder', 'hoje', 'isso', 'esse', 'esta'
]);

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ');
}

function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(/\s+/)
    .filter(token => token.length > 2 && !STOP_WORDS.has(token));
}

export function queryRagCopilot(query: string, corpus: SopDocument[]): RagCopilotResponse {
  const start = performance.now();
  const queryTokens = Array.from(new Set(tokenize(query)));
  const scoredChunks: RetrievedChunk[] = [];

  for (const doc of corpus) {
    for (const sec of doc.sections) {
      const corpusText = `${doc.title} ${doc.category} ${sec.heading} ${sec.content} ${sec.actionSteps.join(' ')}`;
      const normalizedCorpus = normalizeText(corpusText);
      const corpusTokens = new Set(tokenize(corpusText));

      const matchedTerms: string[] = [];
      let weightedHits = 0;

      for (const qToken of queryTokens) {
        if (corpusTokens.has(qToken)) {
          matchedTerms.push(qToken);
          const inTitle = normalizeText(`${doc.title} ${sec.heading}`).includes(qToken);
          weightedHits += inTitle ? 1.6 : 1.0;
        } else if (qToken.length >= 5 && normalizedCorpus.includes(qToken.slice(0, -1))) {
          matchedTerms.push(qToken);
          weightedHits += 0.75;
        }
      }

      if (matchedTerms.length > 0 && queryTokens.length > 0) {
        const rawRatio = weightedHits / Math.max(queryTokens.length * 0.85, 1);
        const relevanceScore = Math.min(0.99, Number(rawRatio.toFixed(2)));

        scoredChunks.push({
          docCode: doc.code,
          docTitle: doc.title,
          category: doc.category,
          sectionId: sec.sectionId,
          heading: sec.heading,
          content: sec.content,
          actionSteps: sec.actionSteps,
          mediationTemplate: sec.mediationTemplate,
          relevanceScore,
          matchedTerms
        });
      }
    }
  }

  scoredChunks.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const topChunks = scoredChunks.slice(0, 3);
  const best = topChunks[0];
  const isGrounded = Boolean(best && best.relevanceScore >= 0.25);

  const latencyMs = Math.max(8, Math.round(performance.now() - start));
  const queryId = `RAG-${Math.floor(100000 + Math.random() * 900000)}`;

  if (!isGrounded || !best) {
    return {
      queryId,
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      query,
      grounded: false,
      confidencePct: best ? Math.round(best.relevanceScore * 100) : 0,
      latencyMs,
      primaryCitation: 'Nenhuma fonte homologada encontrada',
      slaTarget: 'N/A',
      executiveGuidance:
        'BLOQUEIO DE ALUCINAÇÃO (Strict Grounding): A consulta informada não possui respaldo nos Procedimentos Operacionais Padrão (POPs) indexados na base de conhecimento atual. Por conformidade operacional, o copiloto não gera instruções fora da documentação homologada.',
      actionChecklist: [
        'Reformule a consulta utilizando termos operacionais (ex.: acesso, portaria, link WAN, phishing, LGPD, atraso).',
        'Ou cadastre um novo POP na aba "Indexar Novo POP" para expandir a base RAG.'
      ],
      mediationScript:
        'No momento não há procedimento padronizado cadastrado para esta solicitação específica. Acione a supervisão operacional para validação formal antes de prosseguir.',
      retrievedChunks: topChunks
    };
  }

  const matchedDoc = corpus.find(d => d.code === best.docCode);

  return {
    queryId,
    timestamp: new Date().toLocaleTimeString('pt-BR'),
    query,
    grounded: true,
    confidencePct: Math.min(99, Math.max(68, Math.round(best.relevanceScore * 100))),
    latencyMs,
    primaryCitation: `${best.docCode} · Seção ${best.sectionId} (${best.heading})`,
    slaTarget: matchedDoc?.slaTarget || 'Imediato',
    executiveGuidance: `${best.content} [Fonte: ${best.docCode} / ${best.sectionId}]`,
    actionChecklist: best.actionSteps,
    mediationScript: best.mediationTemplate,
    retrievedChunks: topChunks
  };
}
