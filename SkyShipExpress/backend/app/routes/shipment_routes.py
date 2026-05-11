from flask import Blueprint, jsonify, request

shipment_bp = Blueprint('shipments', __name__)

@shipment_bp.route('/', methods=['GET'])
def get_shipments():
    shipments = [
        {"id": 1, "code": "SKY123456789GT", "destination": "Quetzaltenango", "status": "En Tránsito", "cost": 125.00},
        {"id": 2, "code": "SKY987654321GT", "destination": "Escuintla", "status": "Entregado", "cost": 85.00}
    ]
    return jsonify(shipments), 200

@shipment_bp.route('/', methods=['POST'])
def create_shipment():
    data = request.get_json()
    return jsonify({"message": "Envío creado", "code": "SKY000000001GT", "data": data}), 201

@shipment_bp.route('/<int:id>', methods=['PUT'])
def update_shipment(id):
    data = request.get_json()
    return jsonify({"message": f"Envío {id} actualizado", "data": data}), 200

@shipment_bp.route('/<int:id>', methods=['DELETE'])
def delete_shipment(id):
    return jsonify({"message": f"Envío {id} eliminado"}), 200
