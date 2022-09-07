from django.urls import path
from product.views import ProductView , DetailedProductView ,UpdateProductView

app_name='product'
urlpatterns = [
    path('add/', ProductView.as_view(), name='addProduct'),
    path('getAllproduct/',ProductView.as_view(), name='getAllproduct'),
    path('getDetailedProduct/<int:pk>', DetailedProductView.as_view(), name='getOneProduct'),
    path('update/<int:pk>', UpdateProductView.as_view(), name='updateProduct'),
    path('delete/<int:pk>', ProductView.as_view(), name='deleteProduct'), 
]