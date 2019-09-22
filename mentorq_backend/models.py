from django.db import models


# Create your models here.


class ProfileInfo(models.Model):
    username = models.CharField(max_length=120, primary_key=True)
    password = models.CharField(max_length=120)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile Information"

    def __str__(self):
        return self.username


# TODO: limit ticket creation to 5 per user
class Ticket(models.Model):
    STATUS_TYPES = ["OPEN", "CLOSED", "CLAIMED", "CANCELLED"]
    owner_email = models.EmailField()
    mentor = models.CharField(max_length=255, blank=True)
    mentor_email = models.EmailField(blank=True)
    status = models.CharField(max_length=max(map(len, STATUS_TYPES)),
                              choices=[(st_ty, st_ty) for st_ty in STATUS_TYPES],
                              default="OPEN")
    title = models.CharField(max_length=255)
    comment = models.CharField(max_length=255, blank=True)
    contact = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Ticket"
        verbose_name_plural = "Tickets"

    def __str__(self):
        return f"{self.title} -- {self.status}"
