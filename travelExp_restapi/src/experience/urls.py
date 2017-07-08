from django.conf.urls import url,include
from django.contrib import admin

from . import views
urlpatterns = [
	url(r'^addExperience/', views.addExperience,name="addExperience"),
	url(r'^fetchExperience/',views.fetchExperience,name="fetchExperience"),
	url(r'^alterExperience/',views.alterExperience,name="likeExperience")
]
