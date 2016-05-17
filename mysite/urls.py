from django.conf.urls import patterns, include, url
from django.contrib import admin
from mysite import settings
from mysite import mainview
#from adminplus.sites import AdminSitePlus
#from mysite.mygateway import echoGateway
#admin.site=AdminSitePlus()
admin.autodiscover()
#myconfig_download_url=r"/photo/"
#download_url="/download/"
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from ajax_select import urls as ajax_select_urls
urlpatterns = [
    url(r'^$', mainview.index),
    
    url(r'^favicon.ico', mainview.favicon),
    url(r'^editor_index$', mainview.editor_index),
    url(r'^custom_editor$', mainview.custom_editor),
    url(r'^getImages.php$', mainview.getImages),
    url(r'^data_writer_test.php$', mainview.data_writer_test),
    url(r'^dtable_test.php$', mainview.dtable_test),
    url(r'^searching_test.php$', mainview.searching_test),
    url(r'^sorting_test.php$', mainview.sorting_test),
    url(r'^paging_test.php$', mainview.paging_test),
    url(r'^feeder.php$', mainview.feeder),
    url(r'^receiver.php$', mainview.receiver),
    url(r'^combo_test.php$', mainview.combo_test),
    url(r'^combo_test2.php$', mainview.combo_test2),
    url(r'^combo_test3.php$', mainview.combo_test3),
    url(r'^fetch_brands.php$', mainview.fetch_brands),
    url(r'^fetch_products.php$', mainview.fetch_products),
    url(r'^search.php$', mainview.search),
	url(r'^welcome$', mainview.welcome),
    url(r'^rest/',include('rest.urls')),   
    url(r'^parts/',include('mysite.parts.urls')),   
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    # Uncomment the next line to enable the admin:
    url(r'^admin/lookups/', include(ajax_select_urls)),
    url(r'^admin/', include(admin.site.urls)),
    #url(r'^gateway/', echoGateway),
    url(r'^explore/',include('explore.urls')), 
    url(r'^accounts/login/$', mainview.loginpage),
    url(r'^login/',mainview.mylogin),  
    url(r'^logout/',mainview.mylogout),
    url(r'^afterlogin/',mainview.afterlogin),
]
urlpatterns += staticfiles_urlpatterns()
urlpatterns +=static(settings.MEDIA_URL,view='django.contrib.staticfiles.views.serve')
