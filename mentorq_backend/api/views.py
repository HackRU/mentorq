# generic views
from rest_framework import generics, mixins
from rest_framework.exceptions import NotAuthenticated

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
    if not (roles["organizer"] or roles["director"]):
        queryset = queryset.filter(owner_email=lcs_profile["email"])
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

    # TODO: add validation to only allow certain fields to be editable
    @ensure_lcs_authenticated
    def put(self, request, *args, **kwargs):
        lcs_profile = kwargs["lcs_profile"]
        self.queryset = role_filter(lcs_profile, self.queryset)
        return self.update(request, *args, **kwargs)
