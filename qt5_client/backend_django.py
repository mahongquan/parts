import logging
import datetime
import time
import jinja2
#import readChuKu
logging.basicConfig()
log = logging.getLogger()
log.setLevel(logging.DEBUG)
from mysite.parts.models import *
from django.db.models import Q
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.models import User,Group
import codecs
import xlrd
import os
token=None
islogin=False
def readStandardFile(fn):
    filename=os.path.basename(fn)
    book = xlrd.open_workbook(fn)
    table=book.sheets()[0]
    nrows = table.nrows
    ncols = table.ncols
    begin=False
    dan=[]
    for i in range(nrows ):
        cells=table.row_values(i)
        if cells[0]=="其他入库单":
            if not begin:
                begin=True
                onedan=[]
            else:
                #finish
                dan.append(onedan)
                onedan=[]
        else:
            if begin:
                onedan.append(cells)
            else:
                pass
    for one in dan:
        treatOne(one,filename)   
def treatOne(rows,fn):
    beizhu=rows[1][7]
    if beizhu[:2]=="CS" or beizhu[:2]=="ON":
        try:
            d=Pack.objects.get(name=rows[0][1])
        except ObjectDoesNotExist as e2:
            d=Pack()
        d.name=rows[1][7]+"_"+fn
        d.save()
        n=len(rows)
        items=rows[4:4+n-4-3]
        for i in items:
            #i=DanjuItem()
            print(i[1],i[2],i[3],i[4],i[5])
            items=Item.objects.filter(bh=i[1]).all()
            if len(items)>1:
                item=items[0]
            else:
                item=Item()
            item.bh=i[1]
            item.name=str(i[2])+" "+str(i[1])
            item.guige=i[3]
            item.danwei=i[4]
            item.save()
            di=PackItem()
            di.pack=d
            di.item=item
            di.ct=i[5]
            di.save()
def login(username,password):
    user = authenticate(username=username, password=password)
    if user is None:
        output={"success":False,"message":"No This User"}
    else:
        rec=user
        output={"success":True,"message":"User" +str(rec.id)}
        output["data"]={"id":rec.id,"name":str(rec.username),"email":str(rec.email),"first":str(rec.first_name),"last":rec.last_name}
    return output        
def gettoken():
    url = "http://localhost:8000/rest/backbone"
    r=session.get(url)
    if r.ok:
        c=r.cookies
        print(c)
        token=c.get("csrftoken")
        return token
    return ""
def testnew():
    d=int(time.time())#datetime.datetime.now().toordinal()
    d={"yonghu":"a","yujifahuo_date":d}
    newContact(d)
def testupdate():
    d=int(time.time())#datetime.datetime.now().toordinal()
    d={"id":9,"yonghu":"a","yujifahuo_date":d}
    updateContact(d)
def getContactItems(contactid):
    contact=Contact.objects.get(id=contactid)
    (items,items2)=contact.huizong()
    r=[]
    for item in items:
        r.append((item.bh,item.name,item.ct))
    for item in items2:
        r.append((item.bh,item.name,item.ct))
    print(r)
    return r
def genDetail(contactid):    
    c=Contact.objects.get(id=contactid)
    dic = {}
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
    #tc=codecs.open("templates/parts/showcontact.html","r","utf-8").read()
    tc=codecs.open("qt5_client/static/t_装箱单.html","r","utf-8").read()
    t=jinja2.Template(tc)
    f=codecs.open("out.html","w","utf-8")
    f.write(t.render(dic))
    f.close()     
def getContacts(search,baoxiang):
    start=0
    limit=30
    if search!='':
        if baoxiang!="":
            objs = Contact.objects.filter((Q(hetongbh__icontains=search) | Q(yiqibh__icontains=search)) & Q(baoxiang=baoxiang)).order_by('-yujifahuo_date')[start:start+limit]
        else:
            objs = Contact.objects.filter(Q(hetongbh__icontains=search) | Q(yiqibh__icontains=search)).order_by('-yujifahuo_date')[start:start+limit]
    else:
        if baoxiang!="":
            objs = Contact.objects.filter(Q(baoxiang=baoxiang)).order_by('-yujifahuo_date')[start:start+limit]
        else:
            objs = Contact.objects.order_by('-yujifahuo_date')[start:start+limit]
    return objs
def removepi(piid):
    pi=PackItem.objects.get(id=piid)    
    #print(pi)
    pi.delete()
def newpackitem(pid,nm):
    p=Pack.objects.get(id=pid)
    print(pid,p)
    i=Item()
    i.guige=""
    i.ct=1
    i.danwei="个"
    i.name=nm
    i.bh=""
    i.save()
    pi=PackItem()
    pi.pack=p
    pi.item=i
    pi.save()
def newpack(c,nm):
    p=Pack()
    p.name=nm
    p.save()
    up=UsePack()
    up.contact=c
    up.pack=p
    up.save()
def removeup(c,upid):
    up=UsePack.objects.get(id=upid)
    up.delete()
def addPack(c,pid):
    p=Pack.objects.get(id=pid)
    up=UsePack()
    up.contact=c
    up.pack=p
    up.save()
def newContact():
    c=Contact()
    c.yujifahuo_date=datetime.datetime.now().date()
    c.tiaoshi_date=c.yujifahuo_date
    return c
def updateContact(postdata):
    url = "http://localhost:8000/rest/Contact"
    postdata['csrfmiddlewaretoken']=token
    #print session.headers
    r=session.post(url,data=postdata)
    #print r.headers
    #print r.text   
def deleteContact(id):
    url = "http://localhost:8000/rest/Contact"
    postdata={}
    postdata["id"]=id
    r=session.delete(url,params=postdata)
    #print r.headers
    #print r.text   
def huizong(contactid):
    contact=Contact.objects.get(id=contactid)
    (items,items2)=contact.huizong()
    r=[]
    for item in items:
        r.append((item.bh,item.name,item.ct))
    return r
    #items_excel=readChuKu.readfile(excelfile)

def getContact(contactid):
    contact=Contact.objects.get(id=contactid)
    return contact
def getAllPack():
    url = "http://localhost:8000/rest/Pack"
    ct=10
    params = {'format':'json','limit':ct,'start':0}
    c=session.get(url,params=params).text 
    l=json.loads(c)
    return l["data"] 
def getContactPack(contactid):
    r=UsePack.objects.filter(Q(contact=contactid))
    return r
def getPack(packid):
    r=Pack.objects.get(Q(id=packid))
    return r  
def getPacks(search_bh):
    r=Pack.objects.filter(name__contains=search_bh)      
    return r
def getItems(search_bh):
    r=Item.objects.filter(name__contains=search_bh)      
    return r    
def addItem(pid,iid):   
    i=Item.objects.get(id=iid)
    p=Pack.objects.get(id=pid)
    pi=PackItem()
    pi.pack=p
    pi.item=i
    pi.save()
def getPackItemOne(packid):
    r=PackItem.objects.get(id=packid)
    return r    
def getPackItem(packid):
    r=PackItem.objects.filter(Q(pack=packid))
    return r
def getAllContacts():
     cs=Contact.objects.order_by("-yujifahuo_date").all()
     return cs    
def getItem(params={'format':'json','limit':200,'start':0}):
    url = "http://localhost:8000/rest/Item"
    ct=10
    #params = {'format':'json','limit':200,'start':0}
    c=session.get(url,params=params).text 
    l=json.loads(c)
    return l["data"]
def updateItem(data):
    url = "http://localhost:8000/rest/update_item2"
    postdata={}
    postdata["data"]=json.dumps(data)
    postdata['csrfmiddlewaretoken']=token
    #print session.headers
    #print postdata
    r=session.post(url,data=postdata)
    #print r.headers
    #print r
def deleteItem(data):
    url = "http://localhost:8000/rest/destroy_item2"
    postdata={}
    postdata["data"]=json.dumps(data)
    postdata['csrfmiddlewaretoken']=token
    #print session.headers
    #print postdata
    r=session.post(url,data=postdata)
    #print r.headers
    #print r  
def createItem(data):
    url = "http://localhost:8000/rest/create_item2"
    postdata={}
    postdata["data"]=json.dumps(data)
    postdata['csrfmiddlewaretoken']=token
    #print session.headers
    #print postdata
    r=session.post(url,data=postdata)
    #print r.headers
    #print r  
if __name__=="__main__":
    import os
    import sys
    import codecs
    import django
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
    django.setup()
    login()
    print(getAllContacts())
    # usepacks=getContactPack(9)
    # print usepacks
    # usepack1=usepacks[0]
    # print usepack1.contact,usepack1.pack
    # items=getPackItem(usepack1.pack)
    # for i in items:
        # print i
    #print getItem({'format':'json','limit':2,'start':0})
    #updateItem({'id':148,'name':'test2'})
    #deleteItem({'id':148,'name':'test2'})
    #createItem({'bh':148,'name':'test2','guige':'','danwei':''})

