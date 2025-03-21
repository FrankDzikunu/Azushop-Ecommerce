from django.urls import path
from .views import create_order, get_orders, get_order_by_id, mark_order_delivered

urlpatterns = [
    path('create/', create_order, name='create-order'),
    path('', get_orders, name='get-orders'),
    path("<int:order_id>/", get_order_by_id, name="get_order_by_id"),
    path('<int:id>/mark-delivered/', mark_order_delivered, name='mark-order-delivered'),
]
