from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^ftp', views.ftp_upload),
    url(r'', views.ftp_upload),
]

