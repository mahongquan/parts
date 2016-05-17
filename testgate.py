import logging
	
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)-5.5s [%(name)s] %(message)s'
)

from pyamf.remoting.client import RemotingService

url = 'http://127.0.0.1:8080/gateway/'
client = RemotingService(url, logger=logging)
def test1():
	service = client.getService('myservice')
	print service.echo('Hello World!')
def test2():
	service = client.getService('shell')
	print dir(service)
	service.startup()
#test1()
service = client.getService('Services')
key=service.getkey()
print service.sum(key,1,3)
print service.echo(key,"hello")
print service.sum(key,1,3)
##print service.saveUser(u)
#us=service.getUsers()
#print len(us),type(us)
#print us
#for u in us:
#    print u
#u=us[2]
#u["username"]="test2"
#service.saveUser(u)    
#a=client.addRequest("Services.echo",None,"hello")
#client.execute()
#print dir(a)
#print a.result
#print service.getAllDepartments()
print service.getAllSites()
