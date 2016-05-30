from django.conf.urls import patterns, include, url
from extjs import views
urlpatterns = [
        url(r'^$',views.index),
        url(r'^ch11', views.ch11),
        url(r'^board/$',views.board),
        url(r'^board/(?P<id>\d+)$', views.board),
]
