from django.urls import path
from .views import ProductListCreateView, ProductDetailView, categories_view, product_detail, category_list

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('categories/', categories_view, name='categories'),
    path('categories/<int:pk>/', categories_view, name='category-update'),
    path('api/products/<int:id>/', product_detail, name='product-detail'),
    path('api/categories/', category_list, name='category-list'),
]
