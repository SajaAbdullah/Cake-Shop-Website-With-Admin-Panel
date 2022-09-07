from django.db import models
from django.conf import settings
from django.utils import timezone
from order.models import Address , Payment


# Create your models here.
class DecorationImage(models.Model):
    imagetopdecoration_id= models.IntegerField()
    image = models.ImageField(upload_to='tool')
    name = models.CharField(max_length = 30 , default='No Image')


class SpongFlavor(models.Model):
    flavor_id= models.IntegerField()
    flavor_name = models.CharField(max_length = 50 )

class MsgColor(models.Model):
    msg_color_id= models.IntegerField()
    color_name = models.CharField(max_length = 50 )
    color_Code = models.CharField(max_length = 15 ,  default="#000000")

class CakeShapeAndLayers(models.Model):
    shape_id = models.CharField(max_length = 30 , default=1)
    cake_shape =models.CharField(max_length = 30 , default='Round Shape Cake')
    layer_id= models.IntegerField()
    layer_description = models.CharField(max_length = 300)

class Icing(models.Model):
    fillingtopdecoration_id= models.IntegerField()
    decoration_name = models.CharField(max_length = 50 )

class FinalProductImg(models.Model):
   finalProductImg = models.ImageField(upload_to='tool')
   icing=models.IntegerField(default= 0)
   cake= models.IntegerField(default= 0)
   flavor= models.IntegerField(default= 0)


class CustomCake(models.Model):
   amount=models.FloatField()
   msg_on_cake=models.CharField(max_length = 50 , null=True, blank=True ,default='' )
   special_instruction= models.CharField(max_length = 500 ,null=True, blank=True ,default='' )
   order_Status = models.CharField(max_length=30 , default='Order Pending')
   finalProduct = models.ForeignKey(FinalProductImg ,on_delete=models.SET_NULL, null=True, blank=True ,default='')
   Icing=models.ForeignKey(Icing ,on_delete=models.SET_NULL, null=True, blank=True ,default='')
   Top_Img_Decoration= models.ForeignKey(DecorationImage ,on_delete=models.SET_NULL, null=True, blank=True ,default='')
   Cake_Shape_layers= models.ForeignKey(CakeShapeAndLayers ,on_delete=models.SET_NULL, null=True, blank=True ,default='')
   msg_color= models.ForeignKey(MsgColor ,on_delete=models.SET_NULL, null=True, blank=True ,default='')
   sponge_Flavor= models.ForeignKey(SpongFlavor ,on_delete=models.SET_NULL, null=True, blank=True ,default='')
   customer = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE, null=True, blank=True ,default='')


class CustomCakeOrder(models.Model):  #this is class
    order_Placment_Date = models.DateField(auto_now_add=True)
    order_Placment_Time = models.TimeField(auto_now_add=True)
    order_Delivery_Date =models.DateTimeField(default=timezone.now, blank= True)
    order_Delivery_Time =models.CharField(max_length=30 , default='2PM - 4PM')
    address = models.ForeignKey(Address ,on_delete=models.SET_DEFAULT,default='')
    payment = models.ForeignKey(Payment , on_delete=models.CASCADE,default= 1)
    delivery_Charges=models.FloatField(max_length=5,default='200')
    CustomCake =models.ForeignKey(CustomCake , on_delete=models.CASCADE , null=True, blank=True ,default='')

