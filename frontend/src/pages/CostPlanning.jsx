import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContext';
import { 
  Calculator, 
  IndianRupee, 
  Landmark, 
  Calendar, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Store,
  Truck,
  Wrench,
  Building2,
  UserCheck
} from 'lucide-react';

const BUSINESS_CATEGORIES = [
  { id: 'dairy', name: 'Dairy Farming & Milk Chilling Unit', nameHi: 'डेयरी फार्मिंग एवं दुग्ध संग्रह केंद्र', margin: '32% Margin', scale: '₹80,000 - ₹12.00 Lakh', sector: 'Agri & Allied', icon: Store },
  { id: 'poultry', name: 'Broiler & Desi Kadaknath Poultry...', nameHi: 'ब्रायलर एवं देसी कड़कनाथ कुक्कुट पालन', margin: '28% Margin', scale: '₹70,000 - ₹8.00 Lakh', sector: 'Agri & Allied', icon: Briefcase },
  { id: 'kirana', name: 'Rural Kirana & FMCG Super Store', nameHi: 'ग्रामीण किराना एवं दैनिक उपभोग सामग्री स्टोर', margin: '18% Margin', scale: '₹60,000 - ₹6.00 Lakh', sector: 'Retail & Services', icon: Store },
  { id: 'mobile', name: 'Mobile Repair, Accessories & CS...', nameHi: 'मोबाइल रिपेयर, सहायक उपकरण एवं ग्राहक सेवा केंद्र', margin: '48% Margin', scale: '₹50,000 - ₹4.50 Lakh', sector: 'Retail & Services', icon: Wrench },
  { id: 'mustard', name: 'Cold-Pressed Mustard & Oil Mill', nameHi: 'कोल्ड प्रेस्ड सरसों एवं मूंगफली तेल पेराई इकाई', margin: '34% Margin', scale: '₹1.00 Lakh - ₹10.00 Lakh', sector: 'Food Processing & Craft', icon: Building2 },
  { id: 'tailoring', name: 'Rural Tailoring, Boutique & Uniforms', nameHi: 'ग्रामीण सिलाई केंद्र, बुटीक एवं स्कूल यूनिफॉर्म निर्माण', margin: '55% Margin', scale: '₹40,000 - ₹5.00 Lakh', sector: 'Food Processing & Craft', icon: Briefcase },
  { id: 'flour', name: 'Mini Rice, Flour & Masala Mill', nameHi: 'मिनी चावल, आटा एवं मसाला चक्की इकाई', margin: '42% Margin', scale: '₹90,000 - ₹8.00 Lakh', sector: 'Food Processing & Craft', icon: Building2 },
  { id: 'erickshaw', name: 'Rural E-Rickshaw & Goods Carrier', nameHi: 'ग्रामीण ई-रिक्शा एवं मालवाहक परिवहन', margin: '62% Margin', scale: '₹1.20 Lakh - ₹4.00 Lakh', sector: 'E-Transport', icon: Truck },
];

export default function CostPlanning() {
  const location = useLocation();
  const navigate = useNavigate();
  const businessCtx = useBusiness();

  const liveData = location.state || {};

  // Interactive Financial State
  const [marginCapital, setMarginCapital] = useState(liveData?.finance?.marginCapital || 100000);
  const [repaymentMode, setRepaymentMode] = useState('quarterly');
  const [selectedCategory, setSelectedCategory] = useState('dairy');
  const [selectedSector, setSelectedSector] = useState('All Sectors');

  // Section 4: Beneficiary Profile State
  const [targetCategory, setTargetCategory] = useState('sc_nsfdc');
  const [gender, setGender] = useState('Male');
  const [annualIncome, setAnnualIncome] = useState('100k_250k');
  const [hasSkillTraining, setHasSkillTraining] = useState(true);

  const businessType = liveData?.businessDetails?.businessType || businessCtx.businessType || 'Food & Restaurant';

  // --- Core Financial Calculations (MoSJE 10/90 Concessional Rules) ---
  const totalProjectCost = marginCapital * 10;
  const loanAmount = totalProjectCost * 0.90;
  const capexAmount = totalProjectCost * 0.75;
  const opexAmount = totalProjectCost * 0.25;

  const isMicroFinance = totalProjectCost <= 140000;
  const interestRate = isMicroFinance ? 6.5 : 8.0;
  const tenureYears = isMicroFinance ? 3 : 7;
  const totalQuarters = tenureYears * 4;
  const activeRepaymentQuarters = totalQuarters - 2;

  const quarterlyInterestMoratorium = (loanAmount * (interestRate / 100)) / 4;
  const principalPerQuarter = loanAmount / activeRepaymentQuarters;
  const quarterlyEMI = principalPerQuarter + quarterlyInterestMoratorium;
  const monthlyEquivalent = quarterlyEMI / 3;
  const dailySavingsRequired = Math.round(monthlyEquivalent / 30);

  const totalInterestOverLoan = (quarterlyInterestMoratorium * 2) + (quarterlyInterestMoratorium * activeRepaymentQuarters * 0.65);
  const totalRepaymentAmount = loanAmount + totalInterestOverLoan;

  const generateAmortizationSchedule = () => {
    let balance = loanAmount;
    const schedule = [];

    for (let q = 1; q <= 2; q++) {
      schedule.push({
        period: `Quarter ${q} (Moratorium)`,
        isMoratorium: true,
        openingBalance: balance,
        principalPaid: 0,
        interestServiced: Math.round(quarterlyInterestMoratorium),
        totalInstallment: Math.round(quarterlyInterestMoratorium),
        closingBalance: balance
      });
    }

    for (let q = 3; q <= 6; q++) {
      const interest = (balance * (interestRate / 100)) / 4;
      const principal = principalPerQuarter;
      const totalInst = principal + interest;
      const closing = Math.max(0, balance - principal);

      schedule.push({
        period: `Quarter ${q}`,
        isMoratorium: false,
        openingBalance: Math.round(balance),
        principalPaid: Math.round(principal),
        interestServiced: Math.round(interest),
        totalInstallment: Math.round(totalInst),
        closingBalance: Math.round(closing)
      });
      balance = closing;
    }

    return schedule;
  };

  const scheduleData = generateAmortizationSchedule();

  const filteredCategories = selectedSector === 'All Sectors' 
    ? BUSINESS_CATEGORIES 
    : BUSINESS_CATEGORIES.filter(c => c.sector === selectedSector);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Navigation */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate('/feasibility-swot', { state: liveData })}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-100 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Phase 3
          </button>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold text-xs rounded-full uppercase tracking-wider">
            Phase 4: Financial Engine
          </span>
        </div>

        {/* Dark Navy Hero Banner matching Market Potential Header */}
        <div className="bg-[#101c3d] text-white rounded-2xl p-6 shadow-md space-y-4 border border-[#1d2d59]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <span className="px-2.5 py-0.5 bg-blue-600/30 border border-blue-400/30 text-blue-300 text-[10px] font-extrabold uppercase rounded tracking-wider">
                MODULE 2: SMART FINANCIAL & SCHEME ENGINE
              </span>
              <h1 className="text-2xl font-black mt-1">Concessional Loan Repayment & Moratorium Roadmap</h1>
              <p className="text-xs text-slate-300 mt-0.5">Automated 10% margin leveraging to 90% concessional loan with mandatory gestation moratorium.</p>
            </div>

            {/* Repayment Mode Toggle */}
            <div className="flex items-center bg-[#0a1228] p-1 rounded-xl border border-slate-700/80 self-start md:self-auto">
              <span className="text-xs font-bold text-slate-400 px-3">Repayment Mode:</span>
              <button
                type="button"
                onClick={() => setRepaymentMode('quarterly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  repaymentMode === 'quarterly' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                Quarterly (MoSJE Standard)
              </button>
              <button
                type="button"
                onClick={() => setRepaymentMode('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  repaymentMode === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Quick Select Margin Preset Buttons */}
          <div className="space-y-2 pt-1">
            <p className="text-xs font-bold text-slate-300">Quick Select Beneficiary Margin Capital:</p>
            <div className="flex flex-wrap gap-2">
              {[10000, 25000, 50000, 100000, 200000, 300000, 500000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setMarginCapital(amount)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition border ${
                    marginCapital === amount
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                      : 'bg-[#0b142d] text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  ₹{(amount / 100000).toFixed(2).replace('.00', '')} Lakh {amount < 100000 ? `(₹${amount.toLocaleString()})` : ''}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Beneficiary Margin (10%)</span>
            <p className="text-3xl font-black text-slate-900">₹{marginCapital.toLocaleString()}</p>
            <p className="text-xs text-slate-500">Entrepreneur's own available cash</p>
          </div>

          <div className="bg-blue-50/60 p-6 rounded-2xl border border-blue-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Total Feasible Project Cost</span>
            <p className="text-3xl font-black text-blue-600">₹{totalProjectCost.toLocaleString()}</p>
            <p className="text-xs text-blue-800 font-medium">10x Leverage (Margin / 10%)</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Maximum Loan Amount (90%)</span>
            <p className="text-3xl font-black text-blue-600">₹{loanAmount.toLocaleString()}</p>
            <p className="text-xs text-blue-800 font-medium">Concessional credit funded by SCA</p>
          </div>
        </div>

        {/* Concessional Scheme Sub-Banner */}
        <div className="bg-[#101c3d] text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>
              <strong>{isMicroFinance ? 'Micro Finance Scheme' : 'General Term Loan Scheme'}:</strong> {interestRate}% interest • {tenureYears}-year tenure • 6-month moratorium
            </span>
          </span>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[11px]">SCA Concessional Rate</span>
        </div>

        {/* Installment Calculations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase">Quarterly Installment (EMI)</p>
            <p className="text-2xl font-black text-slate-900">₹{Math.round(quarterlyEMI).toLocaleString()}</p>
            <p className="text-[10px] text-slate-500">Payable every 3 months post-moratorium</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase">Monthly Equivalent</p>
            <p className="text-2xl font-black text-slate-900">₹{Math.round(monthlyEquivalent).toLocaleString()}</p>
            <p className="text-[10px] text-slate-500">~₹{dailySavingsRequired}/day savings required</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase">Total Interest Over Loan</p>
            <p className="text-2xl font-black text-slate-900">₹{Math.round(totalInterestOverLoan).toLocaleString()}</p>
            <p className="text-[10px] text-slate-500">Ultra-low due to concessional rate</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase">Total Repayment Amount</p>
            <p className="text-2xl font-black text-slate-900">₹{Math.round(totalRepaymentAmount).toLocaleString()}</p>
            <p className="text-[10px] text-slate-500">Principal (₹{loanAmount.toLocaleString()}) + Interest</p>
          </div>
        </div>

        {/* Capex vs Opex Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Capital Expenditure (Capex ~75%)</h3>
              <span className="text-lg font-black text-blue-600">₹{capexAmount.toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-500">Reserved for fixed asset creation, equipment, shed wiring, and machinery.</p>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Working Capital Reserve (Opex ~25%)</h3>
              <span className="text-lg font-black text-blue-600">₹{opexAmount.toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-500">Liquid cash for raw materials, initial utility bills, and packaging inventory.</p>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
              <div className="bg-blue-400 h-full rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>

        {/* Loan Amortization Schedule Table */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Loan Repayment & Moratorium Amortization Schedule (Quarterly)
            </h3>
            <span className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">View Full Schedule</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold tracking-wider bg-slate-50">
                  <th className="p-3">PERIOD</th>
                  <th className="p-3">OPENING BALANCE</th>
                  <th className="p-3">PRINCIPAL PAID</th>
                  <th className="p-3">INTEREST SERVICED</th>
                  <th className="p-3">TOTAL INSTALLMENT</th>
                  <th className="p-3">CLOSING BALANCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {scheduleData.map((row, idx) => (
                  <tr key={idx} className={row.isMoratorium ? 'bg-blue-50/40' : ''}>
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                      {row.period}
                      {row.isMoratorium && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-extrabold rounded">Gestation</span>
                      )}
                    </td>
                    <td className="p-3">₹{row.openingBalance.toLocaleString()}</td>
                    <td className="p-3 font-semibold text-blue-600">₹{row.principalPaid.toLocaleString()}</td>
                    <td className="p-3">₹{row.interestServiced.toLocaleString()}</td>
                    <td className="p-3 font-bold text-slate-900">₹{row.totalInstallment.toLocaleString()}</td>
                    <td className="p-3 font-semibold">₹{row.closingBalance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Business Category Selection Grid */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-extrabold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Business Category Selection</h3>
            </div>

            {/* Sector Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl">
              {['All Sectors', 'Agri & Allied', 'Retail & Services', 'Food Processing & Craft', 'E-Transport'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSector(sec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    selectedSector === sec ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {filteredCategories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition space-y-3 relative ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-500/20 shadow-md' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-extrabold text-[10px] rounded-full">
                      {cat.margin}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{cat.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{cat.nameHi}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
                    <span>Typical Scale:</span>
                    <span className="font-bold text-slate-800">{cat.scale}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Beneficiary Profile */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-extrabold flex items-center justify-center text-sm">
              4
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">4. Beneficiary Profile</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            
            {/* Target Community Dropdown */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Target Community / Category</label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="w-full p-3 rounded-xl border border-blue-600 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="sc_nsfdc">Scheduled Caste (SC - NSFDC Scheme)</option>
                <option value="obc_nbcfdc">Backward Classes (OBC - NBCFDC Scheme)</option>
                <option value="safai_nskfdc">Safai Karamcharis (NSKFD Scheme)</option>
                <option value="divyang_ndfdc">Persons with Disabilities (PwD - NDFDC)</option>
              </select>
            </div>

            {/* Gender Dropdown */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Gender (लिंग)</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>

            {/* Annual Family Income Dropdown */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Annual Family Income</label>
              <select
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="below_100k">Below ₹1,00,000 (BPL / Full Subsidy Eligible)</option>
                <option value="100k_250k">₹1,00,000 - ₹2,50,000 (MoSJE Double Income Ceiling)</option>
                <option value="250k_300k">₹2,50,000 - ₹3,00,000 (Standard Limit)</option>
                <option value="above_300k">Above ₹3,00,000</option>
              </select>
            </div>

            {/* Prior Skill Training Radio Options */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Prior Skill Training / Certificate</label>
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-800 font-medium">
                  <input
                    type="radio"
                    name="skillTraining"
                    checked={hasSkillTraining === true}
                    onChange={() => setHasSkillTraining(true)}
                    className="w-4 h-4 text-blue-600 accent-blue-600 cursor-pointer"
                  />
                  <span>Yes (PM-DAKSH / RSETI)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-800 font-medium">
                  <input
                    type="radio"
                    name="skillTraining"
                    checked={hasSkillTraining === false}
                    onChange={() => setHasSkillTraining(false)}
                    className="w-4 h-4 text-blue-600 accent-blue-600 cursor-pointer"
                  />
                  <span>No prior training</span>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Forward Navigation */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/schemes', { state: liveData })}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Proceed to Phase 5: Government Schemes <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}