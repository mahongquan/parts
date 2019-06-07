# -*- coding: utf-8 -*-

import os
import sys
import codecs
import django
from genDoc.excel_write import getJiaoZhunFile
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
def getElement(chanels,first):
    print(first)
    if first=="":
        return
    eles=first.split("(")
    ele=eles[0]#2C
    if ele[0]=="2":
        chanels.append("L"+ele[1])
        chanels.append("H"+ele[1])
    else:
        ele_set=eles[1][:-1]#移去括号
        print(ele_set)
        if ele_set[0]=="高":
            chanels.append("H"+ele[1])
        else:
            chanels.append("L"+ele[1])
    pass  
def getchannels(peizhi):
    print(peizhi)
    elements=peizhi.split("+")
    chanels=[]
    first=elements[0]
    getElement(chanels,first)
    if len(elements)==1:#单元素
        pass
    else:#two elements
        second=elements[1]
        getElement(chanels,second)
    return chanels
def printAllContact():
    c=Contact.objects.get(id=522)
    # print(c.channels)
    print(getchannels(c.channels))
    # print(getJiaoZhunFile(c))
printAllContact()    