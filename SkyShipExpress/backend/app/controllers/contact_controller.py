from flask import request, jsonify
from app import db
from app.models.contact import Contact

def handle_contact():
    data = request.get_json()

    # Validar campos requeridos según el modelo
    if not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({"message": "Faltan campos obligatorios"}), 400

    new_message = Contact(
        name=data.get('name'),
        email=data.get('email'),
        subject=data.get('subject'),
        message=data.get('message')
    )

    try:
        db.session.add(new_message)
        db.session.commit()
        return jsonify({"message": "Mensaje guardado con éxito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error al procesar la solicitud", "error": str(e)}), 500