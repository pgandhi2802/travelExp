from django.conf.urls import url
from django.contrib import admin

from . import views

urlpatterns = [
	url(r'^addWish/',views.addWish,name="addWish"),
	url(r'^fetchWishList/',views.fetchWishList,name="fetchWish"),
	url(r'^editWish/',views.editWish,name="editWish")
]
