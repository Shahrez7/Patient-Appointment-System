# your_app/notifications.py

import smtplib
import ssl
from email.message import EmailMessage
from appointmentapp.models import Appointment, Patient



# ... (other imports)

def send_checkup_notification(appointment):
    subject = 'Your Checkup Time Has Arrived'
    body = f"""
        Dear {appointment.patient.name},

        Your checkup time has arrived.

        Doctor: {appointment.doctor}
        Estimated Checkup Time: {appointment.estimated_checkuptime}

        Please proceed to the clinic.

        Best regards,
        Your Clinic
    """

    em = EmailMessage()
    em['From'] = 'your_email@gmail.com'
    em['To'] = appointment.patient.email
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login('shahrezmalik123@gmail.com', 'sezu vyvm glng iiet')
        smtp.sendmail('shahrezmalik123@gmail.com', appointment.patient.email, em.as_string())

    print("Checkup sent!")

    # Remove patient from the queue and update waiting numbers
    doctor_queue = Appointment.objects.filter(
        doctor=appointment.doctor,
        estimated_checkuptime__gte=appointment.estimated_checkuptime,
      
    ).exclude(id=appointment.id).order_by('estimated_checkuptime')

    for i, appointment_in_queue in enumerate(doctor_queue, start=1):
        appointment_in_queue.waiting_number = i
        appointment_in_queue.save()

    # Mark the current appointment as notified and delete it
    appointment.delete()

    print("Patient removed from the queue.")
