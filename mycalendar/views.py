from django.shortcuts import render, get_object_or_404

from .serializers import ReminderSerializer, TaskSerializer, EventSerializer, CalendarSerializer
from .models import Reminder, Task, Event, Calendar
from rest_framework import viewsets
from rest_framework.response import Response


# Create your views here.
def main(request):
    return render(request, 'mycalendar/main.html')
    
def list(request):
    return render(request, 'mycalendar/list.html')

def week(request):
    return render(request, 'mycalendar/week.html')

class ReminderViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class CalendarViewSet(viewsets.ModelViewSet):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
        