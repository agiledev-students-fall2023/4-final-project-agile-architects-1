from flask import Flask, jsonify, request
from flask_cors import CORS
from services.youtube_service import searchByKeyword
import random

app = Flask(__name__)
CORS(app)  # Allow all origins for testing purposes

fridge_items = ["apple", "potato", "bacon", "cream cheese", "onion", "spinach", "chicken"]

@app.route('/get-videos', methods=['POST', 'GET'])
def get_videos():
    if request.method == 'POST':
        # Extract fridge items from POST request
        data = request.json
        fridge_items = data.get('fridge_items', [])
        print(f"Request received! Fridge Items: {fridge_items}")
    else:
        # Generate random items for GET request
        fridge_items = random.sample(fridge_items, 3)
        print("GET request received!")

    # Create search query and fetch videos
    search_query = " ".join(fridge_items) + " recipe"
    print(f"Search Query: {search_query}")

    videos = searchByKeyword(search_query, limit=3)

    return jsonify({
        "fridge_items": fridge_items,
        "videos": videos
    })

if __name__ == "__main__":
    app.run(debug=True)
