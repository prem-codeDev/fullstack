from django.urls import path
from front.views import addData

urlpatterns = [
    path('item/',addData.item,name='item'),
    path('ledger/',addData.ledger,name='ledger'),
    path('route/',addData.route,name='route'),
    path('itmgrp/',addData.itmgrp,name='itmgrp'),
    path('process/',addData.process,name='process'),
    path('tax/',addData.tax,name='tax'),
    path('dept/',addData.dept,name='dept'),
    path('bank/',addData.bank,name='bank'),
    path('sac/',addData.sac,name='sac'),
]
