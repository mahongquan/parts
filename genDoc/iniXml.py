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
def getFromIni(fn):#仪器编号
	tree = ET.parse("CS/"+fn+'.ini')
	root = tree.getroot()
	parts=root.getchildren()
	chanels=parts[12]
	factors=parts[16]
	#showchildren(chanels)
	#showchildren(factors)
	return getfactors(chanels,factors)
if __name__=="__main__":
	print(getFromIni("4111525491"))