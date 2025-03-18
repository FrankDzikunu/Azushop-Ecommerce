from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # User Authentication
    path('api/', include('products.urls')),  # Product Management
    path('api/orders/', include('orders.urls')),

 
]
