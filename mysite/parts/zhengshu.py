# -*- coding: gb2312 -*-
import numpy
import os
import sys
import random
from mysite.parts.models import *
import win32com.client
from pywintypes import com_error
import datetime
import math
import logging
initpath=""
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
            print "0.01"
            return 0.01
        else:#0.0018
            print "0.03"
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
    while not ok:
        test=round(stdconc-2*sd+random.random()*4*sd,roundws)
        err=(test-stdconc)/stdconc
        print test,sd,rsd,err
        if abs(err)<0.00001:
            ok=False
        else:
            ok=True
    fmt="%0."+str(roundws)+"f"
    print fmt
    test_str=fmt % test
    err_str="%0.2f" % (err*100)
    return (test_str,err_str)
def genOne(ele,stdconc):
    roundws=getRound(stdconc)
    rsd=geteleRsd(ele,stdconc)#0.005
    stdconc=float(stdconc)
    sd=stdconc*rsd
    ok=False
    while not ok:
        test=round(stdconc-2*sd+random.random()*4*sd,roundws)
        err=test-stdconc
        print test,stdconc,sd
        if abs(err)<0.0000001:
            ok=False
        else:
            ok=True
    fmt="%0."+str(roundws)+"f"
    print fmt
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
    print rv
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
class MyExcel_O:
    def __init__(self,tname,c):
        self.genDir(c)
        self.tname=tname
        self.contact=c
        para='/C copy /Y "%s\\t_%s.xls" "%s\\%s\\%s.xls"' %(initpath,tname,initpath,c.yonghu.encode("gb2312"),c.yonghu.encode("gb2312"))
        os.spawnl(os.P_WAIT,os.environ['COMSPEC'],para)
    def genDir(self,c):
        para='/C mkdir %s' %(c.yonghu.encode("gb2312"))
        os.spawnl(os.P_WAIT,os.environ['COMSPEC'],para)
    def render(self):
        c=self.contact
        a=win32com.client.Dispatch("Excel.Application")
        a.visible = True
        fn=initpath + "/"+c.yonghu.encode("gb2312")+"/"+c.yonghu.encode("gb2312")+".xls"
        a.Workbooks.Open(fn)
        w = a.Worksheets[0]
        w.Cells(11,8).Value =c.yiqixinghao
        w.Cells(16,8).Value =c.yiqibh
        w.Cells(18,8).Value =c.yonghu
        d=c.yujifahuo_date
        d1=d+datetime.timedelta(-1)
        w.Cells(32,8).FormulaR1C1 =d1.year#年
        w.Cells(32,12).Value =d1.month#月
        w.Cells(32,16).Value =d1.day#日
        d2=d+datetime.timedelta(364)
        w.Cells(35,8).Value =d2.year#年
        w.Cells(35,12).Value =d2.month#月
        w.Cells(35,16).Value =d2.day#日
        #page 2
        w = a.Worksheets[1]
        dd=unicode("  地点（LOCATION）： ","gb2312")+c.yonghu
        w.Cells(22,3).Value=dd
        #page 3
        w = a.Worksheets[2]
        eles=[]
        for i in [8,15]:
            eles.append(w.Cells(13,i).Value)
        stds=[]
        for i in [8,15]:
            stds.append(w.Cells(14,i).Value)
        (tests,errs)=genTestR(eles,stds)
        w.Cells(15,8).Value=tests[0]
        w.Cells(15,15).Value=tests[1]
        w.Cells(16,8).Value=errs[0]
        w.Cells(16,15).Value=errs[1]
        #jmd
        cave=0.0134
        crsd=0.74/100
        (rs,ave_str,rsd_str)=genjmd(cave,crsd)
        cjmd_str=",".join(rs)
        w.Cells(20,3).Value="   测量值(O/%):" +cjmd_str
        w.Cells(21,3).Value="   平均值:%s,   相对标准偏差:%s" % (ave_str,rsd_str)
class MyExcel:
    def __init__(self,tname,c):
        self.genDir(c)
        self.tname=tname
        self.contact=c
        para='/C copy /Y "%s\\t_%s.xls" "%s\\%s\\%s.xls"' %(initpath,tname,initpath,c.yonghu.encode("gb2312"),c.yonghu.encode("gb2312"))
        os.spawnl(os.P_WAIT,os.environ['COMSPEC'],para)
    def genDir(self,c):
        para='/C mkdir %s' %(c.yonghu.encode("gb2312"))
        os.spawnl(os.P_WAIT,os.environ['COMSPEC'],para)
    def render(self):
        c=self.contact
        a=win32com.client.Dispatch("Excel.Application")
        a.visible = True
        fn=initpath + "/"+c.yonghu.encode("gb2312")+"/"+c.yonghu.encode("gb2312")+".xls"
        a.Workbooks.Open(fn)
        w = a.Worksheets[0]
        w.Cells(11,8).Value =c.yiqixinghao
        w.Cells(16,8).Value =c.yiqibh
        w.Cells(18,8).Value =c.yonghu
        d=c.yujifahuo_date
        d1=d+datetime.timedelta(-1)
        w.Cells(32,8).FormulaR1C1 =d1.year#年
        w.Cells(32,12).Value =d1.month#月
        w.Cells(32,16).Value =d1.day#日
        d2=d+datetime.timedelta(364)
        w.Cells(35,8).Value =d2.year#年
        w.Cells(35,12).Value =d2.month#月
        w.Cells(35,16).Value =d2.day#日
        #page 2
        w = a.Worksheets[1]
        dd=unicode("  地点（LOCATION）： ","gb2312")+c.yonghu
        w.Cells(26,3).Value=dd
        #page 3
        w = a.Worksheets[2]
        eles=[]
        for i in range(6):
            eles.append(w.Cells(13,8+i*2).Value)
        stds=[]
        for i in range(6):
            stds.append(w.Cells(14,8+i*2).Value)
        (tests,errs)=genTest(eles,stds)
        for i in range(6):
            w.Cells(15,8+i*2).Value=tests[i]
        for i in range(6):
            w.Cells(16,8+i*2).Value=errs[i]
        #jmd
        cave=0.0725
        crsd=0.3/100
        (rs,ave_str,rsd_str)=genjmd(cave,crsd)
        cjmd_str=",".join(rs)
        w.Cells(20,3).Value="   测量值(C/%):" +cjmd_str
        w.Cells(21,3).Value="   平均值:%s,   相对标准偏差:%s" % (ave_str,rsd_str)
        sjmd_str=" 0.0721,0.0725,0.0723,0.0727,0.0730,0.0725,0.0725"
        save=0.0723
        srsd=1.04/100
        (rs,ave_str,rsd_str)=genjmd(save,srsd)
        sjmd_str=",".join(rs)
        w.Cells(22,3).Value="   测量值(S/%):" + sjmd_str
        w.Cells(23,3).Value="   平均值:%s,   相对标准偏差:%s" % (ave_str,rsd_str)
class MyExcel_ON:
    def __init__(self,tname,c):
        #self.genDir(c)
        self.tname=tname
        self.contact=c
        logging.info(c)
        logging.info(initpath)
        logging.info(tname)
        para='/C copy /Y "%s\\t_%s.xls" "%s\\%s\\%s.xls"' %(initpath,tname,initpath,c.yonghu.encode("gb2312"),c.yonghu.encode("gb2312"))
        os.spawnl(os.P_WAIT,os.environ['COMSPEC'],para)
    def genDir(self,c):
        para='/C mkdir %s' %(c.yonghu.encode("gb2312"))
        os.spawnl(os.P_WAIT,os.environ['COMSPEC'],para)
    def render(self):
        c=self.contact
        a=win32com.client.Dispatch("Excel.Application")
        a.visible = True
        fn=initpath + "/"+c.yonghu.encode("gb2312")+"/"+c.yonghu.encode("gb2312")+".xls"
        a.Workbooks.Open(fn)
        w = a.Worksheets[0]
        w.Cells(11,8).Value =c.yiqixinghao
        w.Cells(16,8).Value =c.yiqibh
        w.Cells(18,8).Value =c.yonghu
        d=c.yujifahuo_date
        d1=d+datetime.timedelta(-1)
        w.Cells(32,8).FormulaR1C1 =d1.year#年
        w.Cells(32,12).Value =d1.month#月
        w.Cells(32,16).Value =d1.day#日
        d2=d+datetime.timedelta(364)
        w.Cells(35,8).Value =d2.year#年
        w.Cells(35,12).Value =d2.month#月
        w.Cells(35,16).Value =d2.day#日
        #page 2
        w = a.Worksheets[1]
        dd=unicode("  地点（LOCATION）： ","gb2312")+c.yonghu
        w.Cells(22,3).Value=dd
        #page 3
        w = a.Worksheets[2]
        eles=[]
        for i in [8,11,15,18]:
            eles.append(w.Cells(13,i).Value)
        stds=[]
        for i in [8,11,15,18]:
            stds.append(w.Cells(14,i).Value)
        print eles,stds
        (tests,errs)=genTestR(eles,stds)
        tmp=0
        for i in [8,11,15,18]:
            w.Cells(15,i).Value=tests[tmp]
            tmp +=1
        tmp=0
        for i in [8,11,15,18]:
            w.Cells(16,i).Value=errs[tmp]
            tmp +=1
        #jmd
        cave=0.0112
        crsd=0.8/100
        (rs,ave_str,rsd_str)=genjmd(cave,crsd)
        cjmd_str=",".join(rs)
        w.Cells(20,3).Value="   测量值(O/%):" +cjmd_str
        w.Cells(21,3).Value="   平均值:%s,   相对标准偏差:%s" % (ave_str,rsd_str)
        sjmd_str=" 0.0721,0.0725,0.0723,0.0727,0.0730,0.0725,0.0725"
        save=0.0084
        srsd=1.3/100
        (rs,ave_str,rsd_str)=genjmd(save,srsd)
        sjmd_str=",".join(rs)
        w.Cells(22,3).Value="   测量值(N/%):" + sjmd_str
        w.Cells(23,3).Value="   平均值:%s,   相对标准偏差:%s" % (ave_str,rsd_str)
class MyExcel_OH:
    def __init__(self,tname,c):
        self.genDir(c)
        self.tname=tname
        self.contact=c
        para='/C copy /Y "%s\\t_%s.xls" "%s\\%s\\%s.xls"' %(initpath,tname,initpath,c.yonghu.encode("gb2312"),c.yonghu.encode("gb2312"))
        os.spawnl(os.P_WAIT,os.environ['COMSPEC'],para)
    def genDir(self,c):
        para='/C mkdir %s' %(c.yonghu.encode("gb2312"))
        os.spawnl(os.P_WAIT,os.environ['COMSPEC'],para)
    def render(self):
        c=self.contact
        a=win32com.client.Dispatch("Excel.Application")
        a.visible = True
        fn=initpath + "/"+c.yonghu.encode("gb2312")+"/"+c.yonghu.encode("gb2312")+".xls"
        a.Workbooks.Open(fn)
        w = a.Worksheets[0]
        w.Cells(11,8).Value =c.yiqixinghao
        w.Cells(16,8).Value =c.yiqibh
        w.Cells(18,8).Value =c.yonghu
        d=c.yujifahuo_date
        d1=d+datetime.timedelta(-1)
        w.Cells(32,8).FormulaR1C1 =d1.year#年
        w.Cells(32,12).Value =d1.month#月
        w.Cells(32,16).Value =d1.day#日
        d2=d+datetime.timedelta(364)
        w.Cells(35,8).Value =d2.year#年
        w.Cells(35,12).Value =d2.month#月
        w.Cells(35,16).Value =d2.day#日
        #page 2
        w = a.Worksheets[1]
        dd=unicode("  地点（LOCATION）： ","gb2312")+c.yonghu
        w.Cells(23,3).Value=dd
        #page 3
        w = a.Worksheets[2]
        eles=[]
        for i in [6,9,12,14,17,20]:
            eles.append(w.Cells(13,i).Value)
        stds=[]
        for i in [6,9,12,14,17,20]:
            stds.append(w.Cells(14,i).Value)
        print eles,stds
        (tests,errs)=genTestR(eles,stds)
        tmp=0
        for i in [6,9,12,14,17,20]:
            w.Cells(15,i).Value=tests[tmp]
            tmp +=1
        tmp=0
        for i in [6,9,12,14,17,20]:
            w.Cells(16,i).Value=errs[tmp]
            tmp +=1
        #jmd
        cave=0.1886
        crsd=1.27/100
        (rs,ave_str,rsd_str)=genjmd(cave,crsd)
        cjmd_str=",".join(rs)
        w.Cells(20,3).Value="   测量值(O/%):" +cjmd_str
        w.Cells(21,3).Value="   平均值:%s,   相对标准偏差:%s" % (ave_str,rsd_str)
        sjmd_str=" 0.0721,0.0725,0.0723,0.0727,0.0730,0.0725,0.0725"
        save=0.00181
        srsd=1.1/100
        (rs,ave_str,rsd_str)=genjmd(save,srsd)
        sjmd_str=",".join(rs)
        w.Cells(22,3).Value="   测量值(H/%):" + sjmd_str
        w.Cells(23,3).Value="   平均值:%s,   相对标准偏差:%s" % (ave_str,rsd_str)
class MyTable:
    def __init__(self,tname,c):
        self.genDir(c)
        self.tname=tname
        self.contact=c
        para='/C copy /Y "%s\\t_%s.xls" "%s\\%s\\证书数据表aaa.xls"' %(initpath,tname,initpath,c.yonghu.encode("gb2312"))
        os.spawnl(os.P_WAIT,os.environ['COMSPEC'],para)
    def genDir(self,c):
        para='/C mkdir %s' %(c.yonghu.encode("gb2312"))
        os.spawnl(os.P_WAIT,os.environ['COMSPEC'],para)
    def render(self):#√
        c=self.contact
        a=win32com.client.Dispatch("Excel.Application")
        a.visible = True
        fn=initpath + "/"+c.yonghu.encode("gb2312")+"/证书数据表aaa.xls"
        a.Workbooks.Open(fn)
        w = a.Worksheets[0]
        if c.yiqixinghao=="CS-2800":
            w.Cells(4,3).Value =w.Cells(4,3).Value.encode("gb2312") +"√"
            w.Cells(8,3).Value ="√"
            w.Cells(8,5).Value ="√"
            w.Cells(8,6).Value ="√"
        elif c.yiqixinghao=="CS-3000":
            w.Cells(4,4).Value =w.Cells(4,4).Value.encode("gb2312") +"√"
        elif c.yiqixinghao=="O-3000":
            w.Cells(4,5).Value =w.Cells(4,5).Value.encode("gb2312") +"√"
            w.Cells(11,3).Value ="√"
        elif c.yiqixinghao=="N-3000":
            w.Cells(4,6).Value =w.Cells(4,6).Value.encode("gb2312") +"√"
        elif c.yiqixinghao=="ON-3000":
            w.Cells(5,3).Value =w.Cells(5,3).Value.encode("gb2312") +"√"
            w.Cells(11,3).Value ="√"
            w.Cells(11,4).Value ="√"
        elif c.yiqixinghao=="ONH-3000":
            w.Cells(5,4).Value =w.Cells(5,4).Value.encode("gb2312") +"√"
        elif c.yiqixinghao=="OH-3000":
            w.Cells(5,6).Value =w.Cells(5,6).Value.encode("gb2312") +"√"
            w.Cells(11,3).Value ="√"
            w.Cells(11,5).Value ="√"
        w.Cells(2,6).Value ="合同号："+c.hetongbh.encode("gb2312")
        w.Cells(6,3).Value =c.yiqibh
        w.Cells(3,3).Value =c.yonghu
        d=datetime.datetime.now()
        w.Cells(13,4).FormulaR1C1 =str(d.year)+"年"
        w.Cells(13,5).Value =str(d.month)+"月"
        w.Cells(13,6).Value =str(d.day)+"日"
class Report:
    def genAveSingleReport(self,c):
        (lx,tmp)=c.yiqixinghao.split("-")
        if lx==u"O":
            tname="O模板"
            t=MyExcel_O(tname,c)
        elif lx==u"ON":
            tname="ON模板"
            t=MyExcel_ON(tname,c)
        elif lx==u"OH":
            tname="OH模板"
            t=MyExcel_OH(tname,c)
        else:
            tname="CS模板"#"aveSingle2"
            t=MyExcel(tname,c)
        t.render()
    def genTable(self,c):
        tname="证书数据表"
        t=MyTable(tname,c)
        t.render()
def main(hth):
    c=getContact(hth)
    r=Report()
    r.genAveSingleReport(c)
    r.genTable(c)
if __name__=="__main__":
    main()
