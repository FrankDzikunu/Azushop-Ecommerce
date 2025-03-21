from django.contrib.auth.models import User
from rest_framework import serializers
from products.models import Product

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Password won't be exposed in responses
    class Meta:
        model = User
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'