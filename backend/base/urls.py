from .views import *
from django.urls import path

app_name='base'
urlpatterns = [
    path('getAllBase/',CakeView.as_view(), name='getAllBase'),
    path('getDetaildBase/<int:pk>', CakeView.as_view(), name='getDetaildBase'), 
]