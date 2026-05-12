from flask import Blueprint
from app.controllers.auth_controller import register, login

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register_user():
    return register()

@auth_bp.route('/login', methods=['POST'])
def login_user():
    return login()