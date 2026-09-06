import React from 'react';
import { IndianRupee } from 'lucide-react';

const CapitalInput = ({ value, onChange, error }) => (
  <fieldset>
    <legend className="text-sm font-semibold text-slate-900">What capital can you start with?</legend>
    <p className="mt-1 text-sm text-slate-500">Enter the amount you currently plan to make available for this venture.</p>

    <label className="mt-6 block text-sm font-semibold text-slate-700" htmlFor="startup-capital">
      Available or startup capital <span className="text-rose-500">*</span>
      <div className="relative mt-1.5">
        <IndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          id="startup-capital"
          type="number"
          min="1"
          step="1"
          inputMode="numeric"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="e.g. 500000"
          className="block w-full rounded-xl border border-slate-200 px-4 py-4 pl-11 text-lg font-semibold text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          required
        />
      </div>
    </label>
    <p className="mt-2 text-xs text-slate-500">Currency: Indian Rupee (INR)</p>
    {error && <p className="mt-2 text-sm font-medium text-rose-600" role="alert">{error}</p>}
  </fieldset>
);

export default CapitalInput;
