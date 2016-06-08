# -*- coding: utf-8 -*-

import os
import sys
import codecs
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
from extjs.models import *
def printall():
	fields=Ch11._meta.fields
	for f in fields:
		print(f,f.name)
	cs=Ch11.objects.all()
	for c in cs:
		print(c)
printall()
