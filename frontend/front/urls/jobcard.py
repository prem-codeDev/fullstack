from django.urls import path
from front.views import joborder

urlpatterns = [
   path('order/',joborder.jorder,name='joborder'), 
   path('card/',joborder.jobcard,name='card')  ,
   path('staff/',joborder.staff,name='staff'),
   path('stafflst/',joborder.stafflist,name='staffLlist'),
]
