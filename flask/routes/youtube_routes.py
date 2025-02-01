from flask import Blueprint, jsonify, request
from services.youtube_service import searchByKeyword

youtube_bp = Blueprint('youtube', __name__)


@youtube_bp.route('/get-videos', methods=['POST', 'OPTIONS'])

def get_videos():
    print(f"Received request in Flask: {request.json}")  # Add debug

    if request.method == 'OPTIONS':
        return '', 200

    elif request.method == 'POST':
        # Extract fridge items from POST request
        data = request.json
        fridge_items = data.get('fridge_items', [])
        print(f"Request received! Fridge Items: {fridge_items}")

        # Create search query and fetch videos
        search_query = " ".join(fridge_items) + " recipe"
        print(f"Search Query: {search_query}")

        videos = searchByKeyword(search_query, limit=3)

        return jsonify({
            "fridge_items": fridge_items,
            "videos": videos
        })