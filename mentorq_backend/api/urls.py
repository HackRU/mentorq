from .views import ProfileInfoCreateView, ProfilePostRudView
from django.conf.urls import url
from django.urls import path

urlpatterns = [

    url('create/', ProfileInfoCreateView.as_view(), name='post-create'),
    path('rud/<str:pk>/', ProfilePostRudView.as_view(), name='post-rud')
]
