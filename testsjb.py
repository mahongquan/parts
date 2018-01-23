# -*- coding: utf-8 -*-

import os
import sys
import codecs
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
from genDoc.excel_write import getJiaoZhunFile
from itertools import product
import types
import openpyxl
from openpyxl import worksheet
from openpyxl.utils import range_boundaries
def test():
    c=Contact.objects.get(id=310)
    data=getJiaoZhunFile(c)
    f=open("gen.xlsx","wb")
    f.write(data)
    f.close()
test()