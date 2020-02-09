from django.urls import path

from mentorq_user.views import MentorqTokenObtainPairView, MentorqTokenRefreshView

urlpatterns = [
    # endpoint for obtaining a fresh JWT token by making a POST request with email and lcs token
    path("token/", MentorqTokenObtainPairView.as_view(), name="mentorq_token_obtain_pair"),

    # endpoint for obtaining an access JWT token by making a POST request with a refresh token
    path("refresh/", MentorqTokenRefreshView.as_view(), name="mentorq_token_refresh"),
]
