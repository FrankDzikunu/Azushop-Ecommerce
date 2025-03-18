from django.urls import path
from .views import get_users
from .views import ProductListCreateView, ProductDetailView
from .views import register_user, login_user
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', register_user, name='register'),
    path('users/', get_users, name='get_users'),
    path('products/', ProductListCreateView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('login/', login_user, name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
