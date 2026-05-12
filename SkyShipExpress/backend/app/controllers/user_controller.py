from flask import request, jsonify
from app import db
from app.models.user import User

def get_all_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200

def update_user_info(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.name = data.get('name', user.name)
    user.role = data.get('role', user.role)
    db.session.commit()
    return jsonify({"message": "Usuario actualizado"}), 200