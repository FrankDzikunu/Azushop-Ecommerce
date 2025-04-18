from django.urls import path
from .views import (
    ProductDetailView,
    ProductListCreateView,
    get_categories,
    favorite_view,
    cart_view,
    categories_view,
    product_detail,
    product_reviews, 
    submit_review, 
    related_products
)
urlpatterns = [
    path('categories/', get_categories, name='category-list'),
    path('products/', ProductListCreateView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('category/', categories_view, name='categories'),
    path('category/<int:pk>/', categories_view, name='category-update'),
    path('product/<int:id>/', product_detail, name='product-detail'),

    # Endpoints that require authentication:
    path('favorites/', favorite_view, name='favorite-list'),
    path('favorites/<int:product_id>/', favorite_view, name='favorite-add-remove'),
    path('cart/', cart_view, name='cart-list'),
    path('cart/<int:product_id>/', cart_view, name='cart-add-remove'),

    path('products/<int:product_id>/reviews/', product_reviews, name='product-reviews'),
    path('products/<int:product_id>/review/', submit_review, name='submit-review'),
    path('products/<int:product_id>/related/', related_products, name='related-products'),
]
