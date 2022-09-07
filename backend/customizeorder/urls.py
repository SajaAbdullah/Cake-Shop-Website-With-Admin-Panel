from django.urls import path
from .views import *

app_name='customizeorder'
urlpatterns = [
    path('post/',CustomizeOrderView.as_view(), name='PostCustomizeOrder'),
    path('getAllCustomizeOrder/',CustomizeOrderView.as_view(), name='getAllCustomizeOrder'),
    path('getUserCustomizeOrder/<int:pk>',UserCustomizeOrderView.as_view(), name='getUserCustomizeOrder'),
    path('placeCustomOrder/',DetaildCustomOrderView.as_view(), name='placeCustomOrder'),
    path('getDetaildCustomOrder/<int:pk>',DetaildCustomOrderView.as_view(), name='getdetaildCustomOrder'),
    path('updateStatus/<int:pk>', CustomizeOrderView.as_view(), name='updateCustomeOrder'),
    path('getProfileOrder/<int:pk>', GetProfileCustomizeOrderView.as_view(), name='getProfileOrder'),
]