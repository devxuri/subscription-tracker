from django.urls import include, path
from api.views.user_views import create_user, get_users, user_detail, CurrentUserView
from api.views.subscription_views import SubscriptionViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'subscriptions', SubscriptionViewSet, basename='subscription')

urlpatterns = [
    path('', include(router.urls)),
    path('users/', get_users, name='get_users'),
    path('users/create/', create_user, name='create_user'),
    path('users/<int:pk>', user_detail, name='user_detail'),
    path('auth/', CurrentUserView.as_view(), name='current_user'),
]