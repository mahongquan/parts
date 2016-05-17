from lxml import etree as ET
from iniXml import getFromIni
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
def getGrid2(tbl,rowv,colv):
	tbl_childs=tbl.getchildren()
	row1=tbl_childs[rowv+2]
	columns=row1.getchildren()
	column1=columns[colv]
	cell=column1.getchildren()
	para=cell[1].getchildren()[1]
	para=para.getchildren()[0].text
	return para
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
def getPeizhi(fn):
	tree = ET.parse(fn+'_装箱单.xml')
	root = tree.getroot()
	parts=root.getchildren()
	part2=parts[2]
	data=part2.find("{http://schemas.microsoft.com/office/2006/xmlPackage}xmlData")
	document=data.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}document")
	body=document.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}body")
	cs=body.getchildren()
	tbl=cs[0]
	yiqibh=getGrid2(tbl,2,1)
	yiqixinghao=getGrid2(tbl,1,1)
	tbl=cs[6]
	peizhi_str=getGrid(tbl,1,2)
	peizhi=peizhi_str.split(" ")[1]
	elements=peizhi.split("+")
	chanels=[]
	first=elements[0]
	getElement(chanels,first)
	if len(elements)==1:#单元素
		pass
	else:#two elements
		second=elements[1]
		getElement(chanels,second)
	return (yiqibh,yiqixinghao,chanels)
if __name__=="__main__":
	print(getPeizhi("4111533499"))