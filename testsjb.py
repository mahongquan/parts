﻿# -*- coding: utf-8 -*-

import os
import sys
import codecs
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
from mysite.rest.views import readStandardFile
def test():
    fn=open("2017.9.21标钢入库.xls").read()
    readStandardFile(fn,"test")
test()