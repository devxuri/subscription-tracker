from rest_framework import viewsets
from api.models import Subscription
from api.serializers.serializers import SubscriptionSerializer
from rest_framework.permissions import IsAuthenticated
from api.permissions.permissions import IsOwner


class SubscriptionViewSet(viewsets.ModelViewSet):

    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Subscription.objects.filter(user_id=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)
    