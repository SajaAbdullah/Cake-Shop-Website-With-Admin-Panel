from rest_framework import serializers
from order.models import *
from users.models import User
from product.models import Product , Image_Gallery ,Category


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields =  "__all__"


class ImageGallerySerializer(serializers.ModelSerializer):
  class Meta:
    model = Image_Gallery
    fields =  "__all__"


class ProductSerializer(serializers.ModelSerializer):
  imageGallery=ImageGallerySerializer()
  product_category=CategorySerializer()
  class Meta:
    model = Product
    fields =  "__all__"

class ProductAddingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields =  ['product_Name','product_Description','product_Price','product_Stock','product_isSale']
    
  # Validating FIRST NAME 
  def validated(self, data):
    Pname = data.get('product_Name') 
    Pdec = data.get('product_Description') 
    Pprice = data.get('product_Price') 
    Pstock =data.get('product_Stock')

    PnameError ='' 
    PdecErorr = ''
    PstockErorr = ''
    PpriceErorr = ''
    error = False

    if not all(x.isalpha() or x.isspace() for x in Pname):
      PnameError = 'Product Name in charecters Only'
      error = True

    if not  all(x.isalpha() or x.isspace() for x in Pdec):
        PdecErorr = 'Product Description in charecters Only'
        error = True
      
    if (Pprice < 0) :
        PpriceErorr = 'Product price in poitive float only.'
        error = True

    if (Pstock < 0) :
        PstockErorr = 'Product Stock in poitive Integer only.'
        error = True  
          
    if error:
      raise serializers.ValidationError(
          {'product_Name':[PnameError ] , 
            'product_Description':[PdecErorr],
            'product_Price':[ PpriceErorr ],
            'product_Stock':[PstockErorr],
          })

    return data


class ImageIdSerilizer(serializers.ModelSerializer):
  class Meta:
    model = Image_Gallery
    fields =  ['id']
