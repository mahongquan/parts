# -*- coding: utf-8 -*-
import logging
import os
import sys
import codecs
import django
from openpyxl import load_workbook
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
def show_row(row):
    r=""
    for c in row:
        r+=c.value
    print(r)
def treatOne(rows,fn,at):
    logging.info(rows)
    r=None
    beizhu=rows[3][3].value
    print(beizhu)
    if beizhu[:2]=="CS" or beizhu[:2]=="ON" or beizhu[:2]=="NH" or beizhu[:3]=="DON" or beizhu[:3]=="DCS":
        name=beizhu+"_"+str(at)+"_"+fn
        d=Pack.objects.filter(name=name)
        logging.info(d)
        if len(d)>0:
            pass
        else:
            d=Pack()
            d.name=name
            d.save()
            n=len(rows)
            items_xls=rows[6:n]
            for i in items_xls:
                show_row(i)
                input("show")
                if i[0].value=="":
                    break
                items=Item.objects.filter(bh=i[0].value).all()
                if len(items)>1:
                    item=items[0]
                else:
                    item=Item()
                item.bh=i[0].value
                item.name=i[1].value
                item.danwei=i[2].value
                item.save()
                di=PackItem()
                di.pack=d
                di.item=item
                di.ct=i[4].value
                di.save()
            r={"id":d.id,"name":d.name}
    return r

def readStandardFile(book,filename):
    table=book.worksheets[0]
    begin=False
    dan=[]
    for i in table.rows:
        cells=i
        print(cells[0].value)
        if cells[0].value=="库存其它入库单":
            if not begin:
                begin=True
                onedan=[]
            else:
                #finish
                dan.append(onedan)
                onedan=[]
        else:
            if begin:
                onedan.append(cells)
            else:
                pass
    logging.info(onedan)
    if len(onedan)>0:
        dan.append(onedan)
    rs=[]
    at=1
    for one in dan:
        r=treatOne(one,filename,at)
        if r!=None: 
            rs.append(r)
        at+=1
    return rs

def standard():
    filename = r"C:\Users\Administrator\Desktop\2021.2.23.xlsx"
    xlBook = load_workbook(filename = filename)
    packs=readStandardFile(xlBook,filename)
    print(packs)
if __name__=="__main__" :
    standard()