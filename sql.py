# -*- coding: utf-8 -*-
import codecs
import sqlite3
import traceback
conn = sqlite3.connect('data.sqlite')
c = conn.cursor()

# c.execute('select * from parts_contact order by yiqibh')
# # items=[]
# for row in c:
# 	s=""
# 	for r in row:
# 		s+=str(r)+'\t'
# 	print(s)

# # We can also close the cursor if we are done with it
# c.close()
def remove(cmd):
	cs=cmd.split("\n")
	r=""
	for c in cs:
		if c[:2]=="--":
			pass
		else:
			r+=c+"\n"
	return r
cmds=codecs.open("tableStruct.sql","r",'utf-8').read().split(";")
for cmd in cmds:
	try:
		print(remove(cmd))
		c.execute(cmd)
	except sqlite3.OperationalError as e:
		traceback.print_exc()
		if "already exists" in str(e):
			pass
		else:
			input("pause")
conn.commit()