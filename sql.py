# -*- coding: utf-8 -*-
import codecs
import sqlite3
import traceback
conn = sqlite3.connect('data.sqlite')
c = conn.cursor()
def update1():
	c.execute('alter table parts_contact add column dianqi varchar(30)')	
	c.execute('alter table parts_contact add column jixie varchar(30)')	
	c.execute('alter table parts_contact add column hongwai varchar(30)')	
	c.execute('alter table parts_contact add column redao varchar(30)')	
	conn.commit()
update1()
#c.execute('select * from parts_pack where name="ON必备英文"')
# # items=[]
# for row in c:
# 	s=""
# 	for r in row:
# 		s+=str(r)+'\t'
# 	print(s)

# # We can also close the cursor if we are done with it
# c.close()
# def remove(cmd):
# 	cs=cmd.split("\n")
# 	r=""
# 	for c in cs:
# 		if c[:2]=="--":
# 			pass
# 		else:
# 			r+=c+"\n"
# 	return r
# cmds=codecs.open("tableStruct.sql","r",'utf-8').read().split(";")
# for cmd in cmds:
# 	try:
# 		print(remove(cmd))
# 		c.execute(cmd)
# 	except sqlite3.OperationalError as e:
# 		traceback.print_exc()
# 		if "already exists" in str(e):
# 			pass
# 		else:
# 			input("pause")
# conn.commit()