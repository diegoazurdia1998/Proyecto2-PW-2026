from flask import Blueprint, jsonify, request

user_bp = Blueprint('users', __name__)

@user_bp.route('/', methods=['GET'])
def get_users():
    users = [
        {"id": 1, "name": "Juan Pérez", "email": "juan@ejemplo.com", "role": "Cliente"},
        {"id": 2, "name": "María López", "email": "maria@ejemplo.com", "role": "Cliente"}
    ]
    return jsonify(users), 200

@user_bp.route('/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    return jsonify({"message": f"Usuario {id} actualizado", "data": data}), 200

@user_bp.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    return jsonify({"message": f"Usuario {id} eliminado"}), 200

