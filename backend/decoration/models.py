from django.db import models
from django.conf import settings
from base.models import Cake

# Create your models here.
class Image(models.Model):
    image =models.ImageField(upload_to='decorationImage')
    uploads_By =models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)

class Decoration_element(models.Model): 
    element_Name =models.CharField(max_length=30 , default='') 
    element_Cost =models.FloatField(max_length=5,default='0')  

class Decoration_element(models.Model): 
    element_Name =models.CharField(max_length=30 , default='') 
    element_Cost =models.FloatField(max_length=5,default='0') 

class Cake_Decoration(models.Model):
    decortion_Element = models.ForeignKey(Decoration_element , on_delete=models.SET_DEFAULT, default='')
    cake = models.ForeignKey(Cake , on_delete=models.SET_DEFAULT, default='')

    class meta:
        constraints = [
            models.UniqueConstraint(
                fields=('decortion_Element', 'cake'),
                name='unique_decortion_Element_cake'
            )
        ]


class Text(models.Model):
    text =models.CharField(max_length=30 , default='')
    cake = models.ForeignKey(Cake , on_delete=models.SET_DEFAULT, default='')
 