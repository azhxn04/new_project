import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building2, Check, MapPin, Sparkles, WalletCards, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBusiness } from '../context/BusinessContext';
import BusinessSelector from '../components/onboarding/BusinessSelector';
import LocationSelector from '../components/onboarding/LocationSelector';
import CapitalInput from '../components/onboarding/CapitalInput';
import Logo from '../components/common/Logo';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const STEPS = [
  { label: 'Business type', icon: Building2 },
  { label: 'Location', icon: MapPin },
  { label: 'Capital', icon: WalletCards },
  { label: 'Review', icon: Check },
];

const initialForm = {
  businessType: 'Dairy Farming',
  location: { city: '', state: '', locality: '', distance: 5.0, population: 15000, competitors: 3 },
  capital: { availableMargin: 25000, income: 75000 },
};

export default function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveOnboardingData } = useBusiness();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Extract values from form state with fallbacks
      const margin = Number(formData.capital?.availableMargin || formData.capital || 25000);
      const category = formData.businessType || 'Dairy Farming';
      const population = Number(formData.location?.population || 15000);
      const income = Number(formData.capital?.income || 75000);
      const competitors = Number(formData.location?.competitors || 3);
      const distance = Number(formData.location?.distance || 5.0);

      // 1. Call Node.js Backend -> Python AI Microservice proxy endpoint
      const aiResponse = await fetch(`${API_BASE_URL}/ai/feasibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          population,
          income,
          competitors,
          margin,
          distance,
          seasonal: 1.1,
        }),
      });
      const aiData = await aiResponse.json();

      // 2. Call MoSJE Financial Rules calculation endpoint
      const financeResponse = await fetch(`${API_BASE_URL}/finance/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availableMarginCapital: margin }),
      });
      const financeData = await financeResponse.json();

      if (aiData.success && financeData.success) {
        // Save user-specific business onboarding data to BusinessContext & localStorage
        if (saveOnboardingData) {
          saveOnboardingData({
            businessType: category,
            capital: margin,
            location: formData.location,
            feasibility: aiData,
            finance: financeData.data,
            onboardingComplete: true
          });
        }

        // Navigate directly to dashboard carrying live API results
        navigate('/dashboard', {
          state: {
            feasibility: aiData,
            finance: financeData.data,
            businessDetails: formData,
          },
        });
      } else {
        alert('Evaluation failed. Please verify backend connection.');
      }
    } catch (err) {
      console.error('Error during live API submission:', err);
      alert('Unable to connect to the backend server. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Logo className="h-10 w-auto" />
          </div>
          <p className="text-sm text-slate-500">
            Welcome, <span className="font-semibold text-slate-700">{user?.name || 'Entrepreneur'}</span>
          </p>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Business Onboarding</p>
          <h1 className="text-3xl font-extrabold text-slate-900">Let's understand your starting point</h1>
          <p className="text-sm text-slate-500 mt-1">
            A few details will shape your VYAPARMITRA workspace. You can update your profile as your plan develops.
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="flex justify-between items-center max-w-xl mx-auto mb-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;

            return (
              <div key={step.label} className="flex flex-col items-center gap-2 relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : isActive
                      ? 'border-blue-600 text-blue-600 bg-white shadow-md'
                      : 'border-slate-200 text-slate-400 bg-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
          {currentStep === 0 && (
            <BusinessSelector
              value={formData.businessType}
              onChange={(val) => updateFormData('businessType', val)}
            />
          )}

          {currentStep === 1 && (
            <LocationSelector
              value={formData.location}
              onChange={(val) => updateFormData('location', val)}
            />
          )}

          {currentStep === 2 && (
            <CapitalInput
              value={formData.capital}
              onChange={(val) => updateFormData('capital', val)}
            />
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800">Review Your Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Business Category</p>
                  <p className="text-base font-bold text-slate-800 mt-1">{formData.businessType || 'Dairy Farming'}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Target Location</p>
                  <p className="text-base font-bold text-slate-800 mt-1">
                    {formData.location?.city || 'Rural Region'}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Available Margin Capital</p>
                  <p className="text-base font-bold text-blue-600 mt-1">
                    ₹{Number(formData.capital?.availableMargin || formData.capital || 25000).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center">
                Clicking "Complete Setup" will run live feasibility scoring via our AI model and calculate MoSJE loan eligibility.
              </p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0 || loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-medium hover:bg-slate-100 disabled:opacity-40 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            type="button"
            onClick={currentStep === STEPS.length - 1 ? handleSubmit : handleNext}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Evaluating AI Model...
              </>
            ) : currentStep === STEPS.length - 1 ? (
              <>
                Complete Setup <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Next Step <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}