from flask import jsonify
from sqlalchemy import func, true
from app.models.user import User
from app.models.shipment import Shipment
from app.models.contact import Contact
from app import db
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy import func, extract
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

def get_admin_stats():
    total_shipments = Shipment.query.count()
    total_users = User.query.filter_by(role='cliente').count()
    total_revenue = db.session.query(func.sum(Shipment.cost)).scalar() or 0
    # ============================================================
    # Actividad Reciente: últimos contactos
    # ============================================================
    recent_contacts = Contact.query.order_by(Contact.created_at.desc()).limit(5).all()

    recent_activity = []
    for contact in recent_contacts:
        # Formatear la fecha/hora de forma legible
        time_str = contact.created_at.strftime("%d/%m/%Y %H:%M") if contact.created_at else "Fecha desconocida"

        recent_activity.append({
            "id": contact.id,
            "client": contact.name,
            "email":contact.email,
            "action": contact.subject if contact.subject else "Nuevo mensaje de contacto",
            "time": time_str
        })
    # ------------------------------------------------------------
    # 1. DATOS MENSUALES (últimos 12 meses)
    # ------------------------------------------------------------
    one_year_ago = datetime.now() - timedelta(days=365)

    # Agrupamos por año y mes (funciona en PostgreSQL, MySQL, SQLite)
    monthly_query = db.session.query(
        extract('year', Shipment.created_at).label('year'),
        extract('month', Shipment.created_at).label('month'),
        func.count(Shipment.id).label('count')
    ).filter(Shipment.created_at >= one_year_ago) \
        .group_by('year', 'month') \
        .order_by('year', 'month') \
        .all()

    month_names = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                   'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    monthly_data = []
    for row in monthly_query:
        month_str = f"{month_names[int(row.month)-1]} {row.year}"
        monthly_data.append({
            "month": month_str,
            "envios": row.count
        })

    # ------------------------------------------------------------
    # 2. DATOS POR DEPARTAMENTO
    # ------------------------------------------------------------
    dept_query = db.session.query(
        Shipment.origin,
        func.count(Shipment.id).label('count')
    ).filter(Shipment.origin.isnot(None)) \
        .group_by(Shipment.origin) \
        .order_by(func.count(Shipment.id).desc()) \
        .all()

    # Paleta de colores fija para consistencia visual
    colors = ['#00AEEF', '#FF6B6B', '#4ECDC4', '#FFE66D',
              '#1A535C', '#FF9F1C', '#2EC4B6', '#E71D36',
              '#F9DC5C', '#C23373']
    department_data = []
    for idx, (dept, count) in enumerate(dept_query):
        department_data.append({
            "name": dept or "Sin departamento",
            "value": count,
            "color": colors[idx % len(colors)]
        })

    return jsonify({
        "totalShipments": total_shipments,
        "totalUsers": total_users,
        "estimatedRevenue": f"Q {total_revenue:,.2f}",
        "monthlyData": monthly_data,
        "departmentData": department_data,
        "recentActivity": recent_activity
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