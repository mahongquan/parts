# -*- coding: utf-8 -*-

import os
import sys
import codecs
import django
from genDoc.excel_write import *
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
def printAllContact():
    cs=Contact.objects.all()
    print(cs[0])
    genShujubiao(cs[0],"media/证书数据表aaa.xlsx")
printAllContact()    