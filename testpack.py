# -*- coding: utf-8 -*-

import os
import sys
import codecs
import django
from genDoc.docx_write import genPack
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
def printAllContact():
    c=Contact.objects.get(id=165)
    data=genPack(c,"media/t_装箱单.docx")
    f=open("gen.docx","wb")
    f.write(data)
    f.close()
def main():
	pass
if __name__=="__main__":    
	printAllContact()    