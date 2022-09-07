
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,BaseUserManager
from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from order.models import Address

class UserManager(BaseUserManager):

    def create_superuser(self,first_Name, last_Name, email, password, phone_Number):
      address = Address.objects.create(city= "Islamabad ", area= "0" , street_Number= "0",house_Number= "0")
      type ="ADMIN"
      user = self.create_user( first_Name, last_Name, email , password , phone_Number, type , address)
      user.is_superuser = True
      user.is_staff = True
      user.is_active = True
      user.save(using=self._db)
      return user


    def create_user(self,first_Name,last_Name,email, password , type, phone_Number,address):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email,first_Name=first_Name,last_Name=last_Name ,phone_Number=phone_Number,type =type,address = address)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    class Types(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        CUSTOMER= "CUSTOMER", "Customer"
        STAFF = "STAFF", "Staff"
        DELIVER_BOY = "DELIVER_BOY", "Delivery_boy"

    base_type = Types.CUSTOMER

    type = models.CharField(
        _("Type"), max_length=50, choices=Types.choices, default=base_type
    )

    first_Name = models.CharField(max_length=50 ,blank= False)
    last_Name = models.CharField(max_length=50,blank= False)
    email=models.EmailField(max_length=200,unique=True)
    data_Joind =models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now= True, null= False)
    phoneNumberRegex = RegexValidator(regex = "^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$")
    phone_Number= models.CharField(validators = [phoneNumberRegex], max_length = 12,blank= True)
    address = models.ForeignKey(Address ,null=True,on_delete=models.SET_NULL,blank=True)

    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    objects= UserManager()

    USERNAME_FIELD ='email'
    REQUIRED_FIELDS = ['first_Name','last_Name','phone_Number']

 
    def has_perm(self, perm, obj=None):
      "Does the user have a specific permission?"
      # Simplest possible answer: Yes, always
      return self.is_superuser

    def has_module_perms(self, app_label):
      "Does the user have permissions to view the app `app_label`?"
      # Simplest possible answer: Yes, always
      return True


""" class CustomerManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.CUSTOMER)


class Delivery_boyManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.DELIVER_BOY)


class Customer(User):
    base_type = User.Types.CUSTOMER
    objects = CustomerManager()

    class Meta:
        proxy = True

    def placeOrder(self):
        return "order placed"


class Delivery_boyMore(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    vehacle_Type= models.CharField(max_length=30,blank=True)
    vehacle_number=models.CharField(max_length=30,blank=True)


class Delivery_boy(User):
    base_type = User.Types.DELIVER_BOY
    objects = Delivery_boyManager()

    @property
    def more(self):
        return self.Delivery_boyMore

    class Meta:
        proxy = True

    def statue(self):
        return "active"  """