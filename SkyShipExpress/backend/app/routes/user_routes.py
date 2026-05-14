from flask import Blueprint, jsonify, request
from app.controllers.user_controller import get_all_users, update_user_info
from app.middleware.auth_middleware import token_required
from flask_cors import cross_origin
from app.controllers.admin_controller import delete_user

user_bp = Blueprint('users', __name__)

@user_bp.route('/all', methods=['GET'])
@token_required
def get_users(current_user):
    if current_user.role != 'admin':
        return {"message": "Acceso denegado"}, 403
    return get_all_users()

@user_bp.route('/update', methods=['PUT'])
@token_required
def update_user_route(current_user):
    # Solo admin puede actualizar otros usuarios
    if current_user.role != 'admin':
        return jsonify({"message": "Acceso denegado"}), 403

    user_id = request.args.get('id', type=int)
    if not user_id:
        return jsonify({"message": "Falta id"}), 400

    payload, status = update_user_info(user_id)
    return jsonify(payload), status

@user_bp.route('/delete', methods=['GET'])
@cross_origin(origin='http://localhost:5173', supports_credentials=True)  # ajusta origen en prod
@token_required
def delete_user_route(current_user):

    if current_user.role != 'admin':
        return jsonify({"message": "Acceso denegado"}), 403
    user_id = request.args.get('id', type=int)
    if not user_id:
        return jsonify({"message": "Falta id"}), 400

    payload, status = delete_user(user_id)
    return jsonify(payload), status

