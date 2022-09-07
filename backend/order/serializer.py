from itertools import product
from msilib.schema import Class
from pyexpat import model
from rest_framework import serializers
from order.models import *
from users.models import User
from product.models import Product ,Image_Gallery
import re



class AddressSerializer(serializers.ModelSerializer):
  class Meta:
    model= Address
    fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model= User
    fields = ['id','first_Name','last_Name','phone_Number'] 

class PaymentSerializer(serializers.ModelSerializer):
  class Meta:
    model= Payment
    fields = "__all__"

class AllOrderSerializer(serializers.ModelSerializer):
  address= AddressSerializer()
  class Meta:
    model = Order
    fields = ['order_Id','order_Status', 'order_Placment_Date','order_Placment_Time', 'customer','payment','total_Amount','address']

class ImageGallerySerializer(serializers.ModelSerializer):
  class Meta:
    model = Image_Gallery
    fields =  "__all__"

class ProductsSerializer(serializers.ModelSerializer):
  imageGallery=ImageGallerySerializer()
  class Meta:
    model = Product
    fields = ['product_Id', 'product_Name','imageGallery','product_Price']


class DetailedOrderSerializer(serializers.ModelSerializer):
  address= AddressSerializer()
  customer=UserSerializer()
  payment=PaymentSerializer() 
  class Meta:
    model = Order
    fields = "__all__"



class OrderedProductsSerializer(serializers.ModelSerializer):
  product_Id= ProductsSerializer()
  class Meta:
    model= Ordered_Product
    fields = "__all__"

class OrderUpdateSerializer(serializers.ModelSerializer):
  class Meta:
    model = Order
    fields = ['order_Status']

  
class OrderPostSerializer(serializers.ModelSerializer):
    class Meta:
      model = Order
      fields = ['order_Status','delivery_Charges','total_Amount','note','order_Delivery_Time','order_Delivery_Date']


class PlaceOrderdProductsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = ['product_Id','quantity']


class PhoneNumberSerializer(serializers.ModelSerializer):
  class Meta:
    model= User
    fields = ['phone_Number'] 

class UpdatePaymentSerializer(serializers.ModelSerializer):
  class Meta:
    model= Payment
    fields = ['amount_Paid', 'payment_Status']