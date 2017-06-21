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
    c=Contact.objects.get(id=266)
    c.baoxiang="test"
    data=genRecord("media/1_3111705562.ini",c)
    f=open("gen.docx","wb")
    #print(data,type(data))
    f.write(data[0])
    f.close()
printAllContact()    