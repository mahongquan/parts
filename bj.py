# -*- coding: utf-8 -*-
import logging
import os
import sys
import codecs
import django
import codecs
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
import xlrd
def inItems(item,items):
    inIt=False
    equal=False
    v=None
    for i in range(len(items)):
        if items[i][0]==item[0]:
            inIt=True
            if items[i][2]==item[2]:
                equal=True
            v=items[i]
            items.remove(v)
            break
    return(inIt,equal,v)
def printList(items):
    r=[]
    for item in items:
        r1=[]
        for one in item:
            r1.append(str(one))
        r.append(",".join(r1))
    return "\n".join(r)
def bjitems(items,items_chuku):
    #(left,middle,right)bjitems(items,items_chuku)
    logging.info(items)
    left=[]
    equal=[]
    notequal=[]
    for item in items:
        (inIt,equalv,v)=inItems(item,items_chuku)
        if inIt:
            if equalv:
                equal.append(item)
            else:
                notequal.append(item)
                notequal.append(v)
        else:
            left.append(item)
    return(left,notequal,items_chuku)
def readBeiliaofile(fn):
    book = xlrd.open_workbook(file_contents=fn)
    table=book.sheets()[0]
    nrows = table.nrows
    ncols = table.ncols
    begin=False
    dan=[]
    for i in range(nrows-7):
        #print(i,table.row_values(i)[0])
        cells=table.row_values(7+i)
        dan.append((cells[0],cells[1],cells[7]))#bh,name,ct
    return dan            
def printAllContact():
    contact=Contact.objects.get(id=178)
    (items,items2)=contact.huizong()
    r=[]
    for item in items:
        r.append((item.bh,item.name,item.ct))
    for item in items2:
        r.append((item.bh,item.name,item.ct))
    f=open("3111648532_3.xls","rb")
    items_chuku=readBeiliaofile(f.read())
    (left,notequal,right)=bjitems(r,items_chuku)
    print("==============")
    print(left)
    print(notequal)
    print(right)
printAllContact()             
