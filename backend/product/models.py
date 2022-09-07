from asyncio.windows_events import NULL
from operator import truediv
from xml.etree.ElementInclude import default_loader
from django.db import models
from django.conf import settings

# Create your models here.

class Category(models.Model):
    catrgort_id=models.AutoField(primary_key=True)
    category_Name=models.CharField(max_length=30)

    def __str__(self):
        return self.category_Name

class Image_Gallery(models.Model):
    image1=models.ImageField(upload_to='product')
    image2=models.ImageField(upload_to='product')
    image3=models.ImageField(upload_to='product')
    image4=models.ImageField(upload_to='product')
    

class Product(models.Model):
    product_Id=models.AutoField(primary_key=True)
    product_Name=models.CharField(max_length=50)
    product_Description=models.TextField(max_length=700)
    product_category=models.ForeignKey(Category , on_delete=models.SET_DEFAULT,default='')
    product_Price=models.FloatField()
    product_Stock=models.PositiveIntegerField()
    product_isSale=models.CharField(max_length=10 ,default="Yes")
    added_at =models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    imageGallery=models.ForeignKey(Image_Gallery ,on_delete=models.CASCADE,null=True,blank=True,default='')


class Cart(models.Model):
    cart_Id=models.AutoField(primary_key=True)
    customer_Id = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    delivery_Charges=models.FloatField()
    total_Amount=models.FloatField()
    

class Product_In_Cart(models.Model):
    class meta:
        unique_together=(('product_Id' , 'cart_Id'),)
    product_Id = models.ForeignKey(Product , on_delete=models.CASCADE)
    cart_Id = models.ForeignKey(Cart , on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField()

    
