import joblib
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load trained model artifacts
MODEL_PATH = 'models_store/demand_model.pkl'
FEATURES_PATH = 'models_store/model_features.pkl'

model = joblib.load(MODEL_PATH)
feature_columns = joblib.load(FEATURES_PATH)


@app.route('/predict', methods=['POST'])
def predict():
  try:
    data = request.get_json()

    input_dict = {
        'population_5km': [data.get('population', 10000)],
        'avg_household_income': [data.get('income', 60000)],
        'competitor_count': [data.get('competitors', 5)],
        'available_margin': [data.get('margin', 25000)],
        'category': [data.get('category', 'Dairy Farming')],
        'distance_to_nearest_market_km': [data.get('distance', 5.0)],
        'seasonal_factor': [data.get('seasonal', 1.0)],
    }

    input_df = pd.DataFrame(input_dict)
    encoded_df = pd.get_dummies(
        input_df, columns=['category'], drop_first=True
    )

    for col in feature_columns:
      if col not in encoded_df.columns:
        encoded_df[col] = 0

    encoded_df = encoded_df[feature_columns]

    predicted_score = model.predict(encoded_df)[0]
    final_score = float(np.clip(predicted_score, 10.0, 99.0))

    return jsonify({
        'success': True,
        'feasibility_score': round(final_score, 2),
        'risk_level': (
            'LOW'
            if final_score >= 70
            else ('MEDIUM' if final_score >= 45 else 'HIGH')
        ),
    })

  except Exception as e:
    return jsonify({'success': False, 'error': str(e)}), 400


if __name__ == '__main__':
  import os
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port, debug=False)