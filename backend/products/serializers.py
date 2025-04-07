from rest_framework import serializers
from .models import Product, Category, Favorite, CartItem, Review
from django.db.models import Avg, Count

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    rating = serializers.SerializerMethodField()
    num_reviews = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['is_active']

    def get_rating(self, obj):
        average = Review.objects.filter(product=obj).aggregate(avg_rating=Avg('rating'))['avg_rating']
        return round(average, 1) if average is not None else 0.0
    
    def get_num_reviews(self, obj):
        return Review.objects.filter(product=obj).count()


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

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'user_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at']
