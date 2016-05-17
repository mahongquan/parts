import sqlite3
conn = sqlite3.connect('data.sqlite')
c = conn.cursor()

# # Create table
# c.execute('''create table stocks
# (date text, trans text, symbol text,
 # qty real, price real)''')

# # Insert a row of data
# c.execute("""insert into stocks
          # values ('2006-01-05','BUY','RHAT',100,35.14)""")
 # Larger example
# for t in [('2006-03-28', 'BUY', 'IBM', 1000, 45.00),
          # ('2006-04-05', 'BUY', 'MSFT', 1000, 72.00),
          # ('2006-04-06', 'SELL', 'IBM', 500, 53.00),
         # ]:
    # c.execute('insert into stocks values (?,?,?,?,?)', t)
c.execute('select * from parts_packitem')
items=[]
for row in c:
    if row[1]!=4:
    	items.append(row)
for item in items:
	c.execute("""insert into parts_packitem(pack_id,item_id,ct) values (9,%s,%s)""" % (item[2],item[3]))
conn.commit()

# We can also close the cursor if we are done with it
c.close()