from django.urls import path
from .views import *

app_name='users'
urlpatterns = [
    path('register/',UserRegistrationView.as_view(), name='Registration'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('Uprofile/<int:pk>', ProfileView.as_view(), name='Uprofile'),
    path('getAllcustomers/', AllCustomersView.as_view(), name='allCustomers'),
    path('getAllstaff/', StaffView.as_view(), name='allStaff'),
    path('registerStaff/', StaffView.as_view(), name='allStaff'),
    path('update/<int:pk>', UserProfileView.as_view(), name='updateUser'),  
    path('delete/<int:pk>', UserProfileView.as_view(), name='deleteUser'),   
]