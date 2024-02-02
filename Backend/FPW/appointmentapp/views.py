# views.py
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Patient, Appointment, Doctor
from .serializers import PatientSerializer, AppointmentSerializer, DoctorSerializer
import smtplib
import ssl
from email.message import EmailMessage

buzzer_status={}
@api_view(['GET'])
def get_doctor_details(request, doctor_code):
    # Get the doctor based on the provided doctor_code
    doctor = get_object_or_404(Doctor, code=doctor_code)

    # Serialize the doctor data
    serializer = DoctorSerializer(doctor)

    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['GET'])
def doctor_appointments_list(request, doctor_code):
    # Get the doctor based on the provided doctor_code
    doctor = get_object_or_404(Doctor, code=doctor_code)

    # Retrieve all appointments for the specified doctor
    appointments = Appointment.objects.filter(doctor=doctor)

    # Serialize the appointments data
    serializer = AppointmentSerializer(appointments, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['POST'])
def create_patient_and_appointment_view(request):
    if request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            patient = Patient.objects.create(**serializer.validated_data)

            # Get the doctor for this patient
            doctor = Doctor.objects.get(code=patient.doctor_code)

            # Check if there are existing appointments for this doctor
            existing_appointments = Appointment.objects.filter(doctor=doctor)

            if existing_appointments.exists():
                # If there are existing appointments, get the latest one
                latest_appointment = existing_appointments.latest('estimated_checkuptime')
                estimated_checkuptime = latest_appointment.estimated_checkuptime + timezone.timedelta(minutes=10)
                waiting_number = latest_appointment.waiting_number + 1
            else:
                # If no existing appointments, set the estimated_checkuptime to 10 mins after entry_time
                estimated_checkuptime = patient.entry_time + timezone.timedelta(minutes=10)
                waiting_number = 1

            # Create the appointment
            appointment = Appointment.objects.create(
                patient=patient,
                doctor=doctor,
                estimated_checkuptime=estimated_checkuptime,
                waiting_number=waiting_number
            )
            send_appointment_email(patient)
            patient_serializer = PatientSerializer(patient)
            appointment_serializer = AppointmentSerializer(appointment)
            return Response({'patient': patient_serializer.data, 'appointment': appointment_serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def index(request):
    return HttpResponse('<h1>Hello World</h1>')
@api_view(['GET', 'POST'])
def doctors_list(request):
    if request.method == 'GET':
        data = Doctor.objects.all()
        serializer = DoctorSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def get_patient_details(request, patient_id):
    # Get the patient based on the provided patient_id
    patient = get_object_or_404(Patient, id=patient_id)

    # Serialize the patient data
    serializer = PatientSerializer(patient)

    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['GET'])
def get_patients_for_doctor(request, doctor_code):
    # Get the patients for the specified doctor
    patients = Patient.objects.filter(doctor_code=doctor_code)

    # Serialize the patients data
    serializer = PatientSerializer(patients, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['DELETE'])
def delete_first_appointment(request, doctor_code):
    try:
        # Get the doctor based on the provided doctor_code
        doctor = get_object_or_404(Doctor, code=doctor_code)

        # Get the first appointment in the queue for the specified doctor
        first_appointment = Appointment.objects.filter(doctor=doctor).order_by('estimated_checkuptime').first()

        if not first_appointment:
            return Response({'message': f'No appointments in the queue for doctor {doctor_code}'}, status=status.HTTP_404_NOT_FOUND)

        # Get the waiting number of the first appointment
        waiting_number = first_appointment.waiting_number

        # Send checkup notification to the patient
        send_checkup_notification(first_appointment.patient)

        # Delete the first appointment
        first_appointment.delete()

        # Update waiting numbers for remaining appointments
        remaining_appointments = Appointment.objects.filter(
            doctor=doctor,
            waiting_number__gt=waiting_number,
        ).order_by('waiting_number')

        for appointment in remaining_appointments:
            appointment.waiting_number -= 1
            appointment.save()

        return Response({'message': f'Appointment deleted and waiting numbers updated for doctor {doctor_code}'}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
def send_appointment_email(patient):
    subject = 'Thank You for Making an Appointment'
    body = f"""
        Dear {patient.name},

        Thank you for making an appointment with us.

        Appointment Details:
        - Doctor: {patient.doctor_code}
        - Estimated Checkup Time: {patient.appointment_set.last().estimated_checkuptime}

        We look forward to seeing you.

        Best regards,
        Your Clinic
    """

    em = EmailMessage()
    em['From'] = 'shahrezmalik123@gmail.com'
    em['To'] = patient.email
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login('shahrezmalik123@gmail.com', 'sezu vyvm glng iiet')
        smtp.sendmail('shahrezmalik123@gmail.com', patient.email, em.as_string())
        
        
    print("Email Sent ")
def send_checkup_notification(patient):
    subject = 'Your Checkup Time Has Arrived'
    body = f"""
        Dear {patient.name},

        Your checkup time has arrived.

        Doctor: {patient.doctor_code}
        Estimated Checkup Time: {patient.appointment_set.last().estimated_checkuptime}

        Please proceed to the clinic.

        Best regards,
        Your Clinic
    """

    em = EmailMessage()
    em['From'] = 'shahrezmalik123@gmail.com'
    em['To'] = patient.email
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login('shahrezmalik123@gmail.com', 'sezu vyvm glng iiet')
        smtp.sendmail('shahrezmalik123@gmail.com', patient.email, em.as_string())

    print("Checkup Notification Sent")