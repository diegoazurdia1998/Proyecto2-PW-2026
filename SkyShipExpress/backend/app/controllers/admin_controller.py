from flask import jsonify
from sqlalchemy import func
from SkyShipExpress.backend.app.models.user import User
from SkyShipExpress.backend.app.models.shipment import Shipment
from SkyShipExpress.backend.app import db

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