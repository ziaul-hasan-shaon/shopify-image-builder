from flask import Flask, request, jsonify
from flask_cors import CORS
from rembg import remove
from PIL import Image
from io import BytesIO
import base64

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/remove-bg', methods=['POST'])
def remove_background():
    # Get the uploaded image from the request
    file = request.files['image']
    
    # Read image file as bytes
    input_image = file.read()
    
    # Remove the background using rembg
    output_image = remove(input_image)
    
    # Convert the output image to base64
    img = Image.open(BytesIO(output_image))
    img_bytes = BytesIO()
    img.save(img_bytes, format='PNG')
    img_bytes.seek(0)
    img_base64 = base64.b64encode(img_bytes.read()).decode('utf-8')

    # Send the base64 encoded image in the response
    return jsonify({'image': img_base64})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
