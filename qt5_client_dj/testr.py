import requests
import json
import datetime
import time
session = requests.Session()
token=None
def login():
    global token
    token=gettoken()
    params = {'username':'mahongquan','password':'333333','csrfmiddlewaretoken':token}
    r = session.post("http://localhost:8000/rest/login/", data=params)#,headers=headers)
    if r.ok:
        c=r.cookies
        token=c.get("csrftoken")
        session.headers["X_CSRFTOKEN"]=token
        session.headers["CONTENT_TYPE"]="application/json"
        print("login ok")
    else:
        print("not login")
def gettoken():
    url = "http://localhost:8000/rest/"
    r=session.get(url)
    if r.ok:
        c=r.cookies
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
    print(r.headers)
    print(r.text)
def updateContact(postdata):
    url = "http://localhost:8000/rest/Contact"
    postdata['csrfmiddlewaretoken']=token
    print(session.headers)
    r=session.post(url,data=postdata)
    print(r.headers)
    print(r.text)   
def deleteContact(id):
    url = "http://localhost:8000/rest/Contact"
    postdata={}
    postdata["id"]=id
    r=session.delete(url,params=postdata)
    print(r.headers)
    print(r.text)   
def getAllContacts():
    url = "http://localhost:8000/rest/Contact"
    ct=10
    params = {'format':'json','limit':0,'ct':ct}
    c=session.get(url,params=params).text 
    l=json.loads(c)
    all=l["data"]
    print(all) 
if __name__=="__main__":
    login()
    getAllContacts()
    #testnew()
    #deleteContact(18)
    #testupdate()
