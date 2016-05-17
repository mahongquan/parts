# Create your views here.
# -*- coding: utf-8 -*-
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
    cs=Contact.objects.all()
    for c in cs:
        c.tiaoshi_date=c.yujifahuo_date
        c.save()
printAllContact()
