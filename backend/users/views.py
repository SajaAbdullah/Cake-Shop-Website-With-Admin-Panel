from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from users.serializer import *
from django.contrib.auth import authenticate
from users.errorrRenderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from users.crudSerializer import *
from users.models import User


# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
      # Add custom claims
      'first_Name': str(user.first_Name),
      'last_Name': str(user.last_Name),
      'type': str(user.type),
      'id': str(user.id),
}

class UserRegistrationView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = get_tokens_for_user(user)
    return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      return Response({'token':token, 'msg':'Login Success'}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  # //permission_classes = [IsAuthenticated]

  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def put(self, request, pk, format=None):

    adressData= request.data.pop("address")
    adressSnippet = Address.objects.get(address_Id =request.data.get("address_Id"))
    addressSerializer = AddressSerializer(instance= adressSnippet,data=adressData)
    if addressSerializer.is_valid(raise_exception=ValueError):
      addressSerializer.save()
    else: 
      return Response(addressSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    snippet = User.objects.get(id=pk)
    serializer = UserUpdateSerializer(instance=snippet, data=request.data)
    if serializer.is_valid(raise_exception=ValueError):
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

  def delete(self, request, pk, format=None):
    snippet = User.objects.get(id = pk)
    snippet.delete()
    return Response( status=status.HTTP_200_OK)

class AllCustomersView(APIView):
  def get(self , request ,format=None):
    Customer = User.objects.filter(type='CUSTOMER')
    serializer = AllCusromersSerializer(Customer, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class StaffView(APIView):
  renderer_classes = [UserRenderer]
  def get(self , request ,format=None):
    Customer = User.objects.exclude(type ='CUSTOMER')
    serializer = AllCusromersSerializer(Customer, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request, format=None):
    addressData = request.data.pop('address')
    addressSerializer = AddressSerializer(data=addressData)
    if addressSerializer.is_valid(raise_exception=ValueError):
      address = addressSerializer.save()
    else:
      return Response(addressSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    userSerializer = UserRegistrationSerializer(data=request.data)
    if userSerializer.is_valid(raise_exception=ValueError):
      user = User.objects.create_user(**userSerializer.data,password = request.data.get("password") ,address=address)
      serilize = UserProfileSerializer(user)
      return Response(serilize.data, status=status.HTTP_200_OK)
    else:
      return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class ProfileView(APIView):
  renderer_classes = [UserRenderer]
  # //permission_classes = [IsAuthenticated]

  def get(self, request,pk, format=None):
    user = User.objects.get(id = pk)
    serializer = UserProfileSerializer(user , many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)