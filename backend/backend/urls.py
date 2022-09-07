
from django.contrib import admin
from django.urls import path ,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/',include('users.urls',namespace='users')),
    path('order/',include('order.urls',namespace='order')),
    path('product/',include('product.urls',namespace='product')),
    path('feedback/',include('feedback.urls',namespace='feedback')),
    path('customizeorder/',include('customizeorder.urls',namespace='customizeorder')),
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
