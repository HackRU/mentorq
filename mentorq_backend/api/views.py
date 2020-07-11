# generic views
from datetime import timedelta

from rest_framework import generics, mixins
from rest_framework.exceptions import NotAuthenticated
from rest_framework.response import Response

from mentorq_backend.models import Ticket
from .serializers import TicketSerializer, TicketEditableSerializer


# extracts the request from any of the http request methods and validates that the lcs_token hasn't expired
def ensure_lcs_authenticated(func):
    def wrapper(*args, **kwargs):
        # extracts the request to fetch the currently authenticated user
        mentorq_user = args[1].user
        # the lcs credentials (email, token) are given to lcs-client to obtain a lcs user
        lcs_user = mentorq_user.get_lcs_user()
        # if fetching the information fails for the lcs user (eg. if auth token give has expired),
        # then an exception is raised
        if not lcs_user[0]:
            raise NotAuthenticated(detail=lcs_user[1])
        # the lcs profile is stored in as arguments to be used by the wrapper function
        kwargs["lcs_profile"] = lcs_user[1].profile()
        return func(*args, **kwargs)

    return wrapper


# filters the given queryset based on role of the lcs user
def role_filter(lcs_profile, queryset):
    roles = lcs_profile["role"]
    if not (roles["organizer"] or roles["director"] or roles["mentor"]):
        queryset = queryset.filter(owner_email=lcs_profile["email"])
    if roles["mentor"]:
        queryset = queryset.exclude(status="CLOSED")

    return queryset


# view for the /tickets endpoint
class TicketList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    # defines the serializer and dataset to use
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

    # for a GET request, the queryset is filtered based on role
    @ensure_lcs_authenticated
    def get(self, request, *args, **kwargs):
        lcs_profile = kwargs["lcs_profile"]
        self.queryset = role_filter(lcs_profile, self.queryset)
        return self.list(request, *args, **kwargs)

    # for a POST request, no extra steps are required
    @ensure_lcs_authenticated
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


# view for the details of a given ticket (identified by /ticket/<id>)
class TicketDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_serializer_class(self):
        serializer_class = self.serializer_class
        if self.request.method == "PATCH":
            serializer_class = TicketEditableSerializer
        return serializer_class

    # for a GET request, the queryset is filtered based on role
    @ensure_lcs_authenticated
    def get(self, request, *args, **kwargs):
        lcs_profile = kwargs["lcs_profile"]
        self.queryset = role_filter(lcs_profile, self.queryset)
        return self.retrieve(request, *args, **kwargs)

    @ensure_lcs_authenticated
    def patch(self, request, *args, **kwargs):
        lcs_profile = kwargs["lcs_profile"]
        self.queryset = role_filter(lcs_profile, self.queryset)
        return self.update(request, *args, **kwargs)


# view for the stats of all the tickets (identified by /tickets/stats)
class TicketStats(generics.GenericAPIView):
    @ensure_lcs_authenticated
    def get(self, request, *args, **kwargs):
        roles = kwargs["lcs_profile"]["role"]
        if not roles["director"]:
            raise NotAuthenticated(detail="You do not have sufficient privileges to access tickets stats")
        claimed_datetime_deltas = list(map(lambda ticket: ticket.claimed_datetime - ticket.created_datetime,
                                           Ticket.objects.exclude(claimed_datetime__isnull=True).only(
                                               "created_datetime",
                                               "claimed_datetime")))
        num_of_claimed_datetime_deltas = len(claimed_datetime_deltas)
        closed_datetime_deltas = list(map(lambda ticket: ticket.closed_datetime - ticket.created_datetime,
                                          Ticket.objects.exclude(closed_datetime__isnull=True).only("created_datetime",
                                                                                                    "closed_datetime")))
        num_of_closed_datetime_deltas = len(closed_datetime_deltas)
        average_claimed_datetime = (sum(claimed_datetime_deltas, timedelta(
            0)) / num_of_claimed_datetime_deltas) if num_of_claimed_datetime_deltas > 0 else None
        average_closed_datetime = (sum(closed_datetime_deltas, timedelta(
            0)) / num_of_closed_datetime_deltas) if num_of_closed_datetime_deltas > 0 else None
        return Response(
            {"average_claimed_datetime_seconds": average_claimed_datetime,
             "average_closed_datetime_seconds": average_closed_datetime})
