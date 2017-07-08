# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class wishList(models.Model):
	userID=models.ForeignKey(User, on_delete=models.CASCADE)
	place=models.CharField(max_length=30)
	visitedStatus=models.IntegerField(default=False)
