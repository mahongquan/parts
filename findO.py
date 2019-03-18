# -*- coding: utf-8 -*-

import os
import sys
import codecs
import django
from genDoc.recordXml import genRecord
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
def printAllContact():
    ps=Pack.objects.all()
    for p in ps:
    	# print(p,dir(p))
    	pitem=p.packitem_set.all()
    	ct=0
    	for pi in pitem:
    		if "O型"  in pi.item.name:
    		    ct+=1
    	if ct>5:
    		print(p,ct)
printAllContact()    