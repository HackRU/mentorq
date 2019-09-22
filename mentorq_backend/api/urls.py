from django.conf.urls import url
from django.urls import path

from .views import ProfileInfoCreateView, ProfilePostRudView, TicketList, TicketDetail

urlpatterns = [
    url('create/', ProfileInfoCreateView.as_view(), name='post-create'),
    path('rud/<str:pk>/', ProfilePostRudView.as_view(), name='post-rud'),
    path("tickets/", TicketList.as_view(), name="ticket_list"),
    path("tickets/<int:pk>/", TicketDetail.as_view(), name="ticket_detail")
]
