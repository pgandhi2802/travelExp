# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from userAuth.models import userProfile
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from .models import wishList
from experience.models import imgModel

@csrf_exempt
def fetchWishList(request):
	data=[]
	if request.method=="POST":
		authToken=request.POST["authToken"]
		fetchList=wishList.objects.filter(userID=User.objects.get(username=authToken),visitedStatus=False)
		fetchVisitedList=wishList.objects.filter(userID=User.objects.get(username=authToken),visitedStatus=True)
		_wishList=[]
		_visitedList=[]
		for i in fetchList:
			_wishList.append({"place":i.place,"id":i.id})
		for i in fetchVisitedList:
			_visitedList.append({"place":i.place})
		data=[{"status":"1","wishList":_wishList,"visitedList":_visitedList}]
	else:
		data=[{"status":"0"}]
	return HttpResponse(json.dumps(data))

@csrf_exempt
def addWish(request):
	data=[]
	if request.method=="POST":
		authToken=request.POST["authToken"]
		wish=request.POST["wish"]
		addWishEle=wishList(userID=User.objects.get(username=authToken),place=wish)
		addWishEle.save()
		data=[{"status":"1"}]
	else:
		data=[{"status":"0"}]
	return HttpResponse(json.dumps(data))

@csrf_exempt
def editWish(request):
	data=[]
	if request.method=="POST":
		wishId=request.POST["wishId"]
		editWish=wishList.objects.get(pk=wishId)
		editWish.visitedStatus=True
		editWish.save()
		data=[{"status":"1"}]
	else:
		data=[{"status":"0"}]
	return HttpResponse(json.dumps(data))