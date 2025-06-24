from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
# Create your views here.

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]

class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all()
        query = self.request.query_params.get('q')
        if query:
            queryset = queryset.filter(
                Q(name__icontains=query) | Q(category__name__icontains=query)
            )
        return queryset

class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]