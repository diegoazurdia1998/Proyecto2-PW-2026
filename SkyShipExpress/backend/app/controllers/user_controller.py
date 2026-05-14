from flask import request, jsonify
from app import db
from app.models.user import User
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import logging

logger = logging.getLogger(__name__)

def get_all_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200

def update_user_info(user_id):
    """
    Actualiza campos permitidos de un usuario.
    Devuelve (payload_dict, status_code).
    """
    try:
        user = User.query.get(user_id)
        if not user:
            return {"message": "Usuario no encontrado"}, 404

        data = request.get_json() or {}

        # Campos permitidos a actualizar (ajusta según tu modelo)
        if "name" in data:
            user.name = data.get("name") or user.name
        if "role" in data:
            user.role = data.get("role") or user.role
        if "email" in data:
            user.email = data.get("email") or user.email
        if "phone" in data:
            user.phone = data.get("phone") or user.phone
        if "address" in data:
            user.address = data.get("address") or user.address
        # No permitas actualizar password aquí; usa endpoint específico si lo haces.

        db.session.commit()
        # Opcional: devolver el usuario actualizado (serializado)
        return {"message": "Usuario actualizado", "user": user.to_dict()}, 200

    except IntegrityError as ie:
        db.session.rollback()
        logger.warning("IntegrityError al actualizar usuario %s: %s", user_id, ie)
        return {"message": "Error de integridad al actualizar usuario"}, 400
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error("Error de BD al actualizar usuario %s", user_id, exc_info=e)
        return {"message": "Error interno al actualizar usuario"}, 500
    except Exception as ex:
        db.session.rollback()
        logger.exception("Error inesperado al actualizar usuario %s", user_id)
        return {"message": "Error inesperado"}, 500