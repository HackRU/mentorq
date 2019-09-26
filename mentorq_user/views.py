from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from mentorq_user.serializers import MentorqTokenObtainPairSerializer, MentorqTokenRefreshSerializer


# view for obtaining an access and refresh token
class MentorqTokenObtainPairView(TokenObtainPairView):
    serializer_class = MentorqTokenObtainPairSerializer


# view for obtaining an access token from a refresh token
class MentorqTokenRefreshView(TokenRefreshView):
    serializer_class = MentorqTokenRefreshSerializer
