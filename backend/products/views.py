from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .models import Product, Category, Favorite, CartItem, Review
from orders.models import OrderItem 
from .serializers import ProductSerializer, CategorySerializer, FavoriteSerializer, CartItemSerializer, ReviewSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt


# Public endpoint to get categories
@api_view(['GET'])
@permission_classes([AllowAny])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

# Public endpoint to get active products
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

# Endpoint for product detail (read-only for public)
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_destroy(self, instance):
        # Instead of deleting, mark as inactive
        instance.is_active = False
        instance.save()
        return Response({"message": "Product removed from shop"}, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def categories_view(request, pk=None):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        if not pk:
            return Response({"detail": "Category ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            category_obj = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response({"detail": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CategorySerializer(category_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def product_detail(request, id):
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        product.delete()
        return Response({"message": "Product deleted successfully"}, status=204)
    
@api_view(['GET'])
@permission_classes([AllowAny])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def favorite_view(request, product_id=None):
    user = request.user

    if request.method == 'GET':
        favorites = Favorite.objects.filter(user=user)
        serializer = FavoriteSerializer(favorites, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        if not product_id:
            return Response({"error": "Product ID required"}, status=400)
        product = Product.objects.get(id=product_id)
        Favorite.objects.get_or_create(user=user, product=product)
        return Response({"message": "Added to favorites"}, status=201)

    elif request.method == 'DELETE':
        if not product_id:
            return Response({"error": "Product ID required"}, status=400)
        try:
            favorite = Favorite.objects.get(user=user, product_id=product_id)
            favorite.delete()
            return Response({"message": "Removed from favorites"}, status=204)
        except Favorite.DoesNotExist:
            return Response({"error": "Not in favorites"}, status=404)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def cart_view(request, product_id=None):
    user = request.user

    if request.method == 'GET':
        # If a product_id is provided, return only that cart item
        if product_id is not None:
            try:
                cart_item = CartItem.objects.get(user=user, product__id=product_id)
                serializer = CartItemSerializer(cart_item)
                return Response(serializer.data)
            except CartItem.DoesNotExist:
                return Response({"error": "Cart item not found"}, status=404)
        else:
            cart_items = CartItem.objects.filter(user=user)
            serializer = CartItemSerializer(cart_items, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        if not product_id:
            return Response({"error": "Product ID required"}, status=400)
        product = Product.objects.get(id=product_id)
        cart_item, created = CartItem.objects.get_or_create(user=user, product=product)
        if not created:
            cart_item.quantity += 1
            cart_item.save()
        return Response({"message": "Added to cart"}, status=201)

    elif request.method == 'PUT':
        if not product_id:
            return Response({"error": "Product ID required"}, status=400)
        try:
            cart_item = CartItem.objects.get(user=user, product__id=product_id)
            new_quantity = request.data.get("quantity", 1)
            cart_item.quantity = new_quantity
            cart_item.save()
            return Response({"message": "Cart updated"}, status=200)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not in cart"}, status=404)

    elif request.method == 'DELETE':
        if not product_id:
            return Response({"error": "Product ID required"}, status=400)
        deleted_count, _ = CartItem.objects.filter(user=user, product__id=product_id).delete()
        cart_items = CartItem.objects.filter(user=user)
        serializer = CartItemSerializer(cart_items, many=True)
        if deleted_count > 0:
            return Response({"message": "Removed from cart", "cart": serializer.data}, status=200)
        else:
            return Response({"message": "Item not in cart", "cart": serializer.data}, status=200)


    
@api_view(['GET'])
@permission_classes([AllowAny])
def product_reviews(request, product_id):
    reviews = Review.objects.filter(product__id=product_id).order_by("-created_at")
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_review(request, product_id):
    user = request.user

    # Check if user purchased the product by traversing the related Order
    has_purchased = OrderItem.objects.filter(order__user=user, product_id=product_id).exists()
    if not has_purchased:
        return Response({"error": "You must purchase the product to review it."}, status=403)

    data = request.data.copy()
    data["product"] = product_id
    serializer = ReviewSerializer(data=data, context={"request": request})
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)



@api_view(['GET'])
@permission_classes([AllowAny])
def related_products(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    
    related = Product.objects.filter(category=product.category, is_active=True).exclude(id=product.id)
    serializer = ProductSerializer(related, many=True)
    return Response(serializer.data)
