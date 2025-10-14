from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth, initialize_app
from rest_framework import exceptions, authentication
from api.models import User
import os


load_dotenv()
FIREBASE_CREDENTIALS = os.getenv('FIREBASE_CREDENTIALS_PATH')

if not firebase_admin._apps:
    cred = credentials.Certificate(FIREBASE_CREDENTIALS)
    firebase_admin.initialize_app(cred)

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None
        
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            raise exceptions.AuthenticationFailed('Invalid Authorization header. Expected: Bearer <token>')
        
        id_token = parts[1]
        try:
            decoded_token = firebase_auth.verify_id_token(id_token)
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Invalid token: {str(e)}')
        
        uid = decoded_token.get('uid')
        user, created = User.objects.get_or_create(firebase_uid=uid)     
        decoded_token['created'] = created

        return (user, decoded_token)