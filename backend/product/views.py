from django.shortcuts import render
from product.models import Product ,Image_Gallery ,Category
from rest_framework.response import Response
from rest_framework.views import APIView
from product.serializer import ProductSerializer ,ProductAddingSerializer ,ImageGallerySerializer,ImageIdSerilizer
from rest_framework import status
from users.errorrRenderers import UserRenderer
# Create your views here.

class ProductView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):

      imageSerilizer = ImageGallerySerializer(data=request.data)
      imageSerilizer.is_valid(raise_exception=ValueError)
      images = imageSerilizer.save()

      category = Category.objects.get(category_Name = request.data.get('category_Name'))

      serializer = ProductAddingSerializer(data=request.data)
      if serializer.is_valid(raise_exception=ValueError):
        product = Product.objects.create(**serializer.data , product_category = category , imageGallery= images)
        serilzer =ProductSerializer(product)
        return Response(serilzer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
        
    def get(self, request, format=None):
        product = Product.objects.all()
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 

    def delete(self, request, pk, format=None):
       ProductRes = Product.objects.get(Product_Id=pk)
       ProductRes.delete()
       return Response(status=status.HTTP_202_ACCEPTED)    

class DetailedProductView(APIView):
    def get(self, request , pk , format=None):
        product = Product.objects.get(product_Id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK) 

class UpdateProductView(APIView):

  def put(self, request, pk ,format=None):
      
      print(list(request.data.items()))
      
      #id= ImageIdSerilizer(data= request.data.get('imageGallery_Id'))
      #id.is_valid(raise_exception=ValueError)
      snippet = Image_Gallery.objects.get(pk = request.data.get('imageGallery_Id'))
      
      if request.data.get('image1') != '':
        snippet.image1 = request.data.get('image1')
      else:
        request.data.remove('image1')

      if request.data.get('image2') != '':
        snippet.image1 = request.data.get('image2')
      else:
        imageDelete2 = request.data.pop('image2')

      if request.data.get('image3') != '':
        snippet.image1 = request.data.get('image3')
      else:
        imageDelete3 = request.data.pop('image3')

      if request.data.get('image4') != '':
        snippet.image1 = request.data.get('image4')
      else:
        imageDelete4 = request.data.pop('image4')

      imageSerilizer = ImageGallerySerializer(data=request.data , partial=True)  
      if imageSerilizer.is_valid(raise_exception=ValueError):
        snippet.save() 
      

      category = Category.objects.get(category_Name = request.data.get('category_Name'))
      snippet1 = Product.objects.get(product_Id = pk)
      
      serializer = ProductAddingSerializer(data=request.data)
      if serializer.is_valid(raise_exception=ValueError):
        snippet1.product_Name = request.data.get('product_Name')
        snippet1.product_Description = request.data.get('product_Description')
        snippet1.product_Price = request.data.get('product_Price')
        snippet1.product_Stock = request.data.get('product_Stock')
        snippet1.product_isSale = request.data.get('product_isSale')
        snippet1.product_category = category
        snippet1.save()
        serilzer =ProductSerializer(snippet1)
        return Response(serilzer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
