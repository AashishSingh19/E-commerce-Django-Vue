from orders.models import Order, OrderItem
from rest_framework import serializers
from products.serializers import ProductSerializer
from products.models import Product
from cart.models import CartItem

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            'id', 'product','quantity','price'
        ]

class CreateOrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product')

    class Meta:
        model = OrderItem
        fields = [
            'product_id', 'quantity'
        ]

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [ 'id', 'user', 'address', 'phone', 'payment_method', 'created_at', 'total_price', 'items']

class CreateOrderSerializer(serializers.ModelSerializer):
    items = CreateOrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [ 'address', 'phone', 'payment_method', 'items']

    def create(self, validated_data):
        user = self.context['request'].user
        items_data = validated_data.pop('items')
        order = Order.objects.create(user=user, **validated_data, total_price=0)

        total = 0

        for item in items_data:
            product = item['product']
            quantity = item['quantity']
            price = product.price
            OrderItem.objects.create(order=order, product=product, quantity=quantity, price=price)
            total += price * quantity

        order.total_price = total
        order.save()

        CartItem.objects.filter(user=user).delete()

        return order
    
    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("At least one item is required to place an order.")
        return value