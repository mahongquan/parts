from django.shortcuts import render
import logging
from django.http import HttpResponse,HttpResponseRedirect
import mysite.settings
import json
import os
app_root=os.path.normpath(mysite.settings.STATICFILES_DIRS[0])
def toPath(p):
    return {"path": os.path.relpath(p, app_root),
            "name": os.path.basename(p),
            "time": os.path.getmtime(p),
            "isdir": os.path.isdir(p),
            "size":os.path.getsize(p)}
def toLocalPath(path):
    fsPath  =  os.path.realpath(os.path.join(app_root, path))
    if os.path.commonprefix([app_root, fsPath]) != app_root:
        raise Exception("Unsafe path "+ fsPath+" is not a  sub-path  of root "+ app_root)
    return fsPath
def toWebPath(path):
    return "/static/"+path
def children(request):
	logging.info(request.GET)
	p = toLocalPath(request.GET["path"])
	children = map(lambda x : os.path.join(p, x), os.listdir(p))
	children = filter(lambda x : os.path.isfile(x) or os.path.isdir(x), children) 
	children = map(lambda x : toPath(x), children)
	print(p)
	print(children,dir(children))
	dic={"path": p,"children": list(children)}
	return HttpResponse(json.dumps(dic, ensure_ascii=False)) 
def parent(request):
	logging.info(request.GET)
	p = toLocalPath(request.GET["path"])
	if p == app_root:
	    parent = p
	else:
	    parent = os.path.dirname(p)
	dic=toPath(parent)
	return HttpResponse(json.dumps(dic, ensure_ascii=False)) 	
def content(request):
	p = toWebPath(request.GET["path"])
	return HttpResponseRedirect(p)
def remove():
    p = toLocalPath(request.GET["path"])
    if os.path.isdir(p):
        shutil.rmtree(p)
    else:
        os.remove(p)
    return HttpResponse(	json.dumps({"status":"success"}, ensure_ascii=False) )
def rename():
    p = toLocalPath(request.GET["path"])
    
    name = request.GET["name"]
    parent = os.path.dirname(p)
    updated = os.path.join(parent, name)
    os.rename(p, updated)
    return HttpResponse(	json.dumps({"status":"success"}, ensure_ascii=False) ) 
def upload_file():
    p = toLocalPath(request.GET["path"])
    name = request.GET["name"]
    uploaded = request.files["file"]
    uploadedPath = os.path.join(path, name)
    uploaded.save(uploadedPath)
    return HttpResponse(	json.dumps({"status":"success"}, ensure_ascii=False) ) 
def mkdir():
    p = toLocalPath(request.GET["path"])
    name = request.GET["name"]
    os.mkdir(os.path.join(path, name))
    return HttpResponse(	json.dumps({"status":"success"}, ensure_ascii=False) ) 