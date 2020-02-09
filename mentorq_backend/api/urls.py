from django.urls import path, include

from .views import TicketList, TicketDetail, TicketStats

urlpatterns = [
    # endpoint for Mentorq authentication
    path("auth/", include("mentorq_user.urls")),
    # endpoint for getting all the tickets or adding a new ticket
    path("tickets/", TicketList.as_view(), name="ticket_list"),

    # endpoint for getting details on a particular ticket or updating a ticket
    path("tickets/<int:pk>/", TicketDetail.as_view(), name="ticket_detail"),

    # endpoint for getting stats on all the tickets
    path("tickets/stats/", TicketStats.as_view(), name="ticket_stats")
]
