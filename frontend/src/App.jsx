
import React, { useState } from "react";

const CROPS = [
  "Wheat", "Rice", "Maize", "Barley", "Soybean",
  "Cotton", "Sugarcane", "Potato", "Tomato", "Onion",
];

const InputField = ({ label, id, unit, icon, ...props }) => (
  <div className="field-wrapper">
    <label htmlFor={id}>
      <span className="field-icon">{icon}</span>
      {label}
      {unit && <span className="field-unit">{unit}</span>}
    </label>
    <input id={id} {...props} />
  </div>
);

export default function App() {
  const [form, setForm] = useState({
    area: "",
    cropType: "",
    year: "",
    rainfall: "",
    temperature: "",
    pesticides: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      
  const res = await fetch("https://crop-yield-1-i1ay.onrender.com/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(form)
});

if (!res.ok) throw new Error("Server error");

const data = await res.json();
setResult(data.prediction);
    } catch {
      setError("Could not connect to the backend. Make sure the server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #0f1a0f;
          min-height: 100vh;
          color: #e8f0e8;
        }

        .page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* LEFT PANEL */
        .hero {
          background:
            linear-gradient(160deg, rgba(15,26,15,0.6) 0%, rgba(15,26,15,0.85) 100%),
            url("https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80") center/cover no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 52px;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 70%, rgba(134,197,86,0.12) 0%, transparent 60%);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(134,197,86,0.12);
          border: 1px solid rgba(134,197,86,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #86c556;
          text-transform: uppercase;
          width: fit-content;
          margin-bottom: 28px;
        }

        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #86c556;
          animation: pulse 2s ease infinite;
        }

        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }

        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 3.5vw, 54px);
          line-height: 1.1;
          color: #f0f7ec;
          margin-bottom: 20px;
          position: relative;
        }

        .hero h1 em {
          font-style: italic;
          color: #86c556;
        }

        .hero p {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(232,240,232,0.65);
          max-width: 380px;
          margin-bottom: 48px;
          position: relative;
        }

        .stat-row {
          display: flex;
          gap: 36px;
          position: relative;
        }

        .stat { display: flex; flex-direction: column; gap: 4px; }

        .stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: #86c556;
        }

        .stat-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(232,240,232,0.4);
        }

        .divider { width: 1px; background: rgba(232,240,232,0.1); }

        /* RIGHT PANEL */
        .form-panel {
          background: #111d11;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 52px;
          overflow-y: auto;
        }

        .form-header {
          margin-bottom: 36px;
        }

        .form-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          color: #f0f7ec;
          margin-bottom: 6px;
        }

        .form-header p {
          font-size: 13px;
          color: rgba(232,240,232,0.4);
        }

        form { display: flex; flex-direction: column; gap: 0; }

        .fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }

        .field-full { grid-column: 1 / -1; }

        .field-wrapper { display: flex; flex-direction: column; gap: 8px; }

        .field-wrapper label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(232,240,232,0.5);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .field-icon { font-size: 13px; }

        .field-unit {
          margin-left: auto;
          font-size: 10px;
          color: rgba(134,197,86,0.6);
          font-style: italic;
          letter-spacing: 0;
          text-transform: none;
        }

        .field-wrapper input,
        .field-wrapper select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px 16px;
          color: #e8f0e8;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          width: 100%;
          appearance: none;
        }

        .field-wrapper input::placeholder { color: rgba(232,240,232,0.2); }

        .field-wrapper input:focus,
        .field-wrapper select:focus {
          border-color: rgba(134,197,86,0.5);
          background: rgba(134,197,86,0.05);
        }

        .field-wrapper select option { background: #111d11; }

        .select-wrap { position: relative; }

        .select-wrap::after {
          content: '▾';
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(134,197,86,0.7);
          pointer-events: none;
          font-size: 12px;
        }

        .btn-predict {
          margin-top: 8px;
          background: #86c556;
          color: #0f1a0f;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .btn-predict:hover { background: #9cd668; }
        .btn-predict:active { transform: scale(0.99); }
        .btn-predict:disabled { background: rgba(134,197,86,0.3); color: rgba(15,26,15,0.5); cursor: not-allowed; }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(15,26,15,0.3);
          border-top-color: #0f1a0f;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .result-box {
          margin-top: 20px;
          border-radius: 12px;
          padding: 18px 20px;
          font-size: 14px;
          line-height: 1.6;
          animation: fadeUp 0.4s ease forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .result-box.success {
          background: rgba(134,197,86,0.08);
          border: 1px solid rgba(134,197,86,0.25);
          color: #b6e080;
        }

        .result-box.error {
          background: rgba(220,80,80,0.08);
          border: 1px solid rgba(220,80,80,0.25);
          color: #f09090;
        }

        .result-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.6;
          margin-bottom: 6px;
        }

        @media (max-width: 820px) {
          .page { grid-template-columns: 1fr; }
          .hero { padding: 48px 32px; min-height: 260px; }
          .form-panel { padding: 40px 32px; }
          .fields-grid { grid-template-columns: 1fr; }
          .field-full { grid-column: 1; }
        }
      `}</style>

      <div className="page">
        {/* LEFT HERO */}
        <div className="hero">
          <div className="badge"><span className="badge-dot" /> AI-Powered System</div>
          <h1>Predict Your<br /><em>Crop Yield</em><br />with Precision</h1>
          <p>
            Enter your field parameters and let advanced machine learning estimate
            the expected yield — helping farmers and analysts make smarter decisions.
          </p>
          <div className="stat-row">
            <div className="stat">
              <span className="stat-val">10+</span>
              <span className="stat-label">Crop Types</span>
            </div>
            <div className="divider" />
            <div className="stat">
              <span className="stat-val">ML</span>
              <span className="stat-label">Powered</span>
            </div>
            <div className="divider" />
            <div className="stat">
              <span className="stat-val">Fast</span>
              <span className="stat-label">Predictions</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="form-panel">
          <div className="form-header">
            <h2>Enter Field Parameters</h2>
            <p>All fields are required for an accurate prediction</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="fields-grid">
              <InputField
                label="Area"
                id="area"
                icon="🌾"
                unit="hectares"
                name="area"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 250"
                value={form.area}
                onChange={handleChange}
                required
              />

              <div className="field-wrapper">
                <label htmlFor="cropType">
                  <span className="field-icon">🌱</span> Crop Type
                </label>
                <div className="select-wrap">
                  <select
                    id="cropType"
                    name="cropType"
                    value={form.cropType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select crop…</option>
                    {CROPS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <InputField
                label="Year"
                id="year"
                icon="📅"
                name="year"
                type="number"
                min="1900"
                max="2100"
                placeholder="e.g. 2024"
                value={form.year}
                onChange={handleChange}
                required
              />

              <InputField
                label="Avg Rainfall"
                id="rainfall"
                icon="🌧️"
                unit="mm/year"
                name="rainfall"
                type="number"
                min="0"
                step="0.1"
                placeholder="e.g. 850"
                value={form.rainfall}
                onChange={handleChange}
                required
              />

              <InputField
                label="Avg Temperature"
                id="temperature"
                icon="🌡️"
                unit="°C"
                name="temperature"
                type="number"
                step="0.1"
                placeholder="e.g. 24.5"
                value={form.temperature}
                onChange={handleChange}
                required
              />

              <InputField
                label="Pesticides Used"
                id="pesticides"
                icon="🧪"
                unit="tonnes"
                name="pesticides"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 12.3"
                value={form.pesticides}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn-predict" type="submit" disabled={loading}>
              {loading ? (
                <><div className="spinner" /> Predicting…</>
              ) : (
                <> Predict Crop Yield</>
              )}
            </button>
          </form>

          {result && (
            <div className="result-box success">
              <div className="result-label">🌾 Prediction Result</div>
              {result}
            </div>
          )}

          {error && (
            <div className="result-box error">
              <div className="result-label">⚠ Error</div>
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
}