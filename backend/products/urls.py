from django.urls import path, include
from .views import (
    ProductListAPIView, 
    ProductDetailAPIView, 
    CategoryDetailAPIView,
    CategoryListAPIView
)

urlpatterns = [
    path('', ProductListAPIView.as_view(), name='product-list'),
    path('<slug:slug>/', ProductDetailAPIView.as_view(), name='product-detail'),

    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('categories/<slug:slug>/', CategoryDetailAPIView.as_view(), name='category-detail')
]