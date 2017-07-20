from django.conf.urls import  include, url
from fs import views
urlpatterns = [
        url(r'^children$',views.children),
        url(r'^parent$',views.parent),
        url(r'^content$',views.content),
]
