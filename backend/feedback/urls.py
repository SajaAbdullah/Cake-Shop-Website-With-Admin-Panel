from django.urls import path
from .views import *

app_name='feedback'
urlpatterns = [
    path('getAllReview/',ReviewView.as_view(), name='getAllReview'),
    path('getAllQuestion/',QusetionView.as_view(), name='getAllQusetion'),
    path('postReview/', ReviewView.as_view(), name='postReview'), 
    path('postQusetion/', QusetionView.as_view(), name='postQusetion'),  
    path('deleteQusetion/', QusetionView.as_view(), name='postQusetion'), 
    path('deleteReview/', ReviewView.as_view(), name='postReview'), 
]