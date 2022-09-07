from django.urls import path
from .views import *

app_name='order'
urlpatterns = [
    path('getAllorder/',OrderView.as_view(), name='getAllOrder'),
    path('getDetaildOrder/<int:pk>', DetaildOrderView.as_view(), name='getOneOrder'),
    path('orderdProducts/<int:pk>', OrderedProductsView.as_view(), name='getOneOrder'),
    path('update/<int:pk>', OrderView.as_view(), name='updateOrder'),
    path('delete/<int:pk>', OrderView.as_view(), name='deleteOrder'),  
    path('placeOrder/', PlaceOrderView.as_view(), name='placeOrder'),  
    path('paymentUpdate/<int:pk>', UpdatePaymentView.as_view(), name='updatePayment'),
    path('user/orders/<int:pk>', UserOrdersView.as_view(), name='userOrders'),
    

]