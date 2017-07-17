# -*- coding: utf-8 -*-

import os
import sys
import codecs
import django
from genDoc.docx_write import genPack
from genDoc.genLabel import genLabel
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
def t():
    c=Contact.objects.get(id=310)
    data=genLabel(c.yiqixinghao,c.yiqibh,c.channels)
    f=open("gen.lbx","wb")
    f.write(data)
    f.close()
t()    