from rest_framework import serializers
from base.models import *



class CakeSerializer(serializers.ModelSerializer):
  class Meta:
    model= Cake
    fields = "__all__"