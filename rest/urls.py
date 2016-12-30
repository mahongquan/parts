from django.conf.urls import  include, url
from rest import views
urlpatterns = [
        url(r'^upload', views.upload),
        url(r'^check', views.check),
        url(r'^standard', views.standard),

        url(r'^$',views.index),
        url(r'^restful',views.restful),
        url(r'^backbone',views.backbone),
        url(r'^upload',views.upload),
        url(r'^jqm',views.jqm),
        url(r'^index_2',views.index_2),
        url(r'^extjs6',views.extjs6),
        url(r'^application', views.application),

        url(r'^Item', views.item),
        url(r'^UsePack', views.usepack),
        url(r'^Contact', views.contact),
        url(r'^PackItem', views.packItem),
        url(r'^Pack', views.pack),

        url(r'^login', views.mylogin),
        url(r'^logout', views.mylogout),
        url(r'^functions', views.functions),
        url(r'^writer', views.writer),
        url(r'^app.php_users_view$', views.app_users_view),
        url(r'^app.php_users_create$', views.app_users_create),
        url(r'^app.php_users_update$', views.app_users_update),
        url(r'^app.php_users_destroy$', views.app_users_destroy),  
        
        url(r'^view_item2$', views.view_item2),
        url(r'^create_item2$', views.create_item2),
        url(r'^update_item2$', views.update_item2),
        url(r'^destroy_item2$', views.destroy_item2), 
        url(r'^organize$', views.organize), 
        url(r'^geticons$', views.geticons), 

        url(r'^view_pack$', views.view_pack),
        url(r'^create_pack$', views.create_pack),
        url(r'^update_pack$', views.update_pack),
        url(r'^destroy_pack$', views.destroy_pack), 

        url(r'^view_item$', views.view_item),
        url(r'^create_item$', views.create_item),
        url(r'^update_item$', views.update_item),
        url(r'^destroy_item$', views.destroy_item), 
]
