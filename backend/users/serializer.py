from rest_framework import serializers
from users.models import User
from order.models import Address
import re

class UserRegistrationSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = User
    fields=['first_Name','last_Name','email', 'phone_Number' ,'password','type']
    extra_kwargs={
      'password':{'write_only':True}
    }

  # Validating FIRST NAME 
  def validate(self, data):
    fname = data.get('first_Name') 
    lname = data.get('last_Name') 
    email = data.get('email') 
    password =data.get('password')
    phone_Number = data.get('phone_Number')

    fnameErorr ='' 
    lnameErorr = ''
    emailErorr = ''
    passwordErorr = ''
    phoneErorr = ''
    error = False

    if not all(x.isalpha() or x.isspace() for x in fname):
      fnameErorr = 'First Name in charecters Only'
      error = True

    if not all(x.isalpha() or x.isspace() for x in lname):
        lnameErorr = 'Last Name in charecters Only'
        error = True
    
    regex1 ="^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$"

    if not (re.fullmatch(regex1, phone_Number)):
        phoneErorr = " Enter a valid email address. "
        error = True
    
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

    if not (re.fullmatch(regex, email)):
        emailErorr = " Enter a valid email address. "
        error = True
      
    if (len(password)<4) :
        passwordErorr = 'Password minimum length 4 and maximum 12.'
        error = True

    if (len(password)>12) :
        passwordErorr = 'Password minimum length 4 and maximum 12.'
        error = True  
          
    
    if error:
      raise serializers.ValidationError(
          {'first_Name':[fnameErorr ] , 
            'last_Name':[lnameErorr],
            'email':[ emailErorr],
            'password':[passwordErorr],
            'phone_Number':[phoneErorr],
          })

    return data

  def create(self, validate_data):
    address = Address.objects.create(city= "Islamabad ", area= "0" , street_Number= "0",house_Number= "0")
    return User.objects.create_user(**validate_data ,address =address )

class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = User
    fields = ['email', 'password']

class AllCusromersSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = "__all__"


