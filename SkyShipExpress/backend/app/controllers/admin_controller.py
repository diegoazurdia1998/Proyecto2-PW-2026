from flask import jsonify
from sqlalchemy import func, true
from app.models.user import User
from app.models.shipment import Shipment
from app import db
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import logging

logger = logging.getLogger(__name__)

def get_admin_stats():
    total_shipments = Shipment.query.count()
    total_users = User.query.filter_by(role='cliente').count()
    total_revenue = db.session.query(func.sum(Shipment.cost)).scalar() or 0

    # Datos simplificados para los gráficos
    return jsonify({
        "totalShipments": total_shipments,
        "totalUsers": total_users,
        "estimatedRevenue": f"Q {total_revenue:,.2f}",
        "monthlyData": [ # Aquí podrías hacer queries por mes
            {"month": "May", "envios": total_shipments}
        ],
        "departmentData": [
            {"name": "Guatemala", "value": total_shipments, "color": "#00AEEF"}
        ]
    }), 200

def delete_user(user_id):
    """
    Elimina un usuario y sus envíos asociados (si no hay cascade configurado).
    Devuelve (payload, status_code).
    """
    try:
        user = User.query.get(user_id)
        if not user:
            return {"message": "Usuario no encontrado"}, 404

        # Si tu modelo User tiene relationship con cascade="all, delete-orphan",
        # basta con borrar el user y SQLAlchemy eliminará los envíos relacionados.
        # Si no tienes cascade, elimina manualmente los envíos asociados primero:
        if hasattr(user, "shipments") and user.shipments:
            # ejemplo: user.shipments es una lista de Shipment
            for s in list(user.shipments):
                db.session.delete(s)

        db.session.delete(user)
        db.session.commit()
        return {"message": f"Usuario {user_id} eliminado"}, 200

    except IntegrityError as ie:
        db.session.rollback()
        logger.warning("IntegrityError al eliminar usuario %s: %s", user_id, ie)
        return {"message": "Error de integridad al eliminar usuario"}, 400
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error("Error de base de datos al eliminar usuario %s", user_id, exc_info=e)
        return {"message": "Error interno al eliminar usuario"}, 500
    except Exception as ex:
        db.session.rollback()
        logger.exception("Error inesperado al eliminar usuario %s", user_id)
        return {"message": "Error inesperado"}, 500