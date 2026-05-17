from flask import request, jsonify
from app import db
from app.models.contact import Contact
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import logging

logger = logging.getLogger(__name__)

def handle_contact():
    data = request.get_json()

    # Validar campos requeridos
    if not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({"message": "Faltan campos obligatorios"}), 400

    new_message = Contact(
        name=data.get('name'),
        email=data.get('email'),
        subject=data.get('subject'),
        message=data.get('message')
    )

    db.session.add(new_message)
    try:
        db.session.commit()
    except IntegrityError as ie:
        db.session.rollback()
        logger.warning("IntegrityError al guardar Contact: %s", ie)
        return jsonify({"message": "Error de integridad en la base de datos"}), 400
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error("Error de base de datos al guardar Contact", exc_info=e)
        return jsonify({"message": "No se pudo guardar el mensaje. Intente más tarde"}), 500

    # Commit exitoso: opcionalmente devolver el id asignado
    return jsonify({"message": "Mensaje guardado con éxito", "contact_id": new_message.id}), 201

def recent_contacts():
    try:
        contacts = Contact.query.all()

        return jsonify([s.to_dict() for s in contacts]), 200
    except SQLAlchemyError as e:
        logger.error("Error al obtener contactos", exc_info=e)
        return jsonify({"message": "No se pudieron obtener los contactos. Intente más tarde."}), 500