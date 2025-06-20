from django.shortcuts import render
from .models import User
from .serializers import UserSerializer
from rest_framework import generics, permissions

# Create your views here.

class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user