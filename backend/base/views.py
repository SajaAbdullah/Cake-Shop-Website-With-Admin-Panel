from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from base.serializer import *
from rest_framework import status
from base.models import *
# Create your views here.

class CakeView(APIView):
    def get(self, request, format=None):
        cake = Cake.objects.all()
        serializer = CakeSerializer(cake, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
