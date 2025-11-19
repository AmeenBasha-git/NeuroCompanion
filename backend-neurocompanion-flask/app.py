# backend_flask/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import traceback
from tensorflow.keras.models import load_model
from PIL import Image
import io

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# --- Load Models ---
# Question ML model
question_model = joblib.load("dementia_model.pkl")
question_features_order = [
    'FunctionalAssessment', 'MMSE', 'ADL', 'MemoryComplaints',
    'BehavioralProblems', 'Depression', 'SleepQuality',
    'Disorientation', 'HeadInjury'
]

# Image ML model
MODEL_PATH = "./Classifiers/mri_classifier.h5"
image_model = load_model(MODEL_PATH)
CLASS_NAMES = ['Mild_Demented', 'Moderate_Demented', 'Non_Demented', 'Very_Mild_Demented']

# --- Helper Functions ---
def yn(val):
    try:
        return int(val)
    except:
        return 0

def calculate_features(answers):
    q = [yn(answers.get(f'q{i}', 0)) for i in range(1, 12)]
    mmse = sum([6*q[i] for i in [0,1,2,8,10]])
    fa = ((q[3] + q[10]) * 2.5)
    adl = (q[3] * 3.3)
    disorientation = (q[1] + q[2])
    mem_avg = sum([q[0],q[1],q[5],q[8],q[9]]) / 5
    beh_avg = sum([q[4],q[5],q[9]]) / 3
    dep_avg = sum([q[4],q[6]]) / 2
    features = {
        "FunctionalAssessment": round(fa,2),
        "MMSE": round(mmse,2),
        "ADL": round(adl,2),
        "MemoryComplaints": int(mem_avg>0.7),
        "BehavioralProblems": int(beh_avg>0.7),
        "Depression": int(dep_avg>0.7),
        "SleepQuality": int(q[6]==1),
        "Disorientation": round(disorientation/5,2),
        "HeadInjury": int(q[7]==1)
    }
    return features

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert('L')  # grayscale
    img = img.resize((128, 128))
    img_array = np.array(img)/255.0
    return img_array.reshape(1,128,128,1)

# --- Routes ---
@app.route('/predict', methods=['POST'])
def predict_questionnaire():
    try:
        data = request.get_json()
        if not all(f'q{i}' in data for i in range(1,12)):
            return jsonify({"error": "Missing questions"}),400
        features = calculate_features(data)
        input_array = np.array([[features[f] for f in question_features_order]])
        prediction = question_model.predict(input_array)[0]
        result = "Dementia" if prediction==1 else "No Dementia"
        return jsonify({"result": result, "features": features})
    except Exception as e:
        return jsonify({"error": str(e)}),500

@app.route('/predict-image', methods=['POST'])
def predict_image():
    try:
        if 'image' not in request.files:
            return jsonify({"error":"No image file provided"}),400
        file = request.files['image']
        img_input = preprocess_image(file.read())
        pred_class = np.argmax(image_model.predict(img_input), axis=1)[0]
        return jsonify({"predicted_class": CLASS_NAMES[pred_class]})
    except Exception as e:
        return jsonify({"error": str(e)}),500

if __name__=='__main__':
    app.run(host='0.0.0.0', port=5000)
