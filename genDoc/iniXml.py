from lxml import etree as ET
def showchildren(r):
	cs=r.getchildren()
	i=0
	for p in cs:
		print(i,p)
		i+=1
def getfactors(chanels,factors):
	chanelNames=[]
	factorVs=[]
	for chanel in chanels:
		chanelNames.append(chanel.find("element").text)
	for factor in factors:
		factorVs.append((float(factor.find("Linearity").text),float(factor.find("BaseK").text),float(factor.find("BaseB").text)))
	dic={}
	at=0
	for chanelName in chanelNames:
		if chanelName!=None:
			dic[chanelName]=factorVs[at]
		at+=1
	return dic
def getResist(fn):
	tree = ET.parse(fn)
	root = tree.getroot()
	r=root.findall("UseResistance")[0]
	return r.text
def getFromIni(yiqixinghao,fn):#仪器编号
	print(yiqixinghao)
	if yiqixinghao[0]=="C":
		return getCSini(fn)
	elif yiqixinghao[0:2]=="ON":
		return getONini(fn)
	elif yiqixinghao[0]=="N":
		return getNini(fn)
	elif yiqixinghao[0:2]=="OH":
		return getOHini(fn)
	else:
		return getOini(fn)
def getOHini(fn):
	tree = ET.parse(fn)
	root = tree.getroot()
	parts=root.getchildren()
	chanels=root.find("Channels")
	factors=root.find("Factors")
	return getfactors(chanels,factors)

def getONini(fn):
	tree = ET.parse(fn)
	root = tree.getroot()
	parts=root.getchildren()
	chanels=root.find("Channels")
	factors=root.find("Factors")
	#showchildren(chanels)
	#showchildren(factors)
	return getfactors(chanels,factors)
def getOini(fn):
	tree = ET.parse(fn)
	root = tree.getroot()
	parts=root.getchildren()
	chanels=root.find("Channels")
	factors=root.find("Factors")
	return getfactors(chanels,factors)
def getNini(fn):
	tree = ET.parse(fn)
	root = tree.getroot()
	parts=root.getchildren()
	chanels=root.find("Channels")
	factors=root.find("Factors")
	#showchildren(chanels)
	#showchildren(factors)
	return getfactors(chanels,factors)
def getCSini(fn):
	tree = ET.parse(fn)
	root = tree.getroot()
	print(dir(root))
	parts=root.getchildren()
	chanels=root.find("Channels")
	factors=root.find("Factors")

	return getfactors(chanels,factors)
if __name__=="__main__":
	print(getCSini("1_4111704589.ini"))