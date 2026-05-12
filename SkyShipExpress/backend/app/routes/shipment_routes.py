from flask import Blueprint, jsonify, request

from flask import Blueprint, request, jsonify
from app.controllers.shipment_controller import (
    get_shipments, create_shipment, update_shipment, delete_shipment
)
from app.middleware.auth_middleware import token_required

shipment_bp = Blueprint('shipments', __name__)

@shipment_bp.route('/', methods=['GET'])
@token_required
def list_shipments(current_user):
    return get_shipments(current_user)

@shipment_bp.route('/', methods=['POST'])
@token_required
def new_shipment(current_user):
    return create_shipment(current_user)

@shipment_bp.route('/<int:id>', methods=['PUT'])
@token_required
def edit_shipment(current_user, id):
    # Solo el admin puede editar según el enunciado
    if current_user.role != 'admin':
        return jsonify({"message": "Acceso denegado"}), 403
    return update_shipment(id)

@shipment_bp.route('/<int:id>', methods=['DELETE'])
@token_required
def remove_shipment(current_user, id):
    # Solo el admin puede eliminar
    if current_user.role != 'admin':
        return jsonify({"message": "Acceso denegado"}), 403
    return delete_shipment(id)