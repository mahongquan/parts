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
printAllContact()
