from rest_framework import serializers

from mentorq_backend.models import Ticket


# returns the relevant fields from a Ticket object
class TicketSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ticket
        fields = [
            "id", "owner_email", "mentor", "mentor_email", "status", "title",
            "comment", "contact", "location", "created"
        ]
