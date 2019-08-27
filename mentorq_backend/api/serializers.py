from rest_framework import serializers
from mentorq_backend.models import ProfileInfo


class ProfileInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileInfo
        fields = [
            'username',
            'password',
        ]

        #converts data to a JSON format
