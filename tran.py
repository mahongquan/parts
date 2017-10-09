# -*- coding: utf-8 -*-
import codecs
import sqlite3
import traceback
conn = sqlite3.connect('data.sqlite')
conn2 = sqlite3.connect('data - 副本.sqlite')
def getOld(id1):
	c = conn2.cursor()
	c.execute('select * from parts_item where id='+str(id1)+'')	
	for row in c:
		return row
	return None
c = conn.cursor()
c.execute('select * from parts_pack where name="ON必备英文"')
# # items=[]
for row in c:
	id1=row[0]
c.execute('select * from parts_packitem where pack_id='+str(id1)+'')	
c2 = conn.cursor()
for row in c:
	c2.execute('select * from parts_item where id='+str(row[2])+'')	
	for row2 in c2:
		print(row2)
	old=getOld(row[2])
	if old!=None:
		#rename to old

