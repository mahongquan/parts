from django.urls import path
from django.conf.urls import  include, url
from django.contrib import admin
from mysite import settings
from mysite import mainview
admin.autodiscover()
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
import django
urlpatterns = [
    url(r'^$', mainview.index),
    url(r'^favicon.ico', mainview.favicon),
    # url(r'^editor_index$', mainview.editor_index),
    # url(r'^custom_editor$', mainview.custom_editor),
    # url(r'^getImages.php$', mainview.getImages),
    # url(r'^data_writer_test.php$', mainview.data_writer_test),
    # url(r'^service-worker.js$', mainview.service_worker),
    # url(r'^dtable_test.php$', mainview.dtable_test),
    # url(r'^searching_test.php$', mainview.searching_test),
    # url(r'^sorting_test.php$', mainview.sorting_test),
    # url(r'^paging_test.php$', mainview.paging_test),
    # url(r'^feeder.php$', mainview.feeder),
    # url(r'^receiver.php$', mainview.receiver),
    # url(r'^combo_test.php$', mainview.combo_test),
    # url(r'^combo_test2.php$', mainview.combo_test2),
    # url(r'^combo_test3.php$', mainview.combo_test3),
    # url(r'^fetch_brands.php$', mainview.fetch_brands),
    # url(r'^fetch_products.php$', mainview.fetch_products),
    # url(r'^search.php$', mainview.search),
    # url(r'^welcome$', mainview.welcome),
    # url(r'^extjs/',include('extjs.urls')),
    url(r'^rest/',include('rest.urls')),   
    # url(r'^fs/',include('fs.urls')),   
    # url(r'^parts/',include('mysite.parts.urls')),   
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    # Uncomment the next line to enable the admin:
    #url(r'^admin/lookups/', include(ajax_select_urls)),
    path('admin/', admin.site.urls),
    #url(r'^explore/',include('explore.urls')), 
    url(r'^accounts/login/$', mainview.loginpage),
    # url(r'^login/',mainview.mylogin),  
    # url(r'^logout/',mainview.mylogout),
    # url(r'^afterlogin/',mainview.afterlogin),
]
urlpatterns += staticfiles_urlpatterns()
urlpatterns +=static(settings.MEDIA_URL,django.contrib.staticfiles.views.serve)
