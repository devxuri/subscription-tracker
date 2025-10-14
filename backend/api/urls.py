from django.urls import path
from api.views.views import create_user, get_users, user_detail, CurrentUserView

urlpatterns = [
    path('users/', get_users, name='get_users'),
    path('users/create/', create_user, name='create_user'),
    path('users/<int:pk>', user_detail, name='user_detail'),
    path('auth/', CurrentUserView.as_view(), name='current_user'),
]