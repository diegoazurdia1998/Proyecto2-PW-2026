from app import db
from datetime import datetime
import random, string

class Shipment(db.Model):
    __tablename__ = 'shipments'

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(20), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    recipient_name = db.Column(db.String(100))
    recipient_address = db.Column(db.String(200))
    recipient_phone = db.Column(db.String(20))
    weight = db.Column(db.Float)
    package_type = db.Column(db.String(50))
    status = db.Column(db.String(30), default='Pendiente')
    cost = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def generate_code(self):
        chars = string.digits
        return 'SKY' + ''.join(random.choices(chars, k=9)) + 'GT'

    def to_dict(self):
        return {
            "id": self.id,
            "code": self.code,
            "user_id": self.user_id,
            "origin": self.origin,
            "destination": self.destination,
            "recipient_name": self.recipient_name,
            "recipient_address": self.recipient_address,
            "recipient_phone": self.recipient_phone,
            "weight": self.weight,
            "package_type": self.package_type,
            "status": self.status,
            "cost": self.cost,
            "created_at": self.created_at.isoformat()
        }
