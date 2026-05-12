from flask import request, jsonify
from app import db
from app.models.shipment import Shipment

def get_shipments(current_user):
    # Si es admin, ve todo. Si es cliente, solo lo suyo.
    if current_user.role == 'admin':
        shipments = Shipment.query.all()
    else:
        shipments = Shipment.query.filter_by(user_id=current_user.id).all()

    return jsonify([s.to_dict() for s in shipments]), 200

def create_shipment(current_user):
    data = request.get_json()
    new_shipment = Shipment(
        user_id=current_user.id,
        origin=data.get('origin'),
        destination=data.get('destination'),
        recipient_name=data.get('recipient_name'),
        recipient_address=data.get('recipient_address'),
        recipient_phone=data.get('recipient_phone'),
        weight=data.get('weight'),
        package_type=data.get('package_type'),
        cost=data.get('cost', 0.0) # Podrías calcularlo aquí
    )
    # Usamos el método definido en el modelo para el código de guía
    new_shipment.code = new_shipment.generate_code()

    db.session.add(new_shipment)
    db.session.commit()

    return jsonify(new_shipment.to_dict()), 201

def update_shipment(id):
    shipment = Shipment.query.get_or_404(id)
    data = request.get_json()

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
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error al actualizar", "error": str(e)}), 500

def delete_shipment(id):
    shipment = Shipment.query.get_or_404(id)
    db.session.delete(shipment)
    db.session.commit()
    return jsonify({"message": f"Envío {id} eliminado correctamente"}), 200