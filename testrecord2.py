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
    c=Contact.objects.get(id=267)
    (data,lbl)=genRecord("media/3111702559.ini",c)
    f=open("gen.docx","wb")
    f.write(data)
    f.close()
printAllContact()    