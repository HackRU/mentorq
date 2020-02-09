from typing import Union, Tuple

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _
from lcs_client import InternalServerError, RequestError, CredentialError, User

from mentorq_user.managers import MentorqUserManager


# model that represents a MentorqUser
class MentorqUser(AbstractBaseUser, PermissionsMixin):
    # adds the fields relevant to each MentorqUser
    email = models.EmailField(verbose_name="Email Address", unique=True)
    lcs_token = models.CharField(max_length=255, verbose_name="LCS Token")
    is_staff = models.BooleanField(default=False)

    # specifies the identifying field and the required fields for validation
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["lcs_token"]

    # and declares the MentorqUserManager as the manager for this model
    objects = MentorqUserManager()

    def __str__(self):
        return self.email

    # method used to create a lcs-client User object from a Mentorq user
    def get_lcs_user(self) -> Tuple[bool, Union[User, str]]:
        try:
            return True, User(email=self.email, token=self.lcs_token)
        except (InternalServerError, RequestError, CredentialError) as e:
            return False, _("The following error occurred during authentication: " + e.response.json()["body"])
        except:
            return False, _("There was an authentication error. Please try again later")
