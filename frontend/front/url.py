from django.urls import include, path

urlpatterns = [
     path('',include('front.urls.addData')),
     path('job/',include('front.urls.jobcard')),
]
