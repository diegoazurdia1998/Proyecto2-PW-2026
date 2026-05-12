from flask import Blueprint, jsonify, request
from app.controllers.user_controller import get_all_users, update_user_info, delete_user_account
from app.middleware.auth_middleware import token_required

user_bp = Blueprint('users', __name__)

@user_bp.route('/', methods=['GET'])
@token_required
def get_users(current_user):
    if current_user.role != 'admin':
        return {"message": "Acceso denegado"}, 403
    return get_all_users()

@user_bp.route('/<int:id>', methods=['PUT'])
@token_required
def update_user(current_user, id):
    if current_user.role != 'admin':
        return {"message": "Acceso denegado"}, 403
    return update_user_info(id)

@user_bp.route('/<int:id>', methods=['DELETE'])
@token_required
def delete_user(id):
    return jsonify({"message": f"Usuario {id} eliminado"}), 200

