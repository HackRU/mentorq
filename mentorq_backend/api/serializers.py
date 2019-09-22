from rest_framework import serializers

from mentorq_backend.models import ProfileInfo, Ticket


class ProfileInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileInfo
        fields = [
            'username',
            'password',
        ]

        # converts data to a JSON format


class TicketSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ticket
        fields = [
            "owner_email", "mentor", "mentor_email", "status", "title",
            "comment", "contact", "location", "created"
        ]
