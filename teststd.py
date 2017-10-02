# -*- coding: utf-8 -*-
import os
import sys
import codecs
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
from rest.views import readStandardFile
def test():
    fn=codecs.open("2017.9.21标钢入库.xls","rb").read()
    readStandardFile(fn,"test2")
test()