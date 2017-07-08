# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class experienceModel(models.Model):
	userID=models.ForeignKey(User,on_delete=models.CASCADE)
	place=models.CharField(max_length=30)
	postType=models.IntegerField()
	description=models.TextField()
	favourite=models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)

class imgModel(models.Model):
	postID=models.ForeignKey(experienceModel,on_delete=models.CASCADE)
	imgURL=models.CharField(max_length=256)
	imgGalleryName=models.CharField(blank=True,max_length=30)

class likesModel(models.Model):
	userID=models.ForeignKey(User,on_delete=models.CASCADE)
	postID=models.ForeignKey(experienceModel,on_delete=models.CASCADE)