from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config.config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
    db.init_app(app)

    from app.routes.auth_routes import auth_bp
    from app.routes.user_routes import user_bp
    from app.routes.shipment_routes import shipment_bp
    from app.routes.contact_routes import contact_bp
    from app.routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(shipment_bp, url_prefix='/api/shipments')
    app.register_blueprint(contact_bp, url_prefix='/api/contact')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    @app.route('/')
    def index():
        return jsonify({
            "message": "SkyShip Express API",
            "version": "1.0.0",
            "status": "running"
        })

    return app
