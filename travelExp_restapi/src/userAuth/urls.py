from django.conf.urls import url
from django.contrib import admin

from . import views

urlpatterns = [
	url(r'^isAuthenticated/',views.isAuthenticated,name="isAuthenticated" ),
	url(r'^fetchData/',views.fetchData,name="fetchData" ),
	url(r'^logIn/',views.logIn,name="userlogIn"),
	url(r'^register/',views.register,name="register"),
	url(r'^createProfile/',views.createProfile,name="createProfile"),
	url(r'^showProfile',views.showProfile,name="showProfile")
]
