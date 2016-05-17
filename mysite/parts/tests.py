from django.utils import unittest
from django.contrib.auth import authenticate, login,logout
class UserTestCase(unittest.TestCase):
    def setUp(self):
        self.user = authenticate(username='admin', password='333333')
        if self.user is not None:
            print self.user
        # self.lion = Animal.objects.create(name="lion", sound="roar")
        # self.cat = Animal.objects.create(name="cat", sound="meow")
    def testUser(self):
        self.assertEqual(self.user,'1')
    # def testSpeaking(self):
        # self.assertEqual(self.lion.speak(), 'The lion says "roar"')
        # self.assertEqual(self.cat.speak(), 'The cat says "meow"')
