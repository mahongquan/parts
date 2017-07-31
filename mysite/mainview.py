# -*- coding: utf-8 -*-
import logging
from mysite.settings import MEDIA_ROOT
from django.http import HttpResponse,HttpResponseRedirect
import datetime
import json
from django.shortcuts import render_to_response
#from rest_framework.request import Request
#from rest_framework.parsers import JSONParser
import extjs
from django.template.context import RequestContext
from django.template.context_processors import csrf
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.models import Group
import mysite
import os
from django.db.models import Q
from mysite.parts.models import *
root_path=mysite.settings.STATICFILES_DIRS[0]
def true_path(path,file):
    logging.info(path)
    true=root_path+path
    if file!=None:
        true+=file
    logging.info(true)
    return true
class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Employee):
            return {"id":obj.id,"name":obj.firstName,"age":obj.managerId}
        return json.JSONEncoder.default(self, obj)
class MyEncoderCh11(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, extjs.models.Ch11):
            return {"id":obj.id,"name":obj.name,"gender":obj.gender,"dob":obj.dob,"epaper":obj.epaper}
        if isinstance(obj,datetime.date):
            return "%d/%02d/%02d" % (obj.year,obj.month,obj.day)
        return json.JSONEncoder.default(self, obj)        
def mytrim(s):
    s=s.replace(" ","")
    s=s.replace("'","")
    return s
def getdata(s):
    objs=[]
    lines=s.split("\n")
    for l in lines:
        data=l.split("(")[1]
        data=data.split(")")[0]
        cs=data.split(",")
        dic={}
        for c in cs:
            (name,value)=c.split("=>")
            dic[mytrim(name)]=mytrim(value)
        objs.append(dic)
        #logging.info(objs)
    return objs
def mycmp(s1,s2):
    return 1
def mysort(songs,sort,dir1):
    #L.sort(cmp=None, key=None, reverse=False)
    logging.info(sort,dir1)
    arr=[]
    for song in songs:
        k=song[sort]
        arr.append([k,song])
    if dir1=="ASC":
        arr.sort()
    else:
        arr.sort(reverse=True)
    out=[]
    for one in arr:
        out.append(one[1])
    return out
def editor_index(request):
    c=RequestContext(request,{})
    c.update(csrf(request))
    r=render_to_response("custom_editor_demo.html",c)
    return(r)    
def custom_editor(request):
    logging.info(request.method)
    if request.method == 'GET':
        request=Request(request,(JSONParser(),))
        start=int(request.GET.get("start","0"))
        limit=int(request.GET.get("limit","5"))
        total=extjs.models.Ch11.objects.count()
        objs = extjs.models.Ch11.objects.all()[start:start+limit]
        data=[]
        for rec in objs:
            data.append({"id":rec.id,"name":rec.name,"gender":rec.gender,"dob":rec.dob,"epaper":rec.epaper})
        out={"total":total,"results":data}
        return HttpResponse(json.dumps(out, ensure_ascii=False,cls=MyEncoderCh11))  
    elif request.method == 'POST':
        request=Request(request,(JSONParser(),))
        logging.info(request.DATA) 
        try:
            logging.info(len(request.DATA))
            id1=int(request.DATA["id"])
            if len(request.DATA)==1:
                rec=extjs.models.Ch11.objects.get(id=id1)
                rec.delete()
                output={"success":True,"message":"OK"}
                return HttpResponse(json.dumps(output, ensure_ascii=False))
            else:
                rec=extjs.models.Ch11.objects.get(id=id1)
                if request.DATA.get("name")!=None:
                    rec.name=request.DATA["name"]
                if request.DATA.get("dob")!=None:
                    d=datetime.datetime.fromtimestamp(int(request.DATA["dob"]))
                    rec.dob=d
                if request.DATA.get("gender")!=None:
                    rec.gender=request.DATA["gender"]
                if request.DATA.get("epaper")!=None:
                    rec.epaper=request.DATA["epaper"]
                rec.save()
                output={"success":True,"message":"update User" +str(rec.id)}
                output["data"]={"id":rec.id,"name":rec.name,"gender":rec.gender,"dob":rec.dob,"epaper":rec.epaper}
                return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoderCh11))
        except ValueError as e:
            #new Object
            rec=extjs.models.Ch11()
            if request.DATA.get("name")!=None:
                rec.name=request.DATA["name"]
            if request.DATA.get("dob")!=None:
                d=datetime.datetime.fromtimestamp(int(request.DATA["dob"]))
                rec.dob=d
            if request.DATA.get("gender")!=None:
                rec.gender=request.DATA["gender"]
            if request.DATA.get("epaper")!=None:
                rec.epaper=request.DATA["epaper"]
            rec.save()
            output={"success":True,"message":"create User" +str(rec.id)}
            output["data"]={"id":rec.id,"name":rec.name,"gender":rec.gender,"dob":rec.dob,"epaper":rec.epaper}
            return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoderCh11))
def data_writer_test(request):
    op = request.GET.get('op', '')
    if op == '':
        songs={ 'success':False, 'msg':"請指定動作" }
        return HttpResponse(json.dumps(songs, ensure_ascii=False))#,cls=MyEncoder))    
    if op == 'create':
        records = json.loads(request.POST['records'])
        logging.info(records)
        if type(records)!=list:#single record
            o=extjs.models.Ch11()
            o.name=records['name']
            o.gender=records['gender']
            o.epaper=records['epaper']
            d1=datetime.datetime.strptime(records['dob'],'%Y-%m-%dT00:00:00')
            d1=datetime.date(d1.year,d1.month,d1.day)
            o.dob=d1#records['dob']
            o.save()
        else:#multiple records
            for record in records:
                o=extjs.models.Ch11()
                o.name=record['name']
                o.gender=record['gender']
                o.epaper=record['epaper']
                d1=datetime.datetime.strptime(record['dob'],'%Y-%m-%dT00:00:00')
                d1=datetime.date(d1.year,d1.month,d1.day)
                o.dob=d1#records['dob']
                o.save()
        songs={ 'success':True, 'msg':"已新增紀錄" }
        return HttpResponse(json.dumps(songs, ensure_ascii=False))#,cls=MyEncoder))    
    elif op == 'read':
        start = int(request.POST['start'])
        limit = int(request.POST['limit'])
        rltSongs=extjs.models.Ch11.objects.all()#[start:start+limit]
        output={}
        output["count"]=len(rltSongs)
        output["records"]=rltSongs[start:start+limit]
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoderCh11))
    #OPERATION: UPDATE
    elif op == 'update':
        records = request.POST.get('records','')
        data = extjs.models.Ch11.objects.all()#json_decode($dataString, true);
        records = json.loads(records)
        logging.info(records)
        if type(records)!=list:#single record
            o=extjs.models.Ch11.objects.get(id=int(records['id']))
            o.name=records['name']
            o.gender=records['gender']
            o.epaper=records['epaper']
            d1=datetime.datetime.strptime(records['dob'],'%Y-%m-%dT00:00:00')
            d1=datetime.date(d1.year,d1.month,d1.day)
            o.dob=d1#records['dob']
            o.save()
        else:#multiple records
            for record in records:
                o=extjs.models.Ch11.objects.get(id=int(record['id']))
                o.name=record['name']
                o.gender=record['gender']
                o.epaper=record['epaper']
                d1=datetime.datetime.strptime(record['dob'],'%Y-%m-%dT00:00:00')
                d1=datetime.date(d1.year,d1.month,d1.day)
                o.dob=d1#records['dob']
                o.save()
        songs={ 'success':True, 'msg':"已更新紀錄" }
        return HttpResponse(json.dumps(songs, ensure_ascii=False))#,cls=MyEncoder))    
    elif op == 'destroy':
        ids = json.loads(request.POST['records'])
        logging.info(ids)
        o=extjs.models.Ch11.objects.get(id=ids)
        o.delete()
        songs={ 'success':True, 'msg':"已儲存紀錄" }
        return HttpResponse(json.dumps(songs, ensure_ascii=False))#,cls=MyEncoder))    
    else:
        songs={ 'success':False, 'msg':"测试路径" }
        return HttpResponse(json.dumps(songs, ensure_ascii=False))#,cls=MyEncoder))    
def dtable_test(request):
    data="""array( 'id'=>1, 'artist'=>'Michael Jackson', 'title'=>'Dirty Dianna',       'rate'=>5 ),
    array( 'id'=>2, 'artist'=>'U2', 'title'=>'With or without you',             'rate'=>5 ),
    array( 'id'=>3, 'artist'=>'Michael Jackson', 'title'=>'Remeber the time',   'rate'=>5 ),
    array( 'id'=>4, 'artist'=>'Michael Jackson', 'title'=>'Beat It',            'rate'=>4 ),
    array( 'id'=>5, 'artist'=>'Pink', 'title'=>'Lonely Girl',                   'rate'=>4 ),
    array( 'id'=>6, 'artist'=>'Sade', 'title'=>'Is It a Crime',                 'rate'=>5 ),
    array( 'id'=>7, 'artist'=>'U2', 'title'=>'One',                             'rate'=>3 ),
    array( 'id'=>8, 'artist'=>'Elton John', 'title'=>'Your Song',               'rate'=>5 )"""
    songs=getdata(data)
    start = int(request.GET['start'])
    limit = int(request.GET['limit'])
    search=request.GET.get("search",'')
    sort   = request.GET.get('sort','')
    dir1   = request.GET.get('dir','')
    rltSongs =[]
    if search != '':
        for i in range(len(songs)):
            song=songs[i]
            if song['artist'] == search or song['title'] == search:
                rltSongs.append(song)
    else:
        rltSongs =songs
    logging.info("sort:"+sort+",dir:"+dir1)
    logging.info(rltSongs)
    if sort != '' and dir1 != '':
        rltSongs=mysort(rltSongs,sort,dir1)
    logging.info(rltSongs)
    output={}
    output["count"]=len(rltSongs)
    output["songs"]=rltSongs[start:start+limit]
    return HttpResponse(json.dumps(output, ensure_ascii=False))#,cls=MyEncoder))
    pass

def searching_test(request):
    request2=Request(request,(JSONParser(),))
    data="""array( 'id'=>1, 'artist'=>'Michael Jackson', 'title'=>'Dirty Dianna',       'rate'=>5 ),
    array( 'id'=>2, 'artist'=>'U2', 'title'=>'With or without you',             'rate'=>5 ),
    array( 'id'=>3, 'artist'=>'Michael Jackson', 'title'=>'Remeber the time',   'rate'=>5 ),
    array( 'id'=>4, 'artist'=>'Michael Jackson', 'title'=>'Beat It',            'rate'=>4 ),
    array( 'id'=>5, 'artist'=>'Pink', 'title'=>'Lonely Girl',                   'rate'=>4 ),
    array( 'id'=>6, 'artist'=>'Sade', 'title'=>'Is It a Crime',                 'rate'=>5 ),
    array( 'id'=>7, 'artist'=>'U2', 'title'=>'One',                             'rate'=>3 ),
    array( 'id'=>8, 'artist'=>'Elton John', 'title'=>'Your Song',               'rate'=>5 )"""
    songs=getdata(data)
    start = int(request2.DATA['start'])
    limit = int(request2.DATA['limit'])
    search=request2.GET.get("search",'')
    logging.info("search:"+search)
    rltSongs =[]
    if search != '':
        for i in range(len(songs)):
            song=songs[i]
            if song['artist'] == search or song['title'] == search:
                rltSongs.append(song)
    else:
        rltSongs =songs
    logging.info(rltSongs)
    output={}
    output["count"]=len(songs)
    output["songs"]=rltSongs[start:start+limit]
    return HttpResponse(json.dumps(output, ensure_ascii=False))#,cls=MyEncoder))
def sorting_test(request):
    request=Request(request,(JSONParser(),))
    data="""array( 'id'=>1, 'name'=>'Michael Jackson', 'info'=>'KOP', 'created'=>'2011/02/01' ),
    array( 'id'=>2, 'name'=>'Sade', 'info'=>'Wonderful voice', 'created'=>'2011/01/21' ),
    array( 'id'=>3, 'name'=>'Eagles', 'info'=>'KOR', 'created'=>'2010/10/12' ),
    array( 'id'=>4, 'name'=>'U2', 'info'=>'New rock breeze', 'created'=>'2010/08/23' ),
    array( 'id'=>5, 'name'=>'George Michael', 'info'=>'Someone nice', 'created'=>'2011/02/09' )"""
    songs=getdata(data)
    logging.info(request.DATA)
    sort = request.POST['sort']
    logging.info(sort)
    dir1="ASC"
    #dir1 = request.POST['dir']
    songs=mysort(songs,sort,dir1)
    logging.info(songs)
    return HttpResponse(json.dumps(songs, ensure_ascii=False))#,cls=MyEncoder))    
    #$dir = $_POST['dir'] == 'ASC' ? SORT_ASC : SORT_DESC;
def paging_test(request):
    data="""array( 'id'=>1, 'artist'=>'Michael Jackson', 'title'=>'Dirty Dianna',       'rate'=>5 ),
         array( 'id'=>2, 'artist'=>'U2', 'title'=>'With or without you',             'rate'=>5 ),
         array( 'id'=>3, 'artist'=>'Michael Jackson', 'title'=>'Remeber the time',   'rate'=>5 ),
         array( 'id'=>4, 'artist'=>'Michael Jackson', 'title'=>'Beat It',            'rate'=>4 ),
         array( 'id'=>5, 'artist'=>'Pink', 'title'=>'Lonely Girl',                   'rate'=>4 ),
         array( 'id'=>6, 'artist'=>'Sade', 'title'=>'Is It a Crime',                 'rate'=>5 ),
         array( 'id'=>7, 'artist'=>'U2', 'title'=>'One',                             'rate'=>3 ),
         array( 'id'=>8, 'artist'=>'Elton John', 'title'=>'Your Song',               'rate'=>5 )"""
    songs=getdata(data)
    start = int(request.POST['start'])
    limit = int(request.POST['limit'])
    output={}
    output["count"]=len(songs)
    output["songs"]=songs[start:start+limit]
    return HttpResponse(json.dumps(output, ensure_ascii=False))#,cls=MyEncoder))
def feeder(request):
    id =request.POST['id']
    if id=='1':
        result = {
            'username':'Aitch',
            'email':'aitch@mail.com'
        }
    elif id=='2':
        result = {
            'username':'Mary',
            'email':'Mary@mail.com'
        }
    elif id=='3':
        result = {
            'username':'Divs',
            'email':'david@mail.com'
        }
    else:
        result={}
    data=[]
    data.append(result)
    return HttpResponse(json.dumps(data, ensure_ascii=False))
def receiver(request):
    data=request.POST.copy()
    data['submit']=True
    data['msg']='Data Received'
    return HttpResponse(json.dumps(data, ensure_ascii=False))
def combo_test(request):
    b1={'id':1, 'name':'Toyota1','age':1 }
    b2={'id':2, 'name':'Nissan2' ,'age':1}
    b3={'id':3, 'name':'Mazda3' ,'age':1}
    output=[b1,b2,b3]
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def combo_test2(request):
    b1={'id':1, 'name':'Toyota1','age':1 }
    b2={'id':2, 'name':'Nissan2' ,'age':1}
    b3={'id':3, 'name':'Mazda3' ,'age':1}
    employees=[b1,b2,b3,b1,b2,b3,b1,b2]
    output={}
    output["count"]=len(employees)
    output["employees"]=employees
    return HttpResponse(json.dumps(output, ensure_ascii=False))#,cls=MyEncoder))
def combo_test3(request):
    b1={'id':1, 'name':'Toyota1','age':1 }
    b2={'id':2, 'name':'Nissan2' ,'age':1}
    b3={'id':3, 'name':'Mazda3' ,'age':1}
    b4={'id':4, 'name':'Toyota2','age':1 }
    b5={'id':5, 'name':'Nissan3' ,'age':1}
    b6={'id':6, 'name':'Mazda4' ,'age':1}
    query =request.POST['query']
    employees=[b1,b2,b3,b4,b5,b6]
    objs=[]
    for e in employees:
        #logging.info(e['name'][0:len(query)])
        if e['name'][0:len(query)]==query:
            objs.append(e)
    output={}
    output["count"]=len(objs)
    output["employees"]=objs
    return HttpResponse(json.dumps(output, ensure_ascii=False))#,cls=MyEncoder))
def fetch_products(request):
    brandID = request.POST['brandID']
    logging.info("brandID:"+brandID)
    if brandID=="1":
        b1={'id':1, 'name':'Toyota' }
        b2={'id':2, 'name':'t1' }
        b3={'id':3, 'name':'t' }
    elif brandID=="2":
        b1={'id':1, 'name':'n2' }
        b2={'id':2, 'name':'Nissan2' }
        b3={'id':3, 'name':'n2' }
    else:
        b1={'id':1, 'name':'m3' }
        b2={'id':2, 'name':'m3' }
        b3={'id':3, 'name':'Mazda3' }
    output=[b1,b2,b3]
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def fetch_brands(request):
    b1={'id':1, 'name':'Toyota1' }
    b2={'id':2, 'name':'Nissan2' }
    b3={'id':3, 'name':'Mazda3' }
    output=[b1,b2,b3]
    return HttpResponse(json.dumps(output, ensure_ascii=False))
def index(request):
    r=HttpResponseRedirect("/static/react1/build/index.html")
    return(r)
def welcome(request):
    #print "welcome"
    logging.info("hello")
    now=datetime.datetime.now()
    return render_to_response('welcome.html', {'mynow':now})
def onefile(request):
    f = open(MEDIA_ROOT+"/crossdomain.xml", 'r' ) # Writing in binary mode for windows..?
    data=f.read()
    f.close( )
    t=HttpResponse(mimetype="text/xml")
    t.content=data
    return (t)
def loginpage(request):
    c={}
    c.update(csrf(request))
    r=render_to_response("registration/login.html",c)
    return(r)
def mylogin(request):
    username = request.POST['username']
    password = request.POST['password']
    #print username,password
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        r=HttpResponseRedirect("/afterlogin")
        return(r)
        # Redirect to a success page.
    else:
        return HttpResponse("login faile")
        # Return an error message
def mylogout(request):
    logout(request)
    return HttpResponseRedirect("/accounts/login/")
@login_required    
def afterlogin(request):
    user=request.user
    dd=Group.objects.get(name="dd")
    if dd in user.groups.all():
        r=HttpResponseRedirect("/")
    else:
        r=HttpResponseRedirect("/")
    return(r)
def getImages(request):
    path=root_path+r"\organizer\view\images"
    fs=os.listdir(path)
    objs=[]
    for f in fs:
        if os.path.isfile(path+"/"+f):
            objs.append({"name":f,"url":"/static/organizer/view/images/"+f})
    # $d = dir($dir);
    # while($name = $d->read()){
    #     if(!preg_match('/\.(jpg|gif|png)$/', $name)) continue;
    #     $size = filesize($dir.$name);
    #     $lastmod = filemtime($dir.$name)*1000;
    #     $images[] = array('name'=>$name, 'size'=>$size,
    #             'lastmod'=>$lastmod, 'url'=>$dir.$name);
    # }
    # $d->close();
    output={}
    output["count"]=len(objs)
    output["images"]=objs
    return HttpResponse(json.dumps(output, ensure_ascii=False))#,cls=MyEncoder))
def favicon(request):
    return HttpResponseRedirect("/static/images/item.png")   
def service_worker(request): 
    filepath = mysite.settings.MEDIA_ROOT 
    fullfilepath = os.path.join( filepath, "../static/service-worker.js")
    f = open( fullfilepath, 'r' ) # Writing in binary mode for windows..?
    data=f.read()
    f.close( )
    return HttpResponse(data,content_type="application/javascript")
def search(request):
    request2=request#Request(request,(JSONParser(),))
    search=request2.GET.get("term",'')
    objs =Pack.objects.filter(Q(name__icontains=search)).order_by('name')
    r=[]
    for o in objs:
        r.append(o.name)
    return HttpResponse(json.dumps(r, ensure_ascii=False))#,cls=MyEncoder))
