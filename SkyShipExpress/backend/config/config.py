import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'skyship-secret-key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'skyship-jwt-key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///skyship.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
