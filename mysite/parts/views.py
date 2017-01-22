# -*- coding: utf-8 -*-
from django.db.models import Q
#from django.db.models.functions import TruncMonth
from mysite.parts.models import *
from django.shortcuts import render_to_response
import time
import tarfile
import os
from io import BytesIO,StringIO
import logging
from django.http import HttpResponse,HttpResponseRedirect,FileResponse
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist#,DoesNotExist
from django.forms.models  import modelform_factory
import mysite.parts.models
from datetime import datetime
from django.forms import ModelForm
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.template.context_processors import csrf
import json 
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from mysite.settings import MEDIA_ROOT,MEDIA_URL
#import zhengshu
#from genDoc.excelXml_write import *
from genDoc.excel_write import *
#from lxml import etree as ET
import datetime
from genDoc.docx_write import genPack,genQue
import genDoc.genLabel
from genDoc.recordXml import genRecord
from django.db.models import Count
from django.db import connection,transaction
# #@api_view(['GET', 'POST','DELETE'])
# def user_list(request, format=None):
#     """
#     List all users, or create a new user.
#     """
#     logging.info("-============================")
#     logging.info(request.method)
#     logging.info(dir(request._request))
#     logging.info(request._request)
#     if request.method == 'GET':
#         ct=User.objects.count()
#         serializer = UserSerializer(User.objects.all(), many=True)
#         out={"total":ct,"results":serializer.data}
#         #logging.info(serializer.data)
#         return Response(out)
#     elif request.method == 'POST':
#         serializer = UserSerializer(data=request.DATA)
#         if serializer.is_valid():
#             logging.info("save")
#             serializer.save()
#             serializer.data["clientId"]=request.DATA["id"]
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             logging.info("not save")
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         id1=request.DATA["id"]
#         one=User.objects.get(id=int(id1))
#         if one!=None:
#             logging.info("save")
#             one.delete()
#             return Response({}, status=status.HTTP_201_CREATED)
#         else:
#             logging.info("not save")
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# #@api_view(['GET', 'POST'])
# def item_list(request, format=None):
#     """
#     List all snippets, or create a new snippet.
#     """
#     logging.info(dir(request._request))
#     logging.info(request._request)
#     if request.method == 'GET':
#         contact=int(request.GET.get("contact","0"))
#         start=int(request.GET.get("start","0"))
#         limit=int(request.GET.get("limit","5"))
#         ct=ContactItem.objects.filter(contact=contact).count()
#         snippets = ContactItem.objects.filter(contact=contact)[start:start+limit]
#         serializer = ContactItemSerializer(snippets, many=True)
#         out={"total":ct,"results":serializer.data}
#         #logging.info(serializer.data)
#         return Response(out)
#     elif request.method == 'POST':
#         serializer = ContactItemSerializer(data=request.DATA)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            
# #@api_view(['GET', 'POST'])
# def contact_list(request, format=None):
#     """
#     List all snippets, or create a new snippet.
#     """
#     logging.info(dir(request._request))
#     logging.info(request._request)
#     if request.method == 'GET':
#         start=int(request.GET.get("start","0"))
#         limit=int(request.GET.get("limit","5"))
#         ct=Contact.objects.count()
#         snippets = Contact.objects.all()[start:start+limit]
#         serializer = ContactSerializer(snippets, many=True)
#         out={"total":ct,"results":serializer.data}
#         #logging.info(serializer.data)
#         return Response(out)
#     elif request.method == 'POST':
#         serializer = ContactSerializer(data=request.DATA)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def month12(request):
    logging.info("chart")
    # r=Contact.objects
    # .annotate(month=TruncMonth('tiaoshi_date'))  # Truncate to month and add to select list
    # .values('month')                          # Group By month
    # .annotate(c=Count('id'))                  # Select the count of the grouping
    # .values('month', 'c')  
    # logging.info(r)
    # logging.info(dir(r))
    end_date=datetime.datetime.now()
    #start_date=end_date+datetime.timedelta(-365)
    start_date=datetime.datetime(end_date.year-1,1,1,0,0,0)
    # query = Contact.objects.filter(tiaoshi_date__range=(start_date, end_date)).extra(select={'year': "EXTRACT(year FROM tiaoshi_date)",
    #                                           'month': "EXTRACT(month from tiaoshi_date)",
    #                                           'day': "EXTRACT(day from tiaoshi_date)"}

    #                                   ).values('year', 'month', 'day').annotate(Count('id'))
    # contacts=query.all()
    #Contact.objects.raw("select * from ");
    cursor = connection.cursor()            #获得一个游标(cursor)对象
    #更新操作
    start_date_s=start_date.strftime("%Y-%m-%d")
    end_date_s=end_date.strftime("%Y-%m-%d")
    cmd="select strftime('%Y-%m',tiaoshi_date) as month,count(id) from parts_contact  where tiaoshi_date between '"+start_date_s+"' and '"+end_date_s+"' group by month"
    logging.info(cmd)
    cursor.execute(cmd)    #执行sql语句
    #transaction.commit_unless_managed()     #提交到数据库
    #查询操作
    #cursor.execute('select * from other_other2 where id>%s' ,[1])

    raw = cursor.fetchall()                 #返回结果行 或使用 #raw = cursor.fetchall()
    lbls=[]
    values=[]
    for one in raw:
        lbls.append(one[0]+"月")
        values.append(one[1])
    #如果连接多个数据库则使用django.db.connections
    #from django.db import connections
    #_cursor = connections['other_database'].cursor()
    #如果执行了更新、删除等操作
    #transaction.commit_unless_managed(using='other_databases')
    r=render_to_response("parts/chart.html",{"user":request.user,"lbls":lbls,"values":values})
    return(r)
def month(request):
    logging.info("chart")
    # r=Contact.objects
    # .annotate(month=TruncMonth('tiaoshi_date'))  # Truncate to month and add to select list
    # .values('month')                          # Group By month
    # .annotate(c=Count('id'))                  # Select the count of the grouping
    # .values('month', 'c')  
    # logging.info(r)
    # logging.info(dir(r))
    end_date=datetime.datetime.now()
    #start_date=end_date+datetime.timedelta(-365)
    start_date=datetime.datetime(end_date.year,1,1,0,0,0)
    # query = Contact.objects.filter(tiaoshi_date__range=(start_date, end_date)).extra(select={'year': "EXTRACT(year FROM tiaoshi_date)",
    #                                           'month': "EXTRACT(month from tiaoshi_date)",
    #                                           'day': "EXTRACT(day from tiaoshi_date)"}

    #                                   ).values('year', 'month', 'day').annotate(Count('id'))
    # contacts=query.all()
    #Contact.objects.raw("select * from ");
    cursor = connection.cursor()            #获得一个游标(cursor)对象
    #更新操作
    start_date_s=start_date.strftime("%Y-%m-%d")
    end_date_s=end_date.strftime("%Y-%m-%d")
    cmd="select strftime('%m',tiaoshi_date) as month,count(id) from parts_contact  where tiaoshi_date between '"+start_date_s+"' and '"+end_date_s+"' group by month"
    logging.info(cmd)
    cursor.execute(cmd)    #执行sql语句
    #transaction.commit_unless_managed()     #提交到数据库
    #查询操作
    #cursor.execute('select * from other_other2 where id>%s' ,[1])

    raw = cursor.fetchall()                 #返回结果行 或使用 #raw = cursor.fetchall()
    lbls=[]
    values=[]
    for one in raw:
        lbls.append(one[0]+"月")
        values.append(one[1])
    #如果连接多个数据库则使用django.db.connections
    #from django.db import connections
    #_cursor = connections['other_database'].cursor()
    #如果执行了更新、删除等操作
    #transaction.commit_unless_managed(using='other_databases')
    r=render_to_response("parts/chart.html",{"user":request.user,"lbls":lbls,"values":values})
    return(r)
  
def chart(request):
    logging.info("chart")
    # r=Contact.objects
    # .annotate(month=TruncMonth('tiaoshi_date'))  # Truncate to month and add to select list
    # .values('month')                          # Group By month
    # .annotate(c=Count('id'))                  # Select the count of the grouping
    # .values('month', 'c')  
    # logging.info(r)
    # logging.info(dir(r))
    end_date=datetime.datetime.now()
    start_date=end_date+datetime.timedelta(-365)
    # query = Contact.objects.filter(tiaoshi_date__range=(start_date, end_date)).extra(select={'year': "EXTRACT(year FROM tiaoshi_date)",
    #                                           'month': "EXTRACT(month from tiaoshi_date)",
    #                                           'day': "EXTRACT(day from tiaoshi_date)"}

    #                                   ).values('year', 'month', 'day').annotate(Count('id'))
    # contacts=query.all()
    #Contact.objects.raw("select * from ");
    cursor = connection.cursor()            #获得一个游标(cursor)对象
    #更新操作
    start_date_s=start_date.strftime("%Y-%m-%d")
    end_date_s=end_date.strftime("%Y-%m-%d")
    cmd='select baoxiang,count(id) from parts_contact  where tiaoshi_date between "%s" and "%s" group by baoxiang' % (start_date_s,end_date_s)
    logging.info(cmd)
    cursor.execute(cmd)    #执行sql语句
    #transaction.commit_unless_managed()     #提交到数据库
    #查询操作
    #cursor.execute('select * from other_other2 where id>%s' ,[1])

    raw = cursor.fetchall()                 #返回结果行 或使用 #raw = cursor.fetchall()
    lbls=[]
    values=[]
    for one in raw:
        lbls.append(one[0])
        values.append(one[1])
    #如果连接多个数据库则使用django.db.connections
    #from django.db import connections
    #_cursor = connections['other_database'].cursor()
    #如果执行了更新、删除等操作
    #transaction.commit_unless_managed(using='other_databases')
    r=render_to_response("parts/chart.html",{"user":request.user,"lbls":lbls,"values":values})
    return(r) 

def onepage(request):
    logging.info("onepage")
    objects=Contact.objects.all()
    paginator= Paginator(objects, 5)#contact number per page
    page = request.GET.get('page')
    try:
        contacts = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        contacts = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        contacts = paginator.page(paginator.num_pages)
    r=render_to_response("parts/onepage.html",{"user":request.user,"contacts":contacts})
    return(r) 
def getCurrentContacts(request):        
    return request.user.contact_set.all()
 
def getCurrentUser(request):
    return request.user
def saveuser(request):
    bh=request.POST["username"]
    password=request.POST["password"]
    try:
        u=User.objects.get(username=bh)
    except ObjectDoesNotExist as e:
        u=User(username=bh)
        u.set_password(password)
        u.save()
        user = authenticate(username=bh, password=password)
        if user is not None:
            login(request, user)
            r=HttpResponseRedirect("/parts/afterlogin")
            return(r)
        else:
            return HttpResponse("login fail")
    else:
        err=bh+" already used by others"
        r=render_to_response("registration/register.html",{"err":err})
    return r
def register(request):
    r=render_to_response("registration/register.html")
    return r

    
def afterlogin(request):
    user=request.user
    dd=Group.objects.get(name="dd")
    if dd in user.groups.all():
        r=HttpResponseRedirect("/parts/")
    else:
        r=HttpResponseRedirect("/parts/")
    return(r)
#@staff_member_required
def loginpage(request):
    c={}
    c.update(csrf(request))
    r=render_to_response("registration/login.html",c)
    return(r)
def mylogin(request):
    logging.info(request.POST)
    username = request.POST['username']
    password = request.POST['password']
    #print username,password
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        r=HttpResponseRedirect("/parts/afterlogin")
        return(r)
        # Redirect to a success page.
    else:
        return HttpResponse("login faile")
        # Return an error message
def mylogout(request):
    logout(request)
    return HttpResponseRedirect("/accounts/login/")
def logout_user(http_request):
    logout(http_request)
 
def login_user(http_request, username, password):
    user = authenticate(username=username, password=password)
    if user is not None:
        login(http_request, user)
        return user
    return None
def items(request):
    logging.info("items")
    objects=Item.objects.all()
    paginator= Paginator(objects, 5)#contact number per page
    page = request.GET.get('page')
    try:
        contacts = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        contacts = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        contacts = paginator.page(paginator.num_pages)
    r=render_to_response("parts/items.html",{"user":request.user,"contacts":contacts})
    return r
def index(request):
    logging.info("index")
    objects=Contact.objects.order_by('-yujifahuo_date').all()
    logging.info(objects)
    paginator= Paginator(objects, 10)#contact number per page
    page = request.GET.get('page')
    try:
        contacts = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        contacts = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        contacts = paginator.page(paginator.num_pages)
    r=render_to_response("parts/dd_index.html",{"user":request.user,"contacts":contacts})
#    print dir(r)
    # r.headers["Pragma"]="No-cache"
    # r.headers["Cache-Control"]="no-cache"
    # r.headers["Expires"]="0"
#    print r.headers
    return(r)

def newcontact(request):
    dic = {}
    dic.update(csrf(request))
    dic["new"]="1"
    r=render_to_response("parts/newcontact.html",dic)
    return(r)

def savecontact(request):
    logging.info(request.POST)
    #===============
    new=request.POST["new"]
    yonghu=request.POST["yonghu"]
    yiqixinghao=request.POST["yiqixinghao"]
    yiqibh=request.POST["yiqibh"]
    baoxiang=request.POST["baoxiang"]
    shenhe=request.POST["shenhe"]
    yujifahuo_date=request.POST["yujifahuo_date"]
    hetongbh=request.POST["hetongbh"]

    if new=="1":
        c=Contact(yonghu=yonghu,yiqixinghao=yiqixinghao,yiqibh=yiqibh,baoxiang=baoxiang
        ,shenhe=shenhe,yujifahuo_date=yujifahuo_date,hetongbh=hetongbh
         )
        c.save()
    else:
        contact_id=request.POST["contact_id"]
        c=Contact.objects.get(id=contact_id)
        c.yonghu=yonghu
        c.yiqixinghao=yiqixinghao
        c.yiqibh=yiqibh
        c.baoxiang=baoxiang
        c.shenhe=shenhe
        c.yujifahuo_date=yujifahuo_date
        c.hetongbh=hetongbh
        c.save()
    r=HttpResponseRedirect("/parts/")
    return(r)

def editcontact(request):
    #print request.GET
    dic = {}
    dic.update(csrf(request))
    contact_id=request.GET["id"]
    c=Contact.objects.get(id=contact_id)
    dic["user"]=request.user
    dic["contact"]=c
    dic["new"]=0
    r=render_to_response("parts/newcontact.html",dic)
    return(r)

def deletecontact(request):
    #print request.GET
    contact_id=request.GET["id"]
    c=Contact.objects.get(id=contact_id)
    c.delete()
    r=HttpResponseRedirect("/parts/")
    return(r)

def finishcontact(request):
    r=HttpResponseRedirect("/parts/")
    return(r)
# def addItem(items,item):
#     find=False
#     for i in items:
#         if i.id==item.id:
#             i.ct +=item.ct
#             find=True
#             break
#     if not find:
#         items.append(item)
#     return (items,find)
def showcontact(request):
    #print request.GET
    dic = {}
    dic.update(csrf(request))
    contact_id=request.GET["id"]
    c=Contact.objects.get(id=contact_id)
    dic["user"]=request.user
    dic["contact"]=c
    (items,items2)=c.huizong()
    dic["items"]=items
    if len(items2)==0:
        items2=None
    dic["items2"]=items2
    dic["new"]=0
    totalct=0
    for i in items:
        totalct +=i.ct
    dic["totalct"]=totalct
    dic["totalid"]=len(items)
    r=render_to_response("parts/t_装箱单.html",dic)
    return(r)

def user_lists(request, username): 
    todo_lists = Contact.objects.all()
    return object_list(request, queryset=todo_lists) 

# def server_processing(reauest):
#     objs= Ajax.objects.all()
#     output = {
#         "sEcho" : 1,
#         "iTotalRecords" : 1,
#         "iTotalDisplayRecords" : 1,
#         "aaData" : []
#     }
#     outdata=[]
#     for  row in objs:
#         outrow = []
#         outrow.append(row.engine)# = models.CharField(max_length=30)
#         outrow.append(row.browser)#=models.CharField(max_length=30,null=True)
#         outrow.append(row.platform)#=models.CharField(max_length=30,null=True)
#         outrow.append(row.version)#=models.FloatField()
#         outrow.append(row.grade)#=models.CharField(max_length=30,null=True)
#         outdata.append(outrow)
#     output['aaData']= outdata
#     return HttpResponse(simplejson.dumps(output, ensure_ascii=False))
# def ajax(reauest):
#     objs= Ajax.objects.all()
#     a=objs[0].engine
#     return HttpResponse(simplejson.dumps(a, ensure_ascii=False))
# def post(request):
#     logging.info("==========")
#     logging.info(request.POST)
#     objs= Ajax.objects.all()
#     output = {
#         "sEcho" : 1,
#         "iTotalRecords" : 1,
#         "iTotalDisplayRecords" : 1,
#         "aaData" : []
#     }
#     outdata=[]
#     for  row in objs:
#         outrow = []
#         outrow.append(row.engine)# = models.CharField(max_length=30)
#         outrow.append(row.browser)#=models.CharField(max_length=30,null=True)
#         outrow.append(row.platform)#=models.CharField(max_length=30,null=True)
#         outrow.append(row.version)#=models.FloatField()
#         outrow.append(row.grade)#=models.CharField(max_length=30,null=True)
#         outdata.append(outrow)
#     output['aaData']= outdata
#     return HttpResponse(simplejson.dumps(output, ensure_ascii=False))
def editable_ajax(request):
    #print "---"
    logging.debug(request.POST)
    #print request.POST
    #print request
    return HttpResponse(request.POST['value']+' (server updated)')
def tarDict(dict1):
    fgz = BytesIO()
    tar = tarfile.open(mode="w",fileobj=fgz)
    ks=dict1.keys()
    for key in ks:
        tarinfo=tarfile.TarInfo(name=key)
        f1=BytesIO(dict1[key])#byteio object
        tarinfo.size=len(dict1[key])#f1.read())
        tar.addfile(tarinfo,fileobj=f1)
    tar.close()
    return fgz
def tar(request):
    contact_id=request.GET["id"]
    c=Contact.objects.get(id=contact_id)
    fullfilepath = os.path.join(MEDIA_ROOT,"t_证书数据表.xlsx")
    logging.info(fullfilepath)
    data=genShujubiao(c,fullfilepath)
    data2=getJiaoZhunFile(c)
    byteio=tarDict({"证书数据表.xlsx":data,c.yonghu+"_"+c.yiqixinghao+".xlsx":data2})
    byteio.seek(0)
    data=byteio.read()#.decode()
    t=HttpResponse(data,content_type="application/x-tar")#application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")#content_type="text/xml")#application/vnd.ms-excel")
    tstr='attachment; filename=%s' % c.yonghu+"_"+c.yiqixinghao+".tar"
    t['Content-Disposition'] = tstr.encode("gb2312")
    t['Content-Length']=len(data)
    return t
def allfile_old(request):
    contact_id=request.GET["id"]
    c=Contact.objects.get(id=contact_id)
    fullfilepath = os.path.join(MEDIA_ROOT,"t_证书数据表.xlsx")
    logging.info(fullfilepath)
    data=genShujubiao(c,fullfilepath)
    data2=getJiaoZhunFile(c)
    fullfilepath = os.path.join(MEDIA_ROOT,"t_装箱单.docx")
    logging.info(fullfilepath)
    data_zxd=genPack(c,fullfilepath)
    outfilename=c.yiqibh+"_"+c.yonghu
    outfilename=outfilename[0:30]
    dir1="证书_"+outfilename
    dict1={dir1+"/证书数据表.xlsx":data
        ,dir1+"/证书.xlsx":data2
        ,outfilename+"_装箱单.docx":data_zxd
        }
    data_lbl=genDoc.genLabel.genLabel(c.yiqixinghao,c.yiqibh,c.channels)
    dict1["标签.lbx"]=data_lbl
    #
    if c.method!=None:
        logging.info(dir(c.method))
        try:
            fullfilepath = os.path.join(MEDIA_ROOT,c.method.path)
            (data_record,data_xishu)=genRecord(fullfilepath,c)
            dict1[c.yiqibh+"调试记录.docx"]=data_record
            dict1["系数.lbx"]=data_xishu
        except ValueError as e:
            logging.info(e)
            pass
    #
    p="d:/parts/media/仪器资料/"+c.yiqibh
    if not os.path.exists(p):
        os.makedirs(p)
    os.system("start "+p)
    byteio=tarDict(dict1)
    byteio.seek(0)
    data=byteio.read()#.decode()
    t=HttpResponse(data,content_type="application/x-tar")#application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")#content_type="text/xml")#application/vnd.ms-excel")
    tstr='attachment; filename=%s' % c.yonghu+"_"+c.yiqixinghao+".tar"
    t['Content-Disposition'] = tstr.encode("gb2312")
    t['Content-Length']=len(data)
    return t    
def allfile(request):
    contact_id=request.GET["id"]
    c=Contact.objects.get(id=contact_id)
    fullfilepath = os.path.join(MEDIA_ROOT,"t_证书数据表.xlsx")
    logging.info(fullfilepath)
    data=genShujubiao(c,fullfilepath)
    data2=getJiaoZhunFile(c)
    fullfilepath = os.path.join(MEDIA_ROOT,"t_装箱单.docx")
    logging.info(fullfilepath)
    data_zxd=genPack(c,fullfilepath)
    outfilename=c.yiqibh+"_"+c.yonghu
    outfilename=outfilename[0:30]
    dir1="证书_"+outfilename
    data_lbl=genDoc.genLabel.genLabel(c.yiqixinghao,c.yiqibh,c.channels)
    #
    p="d:/parts/media/仪器资料/"+c.yiqibh
    #证书
    dir1=p+"/"+"证书_"+outfilename
    logging.info(dir1)
    if not os.path.exists(dir1):
        os.makedirs(dir1)
    file1=dir1+"/证书数据表.xlsx"
    open(file1,"wb").write(data)
    file2=dir1+"/证书.xlsx"
    open(file2,"wb").write(data2)
    file3=p+"/"+outfilename+"_装箱单.docx"
    open(file3,"wb").write(data_zxd)
    file4=p+"/"+"标签.lbx"
    open(file4,"wb").write(data_lbl)
    if c.method!=None:
        logging.info(dir(c.method))
        try:
            fullfilepath = os.path.join(MEDIA_ROOT,c.method.path)
            (data_record,data_xishu)=genRecord(fullfilepath,c)
            file5=p+"/"+c.yiqibh+"调试记录.docx"
            open(file5,"wb").write(data_record)
            file6=p+"/"+"系数.lbx"
            open(file5,"wb").write(data_xishu)
        except ValueError as e:
            logging.info(e)
            pass
    os.system("start "+p)
    out={"success":True}
    return HttpResponse(json.dumps(out, ensure_ascii=False))
def folder(request):
    contact_id=request.GET["id"]
    c=Contact.objects.get(id=contact_id)
    p="d:/parts/media/仪器资料/"+c.yiqibh
    if not os.path.exists(p):
        os.makedirs(p)
    os.system("start "+p)
    out={"success":True}
    return HttpResponse(json.dumps(out, ensure_ascii=False))    
def jiaozhun(request):
    contact_id=request.GET["id"]
    c=Contact.objects.get(id=contact_id)
    data=getJiaoZhunFile(c)
    t=HttpResponse(data,content_type="text/xml")#application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")#content_type="text/xml")#application/vnd.ms-excel")
    tstr='attachment; filename=%s' % c.yonghu+"_"+c.yiqixinghao+"_证书.xml"
    t['Content-Disposition'] = tstr.encode("gb2312")
    return t
def que(request):
    contact_id=request.GET["id"]
    c=Contact.objects.get(id=contact_id)
    fullfilepath = os.path.join(MEDIA_ROOT,"t_短缺物资单.docx")
    logging.info(fullfilepath)
    data=genQue(c,fullfilepath)
    if len(data)==0:
        t=HttpResponse("没有短缺物资")#application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")#content_type="text/xml")#application/vnd.ms-excel")
        return t
    else:
        t=HttpResponse(data,content_type="application/msword")#application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")#content_type="text/xml")#application/vnd.ms-excel")
        tstr='attachment; filename=%s' % c.yiqibh+"_"+c.yiqixinghao+"_"+c.yonghu+"_短缺物资单.docx"
        t['Content-Disposition'] = tstr.encode("gb2312")
        return t
def zhuangxiangdan(request):
    contact_id=request.GET["id"]
    c=Contact.objects.get(id=contact_id)
    fullfilepath = os.path.join(MEDIA_ROOT,"t_装箱单.docx")
    logging.info(fullfilepath)
    data=genPack(c,fullfilepath)
    t=HttpResponse(data,content_type="application/msword")#content_type="text/xml")#application/vnd.ms-excel")
    tstr='attachment; filename=%s' % c.yiqibh+"_"+c.yiqixinghao+"_"+c.yonghu+"_装箱单.docx"
    #t['Content-Length']=len(data)
    t['Content-Disposition'] = tstr.encode("gb2312")
    return t
def shujubiao(request):
    #HTTP_ACCEPT_ENCODING
    encode=request.META.get("HTTP_ACCEPT_ENCODING")
    logging.info(encode)
    contact_id=request.GET["id"]
    c=Contact.objects.get(id=contact_id)
    fullfilepath = os.path.join(MEDIA_ROOT,"t_证书数据表.xlsx")
    logging.info(fullfilepath)
    data=genShujubiao(c,fullfilepath)
    t=HttpResponse(data,content_type="application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")#content_type="text/xml")#application/vnd.ms-excel")
    tstr='attachment; filename=%s' % c.yonghu+"_"+c.yiqixinghao+"_证书数据表.xlsx"
    t['Content-Disposition'] = tstr.encode("gb2312")
    return t
def copypack(request):
    encode=request.META.get("HTTP_ACCEPT_ENCODING")
    logging.info(encode)
    if request.method=='GET':
        logging.info("get")
        dic = {}
        dic.update(csrf(request))
        r=render_to_response("parts/copypack.html",dic)
        return(r)    
    else:
        logging.info(request.POST)
        oldname=request.POST.get('oldname')
        newname=request.POST.get('newname')
        logging.info(oldname)
        logging.info(newname)
        old=None
        new=None
        try:
            old=Pack.objects.get(name=oldname) 
        except ObjectDoesNotExist as e:
            pass
        try:
            new=Pack.objects.get(name=newname) 
        except ObjectDoesNotExist as e:
            new=Pack()
            new.name=newname
            new.save()
        #copy items
        content=""
        if old==None:
            content="old is None"
        else:
            for pi in old.packitem_set.all():
                n=PackItem()
                n.pack=new
                n.item=pi.item
                n.ct=pi.ct
                n.save()
            content="ok"
        r=HttpResponse()
        r.content=content
        return r   
def sql(request):
    """
    ----------------------------------------------
    Function:    执行原始的SQL
    DateTime:    2013/x/xx
    ----------------------------------------------
    """
    from django.db import connection,transaction
    cursor = connection.cursor()            #获得一个游标(cursor)对象
    #更新操作
    cursor.execute('select num(*) from parts_contact group by tiaoshi_date')    #执行sql语句
    transaction.commit_unless_managed()     #提交到数据库
    #查询操作
    cursor.execute('select * from other_other2 where id>%s' ,[1])
    raw = cursor.fetchone()                 #返回结果行 或使用 #raw = cursor.fetchall()
    return render_to_response('other/sql.html',{'raw':raw})        
def checkChange(c,yonghu,yiqixinghao,yiqibh,baoxiang,shenhe,yujifahuo_date,hetongbh,channels,addr,new):
    change=False
    if c.yonghu!=yonghu:
        c.yonghu=yonghu
        change=True
    if c.yiqixinghao!=yiqixinghao:
        c.yiqixinghao=yiqixinghao
        change=True
    if c.yiqibh!=yiqibh:
        c.yiqibh=yiqibh
        change=True
    if c.baoxiang!=baoxiang:
        c.baoxiang=baoxiang
        change=True
    if c.shenhe!=shenhe:
        c.shenhe=shenhe
        change=True
    if c.yujifahuo_date!=yujifahuo_date:
        c.yujifahuo_date=yujifahuo_date
        change=True
    if c.hetongbh!=hetongbh:
        c.hetongbh=hetongbh
        change=True
    if c.channels!=channels:
        c.channels=channels
        change=True
    if c.addr!=addr:
        c.addr=addr
        change=True

    if change:
        c.save()
def showcontactP(request):
    if request.method=='GET':
        dic = {}
        dic.update(csrf(request))
        contact_id=request.GET.get("id")
        if contact_id==None:
            dic["new"]="1"
            r=render_to_response("parts/contactPack.html",dic)
            return(r)    
        else:
            dic["new"]="0"
            c=Contact.objects.get(id=contact_id)
            dic["user"]=request.user
            dic["contact"]=c
            maybes=Pack.objects.filter(Q(name__icontains="必备") & Q(name__icontains=c.hetongbh[:2]) | Q(name__icontains=c.hetongbh))
            dic["maybes"]=maybes
            r=render_to_response("parts/contactPack.html",dic)
            return(r)    
    else:
        logging.info(request.POST)
        new=request.POST["new"]
        yonghu=request.POST["yonghu"]
        yiqixinghao=request.POST["yiqixinghao"]
        yiqibh=request.POST["yiqibh"]
        baoxiang=request.POST["baoxiang"]
        shenhe=request.POST["shenhe"]
        yujifahuo_date=request.POST["yujifahuo_date"]
        hetongbh=request.POST["hetongbh"]
        channels=request.POST["channels"]
        addr=request.POST["addr"]
        if new=="1":
            c=Contact(yonghu=yonghu,yiqixinghao=yiqixinghao,yiqibh=yiqibh,baoxiang=baoxiang,shenhe=shenhe,yujifahuo_date=yujifahuo_date,hetongbh=hetongbh,channels=channels,addr=addr)
            c.save()
        else:
            contact_id=request.POST["id"]
            c=Contact.objects.get(id=contact_id)
            checkChange(c,yonghu,yiqixinghao,yiqibh,baoxiang,shenhe,yujifahuo_date,hetongbh,channels,addr,new)
        adds=[]
        deletes=[]
        for k in request.POST:
            if k=="new_id1" and request.POST[k]!="":
                adds.append(request.POST[k])
            elif k=="new_id2" and request.POST[k]!="":
                adds.append(request.POST[k])
            elif k[:6]=="delete":
                deletes.append(k.split("_")[1])
            elif k[:4]=="add_":
                adds.append((int(k[4:]),request.POST[k]))
        adds.sort()
        logging.info(adds)
        logging.info(deletes)
        for one in deletes:
            e = UsePack.objects.get(id=int(one))
            logging.info(dir(c.usepack_set))
            #c.usepack_set.remove(e)
            e.delete()
        for one in adds:
            e = UsePack()
            e.contact=c
            e.pack=Pack.objects.get(id=int(one[1]))
            e.save()
        logging.info(request.META['PATH_INFO'])
        return(HttpResponseRedirect("/parts/"))#request.META['PATH_INFO']+"?id="+contact_id))    
def packItem(request):
    if request.method=='GET':
        dic = {}
        dic.update(csrf(request))
        contact_id=request.GET.get("id")
        if contact_id==None:
            dic["new"]="1"
            r=render_to_response("parts/packItem.html",dic)
            return(r)    
        else:
            dic["new"]="0"
            url=request.GET.get("url")
            c=Pack.objects.get(id=contact_id)
            dic["user"]=request.user
            dic["pack"]=c
            maybes=Item.objects.filter(Q(name__icontains="天平") | Q(name__icontains="打印机"))
            dic["maybes"]=maybes
            dic["url"]=url
            r=render_to_response("parts/packItem.html",dic)
            return(r)    
    else:
        logging.info(request.POST)
        adds=[]
        deletes=[]
        for k in request.POST:
            if k[:6]=="delete":
                deletes.append(k.split("_")[1])
            elif k[:3]=="add":
                #adds.append(request.POST[k])
                adds.append((int(k[4:]),request.POST[k]))
        logging.info(adds)
        adds.sort()
        logging.info(deletes)
        new=request.POST["new"]
        if new=="1":
            c=Pack()
            c.name=request.POST["packname"]
            c.save()
        else:
            contact_id=request.POST["id"]
            url=request.POST["url"]
            c=Pack.objects.get(id=contact_id)
            c.name=request.POST["packname"]
            c.save()
        for one in deletes:
            e = PackItem.objects.get(id=int(one))
            logging.info(dir(c.usepack_set))
            #c.usepack_set.remove(e)
            e.delete()
        for one in adds:
            (id,ct)=one[1].split(":")
            e = PackItem()
            e.pack=c
            e.item=Item.objects.get(id=int(id))
            e.ct=int(ct)
            e.save()
        logging.info(request.META['PATH_INFO'])
        if url=="None":
            return(HttpResponseRedirect(request.META['PATH_INFO']+"?id="+contact_id)) #"/parts/"))#request.META['PATH_INFO']+"?id="+contact_id))    
        else:
            return(HttpResponseRedirect(request.META['PATH_INFO']+"?id="+contact_id))    #url))#request.META['PATH_INFO']+"?id="+contact_id))    
def create_pack(request):
    #request=Request(request,(JSONParser(),))
    #datas = json.loads(request.body.decode("utf-8"))#extjs read data from body
    #logging.info(request.POST)
    datas=json.loads(request.POST["data"])
    logging.info(datas)
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
def create_item(request):
    requestPOST=json.loads(request.POST["data"])
    logging.info(request.POST)
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
