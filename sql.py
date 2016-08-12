# -*- coding: utf-8 -*-
import codecs
import sqlite3
conn = sqlite3.connect('data.sqlite')
c = conn.cursor()

# c.execute('select * from parts_packitem')
# items=[]
# for row in c:
#     if row[1]!=4:
#     	items.append(row)
# for item in items:
# 	c.execute("""insert into parts_packitem(pack_id,item_id,ct) values (9,%s,%s)""" % (item[2],item[3]))
# conn.commit()

# # We can also close the cursor if we are done with it
# c.close()
cmds=codecs.open("new1.sql","r",'utf-8').read().split(";")
for cmd in cmds:
	try:
		print(cmd)
		c.execute(cmd)
	except:
		pass
conn.commit()