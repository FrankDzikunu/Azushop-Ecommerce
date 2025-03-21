from django.db import models
from django.contrib.auth.models import User
from products.models import Product

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='OrderItem')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=5.00)
    tax = models.DecimalField(max_digits=5, decimal_places=2, default=0.05)

        # Billing Details
    address = models.CharField(max_length=255, default="Unknown")
    city = models.CharField(max_length=100, default="Unknown")
    postal_code = models.CharField(max_length=20, default="Unknown")
    country = models.CharField(max_length=100, default="Unknown")

        # Payment
    PAYMENT_METHODS = [
        ('paypal', 'PayPal'),
        ('Card', 'Credit Card'),
        ('cod', 'Cash on Delivery')
    ]
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHODS, default="PayPal")
    
    payment_status = models.BooleanField(default=False)
    delivery_status = models.CharField(max_length=20, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
