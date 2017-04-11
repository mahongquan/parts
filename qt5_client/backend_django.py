import logging
import datetime
import time
#import readChuKu
logging.basicConfig()
log = logging.getLogger()
log.setLevel(logging.DEBUG)
from mysite.parts.models import *
from django.db.models import Q
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.models import User,Group
token=None
islogin=False
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
def newContact(postdata):
    c=Contact()
    c.yujifahuo_date=datetime.datetime.now()
    c.save()
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

