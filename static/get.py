import requests
from bs4 import BeautifulSoup
import os
repname="mahongquan/github-web-file-download"
reppath="https://raw.github.com/"+repname+"/master/"
outputpath="."
def getfile(pathf):
    print("get file:"+pathf)
    reppath="https://raw.githubusercontent.com/"+repname+"/v4-dev/"
    print(reppath)
    #print reppath+pathf
    #raw_input("pause")
    res=requests.get(reppath+pathf)#"Classes/AppDelegate.h")
    ps=pathf.split("/")
    p="/".join(ps[:-1])
    p=outputpath+"/"+p
    if not os.path.exists(p):
        os.makedirs(p)
    open(p+"/"+ps[-1],"wb").write(res.content)
def getpath(path):
    print("getpath:"+path)
    if path=="":
        path="https://github.com/"+repname
        res=requests.get(path)
    else:
        print(reppath+path)
        res=requests.get(reppath+path)
    print(res.content)
    soup = BeautifulSoup(res.content)
    tbs=soup.find_all('table')
    print(tbs)
    t=tbs[0].tbody
    rs=t.find_all('tr')
    fs=[]
    paths=[]
    for r in rs:
        cs=r.find_all('td')
        #print(cs)
        #print(cs[0])
        print(cs[0].svg)
        print(cs[0])
        if cs[0].svg!=None:
            cls=cs[0].svg['class']
            print("class="+str(cls))
            if cls==None:
                pass
            elif cls[1]==u"octicon-file-directory":
                print("ispath")
                f=cs[1].a['href']
                ps=f.split("/")
                childpath="/".join(ps[5:])
                print(childpath)
                paths.append(childpath)
            elif cls[1]=="octicon-alert":
                pass
            else:
                print("is file")
                fs.append(cs[1].a['href'])
    for f in fs:
        print(f)
        ps=f.split("/")
        getfile("/".join(ps[5:]))
    for p in paths:
        getpath(p)
def setrepname(nm):
	global repname
	global reppath
	global outputpath
	repname=nm
	outputpath=nm.split("/")[1]
	reppath="https://github.com/"+repname+"/tree/v4-dev/"
def main():
    setrepname("twbs/bootstrap")
    #getpath("js/src")#all
    #getpath("assets/js/vendor")#assets/js/vendor
    getpath("assets/js/src")#assets/js/vendor
    #getpath("Resources")#all
if __name__=="__main__":
    main()















