# -*- coding: utf-8 -*-
import pycurl
from io import BytesIO
import urllib
from urllib.parse import urlencode

def initCurl():
    '''初始化一个pycurl对象，
尽管urllib2也支持 cookie 但是在登录cas系统时总是失败，并且没有搞清楚失败的原因。
这里采用pycurl主要是因为pycurl设置了cookie后，可以正常登录Cas系统
'''
    c = pycurl.Curl()
    c.setopt(pycurl.COOKIEFILE, "cookie_file_name")#把cookie保存在该文件中
    c.setopt(pycurl.COOKIEJAR, "cookie_file_name")
    c.setopt(pycurl.FOLLOWLOCATION, 1) #允许跟踪来源
    c.setopt(pycurl.MAXREDIRS, 5)
    #设置代理 如果有需要请去掉注释，并设置合适的参数'
    #c.setopt(pycurl.PROXY, ‘http://11.11.11.11:8080′)
    #c.setopt(pycurl.PROXYUSERPWD, ‘aaa:aaa’)
    
    return c

def GetData(curl, url):
    '''获得url指定的资源，这里采用了HTTP的GET方法
'''
    # head = ['Accept:*/*'
    #         ,'User-Agent:Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11'
    #         ]
    
    buf = BytesIO()
    curl.setopt(pycurl.WRITEFUNCTION, buf.write)
    curl.setopt(pycurl.URL, url)
    curl.setopt(pycurl.POST, 0)
    #curl.setopt(pycurl.HTTPHEADER,  head)
    curl.perform()
    the_page =buf.getvalue()
    #return the_page
    r=Response()
    r.ok=True
    buf.seek(0)
    r.text=buf.read().decode()
    buf.close()
    return r
def PostData(curl, url, data):
    '''提交数据到url，这里使用了HTTP的POST方法

备注，这里提交的数据为json数据，
如果需要修改数据类型，请修改head中的数据类型声明
'''
    # head = ['Accept:*/*'
    #         ,'Content-Type:application/xml'
    #         ,'render:json'
    #         ,'clientType:json'
    #         ,'Accept-Charset:GBK,utf-8;q=0.7,*;q=0.3'
    #         ,'Accept-Encoding:gzip,deflate,sdch'
    #         ,'Accept-Language:zh-CN,zh;q=0.8'
    #         ,'User-Agent:Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11'
    #         ]
    buf = BytesIO()
    curl.setopt(pycurl.WRITEFUNCTION, buf.write)
    print(urlencode(data))
    curl.setopt(pycurl.POSTFIELDS, urlencode(data))
    curl.setopt(pycurl.URL, url)
    curl.setopt(pycurl.POST, 1)
    #curl.setopt(pycurl.HTTPHEADER,  head)
    curl.perform()
    the_page = buf.getvalue()
    r=Response()
    r.ok=True
    buf.seek(0)
    r.text=buf.read().decode()
    buf.close()
    return r
class Response:
    def __init__(self):
        self.ok=False
        self.text=""
        pass
class Session:
    def __init__(self):
        self.curl=initCurl()
        pass
    def get(self,url,params=""):
        url=url+"?"+urlencode(params)
        return GetData(self.curl,url)
    def post(self,url,data):
        return PostData(self.curl,url,data)
if __name__=='__main__':
    #初始化 CURL
    c = initCurl()
    html = GetData(c, 'http://localhost:8000')
    print(html)
    pass


