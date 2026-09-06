import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContext';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  ArrowLeft, 
  ArrowRight, 
  Target,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Megaphone,
  Compass,
  Sliders
} from 'lucide-react';

export default function MarketPotential() {
  const location = useLocation();
  const navigate = useNavigate();
  const businessCtx = useBusiness();

  // Interactive Market Capture Radius State (Default: 5 km)
  const [captureRadiusKm, setCaptureRadiusKm] = useState(5);

  // Priority: 1. Router location state -> 2. BusinessContext state
  const liveData = location.state || {};

  const businessType = liveData?.businessDetails?.businessType || businessCtx.businessType || 'Food & Restaurant';
  const basePopulation = liveData?.businessDetails?.location?.population || Number(businessCtx.location?.population || 15000);
  const baseCompetitors = liveData?.businessDetails?.location?.competitors || Number(businessCtx.location?.competitors || 3);
  const city = businessCtx.location?.city || 'Your City';
  const state = businessCtx.location?.state || 'Your State';
  const locality = businessCtx.location?.locality || 'Local Catchment Zone';

  // Dynamic Radius Scaling Logic (1 km = base baseline, scales proportionally with coverage area)
  const radiusMultiplier = Math.pow(captureRadiusKm / 5, 1.2);
  const scaledPopulation = Math.round(basePopulation * radiusMultiplier);
  const scaledCompetitors = Math.max(1, Math.round(baseCompetitors * radiusMultiplier));

  // Derived market calculations
  const avgSpend = businessType === 'Food & Restaurant' ? 450 : 350;
  const estimatedMarketCap = scaledPopulation * avgSpend;
  const saturationIndex = scaledCompetitors > 10 ? 'High Saturation' : scaledCompetitors > 4 ? 'Moderate' : 'Low Saturation';
  const targetSharePercent = Math.min(Math.round((1 / (scaledCompetitors + 1)) * 100), 35);
  const monthlyShareValue = Math.round(estimatedMarketCap * (targetSharePercent / 100));

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/dashboard', { state: liveData })}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-100 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold text-xs rounded-full uppercase tracking-wider">
            Phase 2: Market Intelligence
          </span>
        </div>

        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Market Potential & Competitor Analysis
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Regional market demographics and competitor density for <span className="font-semibold text-slate-800">{businessType}</span> in <span className="font-semibold text-slate-800">{locality}, {city}, {state}</span>.
          </p>
        </div>

        {/* Interactive Market Capture Radius Selector Control */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 rounded-2xl shadow-md space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600/30 rounded-xl border border-blue-400/30 text-blue-300">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold">Define Market Capture Radius</h3>
                <p className="text-xs text-slate-300">
                  Adjust target coverage zone (in Kilometers) to dynamically project catchment demographics and revenue.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
              {[2, 5, 8, 12, 15].map((km) => (
                <button
                  key={km}
                  onClick={() => setCaptureRadiusKm(km)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    captureRadiusKm === km 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {km} km
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-blue-400" /> Operating Service Radius:</span>
              <span className="text-blue-400 font-extrabold text-sm">{captureRadiusKm} km Radius Zone</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={captureRadiusKm}
              onChange={(e) => setCaptureRadiusKm(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Population</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">{scaledPopulation.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-2">Population within {captureRadiusKm} km radius</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Direct Competitors</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">{scaledCompetitors} Units</p>
            <p className="text-xs text-slate-500 mt-2">Identified within {captureRadiusKm} km radius</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Market Saturation</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Target className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-black text-emerald-700">{saturationIndex}</p>
            <p className="text-xs text-slate-500 mt-2">Supply-demand ratio ({captureRadiusKm}km coverage)</p>
          </div>
        </div>

        {/* Market Assessment Breakdown */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Estimated Monthly Market Opportunity ({captureRadiusKm} km)</h2>
              <p className="text-xs text-slate-500">Based on regional purchasing power parity & adjusted coverage radius</p>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Projected Regional Demand Value</p>
              <p className="text-3xl font-black text-blue-600 mt-1">
                ₹{estimatedMarketCap.toLocaleString()} <span className="text-sm font-semibold text-slate-500">/ month</span>
              </p>
            </div>
            <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 text-right">
              <p className="text-xs font-bold text-slate-400 uppercase">Target Market Share ({targetSharePercent}%)</p>
              <p className="text-lg font-black text-slate-900">~₹{monthlyShareValue.toLocaleString()} / mo</p>
            </div>
          </div>
        </div>

        {/* Competitor Strategy Matrix */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Competitor Analysis Matrix</h2>
              <p className="text-xs text-slate-500">How your venture stands out against {scaledCompetitors} local competitor(s)</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold tracking-wider">
                  <th className="pb-3">Parameter</th>
                  <th className="pb-3">Existing Unorganized Outlets ({captureRadiusKm}km)</th>
                  <th className="pb-3 text-blue-600">Your Proposed {businessType} Unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 font-bold text-slate-900">Pricing & Packages</td>
                  <td className="py-3 text-slate-500">Variable rates, unstandardized billing</td>
                  <td className="py-3 font-semibold text-blue-700">Fixed rate cards & bundle combo deals</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-slate-900">Reach & Ordering</td>
                  <td className="py-3 text-slate-500">Walk-in dependent, zero digital presence</td>
                  <td className="py-3 font-semibold text-blue-700">WhatsApp Catalog + Google Business Profile</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-slate-900">Funding Advantage</td>
                  <td className="py-3 text-slate-500">Self-funded / high-interest informal loans</td>
                  <td className="py-3 font-semibold text-emerald-600">MoSJE Scheme 90% bank credit backing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Entry & Exit Strategy Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
            <h3 className="text-sm font-extrabold uppercase text-slate-900 tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Market Entry Tactics
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                <span><strong>Launch Discount:</strong> Run a 15% inaugural discount across the {captureRadiusKm}km catchment area during the first 30 days.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                <span><strong>B2B Tie-Ups:</strong> Partner with local housing societies, offices, or nearby stores.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
            <h3 className="text-sm font-extrabold uppercase text-slate-900 tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Exit & Risk Mitigation
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                <span><strong>Asset Value Protection:</strong> Machinery selected holds 60%+ resale value in secondary markets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                <span><strong>3-Month Reserve:</strong> Maintain working capital reserves to safeguard against initial low footfall.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Hyperlocal Advertising Suggestions */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Low-Cost Advertising & Campaign Ideas</h2>
              <p className="text-xs text-slate-500">Guerrilla and digital techniques to build quick traction in {captureRadiusKm} km zone</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800">1. Google My Business & Maps</p>
              <p className="text-slate-600 mt-1">Claim listing so residents within {captureRadiusKm}km locate your store when searching on Google Maps.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800">2. Pamphlet Distribution</p>
              <p className="text-slate-600 mt-1">Distribute localized offers in morning newspapers across target residential societies.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800">3. Customer Loyalty Cards</p>
              <p className="text-slate-600 mt-1">Issue simple "Buy 5 Get 1 Free" stamp cards to lock in repeat weekly customers.</p>
            </div>
          </div>
        </div>

        {/* Navigation to Next Phase */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate('/feasibility-swot', { state: liveData })}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Proceed to Phase 3: Feasibility & SWOT <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}