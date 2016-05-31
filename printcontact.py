# -*- coding: utf-8 -*-

import os
import sys
import codecs
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
from mysite.parts.models import *
def printContactObject(c):
	for pack in c.contactpack_set():
		print(pack)
def printContact(name):
	cs=Contact.objects.all()
	for c in cs:
		if c.hetongbh==name:
			printContactObject(c)
			break
def getPack(name):
	o=Pack.objects.filter(name==name)
	print(o)
def printAllContact():
	f=codecs.open("all.txt","w")
	cs=Contact.objects.all()
	for rec in cs:
		f.write(str(rec.id))
		f.write(",")
		f.write(rec.shenhe)
		f.write(",")
		f.write(rec.hetongbh)
		f.write(",")
		f.write(rec.yiqibh)
		f.write(",")
		f.write(rec.yiqixinghao)
		f.write(",")
		f.write(str(rec.yujifahuo_date))
		f.write(",")
		f.write(rec.yonghu)
		f.write(",")
		f.write(rec.baoxiang)
		f.write("\n")
	f.close()
def gentd():
	fields=Contact._meta.fields
	dic1=[]
	for f in fields:
	    #exec("dic1['%s']=self.%s" %(f.name,f.name))
	    dic1.append(f.name)
	    #print(r"<td><%%- %s %%></td>" % f.name)
	    # print("""<tr>
     #            <td>
     #                <label>%s:</label>
     #            </td>
     #            <td>
     #                <input type="text" id="%s" name="%s" value="<%%- %s %%>">
     #            </td>
     #        </tr>""" % (f.name,f.name,f.name,f.name) )
     	r=[]
     	for one in dic1:
     		r.append(one+":''")
     	print(",".join(r))
def gentitle():
	fields=Contact._meta.fields
	dic1=[]
	for f in fields:
	    print(r"<td>%s</td>" % f.verbose_name)
def genedit():
	fields=Contact._meta.fields
	for f in fields:
	    print("""<tr>
                <td>
                    <label>%s:</label>
                </td>
                <td>
                    <input type="text" id="%s" name="%s" value="<%%- %s %%>">
                </td>
            </tr>""" % (f.verbose_name,f.name,f.name,f.name) )
#gentitle()
genedit()