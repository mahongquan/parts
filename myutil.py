import json
import datetime
class MyModel:
    @classmethod
    def create(c,data):
        pass
    def json():
        pass
class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj,datetime.date):
            return "%d-%02d-%02d" % (obj.year,obj.month,obj.day)
        if isinstance(obj,datetime.datetime):
            return "%d-%02d-%02d" % (obj.year,obj.month,obj.day)
        if isinstance(obj,Item):
            return obj.name
        if isinstance(obj,Contact):
            return obj.hetongbh        
        return json.JSONEncoder.default(self, obj)