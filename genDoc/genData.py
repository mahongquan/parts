# -*- coding: utf-8 -*-
#import numpy
import os
import sys
import random
import math
def myStdev(a):
    t=0
    for i in range(len(a)):
       t+=a[i]
    av=t/len(a)
    t1=0
    for i in range(len(a)):
        t1+=(a[i]-av)*(a[i]-av)
    sq=math.sqrt(t1/(len(a)-1))
    return sq
def getContact(name):
    cs=Contact.objects.filter(hetongbh__contains=name)
    if len(cs)>0:
        return cs[0]
    else:
        return None
def getRound(stdconc):
    # print("type of stdconc",type(stdconc))
    if type(stdconc) is str:
        a=stdconc
    else:
        a=str(stdconc)
    at=a.find(".")
    return len(a)-1-at
def geteleRsd(ele,stdconc):
    stdconc=float(stdconc)
    ele=str(ele)
    if ele=="C":
        if stdconc>1:
            return 0.005
        else:
            return 0.01
    elif ele=="S":
        return 0.02
    elif ele=="O":
        if stdconc>0.01:
            print("0.01")
            return 0.01
        else:#0.0018
            print("0.03")
            return 0.03
    elif ele=="H":
        return 0.02
    else:
        return 0.01
def genOneR(ele,stdconc):
    roundws=getRound(stdconc)
    rsd=geteleRsd(ele,stdconc)#0.005
    #print ele,stdconc,rsd
    #raw_input()
    stdconc=float(stdconc)
    sd=stdconc*rsd
    ok=False
    num=0
    while not ok:
        test=round(stdconc-2*sd+random.random()*4*sd,roundws)
        err=(test-stdconc)/stdconc
        print(test,sd,rsd,err)
        if abs(err)<0.00001:
            ok=False
        else:
            ok=True
        num+=1
        if num==5:
            break
    fmt="%0."+str(roundws)+"f"
    print(fmt)
    test_str=fmt % test
    err_str="%0.2f" % (err*100)
    return (test_str,err_str)
def genOne(ele,stdconc):
    print(stdconc)
    roundws=getRound(stdconc)
    rsd=geteleRsd(ele,stdconc)#0.005
    stdconc=float(stdconc)
    sd=stdconc*rsd
    ok=False
    loop=0
    while not ok:
        test=round(stdconc-2*sd+random.random()*4*sd,roundws)
        err=test-stdconc
        print(test,stdconc,sd)
        if abs(err)<0.0000001:
            ok=False
        else:
            ok=True
        loop+=1
        if loop==10:
            break
    fmt="%0."+str(roundws)+"f"
    print(fmt)
    test_str=fmt % test
    err_str=fmt % err
    return (test_str,err_str)
def genjmd(stdconc,rsd):
    roundws=getRound(stdconc)
    stdconc=float(stdconc)
    sd=stdconc*rsd
    rs=[]
    rv=[]
    fmt="%0."+str(roundws)+"f"
    for i in range(7):
        test=round(stdconc-2*sd+random.random()*4*sd,roundws)
        test_str=fmt % test
        rs.append(test_str)
        rv.append(float(test_str))
    print(rv)
    ave=numpy.average(rv)
    sd=myStdev(rv)
    ave_str=fmt % ave
    rsd1=sd/ave*100
    rsd_str="%0.2f" % rsd1
    return (rs,ave_str,rsd_str)
def genTest(eles,stds):
    tests=[]
    errs=[]
    for i in range(len(stds)):
        (test,err)=genOne(eles[i],stds[i])
        tests.append(test)
        errs.append(err)
    return (tests,errs)
def genTestR(eles,stds):
    tests=[]
    errs=[]
    for i in range(len(stds)):
        (test,err)=genOneR(eles[i],stds[i])
        tests.append(test)
        errs.append(err)
    return (tests,errs)