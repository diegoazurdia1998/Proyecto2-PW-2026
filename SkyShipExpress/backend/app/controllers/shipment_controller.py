from flask import request, jsonify
from app import db
from app.models.shipment import Shipment
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import logging

logger = logging.getLogger(__name__)

def get_shipments(current_user):
    try:
        # Si es admin, ve todo. Si es cliente, solo lo suyo.
        if current_user.role == 'admin':
            shipments = Shipment.query.all()
        else:
            shipments = Shipment.query.filter_by(user_id=current_user.id).all()

        return jsonify([s.to_dict() for s in shipments]), 200
    except SQLAlchemyError as e:
        logger.error("Error al obtener envíos", exc_info=e)
        return jsonify({"message": "No se pudieron obtener los envíos. Intente más tarde."}), 500


def create_shipment(current_user):
    data = request.get_json() or {}

    # Validaciones mínimas
    required = ['origin', 'destination', 'recipient_name', 'recipient_address', 'recipient_phone', 'weight', 'package_type']
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"message": "Faltan campos obligatorios", "missing": missing}), 400

    try:
        new_shipment = Shipment(
            user_id=current_user.id,
            origin=data.get('origin'),
            destination=data.get('destination'),
            recipient_name=data.get('recipient_name'),
            recipient_address=data.get('recipient_address'),
            recipient_phone=data.get('recipient_phone'),
            weight=data.get('weight'),
            package_type=data.get('package_type'),
            cost=data.get('cost', 0.0)
        )

        # Generar código de guía
        new_shipment.code = new_shipment.generate_code()

        db.session.add(new_shipment)
        db.session.commit()

        return jsonify(new_shipment.to_dict()), 201
    except IntegrityError as ie:
        db.session.rollback()
        logger.warning("IntegrityError al crear envío: %s", ie)
        return jsonify({"message": "Error de integridad al crear el envío"}), 400
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error("Error de base de datos al crear envío", exc_info=e)
        return jsonify({"message": "No se pudo crear el envío. Intente más tarde."}), 500


def update_shipment(id, current_user=None):
    # Si necesitas control de permisos, compruébalo aquí (ejemplo opcional)
    shipment = Shipment.query.get_or_404(id)

    # Si el usuario no es admin y no es propietario, denegar
    if current_user and current_user.role != 'admin' and shipment.user_id != current_user.id:
        return jsonify({"message": "No autorizado para actualizar este envío"}), 403

    data = request.get_json() or {}

    # Actualizar campos permitidos
    shipment.status = data.get('status', shipment.status)
    shipment.cost = data.get('cost', shipment.cost)
    shipment.weight = data.get('weight', shipment.weight)
    shipment.destination = data.get('destination', shipment.destination)
    shipment.recipient_address = data.get('recipient_address', shipment.recipient_address)
    shipment.recipient_phone = data.get('recipient_phone', shipment.recipient_phone)
    shipment.package_type = data.get('package_type', shipment.package_type)

    try:
        db.session.commit()
        return jsonify({
            "message": "Envío actualizado con éxito",
            "shipment": shipment.to_dict()
        }), 200
    except IntegrityError as ie:
        db.session.rollback()
        logger.warning("IntegrityError al actualizar envío %s: %s", id, ie)
        return jsonify({"message": "Error de integridad al actualizar el envío"}), 400
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error("Error de base de datos al actualizar envío %s", id, exc_info=e)
        return jsonify({"message": "No se pudo actualizar el envío. Intente más tarde."}), 500


def delete_shipment(id, current_user=None):
    shipment = Shipment.query.get_or_404(id)

    # Control de permisos opcional
    if current_user and current_user.role != 'admin' and shipment.user_id != current_user.id:
        return jsonify({"message": "No autorizado para eliminar este envío"}), 403

    try:
        db.session.delete(shipment)
        db.session.commit()
        return jsonify({"message": f"Envío {id} eliminado correctamente"}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error("Error al eliminar envío %s", id, exc_info=e)
        return jsonify({"message": "No se pudo eliminar el envío. Intente más tarde."}), 500
