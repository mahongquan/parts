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
        r+=str(c.value)+","
    print(r)
def treatOne(rows,fn,at):
    logging.info(rows)
    r=None
    beizhu=rows[0][4].value
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
        items_xls=rows
        for i in items_xls:
            show_row(i)
            items=Item.objects.filter(bh=i[5].value).all()
            if len(items)>1:
                item=items[0]
            else:
                item=Item()
            item.bh=i[5].value
            item.name=i[6].value
            item.save()
            di=PackItem()
            di.pack=d
            di.item=item
            di.ct=i[7].value
            di.save()
        r={"id":d.id,"name":d.name}
    return r

def readStandardFile(book,filename):
    # print(dir(book))
    # print(dir(book.worksheets))
    # input("hi")
    table=book.get_sheet_by_name("Sheet1")
    begin=False
    dan=[]
    onedan=[]
    for i in table.rows:
        show_row(i)
        cells=i
        beizhu=str(cells[4].value)
        if beizhu[:2]=="CS" or beizhu[:2]=="OH" or beizhu[:2]=="ON" or beizhu[:2]=="NH" or beizhu[:3]=="DON" or beizhu[:3]=="DCS":
            if not begin:
                begin=True
                beizhu0=beizhu
                onedan=[]
                onedan.append(cells)
            else:
                if beizhu!=beizhu0:#next 
                    #finish
                    begin=True
                    beizhu0=beizhu
                    dan.append(onedan)
                    onedan=[]
                    onedan.append(cells)
                else:#continue
                    onedan.append(cells)
        else:
            if begin:#finish
                begin=False
                dan.append(onedan)
            else:
                pass
    # logging.info(onedan)
    if len(onedan)>0:
        dan.append(onedan)
    # for one in dan:
    #     print(one)
    # input("end")
    rs=[]
    at=1
    for one in dan:
        r=treatOne(one,filename,at)
        if r!=None: 
            rs.append(r)
        at+=1
    return rs

def standard():
    filename = r"C:\Users\Administrator\Desktop\2021-01王浩玲.xlsx"
    xlBook = load_workbook(filename = filename)
    packs=readStandardFile(xlBook,filename)
    print(packs)
if __name__=="__main__" :
    standard()