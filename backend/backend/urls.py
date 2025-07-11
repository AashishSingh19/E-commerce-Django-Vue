from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/products/', include('products.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/users/profile/', include('users.urls')),
    
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),  
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('api/', include('orders.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
