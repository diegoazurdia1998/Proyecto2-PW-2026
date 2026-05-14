from flask import request, jsonify, current_app
from app import db
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from app.models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

def register():
    data = request.get_json()

    # Verificar si el correo ya existe
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"message": "El correo ya está registrado"}), 400

    hashed_password = generate_password_hash(data.get('password'), method='pbkdf2:sha256')

    new_user = User(
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        address=data.get('address'),
        password=hashed_password,
        role='cliente'
    )

    db.session.add(new_user)
    try:
        db.session.commit()
    except IntegrityError as ie:
        db.session.rollback()
        # Ejemplo: violación de constraint (email único, FK, etc.)
        return jsonify({"message": "Error de integridad en la base de datos", "detail": str(ie.orig)}), 400
    except SQLAlchemyError as e:
        db.session.rollback()
        # Error genérico de DB (conexión, timeout, etc.)
        return jsonify({"message": "No se pudo guardar el usuario en la base de datos", "error": str(e)}), 500

    # Commit exitoso: new_user.id debería estar disponible
    return jsonify({"message": "Usuario registrado exitosamente", "user_id": new_user.id}), 201

def login():
    auth = request.get_json()
    if not auth or not auth.get('email') or not auth.get('password'):
        return jsonify({"message": "Credenciales incompletas"}), 401

    user = User.query.filter_by(email=auth.get('email')).first()

    if user and check_password_hash(user.password, auth.get('password')):
        token = jwt.encode({
            'id': user.id,
            'role': user.role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, current_app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'token': token, 'role': user.role, 'name': user.name}), 200

    return jsonify({"message": "Correo o contraseña incorrectos"}), 401