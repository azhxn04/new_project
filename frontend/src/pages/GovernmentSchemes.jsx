import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContext';
import { 
  Landmark, 
  CheckCircle2, 
  IndianRupee, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  FileText,
  ExternalLink,
  Search,
  TrendingUp,
  Layers,
  Check
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function GovernmentSchemes() {
  const location = useLocation();
  const navigate = useNavigate();
  const businessCtx = useBusiness();

  const liveData = location.state || {};

  const totalCost = liveData?.finance?.totalProjectCost ?? 1000000;
  const loanAmount = liveData?.finance?.loanAmount ?? 900000;
  const schemeCode = liveData?.finance?.schemeCode ?? 'TERM_LOAN';
  const businessType = liveData?.businessDetails?.businessType || businessCtx.businessType || 'Dairy Farming';

  const [searchTerm, setSearchTerm] = useState('');

  // 12-Month Operational Cash Flow Data for Recharts Chart
  const cashFlowData = [
    { month: 'M1', revenue: 90000, opex: 92000, loan: 18000, cashReserve: 240000 },
    { month: 'M2', revenue: 90000, opex: 92000, loan: 18000, cashReserve: 230000 },
    { month: 'M3', revenue: 145000, opex: 130000, loan: 18000, cashReserve: 240000 },
    { month: 'M4', revenue: 145000, opex: 130000, loan: 18000, cashReserve: 250000 },
    { month: 'M5', revenue: 190000, opex: 160000, loan: 44729, cashReserve: 275000 },
    { month: 'M6', revenue: 190000, opex: 160000, loan: 44729, cashReserve: 300000 },
    { month: 'M7', revenue: 190000, opex: 160000, loan: 44729, cashReserve: 318000 },
    { month: 'M8', revenue: 190000, opex: 160000, loan: 44729, cashReserve: 335000 },
    { month: 'M9', revenue: 190000, opex: 160000, loan: 44729, cashReserve: 350000 },
    { month: 'M10', revenue: 190000, opex: 160000, loan: 44729, cashReserve: 370000 },
    { month: 'M11', revenue: 190000, opex: 160000, loan: 44729, cashReserve: 388000 },
    { month: 'M12', revenue: 190000, opex: 160000, loan: 44729, cashReserve: 405000 },
  ];

  const SCHEMES_LIST = [
    {
      id: 'mosje_term',
      authority: 'MINISTRY OF SOCIAL JUSTICE & EMPOWERMENT (MoSJE)',
      title: 'MoSJE General Term Loan Scheme',
      match: '99% Match',
      desc: 'Subsidized institutional funding for projects between ₹1.40 Lakh and ₹50.00 Lakh with 6 months moratorium.',
      interest: '8% p.a.',
      maxLoan: '₹45.00 Lakh',
      subsidy: 'Concessional',
      points: [
        '90% loan funded by Apex Corporation (NSFDC / NBCFDC / NSKFDC) & SCA at 8.0% interest p.a.',
        'Beneficiary contributes only 10% margin capital.',
        'Generous 6-month moratorium period while business establishes production and cash flow.'
      ]
    },
    {
      id: 'pmegp',
      authority: 'MINISTRY OF MICRO, SMALL AND MEDIUM ENTERPRISES (MSME)',
      title: "PMEGP (Prime Minister's Employment Generation Programme)",
      match: '99% Match',
      desc: 'Massive 25% to 35% government capital subsidy for rural manufacturing and service units.',
      interest: '8.5% p.a.',
      maxLoan: '₹45.00 Lakh',
      subsidy: '35%',
      points: [
        'Up to 35% non-refundable government subsidy on project cost in rural areas for special categories.',
        'Project cost up to ₹50 Lakh for manufacturing and ₹20 Lakh for services.',
        'Beneficiary contribution only 5% for SC/ST/OBC/Women in rural areas.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Navigation */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate('/finance', { state: liveData })}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-100 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Phase 4
          </button>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold text-xs rounded-full uppercase tracking-wider">
            Phase 5: Subsidy Engine
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Government Schemes & Subsidies
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Automated eligibility matching with MoSJE, MSME, and National Startup funding bodies for <span className="font-semibold text-slate-800">{businessType}</span>.
          </p>
        </div>

        {/* 12-Month Operational Cash Flow & Break-Even Chart */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase rounded tracking-wider">
                WORKING CAPITAL & CASH FLOW PLANNER
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">12-Month Operational Cash Flow & Break-Even</h2>
              <p className="text-xs text-slate-500 mt-0.5">Demonstrating operational liquidity and the financial buffer provided by the 6-month moratorium.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Break-Even Sales</p>
                <p className="text-base font-black text-slate-900">₹1,42,386/mo</p>
              </div>

              <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <p className="text-[10px] font-bold text-emerald-700 uppercase">Debt Service Ratio (DSCR)</p>
                <p className="text-base font-black text-emerald-700">2.51x (Healthy)</p>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={cashFlowData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="projectedRevenue" name="Projected Revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="opex" name="Operating Costs" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="loan" name="Loan Installment" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={12} />
                <Line type="monotone" dataKey="cashReserve" name="Cash Reserve" stroke="#0284c7" strokeWidth={2} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scheme Search & Filter Banner */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Eligible MoSJE & Startup Schemes Evaluation</h3>
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search schemes or subsidies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Schemes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCHEMES_LIST.map((scheme) => (
            <div key={scheme.id} className="bg-white p-6 rounded-2xl border border-emerald-500 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{scheme.authority}</span>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] rounded-full">
                    {scheme.match}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg mt-1">{scheme.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{scheme.desc}</p>

                {/* Sub-Metrics Cards */}
                <div className="grid grid-cols-3 gap-2 my-4 text-center">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Interest</p>
                    <p className="text-xs font-black text-slate-900 mt-0.5">{scheme.interest}</p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Max Loan</p>
                    <p className="text-xs font-black text-slate-900 mt-0.5">{scheme.maxLoan}</p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Subsidy</p>
                    <p className="text-xs font-black text-amber-600 mt-0.5">{scheme.subsidy}</p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-600">
                  {scheme.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <button type="button" className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Required Documents Checklist
                </button>

                <button type="button" className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-slate-800 transition">
                  SCA Portal <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Hyper-Local Rural Strategy Sections */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" /> Primary Rural Distribution Channels
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 font-medium">Village cooperative milk collection center (Amul / Saras / Sudha / Mother Dairy)</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 font-medium">Direct supply to local sweet makers (Halwais) and tea stalls</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 font-medium">Doorstep delivery to 60+ village households and teachers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <h4 className="text-sm font-extrabold text-emerald-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> Underserved Local Opportunities & Niches
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                  <span>Fresh Desi A2 Ghee & Paneer preparation for weekly Haats (3x profit margin over raw milk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                  <span>Doorstep morning delivery of fresh cow milk to nearby town outskirts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                  <span>Bulk supply contract for weddings and temple festivals</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
              <h4 className="text-sm font-extrabold text-blue-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" /> Value-Addition & Margin Drivers
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                  <span>Grade-A packaging & local trust branding tailored for local block</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                  <span>Evening home delivery or delivery to agricultural laborers post 6:00 PM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                  <span>Bundle offers during local festive wedding seasons</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Forward Navigation */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/advisor', { state: liveData })}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Proceed to Phase 6: AI Business Advisor <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}