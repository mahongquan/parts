# -*- coding: utf-8 -*-
import os
import sys
import codecs
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
c=Contact.objects.get(id=272)
