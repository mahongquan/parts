# # -*- coding: utf-8 -*-
import os
import shutil
import json 
dir1=r"./node_modules"
res=[]
def getPsAt(dir0,f0):
	global res
	dir1=dir0+"/"+f0
	fs=os.listdir(dir1)
	for f in fs:
		d1=dir1+"/"+f
		p1=d1+"/package.json"
		# print(p1)
		if os.path.isfile(p1):
			fp=open(p1)
			fc=json.load(fp)
			# print(fc)
			# print(f0+"/"+f,fc["version"])
			res.append((f0+"/"+f,fc["version"]))
			# raw_input("hi")
def getPs(dir1):
	global res
	fs=os.listdir(dir1)
	for f in fs:
		d1=dir1+"/"+f
		if f[0]=="@":
			# raw_input("@@@@@@@@@@")
			getPsAt(dir1,f)
		else:
			p1=d1+"/package.json"
			# print(p1)
			if os.path.isfile(p1):
				fp=open(p1)
				fc=json.load(fp)
				# print(fc)
				# print(f,fc["version"])
				# raw_input("hi")
				res.append((f,fc["version"]))
def getPV(f0):
	d1=dir1+"/"+f0
	p1=d1+"/package.json"
	if os.path.isfile(p1):
		fp=open(p1)
		fc=json.load(fp)
		return(fc["version"])
	else:
		return None
def readP():
	# print(dir(json))
	p=json.load(open("package.json"))
	f=open("package.dependencies.json","w")
	for k in p["dependencies"]:
		f.write('"%s":"%s"\n' %(k,getPV(k)))
	f.close()
readP()

