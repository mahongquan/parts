# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
import time
import os
import logging
from django.http import HttpResponse,HttpResponseRedirect
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist#,DoesNotExist
from django.forms.models  import modelform_factory
from datetime import datetime
from django.forms import ModelForm
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.context_processors import csrf
import mysite.settings
import json
root_path=mysite.settings.STATICFILES_DIRS[0]
def true_path(path,file):
	logging.info(path)
	true=root_path+path
	if file!=None:
		true+=file
	logging.info(true)
	return true
def file_url(path,file):
	logging.info(path)
	url="/static/"+path+file
	logging.info(url)
	return url
def index(request):
	path=request.GET.get("path")
	file=request.GET.get("file")
	if path==None:
		path=""
	filepath=true_path(path,file)
	if os.path.isfile(filepath):
		r=HttpResponseRedirect(file_url(path,file))
		return(r)
	if file!=None:
		path=path+file+"/"
	files=os.listdir(true_path(path,None))
	output={"path":path,"files":files}
	#return HttpResponse(json.dumps(output, ensure_ascii=False))
	r=render_to_response("explore/index.html",output)
	return r