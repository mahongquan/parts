# -*- coding: utf-8 -*-
import os
import sys
import codecs
import django
from django.db import connection,transaction
import datetime
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
def month12():
    end_date=datetime.datetime.now()
    start_date=datetime.datetime(end_date.year-1,1,1,0,0,0)
    cursor = connection.cursor()            #获得一个游标(cursor)对象
    start_date_s=start_date.strftime("%Y-%m-%d")
    end_date_s=end_date.strftime("%Y-%m-%d")
    cmd="select strftime('%Y-%m',tiaoshi_date) as month,count(id) from parts_contact  where tiaoshi_date between '"+start_date_s+"' and '"+end_date_s+"' group by month"
    logging.info(cmd)
    cursor.execute(cmd)    #执行sql语句
    raw = cursor.fetchall()                 #返回结果行 或使用 #raw = cursor.fetchall()
    lbls=[]
    values=[]
    for one in raw:
        lbls.append(one[0]+"月")
        values.append(one[1])
    print(values)
def byaddr():
    cursor = connection.cursor()            #获得一个游标(cursor)对象
    cmd="select substr(addr,1,2) as qu,count(id) from parts_contact  group by qu"
    logging.info(cmd)
    cursor.execute(cmd)    #执行sql语句
    raw = cursor.fetchall()                 #返回结果行 或使用 #raw = cursor.fetchall()
    for one in raw:
    	print(one[0],one[1])
byaddr()