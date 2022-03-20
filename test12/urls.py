from django.urls import path
from . import views
from django.contrib import admin
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index),
    path('home',views.home),
    
]