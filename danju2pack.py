# -*- coding: utf-8 -*-
import os
import sys
import codecs
import django
from django.core.exceptions import ObjectDoesNotExist
import re
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
def treatOne(d):
	p=Pack()
	p.name=d.beizhu+" "+d.filename
	p.save()
	items=d.danjuitem_set.all()
	for di in items:
		# di=DanjuItem()
		# di.item=item
		# di.ct=i[5]
		# di.danju=d
		# di.save()
		pi=PackItem()
		pi.item=di.item
		pi.ct=di.ct
		pi.pack=p
		pi.save()
def readfile():
	dan=Danju.objects.all()
	for one in dan:
		treatOne(one)
if __name__=="__main__":
	readfile()


