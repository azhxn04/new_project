import React from 'react';
import { Check, CircleHelp } from 'lucide-react';

const BUSINESS_TYPES = [
  'Food & Restaurant',
  'Retail',
  'Manufacturing',
  'Services',
  'E-commerce',
  'Technology',
  'Agriculture',
];

const BusinessSelector = ({ value, onChange, error }) => {
  const isOther = value && !BUSINESS_TYPES.includes(value);

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-slate-900">What kind of business are you planning?</legend>
      <p className="mt-1 text-sm text-slate-500">Choose a category to personalize your workspace later.</p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {BUSINESS_TYPES.map((businessType) => {
          const selected = value === businessType;
          return (
            <label
              key={businessType}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                selected
                  ? 'border-brand-500 bg-brand-50 text-brand-800 ring-2 ring-brand-500/20'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="businessType"
                  value={businessType}
                  checked={selected}
                  onChange={(event) => onChange(event.target.value)}
                  className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm font-semibold">{businessType}</span>
              </span>
              {selected && <Check className="h-4 w-4" aria-hidden="true" />}
            </label>
          );
        })}
      </div>

      <label className={`mt-3 flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
        isOther ? 'border-brand-500 bg-brand-50 text-brand-800 ring-2 ring-brand-500/20' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-slate-50'
      }`}>
        <span className="flex items-center gap-3">
          <input
            type="radio"
            name="businessType"
            value="other"
            checked={isOther}
            onChange={() => onChange(isOther ? '' : 'Other')}
            className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm font-semibold">Other</span>
        </span>
        <CircleHelp className="h-4 w-4 text-slate-400" aria-hidden="true" />
      </label>

      {isOther && (
        <input
          type="text"
          value={value === 'Other' ? '' : value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter your business category"
          aria-label="Other business category"
          className="mt-3 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          autoFocus
        />
      )}

      {error && <p className="mt-2 text-sm font-medium text-rose-600" role="alert">{error}</p>}
    </fieldset>
  );
};

export default BusinessSelector;
