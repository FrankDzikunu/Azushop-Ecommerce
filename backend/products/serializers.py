from rest_framework import serializers
from .models import Product, Category, Favorite, CartItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class FavoriteSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(source='product', read_only=True)
    class Meta:
        model = Favorite
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(source='product', read_only=True)
    class Meta:
        model = CartItem
        fields = '__all__'
