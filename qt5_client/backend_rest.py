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
    print(postdata)
    r=session.post(url,data=json.dumps(postdata))
    l=json.loads(r.text)
    print(l["message"])
def updateContact(postdata):
    url = "http://localhost:8000/rest/Contact"
    r=session.put(url,data=json.dumps(postdata))
    #print(r.text)
def deleteContact(id):
    url = "http://localhost:8000/rest/Contact"
    postdata={}
    postdata["id"]=id
    r=session.delete(url,data=json.dumps(postdata))
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
    #params = {'format':'json','limit':200,'start':0}
    c=session.get(url,params=params).text 
    l=json.loads(c)
    return l["data"]
def updateItem(data):
    url = "http://localhost:8000/rest/Item"
    r=session.put(url,data=json.dumps(data))
def deleteItem(data):
    url = "http://localhost:8000/rest/Item"
    r=session.delete(url,data=json.dumps(data))
def createItem(data):
    url = "http://localhost:8000/rest/Item"
    r=session.post(url,data=json.dumps(data))
if __name__=="__main__":
    login()
    #print getItem({'format':'json','limit':2,'start':0})
    #updateItem({'id':205,'name':'test21r2r2t'})
    #deleteItem({'id':205,'name':'test2'})
    #createItem({'bh':148,'name':'test2','guige':'','danwei':''})
    #newContact({'yujifahuo_date':'2017-01-01','hetongbh':'111111'})
    #deleteContact(46)
    updateContact({'id':122,'yiqibh':'111zsaaaaaaa1111'})

