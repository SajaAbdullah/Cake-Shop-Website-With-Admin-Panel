from tokenize import ContStr
from unicodedata import name
from django.db import models
from django.conf import settings


# Create your models here.
class Flavor(models.Model):
    flavour= models.CharField(max_length=50 , default='') 
    cost = models.FloatField(default=0)

class Coating(models.Model):
    coating= models.CharField(max_length=50 , default='') 
    cost = models.FloatField(default=0)

class Frosting(models.Model):
    frosting= models.CharField(max_length=50 , default='') 
    cost = models.FloatField(default=0)

class Cake_Recipe(models.Model):
    name= models.CharField(max_length=50 , default='') 
    flavour = models.ForeignKey(Flavor ,on_delete=models.SET_DEFAULT,default='')
    coating =models.ForeignKey(Coating ,on_delete=models.SET_DEFAULT,default='')
    frosting = models.ForeignKey(Frosting ,on_delete=models.SET_DEFAULT,default='')
    total_Cost = models.FloatField(default='0')

class Template_Recipe(models.Model):
    recipe = models.ForeignKey(Cake_Recipe ,on_delete=models.SET_DEFAULT,default='')
    added_by = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)

