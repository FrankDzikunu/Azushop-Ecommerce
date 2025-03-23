from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes  
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import status
from .serializers import UserSerializer
from rest_framework import generics

@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    username = data.get('name')  # Use "name" as the username
    
    if not username:
        return Response({'detail': 'Full name is required'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'detail': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(
        username=username,
        email=data.get('email'),
        password=data.get('password')
    )
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    data = request.data
    username_or_email = data.get('username_or_email')
    password = data.get('password')

    if not username_or_email or not password:
        return Response({'detail': 'Username/Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    # If input contains '@', assume it's an email
    if "@" in username_or_email:
        try:
            user = User.objects.get(email__iexact=username_or_email)
            username = user.username  # Convert to username
        except User.DoesNotExist:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        username = username_or_email

    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "username": user.username,
            "email": user.email,
            "isAdmin": user.is_staff,  # Important: Identifies admin users
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })
    
    return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    
    user.delete()
    return Response({"detail": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)