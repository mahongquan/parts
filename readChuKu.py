import xlrd
import os
import sys
import codecs
import django
from django.core.exceptions import ObjectDoesNotExist
import re
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
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
def treatOne(rows,fn):
	beizhu=rows[1][7]
	if beizhu[:2]=="CS" or beizhu[:2]=="ON":
		try:
			d=Danju.objects.get(danjuhao=rows[0][1])
		except ObjectDoesNotExist as e2:
			d=Danju()
		d.filename=fn
		d.danjuhao=rows[0][1]
		d.danju_date=rows[0][3]
		d.cangku=rows[0][5]
		d.bumeng=rows[0][7]
		d.gongying=rows[1][1]
		if rows[1][3]!="":
			d.shenhe=rows[1][3]
		d.leibie=rows[1][5]
		d.beizhu=rows[1][7]
		d.zhidan=rows[-2][3]
		d.qianzi=rows[-2][7]
		d.save()
		n=len(rows)
		print(n)
		items=rows[4:4+n-4-3]
		for i in items:
			#i=DanjuItem()
			print(i[1],i[2],i[3],i[4],i[5])
			items=Item.objects.filter(bh=i[1]).all()
			if len(items)>1:
				item=items[0]
			else:
				item=Item()
			item.bh=i[1]
			item.name=str(i[2])+" "+str(i[1])
			item.guige=i[3]
			item.danwei=i[4]
			item.save()
			di=DanjuItem()
			di.item=item
			di.ct=i[5]
			di.danju=d
			di.save()
def readfile(fn):
	book = xlrd.open_workbook(fn)
	table=book.sheets()[0]
	nrows = table.nrows
	ncols = table.ncols
	begin=False
	dan=[]
	for i in range(nrows-9-3):
		#print(i,table.row_values(i)[0])
		cells=table.row_values(9+i)
		dan.append((cells[0],cells[1],cells[7]))#bh,name,ct
	return dan
if __name__=="__main__":
	readfile(".","default.xls")
