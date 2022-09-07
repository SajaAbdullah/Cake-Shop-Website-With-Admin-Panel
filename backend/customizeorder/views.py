from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from users.models import User
from users.errorrRenderers import UserRenderer
from .models import *
from order.serializer import AddressSerializer , PaymentSerializer ,PhoneNumberSerializer
from customizeorder.serializer import *


# Create your views here.

class CustomizeOrderView(APIView):
   renderer_classes = [UserRenderer]

   def get(self, request, format=None):
      order = CustomCake.objects.all()
      serializer = GetAllSerializer(order, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)

   def put(self, request, pk, format=None):
       orderRes = CustomCake.objects.get(id=pk)
       
       Orderstatus = request.data.pop("order_Status")
       if Orderstatus == "Delivered":
         cakeOrder= CustomCakeOrder.objects.get(CustomCake = pk)
         payment =cakeOrder.payment
         payment.amount_Paid = orderRes.amount
         payment.payment_Status = "Paid"
         payment.save()

       serializer = CustomCakeUpdateSerializer(orderRes, data=request.data)
       # validate and update
       if serializer.is_valid(raise_exception=ValueError):
         orderRes.order_Status = Orderstatus
         orderRes.save()
         return Response(serializer.data, status=status.HTTP_200_OK) 
       else:
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
   def post(self, request, format=None):
     print(request.data)

     customer = request.user

     icing_id =request.data.get('fillingtopdecoration_id')
     layer_id= request.data.get('layer_id')
     spongeflavor_id = request.data.get('spongeflavor_id')      
     IcingInstance = Icing.objects.get(fillingtopdecoration_id=icing_id) 
     finalProductInstance = FinalProductImg.objects.get(cake=layer_id, icing = icing_id , flavor = 0 )
 
     Cake_Shape_layersInstance = CakeShapeAndLayers.objects.get(layer_id= layer_id)
     sponge_FlavorInstance = SpongFlavor.objects.get(flavor_id=spongeflavor_id) 
     msg_colorInstance = MsgColor.objects.get(msg_color_id=request.data.get('msg_color_id')) 
     Top_Img_DecorationInstance = DecorationImage.objects.get(imagetopdecoration_id=request.data.get('imagetopdecoration_id'))
     
     CustomCakeSerilizer = PostSerializer(data =request.data)

     if CustomCakeSerilizer.is_valid(raise_exception=ValueError):
         CustomCakeOrder = CustomCake.objects.create(
            **CustomCakeSerilizer.data,
             order_Status='Order Pending',
            Top_Img_Decoration =Top_Img_DecorationInstance,
            Cake_Shape_layers=Cake_Shape_layersInstance ,
            msg_color =msg_colorInstance,
            finalProduct = finalProductInstance,
            Icing=IcingInstance ,
            customer =customer,
            sponge_Flavor  = sponge_FlavorInstance)
         createdObject = GetAllSerializer(CustomCakeOrder)
         return Response(createdObject.data, status=status.HTTP_201_CREATED)
     else:
         return Response(CustomCakeSerilizer.errors, status=status.HTTP_400_BAD_REQUEST)

     

class UserCustomizeOrderView(APIView):
   renderer_classes = [UserRenderer]

   def get(self, request, pk ,format=None):
      order = CustomCake.objects.get(id = pk)
      serializer = GetAllSerializer(order)
      return Response(serializer.data, status=status.HTTP_200_OK)

class DetaildCustomOrderView(APIView):
   renderer_classes = [UserRenderer]

   def get(self, request, pk ,format=None):
      order = CustomCakeOrder.objects.get(CustomCake = pk)
      serializer = DetaildCustomOrderSerializer(order)
      return Response(serializer.data, status=status.HTTP_200_OK)

   def post(self, request, format=None):

       addressData = request.data.pop('address')
       addressSerializer = AddressSerializer(data=addressData)
       if addressSerializer.is_valid(raise_exception=ValueError):
          address = addressSerializer.save()
       else:
          return Response(addressSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

       paymentData = request.data.pop('payment')
       paymentSerializer = PaymentSerializer(data=paymentData)
       if paymentSerializer.is_valid(raise_exception=ValueError):
          payment = paymentSerializer.save()
       else:
          return Response(paymentSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

       CustomCakeData =request.data.pop('CustomOrder')
       CustomCakeinstence = CustomCake.objects.get(pk = CustomCakeData)
       print(CustomCakeinstence)

       user = CustomCakeinstence.customer
       serilizeUser = PhoneNumberSerializer(data=request.data)
       if serilizeUser.is_valid(raise_exception=True):
          user.phone_Number = request.data.get("phone_Number")
          user.address = address
          user.save()
       else:
         return Response(serilizeUser.errors, status=status.HTTP_400_BAD_REQUEST)

       orderSerializer = CustomOrderPostSerializer(data=request.data)
       if orderSerializer.is_valid(raise_exception=ValueError):
          order = CustomCakeOrder.objects.create(
              **orderSerializer.data, address=address, payment=payment ,CustomCake = CustomCakeinstence )
       else:
          return Response(orderSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

       completeOrder = DetaildCustomOrderSerializer(order)
       return Response(completeOrder.data, status=status.HTTP_201_CREATED)
      

class GetProfileCustomizeOrderView(APIView):
   renderer_classes = [UserRenderer]

   def get(self, request, pk, format=None):
      orderCustomCake = CustomCake.objects.filter(customer= pk)
      array =[]
      for CustomOrder in orderCustomCake:
        order = CustomCakeOrder.objects.get(CustomCake = CustomOrder.id)
        array.append(order)
      
      serializer = DetaildCustomOrderSerializer(array , many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)