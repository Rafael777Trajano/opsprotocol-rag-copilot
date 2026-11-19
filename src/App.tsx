import { useState } from 'react';
import {
  BookOpenCheck,
  Search,
  ShieldCheck,
  FileText,
  PlusCircle,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Sparkles,
  Layers,
  MessageSquareQuote,
  Cpu
} from 'lucide-react';
import {
  INITIAL_SOPS,
  CRISIS_PRESETS,
  queryRagCopilot,
  type SopDocument,
  type RagCopilotResponse
} from './services/ragEngine';

export function App() {
  const [corpus, setCorpus] = useState<SopDocument[]>(INITIAL_SOPS);
  const [query, setQuery] = useState<string>(CRISIS_PRESETS[0].query);
  const [result, setResult] = useState<RagCopilotResponse>(() =>
    queryRagCopilot(CRISIS_PRESETS[0].query, INITIAL_SOPS)
  );
  const [activeTab, setActiveTab] = useState<'copilot' | 'knowledge' | 'add'>('copilot');
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const [newCode, setNewCode] = useState('POP-OPS-99');
  const [newTitle, setNewTitle] = useState('');
  const [newSla, setNewSla] = useState('Resposta em até 10 min');
  const [newRule, setNewRule] = useState('');
  const [newSteps, setNewSteps] = useState('');
  const [newScript, setNewScript] = useState('');
  const [indexedBanner, setIndexedBanner] = useState(false);

  const handleRunSearch = (customQuery?: string) => {
    const q = (customQuery ?? query).trim();
    if (!q) return;
    if (customQuery) setQuery(customQuery);
    const response = queryRagCopilot(q, corpus);
    setResult(response);
    setActiveTab('copilot');
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(result.mediationScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleDownloadReport = () => {
    const md = [
      `# Parecer Operacional & Mediação — OpsProtocol RAG Copilot`,
      `- **ID da Consulta:** ${result.queryId}`,
      `- **Horário:** ${result.timestamp}`,
      `- **Status de Grounding:** ${result.grounded ? 'VALIDADO NA BASE POP' : 'BLOQUEADO (SEM LASTRO DOCUMENTAL)'}`,
      `- **Fonte Primária:** ${result.primaryCitation}`,
      `- **SLA Alvo:** ${result.slaTarget}`,
      ``,
      `## Consulta Operacional`,
      `> ${result.query}`,
      ``,
      `## Diretriz de Conformidade`,
      `${result.executiveGuidance}`,
      ``,
      `## Checklist de Contenção Imediata`,
      ...result.actionChecklist.map((step, i) => `${i + 1}. ${step}`),
      ``,
      `## Script Recomendado de Mediação`,
      `> "${result.mediationScript}"`
    ].join('\n');

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.queryId.toLowerCase()}-protocolo.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleIndexNewPop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newRule.trim()) return;

    const parsedSteps = newSteps
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const created: SopDocument = {
      id: `custom-${Date.now()}`,
      code: newCode.trim() || 'POP-CUSTOM',
      title: newTitle.trim(),
      category: 'Custom POP',
      version: 'v1.0 · Indexado em Tempo Real',
      slaTarget: newSla.trim() || 'Imediato',
      sections: [
        {
          sectionId: `${newCode.trim() || 'SEC'}-1.1`,
          heading: newTitle.trim(),
          content: newRule.trim(),
          actionSteps:
            parsedSteps.length > 0
              ? parsedSteps
              : ['Seguir integralmente a diretriz homologada neste procedimento.', 'Registrar evidência no log operacional.'],
          mediationTemplate:
            newScript.trim() ||
            'Estamos aplicando o procedimento operacional padrão para garantir segurança e agilidade no seu atendimento.'
        }
      ]
    };

    const updatedCorpus = [created, ...corpus];
    setCorpus(updatedCorpus);
    setNewTitle('');
    setNewRule('');
    setNewSteps('');
    setNewScript('');
    setIndexedBanner(true);
    setTimeout(() => setIndexedBanner(false), 3500);
  };

  const totalChunks = corpus.reduce((acc, doc) => acc + doc.sections.length, 0);

  return (
    <div className="min-h-screen bg-[#060913] text-slate-200">
      <header className="border-b border-slate-800/80 bg-[#0a0f1d]/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-100 tracking-tight text-base sm:text-lg">
                  OpsProtocol <span className="text-cyan-400">RAG Copilot</span>
                </h1>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Strict Grounding · POPs & Crises
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Consulta Semântica a Procedimentos Operacionais Padrão, Conformidade & Mediação em Tempo Real
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            AI Builder: <strong className="text-slate-200">Rafael Trajano</strong>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <section className="flex flex-wrap items-center justify-between gap-4 bg-[#0b1120] border border-slate-800/90 rounded-2xl p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('copilot')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'copilot'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-[#060913] text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Copiloto de Crise (RAG)
            </button>
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'knowledge'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-[#060913] text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Base Documental ({corpus.length} POPs · {totalChunks} Chunks)
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'add'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-[#060913] text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Indexar Novo POP
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              Guardrail Anti-Alucinação Ativo
            </span>
          </div>
        </section>

        {activeTab === 'copilot' && (
          <div className="space-y-6">
            <section className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-5 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Descreva a ocorrência operacional, dúvida de conformidade ou crise em andamento
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleRunSearch()}
                    placeholder="Ex.: Prestador sem agendamento na portaria ou queda de link WAN..."
                    className="flex-1 bg-[#060913] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/60"
                  />
                  <button
                    onClick={() => handleRunSearch()}
                    className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shrink-0"
                  >
                    <Search className="w-4 h-4" />
                    Consultar POPs
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-slate-500">Cenários rápidos:</span>
                {CRISIS_PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => handleRunSearch(preset.query)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#060913] hover:bg-slate-900 border border-slate-800 text-slate-300 transition cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div
                  className={`rounded-2xl p-5 border space-y-4 ${
                    result.grounded
                      ? 'bg-[#0b1120] border-slate-800/90'
                      : 'bg-amber-950/20 border-amber-500/40'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      {result.grounded ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                      )}
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
                          {result.grounded
                            ? 'Diretriz Homologada & Verificada'
                            : 'Bloqueio Preventivo (Sem Lastro na Base)'}
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400">
                          {result.primaryCitation}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#060913] border border-slate-800 text-slate-300">
                        SLA: {result.slaTarget}
                      </span>
                      <button
                        onClick={handleDownloadReport}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-cyan-400" />
                        Parecer .MD
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed bg-[#060913] p-4 rounded-xl border border-slate-800/80">
                    {result.executiveGuidance}
                  </p>

                  <div className="space-y-2.5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Checklist de Ação Imediata (Passo a Passo)
                    </h3>
                    <div className="space-y-2">
                      {result.actionChecklist.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-[#060913] border border-slate-800/80 text-xs text-slate-200"
                        >
                          <span className="w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <MessageSquareQuote className="w-4 h-4 text-emerald-400" />
                      Script de Mediação & Comunicação (Pronto para Uso)
                    </h3>
                    <button
                      onClick={handleCopyScript}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 cursor-pointer"
                    >
                      {copiedScript ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copiar Script
                        </>
                      )}
                    </button>
                  </div>

                  <blockquote className="p-4 rounded-xl bg-[#060913] border-l-4 border-emerald-500 text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                    "{result.mediationScript}"
                  </blockquote>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#0b1120] border border-slate-800/90 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <h2 className="text-sm font-semibold text-slate-100">
                      Auditoria de Retrieval (Chunks Recuperados)
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {result.latencyMs}ms · Confiança {result.confidencePct}%
                  </span>
                </div>

                {result.retrievedChunks.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">
                    Nenhum trecho documental atingiu o limiar mínimo de similaridade semântica.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {result.retrievedChunks.map((chunk, index) => (
                      <div
                        key={`${chunk.sectionId}-${index}`}
                        className="p-3.5 rounded-xl bg-[#060913] border border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono font-bold text-cyan-400">
                            {chunk.docCode} · {chunk.sectionId}
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                            Score: {Math.round(chunk.relevanceScore * 100)}%
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-200">{chunk.heading}</div>
                        <p className="text-xs text-slate-400 leading-relaxed">{chunk.content}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {chunk.matchedTerms.map(term => (
                            <span
                              key={term}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-emerald-400 border border-slate-800"
                            >
                              #{term}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {corpus.map(doc => (
              <div
                key={doc.id}
                className="bg-[#0b1120] border border-slate-800/90 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {doc.code}
                  </span>
                  <span className="text-[11px] text-slate-400">{doc.category}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-100">{doc.title}</h3>
                <div className="text-[11px] font-mono text-slate-500">
                  {doc.version} • SLA: {doc.slaTarget}
                </div>
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  {doc.sections.map(sec => (
                    <div key={sec.sectionId} className="p-3 rounded-xl bg-[#060913] border border-slate-800/80">
                      <div className="text-xs font-semibold text-cyan-300 mb-1">
                        [{sec.sectionId}] {sec.heading}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{sec.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {activeTab === 'add' && (
          <section className="max-w-3xl mx-auto bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Indexar Novo Procedimento Operacional (POP) no Vetor RAG
              </h2>
              <p className="text-xs text-slate-400">
                Adicione regras internas da empresa para que o copiloto passe a responder imediatamente com base nelas.
              </p>
            </div>

            {indexedBanner && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-xs text-emerald-300 font-medium">
                POP indexado com sucesso! Volte à aba "Copiloto de Crise (RAG)" e faça uma pergunta sobre o novo procedimento.
              </div>
            )}

            <form onSubmit={handleIndexNewPop} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Código do POP</label>
                  <input
                    type="text"
                    value={newCode}
                    onChange={e => setNewCode(e.target.value)}
                    className="w-full bg-[#060913] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400 block mb-1">Título do Procedimento</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Ex.: Protocolo de Queda de Energia e Gerador"
                    className="w-full bg-[#060913] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">SLA Alvo</label>
                <input
                  type="text"
                  value={newSla}
                  onChange={e => setNewSla(e.target.value)}
                  className="w-full bg-[#060913] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Regra & Diretriz Oficial</label>
                <textarea
                  rows={3}
                  value={newRule}
                  onChange={e => setNewRule(e.target.value)}
                  placeholder="Descreva a norma obrigatória que o copiloto deve citar..."
                  className="w-full bg-[#060913] border border-slate-800 rounded-xl p-3 text-xs text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Passos de Ação Imediata (um passo por linha)
                </label>
                <textarea
                  rows={3}
                  value={newSteps}
                  onChange={e => setNewSteps(e.target.value)}
                  placeholder={"Verificar quadro elétrico principal\nAcionar manutenção predial\nRegistrar horário no livro de turno"}
                  className="w-full bg-[#060913] border border-slate-800 rounded-xl p-3 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Script Padrão de Comunicação / Mediação
                </label>
                <input
                  type="text"
                  value={newScript}
                  onChange={e => setNewScript(e.target.value)}
                  placeholder="Mensagem pronta para acalmar e orientar o solicitante..."
                  className="w-full bg-[#060913] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition cursor-pointer"
              >
                Indexar Procedimento na Base RAG
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
