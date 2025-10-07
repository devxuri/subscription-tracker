from django.contrib import admin

# Register your models here.
from api.models import *
from api.models.category import Category

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Subscription)