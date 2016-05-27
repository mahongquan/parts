from django.db import models
import datetime
import logging
from django.core.exceptions import ObjectDoesNotExist
class Ch11(models.Model):
	name = models.CharField(max_length=30)
	gender = models.CharField(max_length=1)
	dob = models.DateField(null=True,blank=True)
	epaper = models.BooleanField(default=False)
	def __str__(self):
		return self.name
	def json(self):
		fields=type(self)._meta.fields
		dic1={}
		for f in fields:
			exec("dic1['%s']=self.%s" %(f.name,f.name))
		return dic1