# -*- coding: utf-8 -*-
import os
import sys
import codecs
import django
import jinja2
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
c=Contact.objects.all()[0]
dic = {}
dic["contact"]=c
(items,items2)=c.huizong()
dic["items"]=items
if len(items2)==0:
    items2=None
dic["items2"]=items2
dic["new"]=0
totalct=0
for i in items:
    totalct +=i.ct
dic["totalct"]=totalct
dic["totalid"]=len(items)
#tc=codecs.open("templates/parts/showcontact.html","r","utf-8").read()
tc=codecs.open("templates/parts/t_装箱单.html","r","utf-8").read()
t=jinja2.Template(tc)
f=codecs.open("out.html","w","utf-8")
f.write(t.render(dic))
f.close()
