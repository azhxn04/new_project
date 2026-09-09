import os
import joblib
import numpy as np
import pandas as pd
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split


def generate_hyperlocal_synthetic_data(num_samples=5000):
  np.random.seed(42)

  categories = [
      'Dairy Farming',
      'Grocery Retail',
      'Textile & Apparel',
      'Poultry',
      'Food Processing',
  ]
  category_weights = [0.30, 0.25, 0.15, 0.15, 0.15]

  data = {
      'population_5km': np.random.randint(1000, 25000, size=num_samples),
      'avg_household_income': np.random.randint(
          30000, 180000, size=num_samples
      ),
      'competitor_count': np.random.randint(0, 30, size=num_samples),
      'available_margin': np.random.choice(
          [10000, 14000, 25000, 50000, 100000, 250000, 500000], size=num_samples
      ),
      'category': np.random.choice(
          categories, p=category_weights, size=num_samples
      ),
      'distance_to_nearest_market_km': np.random.uniform(
          0.5, 20.0, size=num_samples
      ),
      'seasonal_factor': np.random.uniform(0.7, 1.4, size=num_samples),
  }

  df = pd.DataFrame(data)

  # Calculate Feasibility Score based on rural market dynamics
  raw_score = (
      (df['population_5km'] / 25000) * 30
      + (df['avg_household_income'] / 180000) * 35
      - (df['competitor_count'] / 30) * 25
      + (df['seasonal_factor'] / 1.4) * 10
  ) * (100 / 50)

  df['feasibility_score'] = np.clip(raw_score, 15.0, 98.0)
  return df


def train_demand_model():
  print('Generating Hyper-Local Synthetic Training Data...')
  df = generate_hyperlocal_synthetic_data()

  df_encoded = pd.get_dummies(df, columns=['category'], drop_first=True)

  X = df_encoded.drop(columns=['feasibility_score'])
  y = df_encoded['feasibility_score']

  X_train, X_test, y_train, y_test = train_test_split(
      X, y, test_size=0.2, random_state=42
  )

  print('Training XGBoost Model...')
  model = XGBRegressor(
      n_estimators=100,
      learning_rate=0.1,
      max_depth=5,
      random_state=42,
      objective='reg:squarederror',
  )
  model.fit(X_train, y_train)

  predictions = model.predict(X_test)
  mse = mean_squared_error(y_test, predictions)
  print(f'Model Training Complete. RMSE: {np.sqrt(mse):.2f}')

  os.makedirs('models_store', exist_ok=True)
  joblib.dump(model, 'models_store/demand_model.pkl')
  joblib.dump(list(X.columns), 'models_store/model_features.pkl')
  print('Model artifacts successfully saved to ai-engine/models_store/.')


if __name__ == '__main__':
  train_demand_model()