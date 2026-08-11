import React, { useState } from 'react';
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle2,
  Sliders,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Dataset, DataMetric } from '../types';

interface MathScoringExplainerProps {
  dataset: Dataset;
}

export const MathScoringExplainer: React.FC<MathScoringExplainerProps> = ({ dataset }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  // Calculate live multi-attribute utility matrix
  const totalWeight = dataset.metrics.reduce((acc, m) => acc + (m.weight || 0), 0) || 1;

  // Calculate min, max, and normalized values for each metric
  const metricStats = dataset.metrics.map((m) => {
    const rawValues = dataset.records.map((r) => Number(r.attributes[m.id]) || 0);
    const min = Math.min(...rawValues);
    const max = Math.max(...rawValues);
    const range = max - min || 1; // avoid divide-by-zero

    return {
      metric: m,
      min,
      max,
      range,
      weightRatio: (m.weight || 0) / totalWeight,
    };
  });

  // Calculate scores per record
  const scoredRecords = dataset.records.map((rec) => {
    let compositeScore = 0;
    const metricBreakdowns = metricStats.map((stat) => {
      const curVal = Number(rec.attributes[stat.metric.id]) || 0;
      let norm = 0;

      if (stat.metric.higherIsBetter) {
        norm = (curVal - stat.min) / stat.range;
      } else {
        norm = (stat.max - curVal) / stat.range;
      }

      // Bound between 0 and 1
      norm = Math.max(0, Math.min(1, norm));

      const weightedContribution = norm * stat.weightRatio * 100;
      compositeScore += weightedContribution;

      return {
        metricId: stat.metric.id,
        rawVal: curVal,
        norm,
        weightedContribution,
      };
    });

    return {
      record: rec,
      compositeScore: Math.round(compositeScore * 10) / 10,
      rawScore: compositeScore,
      breakdowns: metricBreakdowns,
    };
  });

  // Sort by composite score
  const sortedScoredRecords = [...scoredRecords].sort((a, b) => b.rawScore - a.rawScore);
  const winner = sortedScoredRecords[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-900/80 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white">
                Mathematical Formula & Multi-Attribute Scoring Matrix
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                100% Transparent Math
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live step-by-step min-max normalization, weight distribution, and composite utility score computation.
            </p>
          </div>
        </div>

        <button className="text-slate-400 hover:text-white p-1">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="p-6 space-y-6">
          {/* Formula Card & Explanation */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-200">
                <Info className="h-4 w-4 text-cyan-400" />
                <span>MULTIPLE-ATTRIBUTE DECISION ANALYSIS (MADA) FORMULA</span>
              </div>
              <button
                onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono underline flex items-center gap-1"
              >
                <span>{showFormulaDetails ? 'Hide Notation Details' : 'Show Mathematical Notation'}</span>
              </button>
            </div>

            {/* Formula Equations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 uppercase text-[10px]">1. Normalization (N_ij)</span>
                  <span className="text-emerald-400 text-[10px]">Bounded [0.0, 1.0]</span>
                </div>
                <div className="space-y-1 text-slate-200 text-xs">
                  <p>
                    <strong className="text-emerald-400">Higher Is Better:</strong>{' '}
                    <code className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-cyan-300">
                      N = (x - Min) / (Max - Min)
                    </code>
                  </p>
                  <p>
                    <strong className="text-rose-400">Lower Is Better:</strong>{' '}
                    <code className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-rose-300">
                      N = (Max - x) / (Max - Min)
                    </code>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 uppercase text-[10px]">2. Weighted Utility Score ($S_i$)</span>
                  <span className="text-cyan-400 text-[10px]">Max Score = 100</span>
                </div>
                <div className="text-slate-200 text-xs leading-relaxed">
                  <p className="bg-slate-950 p-2 rounded border border-slate-800 text-cyan-300">
                    Utility Score = ∑ ( Normalization_j × WeightRatio_j ) × 100
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Where WeightRatio_j = Weight_j / Sum(Weights)
                  </p>
                </div>
              </div>
            </div>

            {showFormulaDetails && (
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-slate-300 space-y-2 font-sans animate-fade-in">
                <h4 className="font-bold text-white flex items-center gap-1.5 font-mono text-xs">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  Why Min-Max Normalization?
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Metrics often come in different units (e.g. Unit Cost in USD vs ESG Score in points vs Delivery Reliability in %). Min-Max normalization converts disparate scales into an objective 0.0 to 1.0 index so that weights can be applied uniformly without unit bias.
                </p>
              </div>
            )}
          </div>

          {/* Live Weight Distribution Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-cyan-400" />
                Active Metric Weight Distribution
              </span>
              <span className={`font-bold ${totalWeight === 1 ? 'text-emerald-400' : 'text-amber-400'}`}>
                Sum of Weights: {(totalWeight * 100).toFixed(0)}%{' '}
                {totalWeight !== 1 && '(Auto-Normalized to 100%)'}
              </span>
            </div>

            <div className="h-3.5 w-full bg-slate-950 rounded-lg overflow-hidden flex border border-slate-800">
              {metricStats.map((stat, idx) => {
                const colors = [
                  'bg-cyan-500',
                  'bg-indigo-500',
                  'bg-emerald-500',
                  'bg-amber-500',
                  'bg-rose-500',
                  'bg-purple-500',
                  'bg-blue-500',
                ];
                const bg = colors[idx % colors.length];
                const pct = (stat.weightRatio * 100).toFixed(1);

                return (
                  <div
                    key={stat.metric.id}
                    style={{ width: `${stat.weightRatio * 100}%` }}
                    className={`${bg} h-full transition-all duration-300 relative group cursor-pointer`}
                    title={`${stat.metric.name}: ${pct}%`}
                  />
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 pt-1 text-[11px] font-mono">
              {metricStats.map((stat, idx) => {
                const colors = [
                  'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
                  'text-indigo-400 border-indigo-500/30 bg-indigo-950/40',
                  'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
                  'text-amber-400 border-amber-500/30 bg-amber-950/40',
                  'text-rose-400 border-rose-500/30 bg-rose-950/40',
                  'text-purple-400 border-purple-500/30 bg-purple-950/40',
                ];
                const cls = colors[idx % colors.length];

                return (
                  <div key={stat.metric.id} className={`px-2.5 py-1 rounded-md border ${cls} flex items-center gap-1.5`}>
                    <span>{stat.metric.name}</span>
                    <span className="font-bold">({(stat.weightRatio * 100).toFixed(0)}%)</span>
                    {stat.metric.higherIsBetter ? (
                      <TrendingUp className="h-3 w-3 text-emerald-400" title="Higher is better" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-rose-400" title="Lower is better" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Step-by-Step Scoring Table Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-cyan-400" />
                Live Step-by-Step Matrix Breakdown
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">
                Mathematical Lead: <strong className="text-emerald-400">{winner?.record.name}</strong> ({winner?.compositeScore}/100)
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-300 text-[10px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Rank & Entity</th>
                    {metricStats.map((st) => (
                      <th key={st.metric.id} className="py-3 px-3 min-w-[140px]">
                        <div>{st.metric.name}</div>
                        <div className="text-[9px] text-slate-400 normal-case">
                          Min: {st.min} | Max: {st.max}
                        </div>
                      </th>
                    ))}
                    <th className="py-3 px-4 text-right">Computed Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/50">
                  {sortedScoredRecords.map((item, rankIdx) => {
                    const isWinner = rankIdx === 0;

                    return (
                      <tr
                        key={item.record.id}
                        className={`transition-colors ${
                          isWinner ? 'bg-indigo-950/40 font-bold border-l-4 border-l-cyan-400' : 'hover:bg-slate-800/30'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`h-5 w-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                                isWinner
                                  ? 'bg-cyan-500 text-slate-950'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              #{rankIdx + 1}
                            </span>
                            <div>
                              <div className="text-white text-xs">{item.record.name}</div>
                              <div className="text-[10px] text-slate-400">{item.record.code}</div>
                            </div>
                          </div>
                        </td>

                        {item.breakdowns.map((bk) => (
                          <td key={bk.metricId} className="py-3.5 px-3">
                            <div className="text-slate-200">{bk.rawVal}</div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <span>N: {bk.norm.toFixed(2)}</span>
                              <span className="text-cyan-400 font-bold">
                                (+{bk.weightedContribution.toFixed(1)})
                              </span>
                            </div>
                          </td>
                        ))}

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex flex-col items-end space-y-1">
                            <span className={`text-sm font-extrabold ${isWinner ? 'text-cyan-300' : 'text-slate-200'}`}>
                              {item.compositeScore} / 100
                            </span>
                            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${item.compositeScore}%` }}
                                className={`h-full ${isWinner ? 'bg-cyan-400' : 'bg-slate-500'}`}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
