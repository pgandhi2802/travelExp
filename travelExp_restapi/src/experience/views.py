from __future__ import unicode_literals

import re
import json
import base64
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth.models import User
from userAuth.models import userProfile
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.db.models import Max


from django.core.files.storage import FileSystemStorage
from .models import experienceModel,imgModel,likesModel

@csrf_exempt
def addExperience(request):
	data=[]
	if request.method=="POST":
		authToken=request.POST["authToken"]
		description=request.POST["description"]
		placeName=request.POST["placeName"]
		galleryName=request.POST['galleryName']
		files=request.FILES.getlist("file","")
		print(len(files))
		if len(files)==0:
			experienceType="0"
		elif description=="":
			experienceType="1"
		else:
			experienceType="2"
		experience=experienceModel(userID=User.objects.get(username=authToken),place=placeName,postType=experienceType,description=description)
		experience.save()
		experienceModel_id=experience.id
		fileStorage=FileSystemStorage()
		for i in files:
			imageModel=imgModel.objects.all().aggregate(Max('id'))
			if imageModel['id__max'] is None:
				imgModel_latest_Id=1
			else:
				imgModel_latest_Id=int(imageModel['id__max'])+1
			imageExtension=i.name.split(".")[1]
			imageName="experienceImage_"+authToken+"_"+str(imgModel_latest_Id)+"."+imageExtension
			filename = fileStorage.save(imageName, i)
			uploaded_file_url = fileStorage.url(filename)
			image=imgModel(postID=experienceModel.objects.get(pk=experienceModel_id),imgURL=uploaded_file_url,imgGalleryName=galleryName)
			image.save()
			print(uploaded_file_url)
	data=[{"status":"1"}]
	return HttpResponse(json.dumps(data))

@csrf_exempt
def fetchExperience(request):
	data=[]
	if request.method=="POST":
		authToken=request.POST.get("authToken","")
		pageNumber=int(request.POST["pageNumber"])
		if request.POST["myProfileFlag"]==0:
			experiencesObject=experienceModel.objects.all().order_by('-created_at')
		else:
			experiencesObject=experienceModel.objects.filter(userID=User.objects.get(username=authToken)).order_by('-created_at')
		experiences=[]
		for experienceObject in experiencesObject:
			experience={}
			userObject=User.objects.get(id=experienceObject.userID_id)
			experience["exprienceID"]=experienceObject.id
			experience["hashexprienceID"]="#"+str(experienceObject.id)
			# userName=userObject.username
			experience["userName"]=userObject.username.capitalize()
			# userFirstName=userObject.first_name
			experience["userFirstName"]=userObject.first_name.capitalize()
			# userLastName=userObject.last_name
			experience["userLastName"]=userObject.last_name.capitalize()
			# userImageURL=imgModel.objects.get(userId=experience.userID_id)
			for imageUrlObject in userProfile.objects.filter(userID=userObject.id):
				experience["userImageURL"]=imageUrlObject.profilePictureURL
			experience["expriencePlace"]=experienceObject.place
			# experienceType=experience.postType
			experience["experienceType"]=experienceObject.postType
			# experienceDescription=experience.description
			experience["experienceDescription"]=experienceObject.description
			# experiencesLikeCount=likesModel.objects.filter(postID=experienceModel.objects.get(pk=experience.id)).count()
			experience["experiencesLikeCount"]=likesModel.objects.filter(postID=experienceObject.id).count()
			# isUserLiked=likesModel.objects.filter(userID=User.objects.get(username=authToken),postID=experienceModel.objects.get(pk=experience.id)).count()
			isUserLiked=likesModel.objects.filter(userID=User.objects.get(username=authToken),postID=experienceObject.id).count()
			if isUserLiked==1:
				experience["experiencesLikeCount"]=experience["experiencesLikeCount"]-1
			experience["isUserLiked"]=isUserLiked
			
			imageUrls=[]
			imageUrlObjects=imgModel.objects.filter(postID=experienceObject.id)
			for imageUrlObject in imageUrlObjects:
				imageUrl={"imageUrl":imageUrlObject.imgURL}
				# commentText=commentObject.commentsText
				# imageUrl.append("imageUrl",imageUrlObject.imgURL)
				imageUrls.append(imageUrl)
			experience["imageUrls"]=imageUrls
			experiences.append(experience)
		data=[{"status":"1","experiences":experiences}]
	else:
		data=[{"status":"0"}]
	return HttpResponse(json.dumps(data))

@csrf_exempt
def alterExperience(request):
	data=[]
	if request.method=="POST":
		authToken=request.POST['authToken']
		postId=request.POST['expID']
		try:
			isLikeavailable=likesModel.objects.get(postID=experienceModel.objects.get(pk=postId),userID=User.objects.get(username=authToken))
			isLikeavailable.delete()
			data=[{"status":"1"}]
		except:
			likeExperience=likesModel(postID=experienceModel.objects.get(pk=postId),userID=User.objects.get(username=authToken))
			likeExperience.save()
			data=[{"status":"1"}]
	else:
		data=[{"status":"0"}]
	return HttpResponse(json.dumps(data))