import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ShieldAlert, 
  ArrowLeft, 
  ArrowRight,
  RotateCcw,
  Target,
  DollarSign,
  Activity,
  Check
} from 'lucide-react';

export default function FeasibilitySwot() {
  const location = useLocation();
  const navigate = useNavigate();
  const businessCtx = useBusiness();

  const liveData = location.state || {};

  // Sub-metrics for viability breakdown
  const demandScore = 95;
  const competitionScore = 52;
  const capitalScore = 92;
  const riskResilienceScore = 61;
  const dscrScore = 94;

  // Calculate weighted composite score
  const calculatedScore = Math.round(
    (demandScore * 0.25) + 
    (competitionScore * 0.15) + 
    (capitalScore * 0.20) + 
    (riskResilienceScore * 0.15) + 
    (dscrScore * 0.25)
  );

  const score = Math.round(
    liveData?.feasibility?.feasibility_score ?? businessCtx.feasibility?.feasibility_score ?? calculatedScore
  );
  const risk = liveData?.feasibility?.risk_level ?? businessCtx.feasibility?.risk_level ?? 'LOW';
  const businessType = liveData?.businessDetails?.businessType || businessCtx.businessType || 'Food & Restaurant';

  // Automatically update BusinessContext with the calculated score if missing or out of sync
  useEffect(() => {
    if (businessCtx?.updateBusinessData && businessCtx.feasibility?.feasibility_score !== score) {
      businessCtx.updateBusinessData({
        feasibility: {
          ...businessCtx.feasibility,
          feasibility_score: score,
          risk_level: risk
        }
      });
    }
  }, [score, risk, businessCtx]);

  // SVG Radial Gauge Calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Navigation */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate('/market-potential', { state: liveData })}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-100 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Phase 2
          </button>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold text-xs rounded-full uppercase tracking-wider">
            Phase 3: Decision Engine
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Feasibility Evaluation & SWOT Matrix
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Automated multi-factor viability assessment and strategic matrix for <span className="font-semibold text-slate-800">{businessType}</span>.
          </p>
        </div>

        {/* Integrated Viability Assessment Card */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider rounded-md">
                INTEGRATED VIABILITY ASSESSMENT
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Viability & Feasibility Score</h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/onboarding')}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-300 text-amber-800 font-bold text-xs rounded-xl hover:bg-amber-100 transition shadow-sm self-start md:self-auto"
            >
              <RotateCcw className="w-4 h-4 text-amber-600" /> MODIFY (Improve & Re-plan)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Circular Gauge Score Dial */}
            <div className="md:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="text-slate-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="text-emerald-500 transition-all duration-1000 ease-out"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-900">{score}</span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">OUT OF 100</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-4">
                AI Feasibility Index for Micro-Enterprise
              </p>
            </div>

            {/* Sub-Factor Viability Breakdown Bars */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Factor 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> Demand Potential (मांग क्षमता)
                  </span>
                  <span>{demandScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${demandScore}%` }}></div>
                </div>
              </div>

              {/* Factor 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-blue-600" /> Competition Buffer & Market Room (प्रतिस्पर्धा स्तर)
                  </span>
                  <span>{competitionScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${competitionScore}%` }}></div>
                </div>
              </div>

              {/* Factor 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-purple-600" /> Investment Scale & Capital Adequacy (पूंजी उपयुक्तता)
                  </span>
                  <span>{capitalScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: `${capitalScore}%` }}></div>
                </div>
              </div>

              {/* Factor 4 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-500" /> Risk Manageability & Shock Resilience (जोखिम नियंत्रण)
                  </span>
                  <span>{riskResilienceScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${riskResilienceScore}%` }}></div>
                </div>
              </div>

              {/* Factor 5 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-teal-600" /> Financial Viability & DSCR (वित्तीय ऋण भुगतान क्षमता)
                  </span>
                  <span>{dscrScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full" style={{ width: `${dscrScore}%` }}></div>
                </div>
              </div>

            </div>
          </div>

          {/* AI Advisory Rationale & Key Drivers Block */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">AI Advisory Rationale:</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                The venture exhibits high market viability with strong consumer demand in the catchment area. Tactical adjustments recommended: strengthen service differentiation, lock in raw inventory terms early, and maintain a 3-month working capital reserve.
              </p>
            </div>

            <div className="space-y-2 border-t border-slate-200 pt-3">
              <h4 className="text-sm font-bold text-slate-900">Key Success Drivers:</h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Strict adherence to 10% promoter equity margin discipline with zero high-interest informal loans.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Active utilization of the initial 6-month loan moratorium to build repeat clientele before principal repayments begin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Direct linkage to institutional suppliers and local B2B channel buyers.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* 4-Quadrant SWOT Matrix */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Strategic SWOT Matrix</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center gap-2 mb-3 text-emerald-800 font-extrabold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Strengths</span>
              </div>
              <ul className="space-y-2 text-xs text-emerald-950 font-medium">
                <li>• Strong local consumer demand index in target catchment.</li>
                <li>• Low entry margin threshold covered under MoSJE equity guidelines.</li>
                <li>• High operational scalability for local distribution.</li>
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-center gap-2 mb-3 text-amber-800 font-extrabold text-base">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Weaknesses</span>
              </div>
              <ul className="space-y-2 text-xs text-amber-950 font-medium">
                <li>• Initial dependency on stable supply chain logistics.</li>
                <li>• Working capital sensitivity during early operating cycles.</li>
              </ul>
            </div>

            {/* Opportunities */}
            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200">
              <div className="flex items-center gap-2 mb-3 text-blue-800 font-extrabold text-base">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Opportunities</span>
              </div>
              <ul className="space-y-2 text-xs text-blue-950 font-medium">
                <li>• Direct linkage to government MSME interest subvention grants.</li>
                <li>• Market expansion into surrounding Tier-2 / rural hubs.</li>
              </ul>
            </div>

            {/* Threats */}
            <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200">
              <div className="flex items-center gap-2 mb-3 text-rose-800 font-extrabold text-base">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <span>Threats</span>
              </div>
              <ul className="space-y-2 text-xs text-rose-950 font-medium">
                <li>• Local price sensitivity from unorganized regional competitors.</li>
                <li>• Seasonal demand fluctuations.</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Forward Navigation */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/finance', { state: liveData })}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Proceed to Phase 4: Cost & Loan Planning <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}