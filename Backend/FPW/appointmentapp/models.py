# models.py

from django.db import models
from django.utils import timezone

class Doctor(models.Model):
    code = models.CharField(max_length=1, unique=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    def __str__(self):
        return f'Doctor {self.code}'

class Patient(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField()
    doctor_code = models.CharField(max_length=1)
    symptoms = models.TextField()
    entry_time = models.DateTimeField(auto_now_add=True)  # Set automatically when the patient is created

    def __str__(self):
        return self.name

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    estimated_checkuptime = models.DateTimeField()
    waiting_number = models.PositiveIntegerField()

    def __str__(self):
        return f'Appointment for {self.patient.name} with {self.doctor}'
