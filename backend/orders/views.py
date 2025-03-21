from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from products.models import Product
from .serializers import OrderSerializer
from decimal import Decimal

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    data = request.data

    # Ensure there are items in the order
    if not data.get('items'):
        return Response({'detail': 'No items in the order'}, status=status.HTTP_400_BAD_REQUEST)

    # Validate billing details and payment method
    required_fields = ['address', 'city', 'postal_code', 'country', 'payment_method']
    for field in required_fields:
        if field not in data or not data[field].strip():
            return Response({'detail': f'{field} is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the Order
    order = Order.objects.create(
        user=user,
        total_price=0,  # Will be updated later
        payment_status=False,
        delivery_status='Processing',
        shipping_cost=5.00,  # Example shipping cost
        tax=0.05,  # Example tax percentage (5%)
        
        # Billing Details
        address=data['address'],
        city=data['city'],
        postal_code=data['postal_code'],
        country=data['country'],
        
        # Payment Method
        payment_method=data['payment_method']
    )

    total_price = 0
    for item in data['items']:
        try:
            product = Product.objects.get(id=item['product_id'])
        except Product.DoesNotExist:
            return Response({'detail': f"Product with ID {item['product_id']} not found."}, status=status.HTTP_404_NOT_FOUND)

        order_item = OrderItem.objects.create(
            order=order,
            product=product,
            quantity=item['quantity'],
            total_price=product.price * item['quantity']
        )
        total_price += order_item.total_price

    # Calculate tax and update total price
    tax_amount = total_price * Decimal(str(order.tax))
    shipping_cost = Decimal(str(order.shipping_cost))
    order.total_price = total_price + tax_amount + shipping_cost
    order.save()

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    if request.user.is_staff:
        orders = Order.objects.all()
    else:
        orders = Order.objects.filter(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_order_by_id(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({"detail": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def mark_order_delivered(request, id):
    try:
        order = Order.objects.get(id=id)
    except Order.DoesNotExist:
        return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Update delivery status to Delivered
    order.delivery_status = "Delivered"
    order.save()
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)