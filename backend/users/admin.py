from django.contrib import admin
from order.models import Address
from users.models import *
from django.contrib.auth.admin import UserAdmin 



# Now register the new UserModelAdmin...
admin.site.register(User)
