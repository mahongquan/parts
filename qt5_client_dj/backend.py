import logging
import datetime
import time
import re
logging.basicConfig()
log = logging.getLogger()
log.setLevel(logging.DEBUG)
USEREST=False
def mylistdir(p,f):
    a=os.listdir(p)
    fs=myfind(a,f)
    return(fs)
def myfind(l,p):
    lr=[];
    #print p
    p1=p.replace(".",r"\.")
    p2=p1.replace("*",".*")
    p2=p2+"$"
    p2="^"+p2
    for a in l:
        #print a
        if  re.search(p2,a,re.IGNORECASE)==None :
           pass
           #print "pass"
        else:
           lr.append(a)
       #print "append"
    return lr
def genSfx(c,p):
    os.chdir(p)
    cmd=r"D:\licenseManager\bin\Debug\LicenseManager.exe"+" "+c.yiqibh[-8:]+" 80"
    print(cmd)
    os.system(cmd)
def getIniFile(contact):
    path="D:/parts/media/仪器资料/%s" % (contact.yiqibh)
    try:
        fs=mylistdir(path,"*.ini")
        out="./仪器资料/%s" % (contact.yiqibh)
        if len(fs)>0:
            return  out+"/"+fs[0]
        else:
            pass
    except FileNotFoundError as e:
        pass
    xhp=contact.yiqixinghao.split("-")[0]
    path="D:/parts/media/仪器资料/%s/%s" % (contact.yiqibh,xhp)
    try:
        fs=mylistdir(path,"*.ini")
        out="./仪器资料/%s/%s" % (contact.yiqibh,xhp)
        if len(fs)>0:
            return  out+"/"+fs[0]
        else:
            return None
    except FileNotFoundError as e:
        return None
if USEREST:
    from .backend_rest import *
else:
    #from .backend_django import *
    from backend_alchemy import *
if __name__=="__main__":
    login()
