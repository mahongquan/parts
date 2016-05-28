# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
import time
import os
import logging
from django.http import HttpResponse,HttpResponseRedirect
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.hashers import  check_password, make_password
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User,Group
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist#,DoesNotExist
from django.forms.models  import modelform_factory
from datetime import datetime
from django.forms import ModelForm
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.context_processors import csrf
from django.template.context import RequestContext
import mysite.settings
import datetime
import json
from extjs.models import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.models import Group
class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj,datetime.date):
            return "%d-%02d-%02d" % (obj.year,obj.month,obj.day)
        if isinstance(obj,datetime.datetime):
            return "%d-%02d-%02d" % (obj.year,obj.month,obj.day)
        if isinstance(obj,Ch11):
            return obj.name
        if isinstance(obj,Contact):
            return obj.hetongbh        
        return json.JSONEncoder.default(self, obj)  
def index(request):
	c=RequestContext(request,{"user":request.user})
	c.update(csrf(request))
	r=render_to_response("extjs/index.html",c)
	return(r)
def ch11(request):
    logging.info("===================")
    logging.info(request)
    logging.info(dir(request))
    logging.info("------------------")
    if request.method == 'GET':
        return view_ch11(request)
    if request.method == 'POST':
        return create_ch11(request)
    if request.method == 'PUT':
        return update_ch11(request)
    if request.method == 'DELETE':
        return destroy_ch11(request)    
def view_ch11(request):
    logging.info("here")
    #pack_id=int(request.GET.get("pack"))
    # start=int(request.GET.get("start","0"))
    # limit=int(request.GET.get("limit","5"))
    # search_bh=request.GET.get("query",'')
    # if search_bh!='':
    #     total=Ch11.objects.filter(name__contains=search_bh).count()
    #     objs = Ch11.objects.filter(name__contains=search_bh)[start:start+limit]
    # else:
    #     total=Ch11.objects.count()
    #     objs = Ch11.objects.all()[start:start+limit]
    objs=Ch11.objects.all()
    data=[]
    for rec in objs:
        data.append(rec.json())
    logging.info(data)
    out=data#{"total":total,"data":data}
    return HttpResponse(json.dumps(out, ensure_ascii=False,cls=MyEncoder))
def create_ch11(request):
    data = request.POST
    rec=Ch11()
    myupdate(rec,data)
    rec.save()
    output={"success":True,"message":"Created new User" +str(rec.id)}
    output["data"]=rec.json()
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def myupdate(obj,data):
	fields=type(obj)._meta.fields
	for f in fields:
		if f.name=="id":
			pass
		else:
			if data.get(f.name)!=None:
				exec("obj.%s=%s" % (f.name,data.get(f.name)))
def update_ch11(request):
    requestPOST = json.loads(request.body.decode("utf-8"))
    id1=int(requestPOST["id"])
    rec=Ch11.objects.get(id=id1)
    myupdate(Ch11,rec,requestPOST)
    rec.save()
    output={"success":True,"message":"update ch11 " +str(rec.id)}
    output["data"]=rec.json()
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def destroy_ch11(request):
    requestPOST = json.loads(request.body.decode("utf-8"))
    id1=int(requestPOST["id"])
    rec=Ch11.objects.get(id=id1)
    rec.delete()
    output={"success":True,"message":"OK"}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def boardOne(request,id=None):
    if request.method == 'GET':
        output=Ch11.objects.get(id=int(id)).json()
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
    if request.method == 'DELETE':
        obj=Ch11.objects.get(id=int(id))
        obj.delete()
        output=[]
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def board(request):
    logging.info("=board==========")
    logging.info(request)
    logging.info("------------------")
    if request.method == 'GET':
        return view_board(request)
    if request.method == 'POST':
        return create_board(request)
    if request.method == 'PUT':
        return update_board(request)
    if request.method == 'DELETE':
        return destroy_board(request)
def view_board(request):
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    search=request.GET.get("search",'')
    search_bh=request.GET.get("search_bh",'')
    logging.info("search="+search)
    if search!='':
        if search_bh!='':
            total=Ch11.objects.filter(yonghu__contains=search).filter(hetongbh__contains=search_bh).count()
            objs = Ch11.objects.filter(yonghu__contains=search).filter(hetongbh__contains=search_bh)[start:start+limit]
        else:
            total=Ch11.objects.filter(yonghu__contains=search).count()
            objs = Ch11.objects.filter(yonghu__contains=search)[start:start+limit]
    else:
        if search_bh!='':
            total=Ch11.objects.filter(hetongbh__contains=search_bh).count()
            objs = Ch11.objects.filter(hetongbh__contains=search_bh)[start:start+limit]
        else:
            total=Ch11.objects.count()
            objs = Ch11.objects.all()[start:start+limit]
    data=[]
    for rec in objs:
        data.append(rec.json())
    output=data#{"total":total,"data":data}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def create_board(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    logging.info(data)
    rec=Ch11()
    rec.user=User.objects.get(id=1)
    # if data.get("channels")!=None:
    #     rec.channels=data.get("channels")
    rec.title=data["title"]
    rec.save()
    output={"success":True,"message":"Created new User" +str(rec.id)}
    output["data"]=rec.json()
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def update_board(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    id1=data.get("id")
    id1=int(id1)
    rec=Ch11.objects.get(id=id1)
    if data.get("hetongbh")!=None:
        rec.hetongbh=data["hetongbh"]
    if data.get("yujifahuo_date")!=None:
        dt=datetime.datetime.strptime(data["yujifahuo_date"],'%Y-%m-%d')
        rec.yujifahuo_date=dt.date()
    if data.get("yonghu")!=None:
        rec.yonghu=data.get("yonghu")
    if data.get("baoxiang")!=None:
        rec.baoxiang=data.get("baoxiang")
    if data.get("yiqixinghao")!=None:
        rec.yiqixinghao=data.get("yiqixinghao")
    if data.get("yiqibh")!=None:
        rec.yiqibh=data.get("yiqibh")
    if data.get("shenhe")!=None:
        rec.shenhe=data.get("shenhe")
    if data.get("addr")!=None:
        rec.addr=data.get("addr")
    if data.get("channels")!=None:
        rec.channels=data.get("channels")
    if data.get("tiaoshi_date")!=None:
        dt=datetime.datetime.strptime(data["tiaoshi_date"],'%Y-%m-%d')
        rec.tiaoshi_date=dt.date()
    rec.save()
    output={"success":True,"message":"update Ch11 " +str(rec.id)}
    output["data"]=rec.json()
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def destroy_board(request):
    data = json.loads(request.body.decode("utf-8"))
    id=data.get("id")
    if id!=None:
        try:
            id1=int(id)
            rec=Ch11.objects.get(id=id1)
            rec.delete()
            output={"success":True,"message":"OK"}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
        except ObjectDoesNotExist as e:
            output={"success":False,"message":str(e)}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
    else:
        output={"success":False,"message":"OK"}
        return HttpResponse(json.dumps(output, ensure_ascii=False))
