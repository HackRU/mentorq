# Generated by Django 2.2.4 on 2020-01-07 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentorq_backend', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ticket',
            old_name='created',
            new_name='created_datetime',
        ),
        migrations.AddField(
            model_name='ticket',
            name='claimed_datetime',
            field=models.DateTimeField(editable=False, null=True),
        ),
        migrations.AddField(
            model_name='ticket',
            name='closed_datetime',
            field=models.DateTimeField(editable=False, null=True),
        ),
    ]
