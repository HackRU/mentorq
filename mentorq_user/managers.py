from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


# the manager responsible for Mentorq user model
class MentorqUserManager(BaseUserManager):

    # method which is responsible for creating standard users
    def create_user(self, email, lcs_token, password=None, **kwargs):
        # checks if the user is a superuser
        is_superuser = "is_superuser" in kwargs and kwargs["is_superuser"]
        # validates the email is present
        if not email:
            raise ValueError(_("The email address must be set"))
        # validates that either the lcs token is present or the user is a superuser
        if not lcs_token and not is_superuser:
            raise ValueError(_("The LCS token must be set"))
        # normalizes the email for storage
        self.normalize_email(email)

        # a model is created for the given email and token
        user = self.model(email=email, lcs_token=lcs_token, **kwargs)
        # if the user is a superuser, password is required so it's saved with a password
        if is_superuser:
            user.set_password(password)
        # the user is saved and returned
        user.save()
        return user

    # method responsible for creating a superuser
    def create_superuser(self, email, lcs_token, password, **kwargs):
        # sets the staff and superuser booleans to distinguish their permission level
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)

        # if for some reason that process failed, an exception is raised
        if not kwargs["is_staff"]:
            raise ValueError(_("Superuser must have is_staff=True"))
        if not kwargs["is_superuser"]:
            raise ValueError(_("Superuser must have is_superuser=True"))

        # finally create_user is called to actually create the user
        return self.create_user(email=email, lcs_token=lcs_token, password=password, **kwargs)
