from flask import Blueprint
from app.controllers.contact_controller import handle_contact, recent_contacts
contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/', methods=['POST'])
def create_contact_message():
    return handle_contact()

