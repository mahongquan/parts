from lxml import etree as ET
from iniXml import getFromIni
from packXml import getPeizhi
import random
import os
import re
import getpath
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
    tbl_childs=tbl.getchildren()
    #print(tbl_childs)
    row1=tbl_childs[rowv+2]
    columns=row1.getchildren()[1:]
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
def test(fn):
    (yiqibh,yiqixinghao,chanels)=getPeizhi(fn)
    tree = ET.parse(getpath.getpath()+'CS调试记录.xml')
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
    for c in cs:
         print(c)
    print("====")
    c2=cs[1]#仪器编号
    c2.getchildren()
    bh=c2[2]
    bh_text=bh.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t")
    bh_text.text=yiqibh
    xinghao=c2[4]
    xinghao_text=xinghao.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t")
    xinghao_text.text=yiqixinghao
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
    #5、    整机上电调试结果
    tbl=cs[14]
    changeGrid(tbl,1,2,"3.9")#空烧电流
    changeGrid(tbl,2,2,"4.7")#样品电流
    #6、    线性化调试结果
    tbl=cs[16]
    factors=getFromIni(fn)
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
    tree.write(fn+"_调试记录.xml", encoding="utf-8", xml_declaration=True, method="xml")
if __name__=="__main__":
    print(getpath.getpath())
    fs=mylistdir(".","*装箱单.xml")
    if len(fs)>0:
        fn=fs[0].split("_")[0]
        test(fn)
    else:
        print("未发现文件‘*装箱单.xml’")