import logging
import requests
import json
import datetime
import time
logging.basicConfig()
log = logging.getLogger()
log.setLevel(logging.DEBUG)
session = requests.Session()
token=None
islogin=False
def login():
    global token
    global islogin
    token=gettoken()
    print("token",token)
    params = {'username':'mahongquan','password':'333333','csrfmiddlewaretoken':token}
    r = session.post("http://localhost:8000/rest/login/", data=params)#,headers=headers)
    if r.ok:
        c=r.cookies
        token=c.get("csrftoken")
        session.headers["X_CSRFTOKEN"]=token
        session.headers["CONTENT_TYPE"]="application/json"
        islogin=True
        print("login ok")
    else:
        islogin=False
        print("not login")
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
def newContact(postdata):
    url = "http://localhost:8000/rest/Contact"
    postdata['csrfmiddlewaretoken']=token
    r=session.post(url,data=postdata)
    #print r.headers
    #print r.text
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
def getAllContacts():
    url = "http://localhost:8000/rest/Contact"
    ct=10
    params = {'format':'json','limit':10,'ct':ct}
    c=session.get(url,params=params).text 
    l=json.loads(c)
    return l["data"] 
def getAllPack():
    url = "http://localhost:8000/rest/Pack"
    ct=10
    params = {'format':'json','limit':ct,'start':0}
    c=session.get(url,params=params).text 
    l=json.loads(c)
    return l["data"] 
def getContactPack(contactid):
    url = "http://localhost:8000/rest/UsePack"
    params = {'format':'json','contact':contactid}
    c=session.get(url,params=params).text 
    l=json.loads(c)
    d=l['data']
    r=[]
    for one in d:
        r.append(one)
    return r
def getPackItem(packid):
    url = "http://localhost:8000/rest/PackItem"
    params = {'format':'json','pack':packid,'limit':20}
    c=session.get(url,params=params).text 
    l=json.loads(c)
    d=l['data']
    r=[]
    for one in d:
        r.append(one)
    return r
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
    login()
    #print getAllContacts()
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

