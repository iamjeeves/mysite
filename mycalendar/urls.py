from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'^reminders', views.ReminderViewSet)
router.register(r'^tasks', views.TaskViewSet)
router.register(r'^events', views.EventViewSet)
router.register(r'^calendars', views.CalendarViewSet)



urlpatterns = [
    url(r'^$', views.main, name="main"),
    url(r'^agenda$', views.list, name="list"),
    url(r'^week$', views.week, name="week"),
]

urlpatterns += router.urls
