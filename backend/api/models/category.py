from django.db import models

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('User', on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.user_id.firebase_uid})"
