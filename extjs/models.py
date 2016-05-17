from django.db import models
import datetime
import logging
from django.core.exceptions import ObjectDoesNotExist
# [{ "id":1, "name":"Aitch", "gender":"M", "dob":"1980/02/28", "epaper":"true"  },
# { "id":2, "name":"David", "gender":"M", "dob":"1981/03/01", "epaper":"true"  },
# { "id":3, "name":"Johny", "gender":"F", "dob":"1982/04/02", "epaper":"false" },
# { "id":4, "name":"Chris", "gender":"M", "dob":"1983/05/03", "epaper":"true"  },
# { "id":5, "name":"Kelly", "gender":"F", "dob":"1984/06/04", "epaper":"false" },
# { "id":6, "name":"Sally", "gender":"F", "dob":"1985/07/05", "epaper":"true"  },
# { "id":7, "name":"Samel", "gender":"M", "dob":"1986/08/06", "epaper":"false" }]
class Ch11(models.Model):
    name = models.CharField(max_length=30)
    gender = models.CharField(max_length=1)
    dob = models.DateField()
    epaper = models.BooleanField(default=False)
