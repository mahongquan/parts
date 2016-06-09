# -*- coding: utf-8 -*-
from django.contrib import admin
from mysite.parts.models import *
from ajax_select import make_ajax_form
from ajax_select.admin import AjaxSelectAdmin, AjaxSelectAdminTabularInline, AjaxSelectAdminStackedInline
from mysite.parts.views import index
#admin.site.register_view('/parts/', view=index)

class PackItemInline( AjaxSelectAdminTabularInline):#采用ajax
    model=PackItem
    form = make_ajax_form(PackItem, {
        'item': 'item'
    })
class PackAdmin(admin.ModelAdmin):
    search_fields = ('name', )
    inlines=[PackItemInline,]
admin.site.register(Pack,PackAdmin)

class PackItemAdmin(admin.ModelAdmin):
    pass
admin.site.register(PackItem,PackItemAdmin)

class ItemAdmin(admin.ModelAdmin):
    search_fields = ('name',)
admin.site.register(Item,ItemAdmin)

class UsePackAdmin(AjaxSelectAdmin):
#    采用ajax
    form = make_ajax_form(UsePack, {
        'pack': 'pack','contact': 'contact'
    })
    pass
admin.site.register(UsePack,UsePackAdmin)

class ContactAdmin(admin.ModelAdmin):
    date_hierarchy = 'tiaoshi_date'
    list_display =  ('hetongbh','yiqibh','yiqixinghao', 'yonghu')
    list_filter = ('baoxiang','yiqixinghao')
    search_fields = ('hetongbh', 'yonghu','yiqibh')
    list_per_page=10
admin.site.register(Contact,ContactAdmin)



class DanjuItemInline( AjaxSelectAdminTabularInline):#采用ajax
    model=DanjuItem
    form = make_ajax_form(PackItem, {
        'item': 'item'
    })
class DanjuAdmin(admin.ModelAdmin):
    search_fields = ('beizhu', )
    inlines=[DanjuItemInline,]
admin.site.register(Danju,DanjuAdmin)



