from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config.config import Config

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    jwt.init_app(app)

    # Registrar rutas
    from app.routes.auth_routes import auth_bp
    from app.routes.user_routes import user_bp
    from app.routes.shipment_routes import shipment_bp
    from app.routes.contact_routes import contact_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(shipment_bp, url_prefix='/api/shipments')
    app.register_blueprint(contact_bp, url_prefix='/api/contact')

    return app
