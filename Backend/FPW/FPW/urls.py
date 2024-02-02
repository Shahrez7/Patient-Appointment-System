"""
URL configuration for CMS project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from appointmentapp import views

urlpatterns = [
    path('', views.index),
    path('admin/', admin.site.urls),
    # re_path(r'^api/patients/$', views.patients_list),
    # re_path(r'^api/patients/(?P<pk>[0-9])$', views.patients_detail),
    # re_path(r'^api/appointments/$', views.appointments_list),
    # re_path(r'^api/appointments/(?P<pk>[0-9])$', views.appointments_detail),
    path('api/doctors/<str:doctor_code>/patients/', views.get_patients_for_doctor, name='get_patients_for_doctor'),
    path('api/patients/<int:patient_id>/', views.get_patient_details, name='get_patient_details'),
    path('api/doctors/<str:doctor_code>/', views.get_doctor_details, name='get_doctor_details'),
    path('api/doctors/', views.doctors_list),
    path('api/create-patient/', views.create_patient_and_appointment_view),
    path('api/doctors/<str:doctor_code>/appointments/', views.doctor_appointments_list),
    path('delete_first_appointment/<str:doctor_code>/', views.delete_first_appointment, name='delete_first_appointment'),
    # re_path(r'^api/doctors/(?P<code>[A-F])$', views.doctors_detail),
]