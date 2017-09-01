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
from django.core.exceptions import ObjectDoesNotExist#,DoesNotExist
from django.forms.models  import modelform_factory
from django.forms import ModelForm
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.template.context_processors import csrf
import datetime
import json
from mysite.parts.models import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.models import Group
from myutil import MyEncoder
def index(request):
	c={"user":request.user,"csrf_token":csrf(request)["csrf_token"]}
	r=render_to_response("extjs/index.html",c)
	return(r)
def backbone(request):
    c={"user":request.user,"csrf_token":csrf(request)["csrf_token"]}
    r=render_to_response("extjs/backbone.html",c)
    return(r)
def angular(request):
    c={"user":request.user,"csrf_token":csrf(request)["csrf_token"]}
    r=render_to_response("extjs/angular.html",c)
    return(r)
def react(request):
    c={"user":request.user,"csrf_token":csrf(request)["csrf_token"]}
    r=render_to_response("extjs/react.html",c)
    return(r)
def reactbackbone(request):
    c={"user":request.user,"csrf_token":csrf(request)["csrf_token"]}
    r=render_to_response("extjs/reactbackbone.html",c)    
    return r
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
    rec=Ch11.create(data)
    rec.save()
    output={"success":True,"message":"Created new User" +str(rec.id)}
    output["data"]=rec.json()
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def update_ch11(request):
    requestPOST = json.loads(request.body.decode("utf-8"))
    # id1=int(requestPOST["id"])
    # rec=Ch11.objects.get(id=id1)
    # myupdate(Ch11,rec,requestPOST)
    rec=Ch11.create(requestPOST)
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
    if request.method == 'PUT':
        return create_update_board(request)
def board(request,id=None):
# GET  /books/ .... collection.fetch();
# POST /books/ .... collection.create();
# GET  /books/1 ... model.fetch();
# PUT  /books/1 ... model.save();
# DEL  /books/1 ... model.destroy();
    logging.info("=board==========")
    logging.info(request)
    logging.info("------------------")
    if id!=None:
        return boardOne(request,id)
    else:
        if request.method == 'GET':
            return view_board(request)
        if request.method == 'PUT':
            return create_update_board(request)
        if request.method == 'POST':
            return create_update_board(request)
def view_board(request):
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    search=request.GET.get("search",'')
    logging.info("search="+search)
    if search!='':
        total=Ch11.objects.filter(name__contains=search).count()
        objs = Ch11.objects.filter(name__contains=search)[start:start+limit]
    else:
        total=Ch11.objects.count()
        objs = Ch11.objects.all()[start:start+limit]
    data=[]
    for rec in objs:
        data.append(rec.json())
    output={"total":total,"data":data}
    rstr=json.dumps(output, ensure_ascii=False,cls=MyEncoder)
    logging.info(rstr)
    return HttpResponse(rstr)
def create_update_board(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    logging.info(data)
    rec=Ch11.create(data)
    rec.save()
    output=rec.json()
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
def contacts(request):
    if request.method == 'GET':
        rec=Item.objects.all()
        output=[]
        for one in rec:
            output.append(one.json())
        return HttpResponse(json.dumps(output, ensure_ascii=False)) 
    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))
        contact=Item.mycreate(data)
        contact.save()
        output=contact.json()
        return HttpResponse(json.dumps(output, ensure_ascii=False)) 
def contactOne(request,id=None):
    if request.method == 'GET':
        rec=Item.objects.get(id=int(id))
        output=rec.json()
        return HttpResponse(json.dumps(output, ensure_ascii=False)) 
    if request.method == 'PUT':
        data = json.loads(request.body.decode("utf-8"))
        id=data.get("id")
        rec=Item.objects.get(id=int(id))
        rec.myupdate(data)
        rec.save()
        output=rec.json()
        return HttpResponse(json.dumps(output, ensure_ascii=False))         
    if request.method == 'DELETE':
        rec=Item.objects.get(id=int(id))
        rec.delete()
        output={"success":True}
        return HttpResponse(json.dumps(output, ensure_ascii=False)) 

