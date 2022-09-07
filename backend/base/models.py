from statistics import mode
from django.db import models
from django.conf import settings
from cake_Recipe.models import Cake_Recipe
# Create your models here.


class Board(models.Model):
    Shape = models.CharField(max_length= 50)
    Width = models.CharField(max_length= 50)
    Cost = models.CharField(max_length= 50)
    Board_material = models.CharField(max_length= 50)

class Cake(models.Model):
    cake_Hight = models.FloatField(max_length=5,default='50')
    cake_Width = models.FloatField(max_length=5,default='50')
    cost = models.FloatField(max_length=5,default='50')
    cake_recipe = models.ForeignKey(Cake_Recipe , on_delete=models.SET_DEFAULT,default='')

class Design(models.Model):  
    Customer = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    Delivery_charges=models.FloatField(max_length=5,default='50')
    Design_total_cost =models.FloatField(max_length=5,default='50')
    Design_Cakes= models.ManyToManyField(Cake, related_name='caks',through='Design_Cakes')

class Design_Cakes(models.Model):
    design = models.ForeignKey(Design , on_delete=models.SET_DEFAULT, default='')
    cake = models.ForeignKey(Cake , on_delete=models.SET_DEFAULT, default='')

    class meta:
        constraints = [
            models.UniqueConstraint(
                fields=('design', 'cake'),
                name='unique_design_cake'
            )
        ]

class Template_Design(models.Model):
    recipe = models.ForeignKey(Design ,on_delete=models.SET_DEFAULT,default='')
    added_by = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)

