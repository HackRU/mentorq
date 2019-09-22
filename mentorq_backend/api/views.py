# generic views
from rest_framework import generics, mixins
from rest_framework.permissions import IsAdminUser

from mentorq_backend.models import ProfileInfo, Ticket
from .serializers import ProfileInfoSerializer, TicketSerializer


class ProfileInfoCreateView(mixins.CreateModelMixin, generics.ListAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = ProfileInfo.objects.all()
    serializer_class = ProfileInfoSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()

    def post(self, request, *args, **kwargs):
        self.create(request, *args, **kwargs)


class ProfilePostRudView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileInfoSerializer
    queryset = ProfileInfo.objects.all()
    permission_classes = [IsAdminUser]


class TicketList(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAdminUser]


class TicketDetail(generics.RetrieveUpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAdminUser]

