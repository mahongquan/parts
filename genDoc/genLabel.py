from lxml import etree as ET
from zipfile import *
import datetime
import os
import io
from io import BytesIO,StringIO
from mysite.settings import MEDIA_ROOT
import logging
def showchildren(r):
    cs=r.getchildren()
    i=0
    for p in cs:
        print(i,p)
        i+=1
def changeCell(table,cellindex,value):
    cells=table.find("{http://schemas.brother.info/ptouch/2007/lbx/table}cells")
    cells=cells.getchildren()
    cell0=cells[cellindex]
    text=cell0.find("{http://schemas.brother.info/ptouch/2007/lbx/text}text")
    #print(text.getchildren())
    data=text.find("{http://schemas.brother.info/ptouch/2007/lbx/main}data")
    data.text=value
    stritem=text.find("{http://schemas.brother.info/ptouch/2007/lbx/text}stringItem")
    #print(dir(stritem))
    stritem.attrib["charLen"]=str(len(value))
def showtable(table):
    cells=table.find("{http://schemas.brother.info/ptouch/2007/lbx/table}cells")
    cells=cells.getchildren()
    i=0
    for cell0 in cells:
        try:
            text=cell0.find("{http://schemas.brother.info/ptouch/2007/lbx/text}text")
            data=text.find("{http://schemas.brother.info/ptouch/2007/lbx/main}data")
            print(i,data.text)
        except AttributeError as e:
            print(i,None)
            pass
        i+=1
def genXishuONH(yiqibh,chanels,factors):
    #myzip=ZipFile(initpath+'线性化系数氧氮.lbx')#with ZipFile('线性化系数.lbx') as myzip:
    print("============genxishuonh===========")
    fullfilepath = os.path.join(MEDIA_ROOT,"线性化系数氧氮.lbx")
    myzip=ZipFile(fullfilepath)
    #print(myzip.namelist())
    #print(myzip.infolist())
    fileL=myzip.open('label.xml')
    fileP=myzip.open('prop.xml')
    #genLabel.genLabelCS(fileLabel,fileProp,'2800','123','2C')#yiqixinghao,yiqibh,chanels)        
    tree = ET.parse(fileL)#getpath.getpath()+"CS.xml")
    root = tree.getroot()
    body=root.find("{http://schemas.brother.info/ptouch/2007/lbx/main}body")
    sheets=body.getchildren()
    #print(sheets)
    objects3=sheets[0].find("{http://schemas.brother.info/ptouch/2007/lbx/main}objects")
    tbl=objects3.find("{http://schemas.brother.info/ptouch/2007/lbx/table}table")
    showtable(tbl)
    print(factors)
    if "LO" in chanels:
        changeCell(tbl,2,"%0.1f" % (factors["低氧"][0]))#低碳线性化系数
    else:
        changeCell(tbl,2,"-")#低碳线性化系数
    if "HO" in chanels:
        changeCell(tbl,4,"%0.1f" % (factors["高氧"][0]))#高碳线性化系数
    else:
        changeCell(tbl,4,"-")#高碳线性化系数
    newfileL=io.BytesIO()
    tree.write(newfileL, encoding="utf-8", xml_declaration=True, method="xml")
    newfileL.seek(0)
    out=BytesIO()
    myzip2=ZipFile(out,"w")
    myzip2.writestr("label.xml",newfileL.read())
    myzip2.writestr("prop.xml",fileP.read())
    myzip2.close()
    out.seek(0)
    return out.read()
def genXishuCS(yiqibh,chanels,factors):
    fullfilepath = os.path.join(MEDIA_ROOT,"线性化系数.lbx")
    myzip=ZipFile(fullfilepath)
    #myzip=ZipFile(initpath+'线性化系数.lbx')#with ZipFile('线性化系数.lbx') as myzip:
    #print(myzip.namelist())
    #print(myzip.infolist())
    fileL=myzip.open('label.xml')
    fileP=myzip.open('prop.xml')
    #genLabel.genLabelCS(fileLabel,fileProp,'2800','123','2C')#yiqixinghao,yiqibh,chanels)        
    tree = ET.parse(fileL)#getpath.getpath()+"CS.xml")
    root = tree.getroot()
    body=root.find("{http://schemas.brother.info/ptouch/2007/lbx/main}body")
    sheets=body.getchildren()
    #print(sheets)
    objects3=sheets[0].find("{http://schemas.brother.info/ptouch/2007/lbx/main}objects")
    tbl=objects3.find("{http://schemas.brother.info/ptouch/2007/lbx/table}table")
    showtable(tbl)
    logging.info("99999999999999999999999999999999")
    logging.info(factors)
    logging.info(chanels)
    if "LC" in chanels:
        changeCell(tbl,1,"%0.1f" % (factors["低碳"][0]))#低碳线性化系数
    else:
        changeCell(tbl,1,"-")#低碳线性化系数
    if "HC" in chanels:
        changeCell(tbl,3,"%0.1f" % (factors["高碳"][0]))#高碳线性化系数
    else:
        changeCell(tbl,3,"-")#高碳线性化系数
    if "LS" in chanels:
        changeCell(tbl,5,"%3.1f" % (factors["低硫"][0]))
    else:
        changeCell(tbl,5,"-")
    if "HS" in chanels:
        changeCell(tbl,7,"%3.1f" % (factors["高硫"][0]))
    else:
        changeCell(tbl,7,"-")
    newfileL=io.BytesIO()
    tree.write(newfileL, encoding="utf-8", xml_declaration=True, method="xml")
    newfileL.seek(0)
    out=BytesIO()
    myzip2=ZipFile(out,"w")
    myzip2.writestr("label.xml",newfileL.read())
    myzip2.writestr("prop.xml",fileP.read())
    myzip2.close()
    out.seek(0)
    return out.read()
def genLabel(yiqixinghao,yiqibh,chanels):
    fullfilepath = os.path.join(MEDIA_ROOT,"CS-2800标签.lbx")
    myzip=ZipFile(fullfilepath)#initpath+'CS-2800标签.lbx')#with ZipFile('线性化系数.lbx') as myzip:
    #print(myzip.namelist())
    #print(myzip.infolist())
    fileL=myzip.open('label.xml')
    fileP=myzip.open('prop.xml')
    #genLabel.genLabelCS(fileLabel,fileProp,'2800','123','2C')#yiqixinghao,yiqibh,chanels)        
    tree = ET.parse(fileL)#getpath.getpath()+"CS.xml")
    root = tree.getroot()
    body=root.find("{http://schemas.brother.info/ptouch/2007/lbx/main}body")
    sheets=body.getchildren()
    #print(sheets)
    objects3=sheets[3].find("{http://schemas.brother.info/ptouch/2007/lbx/main}objects")
    table=objects3.find("{http://schemas.brother.info/ptouch/2007/lbx/table}table")
    #showtable(table)
    if yiqixinghao[0]=="C":
        changeCell(table,0,'CS系列分析仪')
    else:
        changeCell(table,0,'ONH系列分析仪')
    changeCell(table,2,yiqixinghao)
    changeCell(table,4,yiqibh)
    today=datetime.date.today()
    changeCell(table,6,'   %d 年  %d 月' %(today.year,today.month))
    newfileL=io.BytesIO()
    tree.write(newfileL, encoding="utf-8", xml_declaration=True, method="xml")
    newfileL.seek(0)
    fileL=myzip.open('label.xml')
    out=BytesIO()
    myzip2=ZipFile(out,"w")
    myzip2.writestr("label.xml",newfileL.read())
    myzip2.writestr("prop.xml",fileP.read())
    myzip2.close()
    out.seek(0)
    return out.read()    
def genLabel2(yiqixinghao,yiqibh,chanels,factors):
    fullfilepath = os.path.join(MEDIA_ROOT,"标签和系数2.lbx")
    myzip=ZipFile(fullfilepath)#initpath+'CS-2800标签.lbx')#with ZipFile('线性化系数.lbx') as myzip:
    #print(myzip.namelist())
    #print(myzip.infolist())
    fileL=myzip.open('label.xml')
    fileP=myzip.open('prop.xml')
    #genLabel.genLabelCS(fileLabel,fileProp,'2800','123','2C')#yiqixinghao,yiqibh,chanels)        
    tree = ET.parse(fileL)#getpath.getpath()+"CS.xml")
    root = tree.getroot()
    body=root.find("{http://schemas.brother.info/ptouch/2007/lbx/main}body")
    sheets=body.getchildren()
    #print(sheets)
    objects3=sheets[3].find("{http://schemas.brother.info/ptouch/2007/lbx/main}objects")
    tables=objects3.findall("{http://schemas.brother.info/ptouch/2007/lbx/table}table")
    table=tables[0]
    if yiqixinghao[0]=="C":
        changeCell(table,0,'CS系列分析仪')
    else:
        changeCell(table,0,'ONH系列分析仪')
    changeCell(table,2,yiqixinghao)
    changeCell(table,4,yiqibh)
    today=datetime.date.today()
    changeCell(table,6,'   %d 年  %d 月' %(today.year,today.month))
    table=tables[1]
    if yiqixinghao[0]=="C":
        changeCell(table,0,'CS系列分析仪')
    else:
        changeCell(table,0,'ONH系列分析仪')
    changeCell(table,2,yiqixinghao)
    changeCell(table,4,yiqibh)
    today=datetime.date.today()
    changeCell(table,6,'   %d 年  %d 月' %(today.year,today.month))
    ##
    tbl=tables[2]
    showtable(tbl)
    logging.info("99999999999999999999999999999999")
    logging.info(factors)
    logging.info(chanels)
    if yiqixinghao[0]=="C":
        if "LC" in chanels:
            changeCell(tbl,1,"%0.1f" % (factors["低碳"][0]))#低碳线性化系数
        else:
            changeCell(tbl,1,"-")#低碳线性化系数
        if "HC" in chanels:
            changeCell(tbl,3,"%0.1f" % (factors["高碳"][0]))#高碳线性化系数
        else:
            changeCell(tbl,3,"-")#高碳线性化系数
        if "LS" in chanels:
            changeCell(tbl,5,"%3.1f" % (factors["低硫"][0]))
        else:
            changeCell(tbl,5,"-")
        if "HS" in chanels:
            changeCell(tbl,7,"%3.1f" % (factors["高硫"][0]))
        else:
            changeCell(tbl,7,"-")
    else:
        if "LO" in chanels:
            changeCell(tbl,1,"%0.1f" % (factors["低氧"][0]))#低碳线性化系数
        else:
            changeCell(tbl,1,"-")#低碳线性化系数
        if "HO" in chanels:
            changeCell(tbl,3,"%0.1f" % (factors["高氧"][0]))#高碳线性化系数
        else:
            changeCell(tbl,3,"-")#高碳线性化系数
        changeCell(tbl,5,"-")
        changeCell(tbl,7,"-")
    newfileL=io.BytesIO()
    tree.write(newfileL, encoding="utf-8", xml_declaration=True, method="xml")
    newfileL.seek(0)
    fileL=myzip.open('label.xml')
    out=BytesIO()
    myzip2=ZipFile(out,"w")
    myzip2.writestr("label.xml",newfileL.read())
    myzip2.writestr("prop.xml",fileP.read())
    myzip2.close()
    out.seek(0)
    return out.read()
if __name__=="__main__":
    genLabelCS()