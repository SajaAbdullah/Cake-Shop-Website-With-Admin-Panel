from rest_framework import serializers
from .models import *
from users.crudSerializer import UserUpdateSerializer
from order.serializer import AddressSerializer , PaymentSerializer ,PhoneNumberSerializer


class DecorationImageSerializer(serializers.ModelSerializer):
  class Meta:
    model= DecorationImage
    fields = "__all__"


class SpongFlavorSerializer(serializers.ModelSerializer):
  class Meta:
    model= SpongFlavor
    fields = "__all__"


class CakeShapeAndLayersSerializer(serializers.ModelSerializer):
  class Meta:
    model= CakeShapeAndLayers
    fields = "__all__"


class IcingSerializer(serializers.ModelSerializer):
  class Meta:
    model= Icing
    fields = "__all__"

class MsgColorSerializer(serializers.ModelSerializer):
  class Meta:
    model= MsgColor
    fields = "__all__"

class FinalProductImgSerializer(serializers.ModelSerializer):
  class Meta:
    model= FinalProductImg
    fields = ["finalProductImg"]


class GetAllSerializer(serializers.ModelSerializer):
  Icing=IcingSerializer()
  Top_Img_Decoration=DecorationImageSerializer()
  Cake_Shape_layers = CakeShapeAndLayersSerializer()
  msg_color = MsgColorSerializer()
  sponge_Flavor= SpongFlavorSerializer()
  finalProduct=FinalProductImgSerializer()
  customer = UserUpdateSerializer()
  class Meta:
    model= CustomCake
    fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model= CustomCake
    fields = ["amount" , "msg_on_cake" , "special_instruction"]

class CustomCakeUpdateSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomCake
    fields = ['order_Status']


class DetaildCustomOrderSerializer(serializers.ModelSerializer):
  CustomCake = GetAllSerializer()
  address = AddressSerializer()
  payment = PaymentSerializer()
  class Meta:
    model= CustomCakeOrder
    fields = "__all__"

class CustomOrderPostSerializer(serializers.ModelSerializer):
    class Meta:
      model = CustomCakeOrder
      fields = ['delivery_Charges','order_Delivery_Time','order_Delivery_Date']
