# -*- coding: utf-8 -*-

import os
import sys
import codecs
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
# from qt5_client_dj import contacts

from qt5_client import contacts,login

contacts.main()