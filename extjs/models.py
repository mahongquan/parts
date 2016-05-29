from django.db import models
import datetime
import logging
from myutil import *
from django.core.exceptions import ObjectDoesNotExist
class Ch11(models.Model,MyModel):
	name = models.CharField(max_length=30)
	gender = models.CharField(max_length=1)
	dob = models.DateField(null=True,blank=True)
	epaper = models.BooleanField(default=False)
	def __str__(self):
		return self.name
