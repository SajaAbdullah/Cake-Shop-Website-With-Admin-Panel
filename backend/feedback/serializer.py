from rest_framework import serializers
from order.models import *
from users.models import User
from feedback.models import Review , Question
from product.models import Product

class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model= Product
    fields = ['product_Id','product_Name'] 

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model= User
    fields = ['id','first_Name','last_Name'] 


class GetReviewSerilizer(serializers.ModelSerializer):
  customer =UserSerializer()
  productReviewed = ProductSerializer()
  class Meta:
    model = Review
    fields =  "__all__"

class PostReviewSerilizer(serializers.ModelSerializer):
  class Meta:
    model = Review
    fields = ['content', 'rating']

class QuestionSerilizer(serializers.ModelSerializer):
  class Meta:
    model = Question
    fields =  "__all__"