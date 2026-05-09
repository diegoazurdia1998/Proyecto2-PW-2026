from app import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(200))
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='cliente')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    shipments = db.relationship('Shipment', backref='user', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "role": self.role,
            "created_at": self.created_at.isoformat()
        }
