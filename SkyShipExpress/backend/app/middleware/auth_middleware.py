import jwt
from flask import request, jsonify, current_app
from functools import wraps
from app.models.user import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Se espera el token en el header 'Authorization'
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token no proporcionado'}), 401

        try:

            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['id'])
            if not current_user:
                return jsonify({'message': 'Usuario no encontrado'}), 401
        except Exception as e:
            return jsonify({'message': 'Token inválido o expirado'}), 401

        return f(current_user, *args, **kwargs)

    return decorated