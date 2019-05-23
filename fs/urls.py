from django.conf.urls import  include, url
from fs import views
urlpatterns = [
        url(r'^children$',views.children),
        url(r'^parent$',views.parent),
        url(r'^content$',views.content),
        url(r'^rename2$',views.rename2),
        url(r'^remove$',views.remove),
        url(r'^mkdir$',views.mkdir),
        url(r'^upload$',views.upload),
]
