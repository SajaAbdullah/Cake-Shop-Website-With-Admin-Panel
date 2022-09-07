from django.contrib import admin
from order.models import Order , Address,Ordered_Product, Payment
# Register your models here.
admin.site.register(Order)
admin.site.register(Address)
admin.site.register(Ordered_Product)
admin.site.register(Payment)

