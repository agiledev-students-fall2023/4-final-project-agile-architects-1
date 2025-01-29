from flask import Flask
from flask_cors import CORS
from routes.youtube_routes import youtube_bp
from routes.recipe_routes import * #TODO
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    # Register Blueprints
    app.register_blueprint(youtube_bp, url_prefix='/youtube')
    #app.register_blueprint(fridge_bp, url_prefix='/fridge')

    return app

app = create_app()
print(app.url_map)
if __name__ == "__main__":
    app.run(port=5000, debug=True)