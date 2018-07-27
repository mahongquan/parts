# -*- coding: utf-8 -*-
from django.contrib import admin
from mysite.parts.models import *

class PackAdmin(admin.ModelAdmin):
    search_fields = ('name', )
admin.site.register(Pack,PackAdmin)

class PackItemAdmin(admin.ModelAdmin):
    pass
admin.site.register(PackItem,PackItemAdmin)

class ItemAdmin(admin.ModelAdmin):
    search_fields = ('name',)
admin.site.register(Item,ItemAdmin)

class UsePackAdmin(admin.ModelAdmin):
    pass
admin.site.register(UsePack,UsePackAdmin)

class ContactAdmin(admin.ModelAdmin):
    date_hierarchy = 'tiaoshi_date'
    list_display =  ('yiqibh','yiqixinghao','hetongbh', 'yonghu')
    list_filter = ('baoxiang','yiqixinghao')
    search_fields = ('hetongbh', 'yonghu','yiqibh')
    list_per_page=10
admin.site.register(Contact,ContactAdmin)



