#!/usr/bin/env python
import os
import re
import sys
import codecs
#############################
dic2_3={}
dic2_3["django.core.context_processors"]="django.template.context_processors"
dic2_3["import patterns,"]="import "
dic=dic2_3
###########################
pattern = re.compile(r"""   (//[^\r\n]*) # match a single line comment
                            | (/\*.*?\*/)      # match a multi line comment
                            | ("[^"]*")        # match a string literal
                            | ([a-zA-Z_][a-zA-Z_0-9]*\.[a-zA-Z_][a-zA-Z_0-9]*\.[a-zA-Z_][a-zA-Z_0-9]*) #3 identifier
                            | ([a-zA-Z_][a-zA-Z_0-9]*\ [a-zA-Z_][a-zA-Z_0-9]*,) #3 identifier
                        """
                           , re.X | re.S)
def translateValue(old):
    new=dic.get(old)
    if new!=None:
        return new
    return old
def translateValue2(old):
    print(old)
    new=dic.get(old)
    if new!=None:
        return new
    return old
def func(match):
    if match.group(1) or match.group(2) or match.group(3):
        return match.group()
    if match.group(5):
        return  translateValue2(match.group())#
    if match.group(4):
        return  translateValue(match.group())#
    else:
      return match.group()
def translateStr(source):
  return re.sub(pattern,func,source)
def translateFile(inputFileName):
  s=codecs.open(inputFileName,"r","utf-8").read()
  return translateStr(s)
def treatfile(inputFileName):
  print(inputFileName)
  #bak
  #cmd="cp %s %s" %(inputFileName,inputFileName+".bak")
  #os.system(cmd)
  #translate
  fc=translateFile(inputFileName)
  #output
  f=codecs.open(inputFileName,"w","utf-8")
  f.write(fc)
  f.close()
#dir##################
def mylistdir(p,f):
    a=os.listdir(p)
    fs=myfind(a,f)
    return(fs)
def myfind(l,p):
    lr=[];
    #print p
    p1=p.replace(".",r"\.")
    p2=p1.replace("*",".*")
    p2=p2+"$"
    for a in l:
        #print a
        if  re.search(p2,a,re.IGNORECASE)==None :
           pass
           #print "pass"
        else:
           lr.append(a)
       #print "append"
    return lr
def translateDir(path):#
    files=mylistdir(path,"*.py")
    for f in  files:
        fn=path+"/"+f
        treatfile(fn)
if __name__=="__main__":
  if len(sys.argv)>1:
    translateDir(sys.argv[1])
  else:
    print("This program should be use like this:\n\n\t\tpython translate.py srcdir")



