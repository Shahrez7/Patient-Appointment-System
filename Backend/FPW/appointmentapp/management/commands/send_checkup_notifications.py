# your_app/management/commands/send_checkup_notifications.py

import time
from django.core.management.base import BaseCommand
from django.utils import timezone
from appointmentapp import  models
from appointmentapp.notifications import send_checkup_notification  # Import from notifications.py

class Command(BaseCommand):
    help = 'Send checkup notifications for appointments with arrived checkup times'

    def handle(self, *args, **options):
        while True:
            print("Checking for overdue appointments...")
            now = timezone.now()
            print("Current time:", now)

            overdue_appointments = models.Appointment.objects.filter(
                estimated_checkuptime__lte=now,
            )

            for appointment in overdue_appointments:
                send_checkup_notification(appointment)
                appointment.notified = True
                appointment.save()

            print("Sleeping for 10 seconds...")
            time.sleep(10)  # Sleep for 10 seconds
