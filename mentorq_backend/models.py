from django.db import models
from django.conf import settings


# Create your models here.
class ProfileInfo(models.Model):
    username = models.CharField(max_length=120, primary_key=True)
    password = models.CharField(max_length=120)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile Information"

    def __str__(self):
        return self.username

