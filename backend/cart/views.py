from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
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

    
    def create(self, request, *args, **kwargs):
        user = request.user
        product_id = request.data.get('product_id')

        if not product_id:
            return Response({"detail": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart_item = CartItem.objects.get(user=user, product_id=product_id)
            cart_item.quantity += 1
            cart_item.save()
            serializer = self.get_serializer(cart_item)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except CartItem.DoesNotExist:
            return super().create(request, *args, **kwargs)