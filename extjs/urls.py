from django.conf.urls import  include, url
from extjs import views
urlpatterns = [
        url(r'^$',views.index),
        url(r'^backbone$',views.backbone),
        url(r'^angular',views.angular),
        url(r'^react$',views.react),
        url(r'^reactbackbone$',views.reactbackbone),
        url(r'^ch11', views.ch11),
        url(r'^board/$',views.board),
        url(r'^board/(?P<id>\d+)$', views.board),
        url(r'^api/contacts$',views.contacts),
        url(r'^api/contacts/(?P<id>\d+)$', views.contactOne),
]
