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
from django.core.context_processors import csrf
from django.template.context import RequestContext
import mysite.settings
import datetime
import json
from mysite.parts.models import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.models import Group
from django.db.models import Q
from myutil import MyEncoder

def writer(request):
    # logging.info(request)
    # output={}
    # return HttpResponse(json.dumps(output, ensure_ascii=False))
    c=RequestContext(request,{})
    c.update(csrf(request))
    r=render_to_response("rest/writer.html",c)
    return(r)
@login_required
def app_users_view(request):
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    total=User.objects.count()
    objs =User.objects.all()[start:start+limit]
    data=[]
    for rec in objs:
        data.append({"id":rec.id,"name":str(rec.username),"email":str(rec.email),"first":str(rec.first_name),"last":rec.last_name})
    logging.info(data)
    out={"total":total,"data":data}
    return HttpResponse(json.dumps(out, ensure_ascii=False,cls=MyEncoder))
@login_required    
def app_users_update(request):
    logging.info(request)
    request2=Request(request,(JSONParser(),))
    data = request2.DATA['data']
    id1=data["id"]
    rec=User.objects.get(id=id1)
    if data.get("name")!=None:
        rec.username=data["name"]
    if data.get("email")!=None:
        rec.email=data["email"]
    if data.get("first")!=None:
        rec.first_name=data["first"]
    if data.get("last")!=None:
        rec.last_name=data["last"]
    rec.save()
    output={"success":True,"message":"UPDATE new User" +str(rec.id)}
    output["data"]={"id":rec.id,"name":str(rec.username),"email":str(rec.email),"first":str(rec.first_name),"last":rec.last_name}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
@login_required    
def app_users_destroy(request):
    logging.info(request)
    request2=Request(request,(JSONParser(),))
    data = request2.DATA['data']
    id1=data["id"]
    rec=User.objects.get(id=id1)
    rec.delete()
    output={"success":True,"message":"delete User" +str(rec.id)}
    output["data"]={"id":id1}#,"name":str(rec.username),"email":str(rec.email),"first":str(rec.first_name),"last":rec.last_name}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
@login_required
def app_users_create(request):
    logging.info(request)
    request2=Request(request,(JSONParser(),))
    data = request2.DATA['data']
    rec=User()#.objects.get(id=id1)
    if data.get("name")!=None:
        rec.username=data["name"]
    if data.get("email")!=None:
        rec.email=data["email"]
    if data.get("first")!=None:
        rec.first_name=data["first"]
    if data.get("last")!=None:
        rec.last_name=data["last"]
    rec.save()
    output={"success":True,"message":"create new User" +str(rec.id)}
    output["data"]={"id":rec.id,"name":str(rec.username),"email":str(rec.email),"first":str(rec.first_name),"last":rec.last_name}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def index(request):
    c=RequestContext(request,{"user":request.user})
    c.update(csrf(request))
    return render_to_response("rest/index.html",c)
def backbone(request):
    c=RequestContext(request,{"user":request.user})
    c.update(csrf(request))
    r=render_to_response("rest/backbone.html",c)
    return(r)    
def restful(request):
    c=RequestContext(request,{"user":request.user})
    c.update(csrf(request))
    r=render_to_response("rest/restful.html",c)
    return(r)
def jqm(request):
    c=RequestContext(request,{"user":request.user})
    c.update(csrf(request))
    r=render_to_response("rest/jqm.html",c)
    return(r)
def index_2(request):
    # logging.info(request)
    # output={}
    # return HttpResponse(json.dumps(output, ensure_ascii=False))
    c=RequestContext(request,{})
    c.update(csrf(request))
    r=render_to_response("rest/index_2.html",c)
    return(r) 
def extjs6(request):
    c=RequestContext(request,{})
    c.update(csrf(request))
    r=render_to_response("rest/extjs6.html",c)
    return(r)   
@login_required
def item(request):
    logging.info("===================")
    logging.info(request)
    logging.info(dir(request))
    logging.info("------------------")
    #request2=Request(request,(JSONParser(),))
    #logging.info(request2)
    if request.method == 'GET':
        return view_item(request)
    if request.method == 'POST':
        return create_item(request)
    if request.method == 'PUT':
        return update_item(request)
    if request.method == 'DELETE':
        return destroy_item(request)    
@login_required
def application(request):
    logging.info("===================")
    logging.info(request)
    logging.info("------------------")
    request2=Request(request,(JSONParser(),))
    logging.info(request2)
    if request.method == 'GET':
        return view(request2)
    if request.method == 'POST':
        return create(request2)
    if request.method == 'PUT':
        return update(request2)
    if request.method == 'DELETE':
        return destroy(request2)
def view(request):
    objs=User.objects.all()
    data=[]
    for obj in objs:
        data.append({"id":obj.id,"email":obj.email,"username":obj.username})
    output={"data":data}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def create(request):
    f=request.META["wsgi.input"]
    logging.info(dir(f))
    data="---"
    logging.info(data)
    rec=User()
    rec.username=request.POST["username"]
    rec.email=request.POST["email"]
    rec.save()
    output={"success":True,"message":"Created new User" +str(rec.id)}
    output["data"]={"id":rec.id,"email":rec.email,"username":rec.username}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def update(request):
    id1=int(request.POST["id"])
    rec=User.objects.get(id=id1)
    if request.POST.get("username")!=None:
        rec.username=request.POST["username"]
    if request.POST.get("email")!=None:
        rec.email=request.POST["email"]
    rec.save()
    output={"success":True,"message":"Created new User" +str(rec.id)}
    output["data"]={"id":rec.id,"email":rec.email,"username":rec.username}
    return HttpResponse(json.dumps(output, ensure_ascii=False))

def destroy(request):
    id=request.path.split("/")[-1]
    id1=int(id)
    rec=User.objects.get(id=id1)
    rec.delete()
    output={"success":True,"message":"OK"}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def view_item(request):
    logging.info("here")
    #pack_id=int(request.GET.get("pack"))
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    search_bh=request.GET.get("query",'')
    if search_bh!='':
        total=Item.objects.filter(name__contains=search_bh).count()
        objs = Item.objects.filter(name__contains=search_bh)[start:start+limit]
    else:
        total=Item.objects.count()
        objs = Item.objects.all()[start:start+limit]
    data=[]
    for rec in objs:
        data.append({"id":rec.id,"bh":rec.bh,"name":rec.name,"guige":rec.guige,"danwei":rec.danwei})
    logging.info(data)
    out={"total":total,"data":data}
    return HttpResponse(json.dumps(out, ensure_ascii=False,cls=MyEncoder))
def create_item(request):
    data = json.loads(request.body.decode("utf-8"))
    #logging.info(data)
    #data=request.POST
    logging.info(data)
    requestPOST=data
    rec=Item()
    if requestPOST.get("bh")!=None:
        rec.bh=requestPOST["bh"]
    if requestPOST.get("name")!=None:
        rec.name=requestPOST["name"]
    if requestPOST.get("guige")!=None:
        rec.guige=requestPOST["guige"]
    if requestPOST.get("danwei")!=None:
        rec.danwei=requestPOST["danwei"]
    rec.save()
    output={"success":True,"message":"Created new User" +str(rec.id)}
    output["data"]={"id":rec.id,"bh":rec.bh,"name":rec.name,"guige":rec.guige,"danwei":rec.danwei}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def update_item(request):
    requestPOST = json.loads(request.body.decode("utf-8"))
    id1=int(requestPOST["id"])
    rec=Item.objects.get(id=id1)
    if requestPOST.get("bh")!=None:
        rec.bh=requestPOST["bh"]
    if requestPOST.get("name")!=None:
        rec.name=requestPOST["name"]
    if requestPOST.get("guige")!=None:
        rec.guige=requestPOST["guige"]
    if requestPOST.get("danwei")!=None:
        rec.danwei=requestPOST["danwei"]
    rec.save()
    output={"success":True,"message":"update item " +str(rec.id)}
    output["data"]={"id":rec.id,"bh":rec.bh,"name":rec.name,"guige":rec.guige,"danwei":rec.danwei}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
    objs=User.objects.all()
    data=[]
    for rec in objs:
        data.append({"id":rec.id,"hetongbh":rec.hetongbh,"yujifahuo_date":rec.yujifahuo_date,"yonghu":rec.yonghu,"baoxiang":rec.baoxiang})
    output={"data":data}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def destroy_item(request):
    requestPOST = json.loads(request.body.decode("utf-8"))
    id1=int(requestPOST["id"])
    rec=Item.objects.get(id=id1)
    rec.delete()
    output={"success":True,"message":"OK"}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
@login_required
def contact(request):
    logging.info("=contact==========")
    logging.info(request)
    logging.info("------------------")
    if request.method == 'GET':
        return view_contact(request)
    if request.method == 'POST':
        return create_contact(request)
    if request.method == 'PUT':
        return update_contact(request)
    if request.method == 'DELETE':
        return destroy_contact(request)
def view_contact(request):
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    search=request.GET.get("search",'')
    logging.info("search="+search)
    if search!='':
        #total=Contact.objects.filter( Q(yiqibh__icontains=search)).count()
        total=Contact.objects.filter(Q(hetongbh__icontains=search) | Q(yiqibh__icontains=search)).count()
        #objs = Contact.objects.filter( Q(yiqibh__icontains=search)).order_by('-yujifahuo_date')[start:start+limit]
        objs = Contact.objects.filter(Q(hetongbh__icontains=search) | Q(yiqibh__icontains=search)).order_by('-yujifahuo_date')[start:start+limit]
    else:
        total=Contact.objects.count()
        objs = Contact.objects.order_by('-yujifahuo_date')[start:start+limit]
    data=[]
    for rec in objs:
        data.append(rec.json())
    logging.info(data)
    output={"total":total,"data":data}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def create_contact(request):
    logging.info(request.body)
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    rec=Contact()
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
        #rec.tiaoshi_date=datetime.datetime.fromtimestamp(int(data["tiaoshi_date"]))
        dt=datetime.datetime.strptime(data["tiaoshi_date"],'%Y-%m-%d')
        rec.tiaoshi_date=dt.date()
    rec.save()
    output={"success":True,"message":"Created new User" +str(rec.id)}
    output["data"]={"id":rec.id,"shenhe":rec.shenhe,"hetongbh":rec.hetongbh,"yiqibh":rec.yiqibh,"yiqixinghao":rec.yiqixinghao,"yujifahuo_date":rec.yujifahuo_date,"yonghu":rec.yonghu,"baoxiang":rec.baoxiang,"addr":rec.addr,"channels":rec.channels,"tiaoshi_date":rec.tiaoshi_date}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def update_contact(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    id1=data.get("id")
    id1=int(id1)
    rec=Contact.objects.get(id=id1)
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
    if data.get("method")!=None:
        rec.method=data["method"]
    rec.save()
    output={"success":True,"message":"update Contact " +str(rec.id)}
    output["data"]={"id":rec.id,"shenhe":rec.shenhe,"hetongbh":rec.hetongbh,"yiqibh":rec.yiqibh,"yiqixinghao":rec.yiqixinghao,"yujifahuo_date":rec.yujifahuo_date,"yonghu":rec.yonghu,"baoxiang":rec.baoxiang,"addr":rec.addr,"channels":rec.channels,"tiaoshi_date":rec.tiaoshi_date}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def destroy_contact(request):
    data = json.loads(request.body.decode("utf-8"))
    id=data.get("id")
    if id!=None:
        try:
            id1=int(id)
            rec=Contact.objects.get(id=id1)
            rec.delete()
            output={"success":True,"message":"OK"}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
        except ObjectDoesNotExist as e:
            output={"success":False,"message":str(e)}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
    else:
        output={"success":False,"message":"OK"}
        return HttpResponse(json.dumps(output, ensure_ascii=False))
def mylogin(request):
    logging.info("login/////////////////////////////////////////////////")
    logging.info(request)
    request2=request#Request(request,(JSONParser(),))
    data = request2.POST
    username = data['username']
    password = data['password']
    user = authenticate(username=username, password=password)
    if user is None:
        output={"success":False,"message":"No This User"}
    else:
        login(request, user)
        rec=user
        output={"success":True,"message":"User" +str(rec.id)}
        output["data"]={"id":rec.id,"name":str(rec.username),"email":str(rec.email),"first":str(rec.first_name),"last":rec.last_name}
    r=HttpResponse(json.dumps(output, ensure_ascii=False))
    logging.info(r)
    return r
def functions(request):
    logging.info("===================")
    logging.info(request)
    logging.info("------------------")
    request2=Request(request,(JSONParser(),))
    logging.info(request2)
    if request.method == 'GET':
        return view(request2)
    if request.method == 'POST':
        return create(request2)
    if request.method == 'PUT':
        return update(request2)
    if request.method == 'DELETE':
        return destroy(request2)
@login_required
def view_item2(request):
    logging.info("here")
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    search=request.GET.get("search",'')
    search_bh=request.GET.get("search_bh",'')
    logging.info("search="+search)
    if search!='':
        if search_bh!='':
            total=Item.objects.filter(name__contains=search).filter(bh__contains=search_bh).count()
            objs = Item.objects.filter(name__contains=search).filter(bh__contains=search_bh)[start:start+limit]
        else:
            total=Item.objects.filter(name__contains=search).count()
            objs = Item.objects.filter(name__contains=search)[start:start+limit]
    else:
        if search_bh!='':
            total=Item.objects.filter(bh__contains=search_bh).count()
            objs = Item.objects.filter(bh__contains=search_bh)[start:start+limit]
        else:
            total=Item.objects.count()
            objs = Item.objects.all()[start:start+limit]
    data=[]
    for rec in objs:
        data.append({"id":rec.id,"bh":rec.bh,"name":rec.name,"guige":rec.guige,"danwei":rec.danwei})
    logging.info(data)
    out={"total":total,"data":data}
    return HttpResponse(json.dumps(out, ensure_ascii=False,cls=MyEncoder))
@login_required
def create_item2(request):
    request=Request(request,(JSONParser(),))
    logging.info(request.POST)
    datas=request.POST["data"]
    logging.info(datas)
    output={"success":True,"message":"Created new User"}
    if type(datas) is list:
        output["data"]=[]
        for data in datas:
            rec=Item()
            rec.name=data["name"]
            rec.bh=data["bh"]
            rec.guige=data["guige"]
            rec.danwei=data["danwei"]
            rec.save()
            output["data"].append({"clientId":data["id"],"id":rec.id,"bh":rec.bh,"name":rec.name,"guige":rec.guige,"danwei":rec.danwei})
    else:
        data=datas
        rec=Item()
        rec.name=data["name"]
        rec.bh=data["bh"]
        rec.guige=data["guige"]
        rec.danwei=data["danwei"]
        rec.save()
        output["data"]={"clientId":data["id"],"id":rec.id,"bh":rec.bh,"name":rec.name,"guige":rec.guige,"danwei":rec.danwei}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
    #not batch
    # request=Request(request,(JSONParser(),))
    # logging.info(request.POST)
    # data=request.POST["data"]
 #     rec=Item()
 #     rec.name=data["name"]
 #     rec.bh=data["bh"]
 #     rec.guige=data["guige"]
 #     rec.danwei=data["danwei"]
    # rec.save()
    # output={"success":True,"message":"Created new User" +str(rec.id)}
    # output["data"]={"id":rec.id,"bh":rec.bh,"name":rec.name,"guige":rec.guige,"danwei":rec.danwei}
    # return HttpResponse(json.dumps(output, ensure_ascii=False))
@login_required
def update_item2(request):
    request=Request(request,(JSONParser(),))
    datas=request.POST["data"]
    output={"success":True,"message":"update item "}
    if type(datas) is list:
        output["data"]=[]
        for data in datas:
            id1=int(data["id"])
            rec=Item.objects.get(id=id1)
            if data.get("bh")!=None:
                 rec.bh=data["bh"]
            if data.get("name")!=None:
                 rec.name=data["name"]
            if data.get("guige")!=None:
                 rec.guige=data["guige"]
            if data.get("danwei")!=None:
                 rec.danwei=data["danwei"]
            rec.save()
            output["data"].append({"clientId":data["id"],"id":rec.id,"bh":rec.bh,"name":rec.name,"guige":rec.guige,"danwei":rec.danwei})
    else:
        data=datas
        id1=int(data["id"])
        rec=Item.objects.get(id=id1)
        if data.get("bh")!=None:
             rec.bh=data["bh"]
        if data.get("name")!=None:
             rec.name=data["name"]
        if data.get("guige")!=None:
             rec.guige=data["guige"]
        if data.get("danwei")!=None:
             rec.danwei=data["danwei"]
        rec.save()
        output["data"]={"clientId":data["id"],"id":rec.id,"bh":rec.bh,"name":rec.name,"guige":rec.guige,"danwei":rec.danwei}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
    # objs=User.objects.all()
    # data=[]
    # for rec in objs:
    #     data.append({"id":rec.id,"hetongbh":rec.hetongbh,"yujifahuo_date":rec.yujifahuo_date,"yonghu":rec.yonghu,"baoxiang":rec.baoxiang})
    # output={"data":data}
    # return HttpResponse(json.dumps(output, ensure_ascii=False))
@login_required
def destroy_item2(request):
    request=Request(request,(JSONParser(),))
    datas=request.POST["data"]
    if type(datas) is list:
        for data in datas:
            id1=int(data["id"])
            rec=Item.objects.get(id=id1)
            rec.delete()
    else:
        data=datas
        id1=int(data["id"])
        rec=Item.objects.get(id=id1)
        rec.delete()
    output={"success":True,"message":"OK"}
    return HttpResponse(json.dumps(output, ensure_ascii=False))

def organize(request):
    c=RequestContext(request,{})
    c.update(csrf(request))
    r=render_to_response("rest/organizer.html",c)
    return(r)
def geticons(request):
    logging.info("here")
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    search=request.GET.get("search",'')
    search_bh=request.GET.get("search_bh",'')
    logging.info("search="+search)
    if search!='':
        if search_bh!='':
            total=Item.objects.filter(name__contains=search).filter(bh__contains=search_bh).count()
            objs = Item.objects.filter(name__contains=search).filter(bh__contains=search_bh)[start:start+limit]
        else:
            total=Item.objects.filter(name__contains=search).count()
            objs = Item.objects.filter(name__contains=search)[start:start+limit]
    else:
        if search_bh!='':
            total=Item.objects.filter(bh__contains=search_bh).count()
            objs = Item.objects.filter(bh__contains=search_bh)[start:start+limit]
        else:
            total=Item.objects.count()
            objs = Item.objects.all()[start:start+limit]
    data=[]
    for rec in objs:
        data.append({"id":rec.id,"thumb":rec.image.name,"name":rec.name})
    logging.info(data)
    return HttpResponse(json.dumps(data, ensure_ascii=False,cls=MyEncoder))
    # output=[
    #     {
    #         "name": "说明书",
    #         "thumb": "20140326_015.jpg",
    #         "url": "kitchensink",
    #         "type": "Application"
    #     },
    #     {
    #         "name": "坩埚",
    #         "thumb": "0102g001004.JPG",
    #         "url": "twitter",
    #         "type": "Application"
    #     },
    #     {
    #         "name": "真空硅脂",
    #         "thumb": "0102g001009.JPG",
    #         "url": "kiva",
    #         "type": "Application"
    #     },
    #     {
    #         "name": "铜管",
    #         "thumb": "0103a005011.JPG",
    #         "url": "geocongress",
    #         "type": "Application"
    #     }
    # ]
    # return HttpResponse(json.dumps(output, ensure_ascii=False))    
@login_required
def view_pack(request):
    logging.info("here")
    logging.info(request.GET)
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    search=request.GET.get("search",'')
    search_bh=request.GET.get("search_bh",'')
    logging.info("search="+search)
    if search!='':
        total=Pack.objects.filter(name__contains=search).count()
        objs = Pack.objects.filter(name__contains=search)[start:start+limit]
    else:
        total=Pack.objects.count()
        objs = Pack.objects.all()[start:start+limit]
    data=[]
    for rec in objs:
        data.append({"id":rec.id,"name":rec.name})
    logging.info(data)
    out={"total":total,"data":data}
    return HttpResponse(json.dumps(out, ensure_ascii=False))
@login_required
def create_pack(request):
    #request=Request(request,(JSONParser(),))
    datas = json.loads(request.body.decode("utf-8"))#extjs read data from body
    #logging.info(request.POST)
    #datas=json.loads(request.POST["data"])
    logging.info(datas)
    datas=datas["data"]
    output={"success":True,"message":"Created new User"}
    if type(datas) is list:
        output["data"]=[]
        for data in datas:
            rec=Pack()
            rec.name=data["name"]
            rec.save()
            output["data"].append({"id":rec.id,"name":rec.name})
    else:
        data=datas
        rec=Pack()
        rec.name=data["name"]
        rec.save()
        output["data"]={"id":rec.id,"name":rec.name}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
@login_required
def update_pack(request):
    request=Request(request,(JSONParser(),))
    datas=request.POST["data"]
    output={"success":True,"message":"update Pack "}
    if type(datas) is list:
        output["data"]=[]
        for data in datas:
            id1=int(data["id"])
            rec=Pack.objects.get(id=id1)
            if data.get("name")!=None:
                rec.name=data["name"]
            rec.save()
            output["data"].append({"clientId":data["id"],"id":rec.id,"name":rec.name})
    else:
        data=datas
        id1=int(data["id"])
        rec=Pack.objects.get(id=id1)
        if data.get("name")!=None:
            rec.name=data["name"]
        rec.save()
        output["data"]={"clientId":data["id"],"id":rec.id,"name":rec.name}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
@login_required
def destroy_pack(request):
    request=Request(request,(JSONParser(),))
    datas=request.POST["data"]
    if type(datas) is list:
        for data in datas:
            id1=int(data["id"])
            rec=Pack.objects.get(id=id1)
            rec.delete()
    else:
        data=datas
        id1=int(data["id"])
        rec=Pack.objects.get(id=id1)
        rec.delete()
    output={"success":True,"message":"OK"}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
#contact pack##################
@login_required
def usepack(request):
    logging.info("===================")
    logging.info(request)
    logging.info("------------------")
    #request2=Request(request,(JSONParser(),))
    #logging.info(request2)
    if request.method == 'GET':
        return view_usepack(request)
    if request.method == 'POST':
        return create_usepack(request)
    if request.method == 'PUT':
        return update_usepack(request)
    if request.method == 'DELETE':
        return destroy_usepack(request)
def view_usepack(request):
    logging.info("view_usepack")
    contact=int(request.GET.get("contact","0"))
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    total=UsePack.objects.filter(contact=contact).count()
    objs = UsePack.objects.filter(contact=contact)[start:start+limit]
    data=[]
    for rec in objs:
        data.append({"id":rec.id,"contact":str(rec.contact.id),"pack":str(rec.pack.id),"hetongbh":rec.contact.hetongbh,"name":rec.pack.name})
    logging.info(data)
    out={"total":total,"data":data}
    return HttpResponse(json.dumps(out, ensure_ascii=False,cls=MyEncoder))
def create_usepack(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    rec=UsePack()
    if(data.get("contact")!=None and data.get("pack")!=None):
        rec.contact=Contact.objects.get(id=int(data["contact"]))
        rec.pack=Pack.objects.get(id=int(data["pack"]))
        rec.save()
        output={"success":True,"message":"Created new User" +str(rec.id)}
        output["data"]={"id":rec.id,"contact":str(rec.contact.id),"pack":str(rec.pack.id),"hetongbh":rec.contact.hetongbh,"name":rec.pack.name}
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
    else:
        output={"success":False,"message":"No enough parameters"}
        output["data"]={}
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def update_usepack(request):
    id1=int(request.POST["id"])
    rec=UsePack.objects.get(id=id1)
    if request.POST.get("contact")!=None:
         rec.contact=request.POST["contact"]
    if request.POST.get("pack")!=None:
         rec.pack=request.POST["pack"]
    rec.save()
    output={"success":True,"message":"update UsePack " +str(rec.id)}
    output["data"]={"id":rec.id,"contact":str(rec.contact.id),"pack":str(rec.pack.id),"hetongbh":rec.contact.hetongbh,"name":rec.pack.name}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def destroy_usepack(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    id1=int(data["id"])
    rec=UsePack.objects.get(id=id1)
    rec.delete()
    output={"success":True,"message":"OK"}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
#pack##################
@login_required
def pack(request):
    logging.info("===================")
    logging.info(request)
    #logging.info("------------------")
    #request2=Request(request,(JSONParser(),))
    #logging.info(request2)
    if request.method == 'GET':
        return view_pack1(request)
    if request.method == 'POST':
        return create_pack1(request)
    if request.method == 'PUT':
        return update_pack1(request)
    if request.method == 'DELETE':
        return destroy_pack1(request)
def view_pack1(request):
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    search_bh=request.GET.get("search",'')
    if search_bh!='':
        total=Pack.objects.filter(name__contains=search_bh).count()
        objs =Pack.objects.filter(name__contains=search_bh)[start:start+limit]
    else:
        total=Pack.objects.count()
        objs =Pack.objects.all()[start:start+limit]
    #total=Pack.objects.count()
    #objs = Pack.objects.all()[start:start+limit]
    data=[]
    for rec in objs:
        data.append({"id":rec.id,"name":rec.name})
    logging.info(data)
    out={"total":total,"data":data}
    return HttpResponse(json.dumps(out, ensure_ascii=False,cls=MyEncoder))
def create_pack1(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    if(data.get("name")!=None):
        rec=Pack()
        rec.name=data["name"]
        rec.save()
        output={"success":True,"message":"Created new User" +str(rec.id)}
        output["data"]={"id":rec.id,"name":rec.name}
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
    else:
        output={"success":False,"message":"No enough parameters"}
        output["data"]={}
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def update_pack1(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    id1=int(data["id"])
    rec=Pack.objects.get(id=id1)
    if data.get("name")!=None:
        rec.name=data["name"]
    rec.save()
    output={"success":True,"message":"update UsePack " +str(rec.id)}
    output["data"]={"id":rec.id,"name":rec.name}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def destroy_pack1(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    #id=request.path.split("/")[-1]
    id1=int(data["id"])
    rec=Pack.objects.get(id=id1)
    rec.delete()
    output={"success":True,"message":"OK"}
    return HttpResponse(json.dumps(output, ensure_ascii=False))
@login_required
def packItem(request):
    if request.method == 'GET':
        return view_packItem(request)
    if request.method == 'POST':
        return create_packItem(request)
    if request.method == 'PUT':
        return update_packItem(request)
    if request.method == 'DELETE':
        return destroy_packItem(request)
def view_packItem(request):
    logging.info("view_packitem")
    contact=int(request.GET.get("pack","0"))
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    # search_bh=request.GET.get("search",'')
    # if search_bh!='':
    #     total=PackItem.objects.filter(name__contains=search_bh).count()
    #     objs =PackItem.objects.filter(name__contains=search_bh)[start:start+limit]
    # else:
    #     total=PackItem.objects.count()
    #     objs =PackItem.objects.all()[start:start+limit]
    total=PackItem.objects.filter(pack=contact).count()
    objs =PackItem.objects.filter(pack=contact)[start:start+limit]
    data=[]
    for rec in objs:
        data.append(rec.json())
    output={"data":data,"total":total}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def create_packItem(request):
     #request2=Request(request)
     #logging.info(request.POST)
     #logging.info("body=("+str(request.body)+")")
     data = json.loads(request.body.decode("utf-8"))#extjs read data from body
     logging.info("data=("+str(data)+")")
     rec=PackItem()
     if data.get("pack")!=None:
         rec.pack=Pack.objects.get(id=int(data["pack"]))
     if data.get("itemid")!=None:
         rec.item=Item.objects.get(id=int(data["itemid"]))
     if data.get("ct")!=None:
         rec.ct=int(data.get("ct"))
     rec.save()
     output={"success":True,"message":"Created new User" +str(rec.id)}
     output["data"]=rec.json()
     return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def update_packItem(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    id1=data.get("id")
    if id1!=None:
         id1=int(id1)
         rec=PackItem.objects.get(id=id1)
         if data.get("pack")!=None:
             rec.pack=Pack.objects.get(id=int(data["pack"]))
         if data.get("itemid")!=None:
             rec.item=Item.objects.get(id=int(data["itemid"]))
         if data.get("ct")!=None:
             rec.ct=int(data.get("ct"))
         rec.save()
         output={"success":True,"message":"update Contact " +str(rec.id)}
         output["data"]=rec.json()
         return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
    else:
        output={"success":False,"message":"need  id"}
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def destroy_packItem(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    id=data.get("id")
    if id!=None:
        try:
            id1=int(id)
            rec=PackItem.objects.get(id=id1)
            rec.delete()
            output={"success":True,"message":"OK"}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
        except ObjectDoesNotExist as e:
            output={"success":False,"message":str(e)}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
    else:
        output={"success":False,"message":"OK"}
        return HttpResponse(json.dumps(output, ensure_ascii=False))
def upload(request):
    # where to store files. Probably best defined in settings.py
    filepath = mysite.settings.MEDIA_ROOT 

    # right, so 'file' is the name of the file upload field
    #print request.FILES
    logging.info(request.FILES)
    f= request.FILES[ 'file' ]
    logging.info(dir(f))
    filename = f.name
    filetype = f.content_type

    #the uploaded data from the file
    #f.open()
    
    data=f.read()

    # the full file path and name
    fullfilepath = os.path.join( filepath, filename )

    # clean up filenames & paths:
    fullfilepath = os.path.normpath( fullfilepath )
    fullfilepath = os.path.normcase( fullfilepath )

    # try to write file to the dir.
    try:
        f = open( fullfilepath, 'wb' ) # Writing in binary mode for windows..?
        f.write( data )
        f.close( )
        res={"success":True, "files":"./"+filename}
    except e:
        res={"success":False, "files":str(e)}
        # something went wrong 
    return HttpResponse(json.dumps(res, ensure_ascii=False))