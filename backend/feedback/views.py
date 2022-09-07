from rest_framework.response import Response
from rest_framework.views import APIView
from feedback.models import Review , Question
from users.models import User
from feedback.serializer import GetReviewSerilizer ,PostReviewSerilizer,QuestionSerilizer
from rest_framework import status
from users.errorrRenderers import UserRenderer
from django.contrib.auth import authenticate
from product.models import Product
# Create your views here.

class ReviewView(APIView):
    renderer_classes = [UserRenderer]
 
    def post(self, request, format=None):
      try:
        user = User.objects.get(email = request.data.get('email'))
      except User.DoesNotExist:
        user = None
      
      if user is None:
        return Response({'errors':{'non_user_errors':['Please Craete an accont to send Review']}}, status=status.HTTP_404_NOT_FOUND)
      
      product = Product.objects.get(pk =request.data.get('product') )

      serializer = PostReviewSerilizer(data=request.data)
      if serializer.is_valid(raise_exception=ValueError):
        review = Review.objects.create(**serializer.data , customer= user ,productReviewed =product)
        serilzer =GetReviewSerilizer(review)
        return Response(serilzer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
        
    def get(self, request, format=None):
        review = Review.objects.all()
        serializer = GetReviewSerilizer(review, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 

    def delete(self, request, pk, format=None):
       review = Review.objects.get(id=pk)
       review.delete()
       return Response(status=status.HTTP_202_ACCEPTED)


class QusetionView(APIView):
    renderer_classes = [UserRenderer]
    def get(self, request, format=None):
        qusetion = Question.objects.all()
        serializer = QuestionSerilizer(qusetion, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
      serializer = QuestionSerilizer(data=request.data)
      if serializer.is_valid(raise_exception=ValueError):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 