# -*- coding: utf-8 -*-
# class Danju(models.Model):
#     danjuhao = models.CharField(max_length=30,verbose_name="单据号")
#     danju_date = models.DateField(null=True,blank=True,verbose_name="单据日期",default=datetime.datetime.now)
#     cangku = models.CharField(max_length=30,verbose_name="仓库",null=True,blank=True)
#     bumeng = models.CharField(max_length=30,verbose_name="部门",null=True,blank=True)
#     gongying=models.CharField(max_length=30,verbose_name="供应商")
#     shenhe=models.DateField(null=True,blank=True,verbose_name="审核日期")
#     leibie =  models.CharField(max_length=30,verbose_name="入库类别")
#     beizhu =  models.CharField(max_length=30,verbose_name="备注")
#     zhidan =  models.CharField(max_length=30,verbose_name="制单人")
#     qianzi =  models.CharField(max_length=30,verbose_name="签字人")
#     def __str__(self):
#         return str(self.id)+":"+self.danjuhao
#     class Meta:
#         verbose_name="单据"
#         verbose_name_plural="单据"
# class DanjuItem(models.Model):
#     danju=models.ForeignKey(Danju,verbose_name="单据")#合同
#     item=models.ForeignKey(Item,verbose_name="备件")#备件
#     ct=  models.IntegerField(verbose_name="数量",default=1)#数量
#     def __str__(self):
#         return self.danju.name+"_"+self.item.name+"_"+self.item.guige+"_"+str(self.ct)+self.item.danwei
#     class Meta:
#         verbose_name="单据条目"
#         verbose_name_plural=verbose_name 
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
def treatOne_old(rows,fn):
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
def treatOne(rows,fn):
	beizhu=rows[1][7]
	if beizhu[:2]=="CS" or beizhu[:2]=="ON":
		try:
			d=Pack.objects.get(name=rows[0][1])
		except ObjectDoesNotExist as e2:
			d=Pack()
		d.name=rows[1][7]+"_"+fn
		d.save()
		n=len(rows)
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
			di=PackItem()
			di.pack=d
			di.item=item
			di.ct=i[5]
			di.save()

def readfile(path,fn):
	book = xlrd.open_workbook(path+"/"+fn)
	table=book.sheets()[0]
	nrows = table.nrows
	ncols = table.ncols
	begin=False
	dan=[]
	for i in range(nrows ):
		cells=table.row_values(i)
		if cells[0]=="其他入库单":
			if not begin:
				begin=True
				onedan=[]
			else:
				#finish
				dan.append(onedan)
				onedan=[]
		else:
			if begin:
				onedan.append(cells)
			else:
				pass
	for one in dan:
		treatOne(one,fn)
#readfile("media/3.24标钢入库.xls")
def readMedia():
	fs=mylistdir("media","*.xls")
	print(fs)
	for f in fs:
		readfile("media",f)
def readDir(p):
	fs=mylistdir(p,"*.xls")
	print(fs)
	for f in fs:
		readfile(p,f)		
if __name__=="__main__":
	#readfile("media","6.3标钢入库清单.xls")
	readDir(r"C:\Users\group2\Downloads")


