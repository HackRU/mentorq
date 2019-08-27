# generic views
from django.shortcuts import get_object_or_404
from rest_framework import generics, mixins
from mentorq_backend.models import ProfileInfo
from .serializers import ProfileInfoSerializer
from rest_framework.permissions import IsAdminUser


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



