from rest_framework import serializers
from order.models import Address
from users.models import User
import re

class AddressSerializer(serializers.ModelSerializer):
  class Meta:
    model= Address
    fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
  address= AddressSerializer()
  class Meta:
    model = User
    fields = ['id','first_Name','last_Name','email','phone_Number','data_Joind','last_login','address']  


class UserUpdateSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields=['first_Name','last_Name','phone_Number']  

  # Validating FIRST NAME 
  def validate(self, data):
    fname = data.get('first_Name') 
    lname = data.get('last_Name') 
    phoneNo = data.get("phone_Number")

    fnameErorr ='' 
    lnameErorr = ''
    phoneNoErorr=''
    error = False

    if not fname.isalpha():
      fnameErorr = 'First Name in charecters Only'
      error = True

    if not lname.isalpha():
      lnameErorr = 'Last Name in charecters Only'
      error = True
    
    regex = "^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$"

    if not (re.fullmatch(regex, phoneNo)):
      phoneNoErorr = " Enter a valid phone Number. "
      error = True
            
    if error:
      raise serializers.ValidationError(
          {'first_Name':[fnameErorr ] , 
            'last_Name':[lnameErorr],
            'phone_Number':[phoneNoErorr],
          })

    return data


