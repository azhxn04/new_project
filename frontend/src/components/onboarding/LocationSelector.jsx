import React from 'react';
import { MapPin } from 'lucide-react';

const INDIAN_STATES_AND_CITIES = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Anantapur", "Kadapa", "Eluru", "Ongole", "Chittoor", "Machilipatnam"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Aalo", "Tezu", "Bomdila"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Dhubri"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Chhapra"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur", "Raigarh", "Ambikapur"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari", "Morbi"],
  "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Baddi", "Bilaspur", "Kullu", "Chamba", "Hamirpur"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Vijayapura", "Shivamogga", "Tumakuru", "Kalaburagi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Pimpri-Chinchwad", "Nashik", "Kalyan-Dombivli", "Vasai-Virar", "Aurangabad (Chhatrapati Sambhaji Nagar)", "Navi Mumbai", "Solapur", "Mira-Bhayandar", "Bhiwandi", "Amravati", "Nanded", "Kolhapur", "Ulhasnagar", "Sangli"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai"],
  "Nagaland": ["Dimapur", "Kohima", "Mokokchung", "Tuensang", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali (SAS Nagar)", "Hoshiarpur", "Pathankot"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Sikar", "Sri Ganganagar"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Vellore", "Tirunelveli", "Thanjavur", "Tuticorin"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudraprayag", "Kashipur", "Rishikesh"],
  "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra"],
  "Andaman and Nicobar Islands": ["Port Blair", "Garacharma", "Bambooflat"],
  "Chandigarh": ["Chandigarh"],
  "Dadra & Nagar Haveli and Daman & Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi (NCT)": ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi", "Dwarka", "Rohini"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Udhampur"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Amini"],
  "Puducherry": ["Puducherry", "Karaikal", "Yanam", "Mahe"]
};

const LocationSelector = ({ value = {}, onChange, error }) => {
  const selectedState = value.state || '';
  const selectedCity = value.city || '';

  const availableStates = Object.keys(INDIAN_STATES_AND_CITIES);
  const availableCities = selectedState ? INDIAN_STATES_AND_CITIES[selectedState] || [] : [];

  const handleStateChange = (e) => {
    const newState = e.target.value;
    const citiesForState = INDIAN_STATES_AND_CITIES[newState] || [];
    onChange({
      ...value,
      state: newState,
      city: citiesForState[0] || '', // Automatically set first available city for selected state
    });
  };

  const handleCityChange = (e) => {
    onChange({
      ...value,
      city: e.target.value,
    });
  };

  const updateField = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  const inputClassName = 'mt-1.5 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-slate-900">Where will your business operate?</legend>
      <p className="mt-1 text-sm text-slate-500">This records your starting location. It has not been analyzed.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* State Dropdown First */}
        <label className="text-sm font-semibold text-slate-700">
          State <span className="text-rose-500">*</span>
          <select
            value={selectedState}
            onChange={handleStateChange}
            className={inputClassName}
            required
          >
            <option value="" disabled>Select State</option>
            {availableStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </label>

        {/* City Dropdown Second */}
        <label className="text-sm font-semibold text-slate-700">
          City <span className="text-rose-500">*</span>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
            className={`${inputClassName} disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed`}
            required
          >
            <option value="" disabled>
              {selectedState ? 'Select City' : 'Select State First'}
            </option>
            {availableCities.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
            <option value="Other / Rural Area">Other / Rural Area</option>
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm font-semibold text-slate-700">
        Area or locality <span className="font-normal text-slate-400">(optional)</span>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="text"
            value={value.locality || ''}
            onChange={(event) => updateField('locality', event.target.value)}
            placeholder="e.g. Baner"
            className={`${inputClassName} pl-11`}
          />
        </div>
      </label>

      {error && <p className="mt-2 text-sm font-medium text-rose-600" role="alert">{error}</p>}
    </fieldset>
  );
};

export default LocationSelector;