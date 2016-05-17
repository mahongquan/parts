from lxml import etree as ET
from io import BytesIO,StringIO
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
def setCell(column1,value):
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
def getGrid(tbl,rowv,colv):
    tbl_childs=tbl.getchildren()
    row1=tbl_childs[rowv+2]
    columns=row1.getchildren()[1:]
    print(columns)
    column1=columns[colv]
    cell=column1.getchildren()[1]
    paras=cell.getchildren()[1:]
    r=[]
    for p in paras:
        r.append(p.getchildren()[1].text)
    return "".join(r)
def getGridRow(tbl,rowv):
    tbl_childs=tbl.getchildren()
    row1=tbl_childs[rowv+2]
    return(row1)
def getGrid2(tbl,rowv,colv):
    tbl_childs=tbl.getchildren()
    print(tbl_childs)
    row1=tbl_childs[rowv+2]
    columns=row1.getchildren()
    column1=columns[colv]
    cell=column1.getchildren()
    para=cell[1].getchildren()[1]
    para=para.getchildren()[0].text
    return para
def changeGrid2(tbl,rowv,colv,value):
    tbl_childs=tbl.getchildren()
    #print(tbl_childs)
    row1=tbl_childs[rowv+2]
    columns=row1.getchildren()
    column1=columns[colv]
    cell=column1.getchildren()
    para=cell[1].getchildren()[1]
    para.getchildren()[0].text=value
def getElement(chanels,first):
    eles=first.split("(")
    ele=eles[0]#2C
    if ele[0]=="2":
        chanels.append("L"+ele[1])
        chanels.append("H"+ele[1])
    else:
        ele_set=eles[1][:-1]#移去括号
        print(ele_set)
        if ele_set[0]=="高":
            chanels.append("H"+ele[1])
        else:
            chanels.append("L"+ele[1])
    pass
def myformat_date(d):
    return "%d-%d-%d" %    (d.year,d.month,d.day)
def addItem(items,item):
    find=False
    for i in items:
        if i.id==item.id:
            i.ct +=item.ct
            find=True
            break
    if not find:
        items.append(item)
    return items
def genPack(contact,fn):
    tree = ET.parse(fn)
    root = tree.getroot()
    parts=root.getchildren()
    part2=parts[2]
    data=part2.find("{http://schemas.microsoft.com/office/2006/xmlPackage}xmlData")
    document=data.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}document")
    body=document.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}body")
    cs=body.getchildren()
    for c in cs:
        print(c)
    tbl=cs[0]
    changeGrid2(tbl,0,1,contact.yonghu)
    changeGrid2(tbl,1,1,contact.yiqixinghao)
    changeGrid2(tbl,2,1,contact.yiqibh)
    changeGrid2(tbl,3,1,contact.baoxiang)
    changeGrid2(tbl,4,1,contact.shenhe)
    changeGrid2(tbl,5,1,myformat_date(contact.yujifahuo_date))
    changeGrid2(tbl,6,1,contact.hetongbh)
    tbl=cs[6]#主机清单
    if contact.channels==None:
        changeGrid(tbl,1,2,contact.yiqixinghao)
    else:
        changeGrid(tbl,1,2,contact.yiqixinghao+" "+contact.channels)
    if contact.yiqixinghao[0]=='C':
        changeGrid(tbl,2,3,"1根")
    else:
        changeGrid(tbl,2,3,"3根")
    tbl=cs[8]#配件清单
    items=[]
    for cp in contact.usepack_set.all():
        for pi in cp.pack.packitem_set.all():
            pi.item.ct=pi.ct
            #items.append(pi.item)
            items=addItem(items,pi.item)
    print(items)
    row0=getGridRow(tbl,0)
    str0=ET.tostring(row0)
    for item in items:
#     <tr>
#       <td>{{ item.bh }}</td>
#       <td>{{ item.name }}</td>
#       <td>{{ item.guige }}</td>
#       <td>{{ item.ct }}{{ item.danwei }}</td>
#       <td></td>
#       <td>{% if item.beizhu %}
#      {{ item.beizhu }}
# {% endif %}</td>
        rowx=ET.fromstring(str0.decode("utf-8"))#"""<?xml version="1.0"?>"""+str0.decode("utf-8"))
        print(rowx.getchildren())
        columns=rowx.findall("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tc")#.text="70"
        setCell(columns[0],item.bh)
        setCell(columns[1],item.name)
        setCell(columns[2],item.guige)
        setCell(columns[3],str(item.ct)+item.danwei)
        if item.beizhu!=None:
            setCell(columns[5],item.beizhu)
        else:
            setCell(columns[5],"")
        setCell(columns[4],"")
        tbl.append(rowx)
    s=BytesIO()
    tree.write(s, encoding="utf-8", xml_declaration=True, method="xml")
    s.seek(0)
    data=s.read()
    data=data.decode('utf-8')
    data= data.replace('\n', '\r\n')
    return data
    #f=open(fn,"w",encoding="utf-8")#convert \n  to \r\n. word xml 的特殊之处
    #f.write(data)
    #f.close()
def genQue(contact,fn):
    tree = ET.parse(fn)
    root = tree.getroot()
    parts=root.getchildren()
    part2=parts[2]
    data=part2.find("{http://schemas.microsoft.com/office/2006/xmlPackage}xmlData")
    document=data.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}document")
    body=document.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}body")
    cs=body.getchildren()
    i=0
    for c in cs:
        print(i,c)
        i+=1
    tbl=cs[0]
    changeGrid2(tbl,0,1,contact.yonghu)
    changeGrid2(tbl,1,1,contact.yiqixinghao)
    changeGrid2(tbl,2,1,contact.yiqibh)
    changeGrid2(tbl,3,1,contact.baoxiang)
    changeGrid2(tbl,4,1,contact.shenhe)
    changeGrid2(tbl,5,1,myformat_date(contact.yujifahuo_date))
    changeGrid2(tbl,6,1,contact.hetongbh)
   
    # tbl=cs[6]#配件清单
    # items=[]
    # for cp in contact.usepack_set.all():
        # for pi in cp.pack.packitem_set.all():
            # pi.item.ct=pi.ct
            # #items.append(pi.item)
            # items=addItem(items,pi.item)
    # print(items)
    # row0=getGridRow(tbl,0)
    # str0=ET.tostring(row0)
    # for item in items:
        # rowx=ET.fromstring(str0.decode("utf-8"))#"""<?xml version="1.0"?>"""+str0.decode("utf-8"))
        # print(rowx.getchildren())
        # columns=rowx.findall("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tc")#.text="70"
        # setCell(columns[0],item.bh)
        # setCell(columns[1],item.name)
        # setCell(columns[2],item.guige)
        # setCell(columns[3],str(item.ct)+item.danwei)
        # if item.beizhu!=None:
            # setCell(columns[5],item.beizhu)
        # else:
            # setCell(columns[5],"")
        # setCell(columns[4],"")
        # tbl.append(rowx)
    s=BytesIO()
    tree.write(s, encoding="utf-8", xml_declaration=True, method="xml")
    s.seek(0)
    data=s.read()
    data=data.decode('utf-8')
    data= data.replace('\n', '\r\n')
    return data
    #f=open(fn,"w",encoding="utf-8")#convert \n  to \r\n. word xml 的特殊之处
    #f.write(data)
    #f.close()

if __name__=="__main__":
    print(genPack("4111533499"))