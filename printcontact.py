# -*- coding: utf-8 -*-
import logging
import os
import sys
import codecs
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
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
        dic1.append(f.name)
    out=""
    for one in dic1:
        #r.append(one+":''")
        one="<td>%s</td>" % one
        out+=one
    f=codecs.open("out.txt","w","utf-8")
    f.write(out)
    f.close()
def gentitle():
    fields=Contact._meta.fields
    dic1=[]
    out=""
    for f in fields:
        out+=r"<td>%s</td>" % f.verbose_name
    f=codecs.open("out.txt","w","utf-8")
    f.write(out)
    f.close()        
   
# def genlist():
#     fields=Contact._meta.fields
#     out=""
#     for f in fields:
#         one="""<td>
#                     <%%- %s %%>
#                </td>""" % (f.name) 
#         out+=one
#     f=codecs.open("out.txt","w","utf-8")
#     f.write(out)
#     f.close()        
def genedit():
    fields=Contact._meta.fields
    out=""
    for f in fields:
        one="""<tr>
                <td>
                    <label>%s:</label>
                </td>
                <td>
                    <input type="text" id="%s" name="%s" value="<%%- %s %%>">
                </td>
            </tr>""" % (f.verbose_name,f.name,f.name,f.name) 
        out+=one
    f=codecs.open("out.txt","w","utf-8")
    f.write(out)
    f.close()
def test():
    r=Contact.objects.annotate(month=TruncMonth('tiaoshi_date')).values('month').annotate(c=Count('id')).values('month', 'c')  
    logging.info(r)
    logging.info(dir(r))
def updateItem():
    for i in Item.objects.all():
        if i.bh[:5]=="0102d":
            print(i.bh)
            i.bh="01"+i.bh
            i.save()
#genedit()
#gentitle()
#test()
#updateItem()