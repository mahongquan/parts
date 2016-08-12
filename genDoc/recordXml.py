# -*- coding: utf-8 -*-
from lxml import etree as ET
from genDoc.iniXml import getFromIni
import random
import os
from mysite.settings import MEDIA_ROOT
import re
import logging
from io import BytesIO
#import getkb
# import genLabel
# import oa
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
    for a in l:
        #print a
        if  re.search(p2,a,re.IGNORECASE)==None :
           pass
           #print "pass"
        else:
           lr.append(a)
       #print "append"
    return lr
def getRound(stdconc):
    a=str(stdconc)
    at=a.find(".")
    return len(a)-1-at
def geteleRsd(stdconc):
    return 0.05
def genOne(stdconc):
    roundws=getRound(stdconc)
    stdconc=float(stdconc)
    sd=pow(10,-roundws)
    #print(stdconc,sd)
    test=round(stdconc-2*sd+random.random()*4*sd,roundws)
    fmt="%0."+str(roundws)+"f"
    #print(fmt,test)
    test_str=fmt % test
    return (test_str)
def changeGrid(tbl,rowv,colv,value):
    tbl_childs=tbl.findall("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tr")
    row1=tbl_childs[rowv]
    columns=row1.findall("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tc")
    column1=columns[colv]
    cell=column1.getchildren()[1]
    cellv=cell.getchildren()[1]
    t=cellv.getchildren()[1]
    t.text=value
def changeGridMulti(tbl,rowv,colv,value):
    print(rowv,colv)
    tbl_childs=tbl.getchildren()
    row1=tbl_childs[rowv+2]
    columns=row1.getchildren()[1:]
    column1=columns[colv]
    cell=column1.getchildren()[1]
    paras=cell.getchildren()[1:]
    i=0
    for p in paras:
        print(i,p.getchildren()[1].text)
        if len(value)>i:
            p.getchildren()[1].text=value[i]
        i+=1
def getchangdu(chanels):
    if "LO" in chanels:
        lofmt="LO(%d)mm" % 100
    else:
        lofmt="LO()mm"
    if "HO" in chanels:
        hofmt="  HO(%d)mm" % 10
    else:
        hofmt="  HO()mm"
    return lofmt+hofmt
def chanelNums(chanels):
    cs=0
    ss=0
    if "LC" in chanels:
        cs+=1
    if "HC" in chanels:
        cs+=1
    if "LS" in chanels:
        ss+=1
    if "HS" in chanels:
        ss+=1
    return (cs,ss)
def genRecord(fn,c):
    yiqibh=c.yiqibh
    yiqixinghao=c.yiqixinghao
    chanels=c.channels
    factors=getFromIni(yiqixinghao,fn)
    logging.info(factors)
    logging.info(yiqibh,yiqixinghao,chanels)
    if yiqixinghao[0]=="C":
        data=genRecordCS(fn,yiqixinghao,yiqibh,chanels,factors,c.baoxiang)
    else:
        data=genRecordONH(fn,yiqixinghao, yiqibh,chanels,factors,c.baoxiang)
    return data
def genRecordONH(fn,yiqixinghao, yiqibh,chanels,factors,baoxiang):
    tree = ET.parse(os.path.join(MEDIA_ROOT,'ONH调试记录.xml'))
    root = tree.getroot()
    #print (root.tag)
    parts=[]
    for c in root:
        parts.append(c)
    part2=parts[2]
    data=part2.find("{http://schemas.microsoft.com/office/2006/xmlPackage}xmlData")
    document=data.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}document")
    body=document.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}body")
    #红外检测器调试检查
    tbls=body.findall("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tbl")
    print(tbls)
    tbl=tbls[0]
    changeGrid(tbl,0,1,yiqibh)#
    changeGrid(tbl,0,3,yiqixinghao)#
    tbl=tbls[2]
    # (k,b)=getkb.getkb()
    # changeGridMulti(tbl,16,1,["电流","PID","参数：斜率为",str(k),"；截距为",str(b)])#
    tbl=tbls[3]
    if "LO" in chanels:
        changeGrid(tbl,1,3,genOne("1.3"))#低碳前置放大电压
    else:
        changeGrid(tbl,1,3,"-")#低碳前置放大电压
    if "HO" in chanels:
        changeGrid(tbl,2,3,genOne("1.3"))#高碳前置放大电压
    else:
        changeGrid(tbl,2,3,"-")#高碳前置放大电压
    #自动调零范围
    if "LO" in chanels:
        changeGrid(tbl,3,3,"".join([genOne("-7.0"),"~",genOne("7.0"),"V"]))#低碳前置放大电压
    else:
        changeGrid(tbl,3,3,"".join(["-","~","-","V"]))#低碳前置放大电压
    if "HO" in chanels:
        changeGrid(tbl,4,3,"".join([genOne("-7.0"),"~",genOne("7.0"),"V"]))#低碳前置放大电压
    else:
        changeGrid(tbl,4,3,"".join(["-","~","-","V"]))#低碳前置放大电压
    if "LN" in chanels:
        changeGrid(tbl,5,3,"".join([genOne("-7.0"),"~",genOne("7.0"),"V"]))#低碳前置放大电压
    else:
        changeGrid(tbl,5,3,"".join(["-","~","-","V"]))#低碳前置放大电压
    if "HN" in chanels:
        changeGrid(tbl,6,3,"".join([genOne("-7.0"),"~",genOne("7.0"),"V"]))#低碳前置放大电压
    else:
        changeGrid(tbl,6,3,"".join(["-","~","-","V"]))#低碳前置放大电压
    changdu=getchangdu(chanels)
    changeGrid(tbl,7,2,changdu)
    # #6、    线性化调试结果
    tbl=tbls[4]
    #factors=getFromIni(yiqixinghao,fn)
    #print(factors)
    if "LO" in chanels:
        changeGrid(tbl,1,2,"%0.1f" % (factors["低氧"][0]))#低碳线性化系数
        changeGrid(tbl,1,3,"%0.3f" % (factors["低氧"][1]))#低碳线性化系数
        changeGrid(tbl,1,4,"%0.3f" % (factors["低氧"][2]))#低碳线性化系数
    else:
        changeGrid(tbl,1,2,"-")#低碳线性化系数
        changeGrid(tbl,1,3,"-")#低碳线性化系数
        changeGrid(tbl,1,4,"-")#低碳线性化系数
    if "HO" in chanels:
        changeGrid(tbl,2,2,"%0.1f" % (factors["高氧"][0]))#高碳线性化系数
        changeGrid(tbl,2,3,"%0.3f" % (factors["高氧"][1]))#高碳线性化系数
        changeGrid(tbl,2,4,"%0.3f" % (factors["高氧"][2]))#高碳线性化系数
    else:
        changeGrid(tbl,2,2,"-")#高碳线性化系数
        changeGrid(tbl,2,3,"-")#高碳线性化系数
        changeGrid(tbl,2,4,"-")#高碳线性化系数
    if "LN" in chanels:
        changeGrid(tbl,3,2,"∞")#低硫线性化系数
        changeGrid(tbl,3,3,"%0.3f" % (factors["低氮"][1]))
        changeGrid(tbl,3,4,"%0.3f" % (factors["低氮"][2]))
    else:
        changeGrid(tbl,3,2,"-")
        changeGrid(tbl,3,3,"-")
        changeGrid(tbl,3,4,"-")
    #tree.write(fn+"_调试记录.xml", encoding="utf-8", xml_declaration=True, method="xml")
    s=BytesIO()
    tree.write(s, encoding="utf-8", xml_declaration=True, method="xml")
    s.seek(0)
    data=s.read()
    #data=data.decode('utf-8')
    return data
def genRecordCS(fn,yiqixinghao, yiqibh,chanels,factors,baoxiang):
    tree = ET.parse(os.path.join(MEDIA_ROOT,'CS调试记录.xml'))
    root = tree.getroot()
    #print (root.tag)
    parts=[]
    for c in root:
        parts.append(c)
    part2=parts[2]
    data=part2.find("{http://schemas.microsoft.com/office/2006/xmlPackage}xmlData")
    document=data.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}document")
    body=document.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}body")
    #print(dir(body))
    cs=body.getchildren()
    c2=cs[1]#仪器编号
    bh=c2[2]
    bh_text=bh.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t")
    bh_text.text=yiqibh
    xinghao=c2[4]
    xinghao_text=xinghao.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t")
    xinghao_text.text=yiqixinghao
    #线路检查执行人
    c2=cs[3]#para
    ps=c2.getchildren()#pPr,r,r
    logging.info(ps)
    bh=ps[2]
    bh_text=bh.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t")
    bh_text.text=baoxiang
    #
    c2=cs[11]#para
    ps=c2.getchildren()#pPr,r,r
    logging.info(ps)
    bh=ps[5]
    bh_text=bh.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t")
    bh_text.text=baoxiang
    
    #红外检测器调试检查
    tbl=cs[12]
    changeGrid(tbl,2,2,"4.01")#红外光源电压
    if "LC" in chanels:
        changeGrid(tbl,12,3,genOne("1.3"))#低碳前置放大电压
    else:
        changeGrid(tbl,12,3,"-")#低碳前置放大电压
    if "HC" in chanels:
        changeGrid(tbl,13,3,genOne("1.3"))#高碳前置放大电压
    else:
        changeGrid(tbl,13,3,"-")#高碳前置放大电压
    if "LS" in chanels:
        changeGrid(tbl,14,3,genOne("1.3"))#低硫前置放大电压
    else:
        changeGrid(tbl,14,3,"-")#低硫前置放大电压
    if 'HS' in chanels:
        changeGrid(tbl,15,3,genOne("1.3"))#高硫前置放大电压
    else:
        changeGrid(tbl,15,3,"-")#高硫前置放大电压
    #自动调零范围
    if "LC" in chanels:
        changeGridMulti(tbl,16,3,[genOne("-7.0"),"~",genOne("7.0"),"V"])#低碳前置放大电压
    else:
         changeGridMulti(tbl,16,3,["-","~","-","V"])#低碳前置放大电压
    if "HC" in chanels:
        changeGridMulti(tbl,17,3,[genOne("-7.0"),"~",genOne("7.0"),"V"])#低碳前置放大电压
    else:
         changeGridMulti(tbl,17,3,["-","~","-","V"])#低碳前置放大电压
    if "LS" in chanels:
        changeGridMulti(tbl,18,3,[genOne("-7.0"),"~",genOne("7.0"),"V"])#低碳前置放大电压
    else:
         changeGridMulti(tbl,18,3,["-","~","-","V"])#低碳前置放大电压
    if "HS" in chanels:
        changeGridMulti(tbl,19,3,[genOne("-7.0"),"~",genOne("7.0"),"V"])#低碳前置放大电压
    else:
         changeGridMulti(tbl,19,3,["-","~","-","V"])#低碳前置放大电压
    nums=chanelNums(chanels)
    changeGridMulti(tbl,20,2,["C","(",str(nums[0]),")","S","(",str(nums[1]),")"])
    if "LC" in chanels:
        changeGridMulti(tbl,21,3,["LC","(","180",")","mm"])#低碳前置放大电压
    else:
         changeGridMulti(tbl,21,3,["LC","(","-",")","mm"])#低碳前置放大电压
    if "HC" in chanels:
        changeGridMulti(tbl,21,2,["HC","(","3",")","mm"])#低碳前置放大电压
    else:
         changeGridMulti(tbl,21,2,["HC","(","-",")","mm"])#低碳前置放大电压
    if "LS" in chanels:
        changeGridMulti(tbl,22,3,["LS","(","280",")","mm"])#低碳前置放大电压
    else:
         changeGridMulti(tbl,22,3,["LS","(","-",")","mm"])#低碳前置放大电压    
    if "HS" in chanels:
        changeGridMulti(tbl,22,2,["HS","(","10",")","mm"])#低碳前置放大电压
    else:
         changeGridMulti(tbl,22,2,["HS","(","-",")","mm"])#低碳前置放大电压
    #
    c2=cs[13]#para
    ps=c2.getchildren()#pPr,r,r
    n=len(ps)
    bh=ps[n-1]
    bh_text=bh.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t")
    bh_text.text=baoxiang
    #5、    整机上电调试结果
    tbl=cs[14]
    changeGrid(tbl,1,2,"3.4")#空烧电流
    changeGrid(tbl,2,2,"5.0")#样品电流
    #
    c2=cs[15]#para
    ps=c2.getchildren()#pPr,r,r
    n=len(ps)
    bh=ps[n-1]
    bh_text=bh.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t")
    bh_text.text=baoxiang
    #6、    线性化调试结果
    tbl=cs[16]
    print(fn)
    factors=getFromIni("CS",fn)
    if "LC" in chanels:
        changeGrid(tbl,1,2,"%0.1f" % (factors["低碳"][0]))#低碳线性化系数
        changeGrid(tbl,1,3,"%0.3f" % (factors["低碳"][1]))#低碳线性化系数
        changeGrid(tbl,1,4,"%0.3f" % (factors["低碳"][2]))#低碳线性化系数
    else:
        changeGrid(tbl,1,2,"-")#低碳线性化系数
        changeGrid(tbl,1,3,"-")#低碳线性化系数
        changeGrid(tbl,1,4,"-")#低碳线性化系数
    if "HC" in chanels:
        changeGrid(tbl,2,2,"%0.1f" % (factors["高碳"][0]))#高碳线性化系数
        changeGrid(tbl,2,3,"%0.3f" % (factors["高碳"][1]))#高碳线性化系数
        changeGrid(tbl,2,4,"%0.3f" % (factors["高碳"][2]))#高碳线性化系数
    else:
        changeGrid(tbl,2,2,"-")#高碳线性化系数
        changeGrid(tbl,2,3,"-")#高碳线性化系数
        changeGrid(tbl,2,4,"-")#高碳线性化系数
    if "LS" in chanels:
        if factors["低硫"][0]>100:
            changeGrid(tbl,3,2,"∞")#低硫线性化系数
        else:
            changeGrid(tbl,3,2,"%0.1f" % (factors["低硫"][0]))
        changeGrid(tbl,3,3,"%0.3f" % (factors["低硫"][1]))
        changeGrid(tbl,3,4,"%0.3f" % (factors["低硫"][2]))
    else:
        changeGrid(tbl,3,2,"-")
        changeGrid(tbl,3,3,"-")
        changeGrid(tbl,3,4,"-")
    if "HS" in chanels:
        if factors["高硫"][0]>100:
            changeGrid(tbl,4,2,"∞")#高硫线性化系数
        else:
            changeGrid(tbl,4,2,"%0.1f" % (factors["高硫"][0]))#高硫线性化系数
        changeGrid(tbl,4,3,"%0.3f" % (factors["高硫"][1]))#高硫线性化系数
        changeGrid(tbl,4,4,"%0.3f" % (factors["高硫"][2]))#高硫线性化系数
    else:
        changeGrid(tbl,4,2,"-")
        changeGrid(tbl,4,3,"-")
        changeGrid(tbl,4,4,"-")
        #
    c2=cs[19]#para
    ps=c2.getchildren()#pPr,r,r
    n=len(ps)
    bh=ps[n-1]
    bh_text=bh.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t")
    bh_text.text=baoxiang
    #tree.write(fn+"_调试记录.xml", encoding="utf-8", xml_declaration=True, method="xml")
    s=BytesIO()
    tree.write(s, encoding="utf-8", xml_declaration=True, method="xml")
    s.seek(0)
    data=s.read()
    #data=data.decode('utf-8')
    return data
if __name__=="__main__":
    print(getpath.getpath())
    fs=mylistdir(".","*装箱单.xml")
    if len(fs)>0:
        fn=fs[0].split("_")[0]
        genRecord(fn,fs[0])
        oa.mainUpload(fn)
    else:
        print("未发现文件‘*装箱单.xml’")