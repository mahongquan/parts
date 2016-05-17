from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
        (r'^$','rest.views.index'),
        (r'^index_2','rest.views.index_2'),
        (r'^extjs6','rest.views.extjs6'),
        (r'^application', 'rest.views.application'),
        (r'^Item', 'rest.views.item'),
        (r'^UsePack', 'rest.views.usepack'),
        (r'^Contact', 'rest.views.contact'),
        (r'^PackItem', 'rest.views.packItem'),
        (r'^Pack', 'rest.views.pack'),

        (r'^login', 'rest.views.mylogin'),
        (r'^functions', 'rest.views.functions'),
        (r'^writer', 'rest.views.writer'),
        (r'^app.php_users_view$', 'rest.views.app_users_view'),
        (r'^app.php_users_create$', 'rest.views.app_users_create'),
        (r'^app.php_users_update$', 'rest.views.app_users_update'),
        (r'^app.php_users_destroy$', 'rest.views.app_users_destroy'),  
        (r'^view_item2$', 'rest.views.view_item2'),
        (r'^create_item2$', 'rest.views.create_item2'),
        (r'^update_item2$', 'rest.views.update_item2'),
        (r'^destroy_item2$', 'rest.views.destroy_item2'), 
        (r'^organize$', 'rest.views.organize'), 
        (r'^geticons$', 'rest.views.geticons'), 

        (r'^view_pack$', 'rest.views.view_pack'),
        (r'^create_pack$', 'rest.views.create_pack'),
        (r'^update_pack$', 'rest.views.update_pack'),
        (r'^destroy_pack$', 'rest.views.destroy_pack'), 

)
