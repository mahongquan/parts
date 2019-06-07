# -*- coding: utf-8 -*-
import logging
# from mysite.settings import MEDIA_ROOT
from django.http import HttpResponse,HttpResponseRedirect
from django.db import connection,transaction
from myutil import MyEncoder
# import datetime
import json
from django.shortcuts import render_to_response
# #from rest_framework.request import Request
# #from rest_framework.parsers import JSONParser
# import extjs
# from django.template.context import RequestContext
from django.template.context_processors import csrf
def index(request):
    r=HttpResponseRedirect("/static/react1/build_bs3/index.html")
    return(r)
def loginpage(request):
    c={}
    c.update(csrf(request))
    r=render_to_response("registration/login.html",c)
    return(r)
# def mylogin(request):
#     username = request.POST['username']
#     password = request.POST['password']
#     #print username,password
#     user = authenticate(username=username, password=password)
#     if user is not None:
#         login(request, user)
#         r=HttpResponseRedirect("/afterlogin")
#         return(r)
#         # Redirect to a success page.
#     else:
#         return HttpResponse("login faile")
#         # Return an error message
# def mylogout(request):
#     logout(request)
#     return HttpResponseRedirect("/accounts/login/")
# @login_required    
# def afterlogin(request):
#     user=request.user
#     dd=Group.objects.get(name="dd")
#     if dd in user.groups.all():
#         r=HttpResponseRedirect("/")
#     else:
#         r=HttpResponseRedirect("/")
#     return(r)
# def getImages(request):
#     path=root_path+r"\organizer\view\images"
#     fs=os.listdir(path)
#     objs=[]
#     for f in fs:
#         if os.path.isfile(path+"/"+f):
#             objs.append({"name":f,"url":"/static/organizer/view/images/"+f})
#     # $d = dir($dir);
#     # while($name = $d->read()){
#     #     if(!preg_match('/\.(jpg|gif|png)$/', $name)) continue;
#     #     $size = filesize($dir.$name);
#     #     $lastmod = filemtime($dir.$name)*1000;
#     #     $images[] = array('name'=>$name, 'size'=>$size,
#     #             'lastmod'=>$lastmod, 'url'=>$dir.$name);
#     # }
#     # $d->close();
#     output={}
#     output["count"]=len(objs)
#     output["images"]=objs
#     return HttpResponse(json.dumps(output, ensure_ascii=False))#,cls=MyEncoder))
def favicon(request):
    return HttpResponseRedirect("/static/react1/build/favicon.ico")   
def sql(request):
    logging.info("sql==============================")
    cursor = connection.cursor()  
    query=request.GET.get("query","")
    logging.info(query)
    r=cursor.execute(query)
    res=r.fetchall()
    data=[]
    for one in res:
        dic1={}
        i=0
        for k in r.description:
            dic1[k[0]]=one[i]
            i+=1
        data.append(dic1)
    total=len(data)
    output={"total":total,"data":data}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
