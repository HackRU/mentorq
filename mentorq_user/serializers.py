# TokenObtainSerializer customized to Mentorq usecase
from django.contrib.auth import authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers, exceptions
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken


# Implements a custom but identical version of the TokenObtainSerializer from simplejwt
class MentorqTokenObtainSerializer(serializers.Serializer):
    # declares the fields type to be serialized to Python native data types
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["email"] = serializers.EmailField()
        self.fields["lcs_token"] = serializers.CharField()

    # validates using the given attributes
    def validate(self, attrs):
        # this particular serializer uses the email and lcs token to validate and create a JWT token
        authenticate_kwargs = {
            "email": attrs["email"],
            "lcs_token": attrs["lcs_token"]
        }

        # attaches the request to the authentication if its present (utilized by the view)
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass

        # calls authenticate to verify the credentials given (this will use the MentorqBackend)
        self.user = authenticate(**authenticate_kwargs)

        # the result of authentication is returned
        if self.user is None:
            raise exceptions.AuthenticationFailed(
                _("No account found with the given email and token"),
                "no_account"
            )
        return {}

    @classmethod
    def get_token(cls, user):
        raise NotImplementedError('Must implement `get_token` method for `TokenObtainSerializer` subclasses')


# Implements a custom but identical version of the TokenObtainPairSerializer from simplejwt
class MentorqTokenObtainPairSerializer(MentorqTokenObtainSerializer):
    # method that fetches a token for a given user
    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    # method that validates the data using the parent class, then the access
    # token and its refresh token is fetched and returned
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        return data


class MentorqTokenRefreshSerializer(TokenRefreshSerializer):
    pass
