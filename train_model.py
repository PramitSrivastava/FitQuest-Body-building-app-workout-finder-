import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Sample dataset (replace with real data)
data = {
    'duration': [30, 45, 60, 20, 25],  # Duration of exercise (in minutes)
    'weight': [70, 80, 65, 75, 68],    # Weight of the person (in kg)
    'reps': [12, 15, 18, 10, 14],      # Number of repetitions
    'calories_burned': [300, 400, 500, 200, 250],  # Calories burned (target)
}

# Convert the data into a DataFrame
df = pd.DataFrame(data)

# Prepare the input features (X) and target variable (y)
X = df[['duration', 'weight', 'reps']]  # Features: duration, weight, and reps
y = df['calories_burned']  # Target: calories burned

# Initialize and train the Multiple Linear Regression model
model = LinearRegression()
model.fit(X, y)

# Save the trained model to a file
joblib.dump(model, 'calorie_burn_model.pkl')

print("Model trained and saved as 'calorie_burn_model.pkl'")
