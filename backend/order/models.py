from operator import mod
from statistics import mode
from django.db import models
from product.models import Product
from django.utils import timezone
from django.conf import settings


# Create your models here.
class Address(models.Model):
    address_Id=models.AutoField(primary_key=True)
    city= models.CharField(max_length= 50)
    area= models.CharField(max_length= 50)
    street_Number= models.PositiveIntegerField()
    house_Number= models.PositiveIntegerField()

class Payment(models.Model):
    options =(
    ('Pending','Pending' ),
    ('Paid','Paid'),
    )
    payment_Id=models.AutoField(primary_key=True)
    payment_Status = models.CharField(max_length=30 , choices= options , default='Pending')
    payment_Type= models.CharField(max_length=20, default='Cash On Delivery')
    amount_Paid=models.FloatField()


class Order(models.Model):  #this is class
    options =(
    ('Order Pending','Order Pending' ),
    ('Order Placed','Order Placed' ),
    ('Under Package','Under Package'),
    ('On The way to deliver','On The way to deliver'),
    ('Delivered' ,'Delivered'),
    ('Canceled' ,'Canceled'),
    )
    order_Id=models.AutoField(primary_key=True)
    order_Status = models.CharField(max_length=30 , choices= options , default='Order Placed')
    order_Placment_Date = models.DateField(auto_now_add=True)
    order_Placment_Time = models.TimeField(auto_now_add=True)
    order_Delivery_Date =models.DateTimeField(default=timezone.now, blank= True)
    order_Delivery_Time =models.CharField(max_length=30 , default='2PM - 4PM')
    customer = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    address = models.ForeignKey(Address ,on_delete=models.SET_DEFAULT,default='')
    payment = models.ForeignKey(Payment , on_delete=models.CASCADE,default= 1)
    delivery_Charges=models.FloatField(max_length=5,default='50')
    total_Amount=models.FloatField()
    products = models.ManyToManyField(Product, related_name='products',through='Ordered_Product')
    note= models.CharField(max_length=1000 , default='')
    
  
class Ordered_Product(models.Model):
    product_Id = models.ForeignKey(Product , on_delete=models.SET_DEFAULT,default='')
    order_Id = models.ForeignKey(Order , on_delete=models.CASCADE)
    quantity= models.IntegerField(default=1) 

    class meta:
        constraints = [
            models.UniqueConstraint(
                fields=('product_Id', 'order_Id'),
                name='unique_product_order'
            )
        ]







