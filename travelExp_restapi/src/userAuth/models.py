from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class userProfile(models.Model):
	userID=models.OneToOneField(User, on_delete=models.CASCADE)
	tagLine=models.TextField()
	profilePictureURL=models.CharField(max_length=150)
	age=models.IntegerField()
	gender=models.IntegerField()

	def __str__(self):
		return (self.userID),(self.tagLine),(self.profilePictureURL),(self.age),(self.gender)