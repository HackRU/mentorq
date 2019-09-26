from django.utils.translation import ugettext_lazy as _
from lcs_client import validate_token, RequestError, CredentialError, InternalServerError
from rest_framework import exceptions

from mentorq_user.models import MentorqUser


# defines the backend used to authenticate users given an email and an lcs auth token
class MentorqUserBackend:
    # method responsible for authentication
    def authenticate(self, request, email, lcs_token):
        # validates that the email and token are both present
        if email is None or lcs_token is None:
            return None
        # tries validating the token
        try:
            validate_token(email, lcs_token)
        except (InternalServerError, RequestError, CredentialError) as e:
            msg = _("Invalid credentials provided. Error: ")
            raise exceptions.AuthenticationFailed(msg + e.response.json()["body"])
        except:
            msg = _("There was an authentication error. Please try again later")
            raise exceptions.AuthenticationFailed(msg)

        # if there is no error, a Mentorq user is fetched (to be used for JWT)
        try:
            user = MentorqUser.objects.get(email=email)
        # if the user doesn't already exist, its created
        except MentorqUser.DoesNotExist:
            user = MentorqUser(email=email, lcs_token=lcs_token)
            user.save()

        # finally, the associated user is returned
        return user

    # method responsible for getting the user given a user id
    def get_user(self, user_id):
        try:
            return MentorqUser.objects.get(pk=user_id)
        except MentorqUser.DoesNotExist:
            return None
