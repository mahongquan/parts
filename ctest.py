<<<<<<< HEAD
# -*- coding: utf-8 -*-

import os
import sys
import codecs
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
c=Contact.objects.all()[0]
=======
# -*- coding: utf-8 -*-

import os
import sys
import codecs
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
c=Contact.objects.all()[0]
>>>>>>> 500d22d06ef764fe4daada1c05d77ac442788838
print(c.id,c.method)