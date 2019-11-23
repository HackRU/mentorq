from django.db import models

# TODO: limit ticket creation to 5 per user
# represents a help ticket
from django.utils import timezone


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
    created_datetime = models.DateTimeField(auto_now_add=True)
    # the datetime when this ticket was claimed
    claimed_datetime = models.DateTimeField(null=True, editable=False)
    # the datetime when this ticket was closed
    closed_datetime = models.DateTimeField(null=True, editable=False)

    class Meta:
        verbose_name = "Ticket"
        verbose_name_plural = "Tickets"

    # TODO: test transition to the "CANCELLED" status type and validate that arbitrary status changes aren't possible
    def save(self, *args, **kwargs):
        try:
            current_ticket = Ticket.objects.get(pk=self.pk)
            current_status = current_ticket.status
            if self.status == "CLAIMED":
                if current_status == "OPEN":
                    self.claimed_datetime = timezone.now()
            elif self.status == "CLOSED":
                if current_status == "OPEN" or current_status == "CLAIMED":
                    self.closed_datetime = timezone.now()
        except self.DoesNotExist:
            pass
        super(Ticket, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
