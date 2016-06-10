# -*- coding: utf-8 -*-
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
        else:
           lr.append(a)
    return lr
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
if __name__=="__main__":
  contact=Contact.objects.all()[0]
  print(contact.hetongbh)
  contact.method="./myutil.py"
  contact.save()


