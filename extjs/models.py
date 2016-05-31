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
class Contact(models.Model):
    firstname = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    age = models.IntegerField(null=True,blank=True)
    @classmethod
    def mycreate(type1,data):
        logging.info(data)
        logging.info(type1)
        fields=type1._meta.fields
        c=Contact()     
        for f in fields:
            if data.get(f.name)!=None:
                exec("c.%s=data['%s']" %(f.name,f.name))
        return c
    def __str__(self):
        return self.lastname
    def json(self):
        fields=type(self)._meta.fields
        dic1={}
        for f in fields:
            exec("dic1['%s']=self.%s" %(f.name,f.name))
        dic1["_id"]=self.id
        return dic1
    def myupdate(self,data):
        fields=type(self)._meta.fields
        logging.info(data)
        for f in fields:
            if data.get(f.name)!=None:
                exec("self.%s=data['%s']" %(f.name,f.name))