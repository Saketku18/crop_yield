from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import os

app = FastAPI()

# ✅ Enable CORS (important for Vercel frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with your Vercel URL later
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Safe model loading
model_path = os.path.join(os.path.dirname(__file__), "crop_yield_model.pkl")
model = joblib.load(model_path)

@app.get("/")
def home():
    return {"message": "Crop Yield Prediction API Running"}

@app.post("/predict")
def predict(data: dict):
    try:
        # Convert input to DataFrame
        df = pd.DataFrame([data])

        # Apply encoding
        df = pd.get_dummies(df)

        # Align with training columns
        model_columns = model.feature_names_in_
        df = df.reindex(columns=model_columns, fill_value=0)

        # Prediction
        prediction = model.predict(df)

        return {
            "success": True,
            "prediction": float(prediction[0])
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }