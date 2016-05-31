from django.conf.urls import patterns, include, url
from extjs import views
urlpatterns = [
        url(r'^backbone$',views.backbone),
        url(r'^angular',views.angular),
        url(r'^react',views.react),
        url(r'^ch11', views.ch11),
        url(r'^board/$',views.board),
        url(r'^board/(?P<id>\d+)$', views.board),
        url(r'^api/contacts$',views.contacts),
        url(r'^api/contacts/(?P<id>\d+)$', views.contactOne),
]
