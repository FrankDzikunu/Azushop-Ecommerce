from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Laptop', 'Laptop'),
        ('Phone', 'Phone'),
        ('Camera', 'Camera'),
        ('Watch', 'Watch'),
        ('Tablet', 'Tablet'),
    ]

    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)
    brand = models.CharField(max_length=100, default="Unknown")
    count_in_stock = models.IntegerField(default=1)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="Phone")
    description = models.TextField()
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
