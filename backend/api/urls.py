from django.urls import path
from .views import get_users, delete_user
from .views import register_user, login_user
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', register_user, name='register'),
    path('users/', get_users, name='get_users'),
    path('users/<int:id>/', delete_user, name='delete-user'),
    path('login/', login_user, name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
