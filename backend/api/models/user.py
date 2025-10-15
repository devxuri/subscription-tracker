from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    firebase_uid = models.CharField(max_length=128, unique=True)
    created_at = models.DateTimeField(auto_now_add=True) #  Created time when the user is created
    updated_at = models.DateTimeField(auto_now=True)  # Updated time whenever the user is modified

    def __str__(self):
        return f"User {self.user_id} - {self.firebase_uid}"

    @property
    def is_authenticated(self):
        return True