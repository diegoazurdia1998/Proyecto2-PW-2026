from flask import Blueprint, jsonify, request
from app.middleware.auth_middleware import token_required
from app.controllers.admin_controller import get_admin_stats

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/stats', methods=['GET'])
@token_required
def get_stats(current_user):
    if current_user.role != 'admin':
        return {"message": "Acceso denegado"}, 403
    return get_admin_stats()