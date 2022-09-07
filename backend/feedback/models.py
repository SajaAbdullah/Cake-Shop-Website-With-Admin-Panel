from django.db import models
from django.conf import settings
from product.models import Product


# Create your models here.
class Review(models.Model):
   rating=models.IntegerField()
   content=models.CharField(max_length=520)
   reviewDate=models.DateField(auto_now_add=True)
   productReviewed = models.ForeignKey(Product ,on_delete=models.CASCADE )
   customer= models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)

class Question(models.Model):
   userName=models.CharField(max_length=520)
   message=models.CharField(max_length=520)
   messageDate=models.DateField(auto_now_add=True)
   email = models.EmailField()