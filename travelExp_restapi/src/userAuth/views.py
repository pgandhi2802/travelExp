from __future__ import unicode_literals

import re
import json
import base64
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth.models import User
from .models import userProfile
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

from django.core.files.storage import FileSystemStorage

@csrf_exempt
def fetchData(request):
	if request.method=="POST":
		authToken=request.POST['authToken']
		user=User.objects.get(username=authToken)
		data=[{"status":"1","firstName":user.first_name}]
	else:
		data=[{"status":"0"}]
	return HttpResponse(json.dumps(data))

@csrf_exempt
def isAuthenticated(request):
	data=[]
	if request.method=="POST":
		userName=request.POST['authToken']
		try:
			userId=User.objects.get(username=userName)
			checkProfile=userProfile.objects.get(userID=userId)
			data=[{"status":"1"}]
		except:
			data=[{"status":"0"}]
	return HttpResponse(json.dumps(data))

@csrf_exempt
def logIn(request):
	data=[{"status":"0"}]
	validateInput=True
	if request.method=="POST":
		userName_or_userEmail=(request.POST.get("userNameEmail",""))
		userPassword=(request.POST.get("password",""))
		if userName_or_userEmail=="" or userPassword=="":
			data=[{"status":"0","error_string":"All Fields is Required"}]
			validateInput=False
		else:
			userNameAuthentication = authenticate(username=userName_or_userEmail, password=userPassword)
			print(userNameAuthentication)
			if userNameAuthentication is None:
				userEmailAuthentication = authenticate(email=userName_or_userEmail, password=userPassword)
				if userEmailAuthentication is None:
					data=[{"status":"0","error_string":"wrong Crentials"}]
					validateInput=False
				else:
					data=[{"status":"1"}]
			else:
				data=[{"status":"1"}]
	return HttpResponse(json.dumps(data))	

@csrf_exempt
def register(request):
	data=[]
	validateInput=True
	if request.method=="POST":
		firstName=request.POST["firstName"]
		lastName=request.POST["lastName"]
		userEmail=request.POST["userEmail"]
		userName=request.POST["userName"]
		userPassword=request.POST["userPassword"]
		if User.objects.filter(username=userName).exists():
			data=[{"status":"0","error_string":"User Name Already Exists"}]
			validateInput=False
		else:
			if User.objects.filter(email=userEmail).exists():
				data=[{"status":"0","error_string":"Email Already Exists"}]
				validateInput=False
			else:
				createUser = User.objects.create_user(userName, userEmail,userPassword)
				createUser.first_name = firstName
				createUser.last_name = lastName
				createUser.save()
				data=[{"status":"1"}]
	return HttpResponse(json.dumps(data))

@csrf_exempt
def createProfile(request):
	data=[]
	validateInput=True
	if request.method=="POST":
		inUserName=request.POST["userName"]
		inTagLine=request.POST["tagLine"]
		inUserAge=request.POST["userAge"]
		inUserGender=request.POST["userGender"]
		profilePicture=request.FILES['file']
		profileImageExtension=(request.FILES['file'].name).split(".")[1]
		fileStorage=FileSystemStorage()
		filename = fileStorage.save("profile_"+inUserName+"."+profileImageExtension,profilePicture)
		uploaded_file_url = fileStorage.url(filename)
		inProfilePicturePath = uploaded_file_url
		createProfile=userProfile(userID=User.objects.get(username=inUserName),tagLine=inTagLine,profilePictureURL=inProfilePicturePath,age=inUserAge,gender=inUserGender)
		createProfile.save()
		data=[{"status":"1","imageUrl":uploaded_file_url}]
	else:
		data=[{'status':"0"}]
	return HttpResponse(json.dumps(data))

@csrf_exempt
def showProfile(request):
	data=[]
	if request.method=="POST":
		authToken=request.POST["authToken"]
		user=User.objects.get(username=authToken)
		jsonData={}
		jsonData["firstName"]=user.first_name
		jsonData["lastName"]=user.last_name
		user_profile=userProfile.objects.get(userID=User.objects.get(username=authToken))
		jsonData["tagLine"]=user_profile.tagLine
		jsonData["profilePictureURL"]=user_profile.profilePictureURL
		jsonData["status"]="1"
		data.append(jsonData)
		print(json.dumps(data))
	else:
		data=[{"status":"0"}]
	return HttpResponse(json.dumps(data))
