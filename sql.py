# -*- coding: utf-8 -*-
import codecs
import sqlite3
import traceback
conn = sqlite3.connect('data.sqlite')
c = conn.cursor()
def myZhengli(raw):
    print(dir(raw))
    fs=raw.description
    res=[]
    for one in raw:
        o1={}
        i=0
        for a in one:
            o1[fs[i][0]]=a
            i+=1
        res.append(o1)
    return res
def testRaw():
    cmd="select * from parts_contact  where work_month IS NULL   and tiaoshi_date between '2016-10-17' and '2016-12-17'"
    raw=c.execute(cmd)
    r=myZhengli(raw)    
    print(r)
def update1():
    # c.execute('alter table parts_contact add column dianqi varchar(30)')    
    # c.execute('alter table parts_contact add column jixie varchar(30)')    
    # c.execute('alter table parts_contact add column hongwai varchar(30)')    
    # c.execute('alter table parts_contact add column redao varchar(30)')    
    c.execute('alter table parts_contact add column work_month date')    
    conn.commit()
# r=testRaw()
# update1()
#c.execute('select * from parts_pack where name="ON必备英文"')
# # items=[]
# for row in c:
#     s=""
#     for r in row:
#         s+=str(r)+'\t'
#     print(s)

# # We can also close the cursor if we are done with it
# c.close()
# def remove(cmd):
#     cs=cmd.split("\n")
#     r=""
#     for c in cs:
#         if c[:2]=="--":
#             pass
#         else:
#             r+=c+"\n"
#     return r
def updateDb():
    cmds=codecs.open("tableStruct.sql","r",'gb18030').read().split(";")
    for cmd in cmds:
        try:
            print(cmd)
            c.execute(cmd)
        except sqlite3.OperationalError as e:
            traceback.print_exc()
            if "already exists" in str(e):
                pass
            else:
                input("pause")
        except sqlite3.IntegrityError as e:
            pass
    conn.commit()
updateDb()    