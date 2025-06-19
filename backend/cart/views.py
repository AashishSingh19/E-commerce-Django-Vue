from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from .models import CartItem
from .serializers import CartItemSerializer

# Create your views here.

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)