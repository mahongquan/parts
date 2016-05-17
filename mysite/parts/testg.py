from pyamf.remoting.client import RemotingService

client = RemotingService('http://127.0.0.1:8080/gateway/')
def tests():
    service = client.getService('ncsddviews')
    print service.loadAll('org.pyamf.examples.addressbook.models.Sample')
def testlogin():
    #a=client.getService('login')
    #print a("admin","333333")
    service = client.getService('ncsddviews')
    print service.login_user("admin","333333")
def testCurrentC():
    #a=client.getService('login')
    #print a("admin","333333")
    print dir(client)
    service = client.getService('ncsddviews')
    print service.getCurrentContacts()
def testc():
    service = client.getService('ncsddviews')
    print service.loadAll('org.pyamf.examples.addressbook.models.Contact')    
#testlogin()    
#testCurrentC()
#testdd()
tests()
