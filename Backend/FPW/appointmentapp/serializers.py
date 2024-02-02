# serializers.py

from rest_framework import serializers
from .models import Patient, Doctor, Appointment

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('code', 'username', 'password')

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('id', 'name', 'age', 'email', 'doctor_code', 'symptoms', 'entry_time')

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('id', 'patient', 'doctor', 'estimated_checkuptime', 'waiting_number')
