import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image, ImageDraw
import cv2
import numpy as np
import io

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/compose")
async def compose_image(
    template: UploadFile = File(...),
    source: UploadFile = File(...)
):
    try:
        # Load images
        template_img = Image.open(template.file).convert("RGBA")
        source_img = Image.open(source.file).convert("RGBA")

        # Convert PIL images to OpenCV format (numpy arrays)
        template_cv = np.array(template_img.convert("RGB"))
        source_cv = np.array(source_img.convert("RGB"))

        # Convert the images to grayscale for face detection
        gray_template = cv2.cvtColor(template_cv, cv2.COLOR_RGB2GRAY)

        # Load OpenCV's pre-trained Haar Cascade face detector
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

        # Detect faces in the template image
        faces = face_cascade.detectMultiScale(gray_template, scaleFactor=1.1, minNeighbors=5)

        if len(faces) == 0:
            # Returning a JSON response in case of an error
            return {"error": "No face detected in the template image"}

        # Assuming the first detected face is the one we want to replace
        x, y, w, h = faces[0]  # Get the coordinates of the first face

        # Crop the corresponding face from the source image
        face_from_source = source_img.crop((x, y, x + w, y + h))

        # Resize face to fit the template's face region
        face_from_source = face_from_source.resize((w, h))

        # Create a circular mask for the face (optional)
        mask = Image.new("L", face_from_source.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, w, h), fill=255)

        # Replace the face in the template image with the one from the source
        template_img.paste(face_from_source, (x, y), mask)

        # Process the final image in memory and send as response
        buffer = io.BytesIO()
        template_img.save(buffer, format="PNG")
        buffer.seek(0)

        # Return the composited image as a response
        return StreamingResponse(buffer, media_type="image/png")
    
    except Exception as e:
        # In case of any errors, return a JSON response with error details
        print(f"Error during image composition: {e}")
        return {"error": str(e)}
