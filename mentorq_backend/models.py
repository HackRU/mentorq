from django.db import models


class ProfileInfo(models.Model):
    username = models.CharField(max_length=120, primary_key=True)
    password = models.CharField(max_length=120)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile Information"

    def __str__(self):
        return self.username


# TODO: limit ticket creation to 5 per user
# represents a help ticket
class Ticket(models.Model):
    # pre-defined statuses of the ticket
    STATUS_TYPES = ["OPEN", "CLOSED", "CLAIMED", "CANCELLED"]
    # the email of the person who created the ticket
    owner_email = models.EmailField()
    # the name of the mentor who has claimed this ticket
    mentor = models.CharField(max_length=255, blank=True)
    # the email of the mentor who has claimed this ticket
    mentor_email = models.EmailField(blank=True)
    # the status of the ticket (one of the pre-defined types listed above)
    status = models.CharField(max_length=max(map(len, STATUS_TYPES)),
                              choices=[(st_ty, st_ty) for st_ty in STATUS_TYPES],
                              default="OPEN")
    # the title of the ticket
    title = models.CharField(max_length=255)
    # the comment/details of the ticket
    comment = models.CharField(max_length=255, blank=True)
    # the contact info of the owner
    contact = models.CharField(max_length=255)
    # the location of the owner
    location = models.CharField(max_length=255)
    # the datetime when this ticket was created
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Ticket"
        verbose_name_plural = "Tickets"

    def __str__(self):
        return self.title
