import os
import pathlib
import numpy as np
import PIL.Image
import tensorflow
import re
from io import BytesIO
import base64

labelNames = [
    "apple",
    "ash gourd",
    "beet root",
    "bitter gourd",
    "bottle gourd",
    "brinjal",
    "broccoli",
    "cabbage",
    "capsicum",
    "carrot",
    "cauliflower",
    "Chicken",
    "Coriender",
    "corn",
    "Cottage Cheese",
    "cucumber",
    "Egg",
    "Elephant Yum",
    "Fish",
    "garlic",
    "Ginger",
    "Green Onion",
    "Kohlrabi",
    "lady finger",
    "Lemon",
    "Lettuce",
    "Milk",
    "Mint",
    "mushroom",
    "onion",
    "Papaya",
    "peas",
    "potato",
    "pumpkin",
    "Raddish",
    "Raw Banana",
    "Raw Jackfruit",
    "spinach",
    "tomato",
    "Turnip",
]

PROB_THRESHOLD = 0.2
model_path = os.path.join(pathlib.Path(__file__).parent.parent, "data")
model = tensorflow.saved_model.load(model_path)
serve = model.signatures["serving_default"]
input_shape = serve.inputs[0].shape[1:3]


def predict(image_b64):
    image_data = re.sub("^data:image/.+;base64,", "", image_b64)
    image = PIL.Image.open(BytesIO(base64.b64decode(image_data))).resize(input_shape)
    input_array = np.array(image, dtype=np.float32)[np.newaxis, :, :, :]

    input_tensor = tensorflow.convert_to_tensor(input_array)
    outputs = serve(input_tensor)
    out = {k: v[np.newaxis, ...] for k, v in outputs.items()}
    outputData = {}

    assert set(out.keys()) == set(
        ["detected_boxes", "detected_classes", "detected_scores"]
    )
    for box, class_id, score in zip(
        out["detected_boxes"][0],
        out["detected_classes"][0],
        out["detected_scores"][0],
    ):
        if score > PROB_THRESHOLD:
            outputData[labelNames[int(class_id)]] = float(score)

    return list(outputData)
