from django.urls import path, include
from .views import UserDetailView

urlpatterns = [
    path('', UserDetailView.as_view(), name='user-profile')
]