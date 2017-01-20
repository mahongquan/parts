# -*- coding: utf-8 -*-
import codecs
import sqlite3
conn = sqlite3.connect('data.sqlite')
c = conn.cursor()

c.execute('select * from parts_contact order by yiqibh')
# items=[]
for row in c:
	s=""
	for r in row:
		s+=str(r)+'\t'
	print(s)

# # We can also close the cursor if we are done with it
# c.close()
# cmds=codecs.open("new1.sql","r",'utf-8').read().split(";")
# for cmd in cmds:
# 	try:
# 		print(cmd)
# 		c.execute(cmd)
# 	except:
# 		pass
# conn.commit()