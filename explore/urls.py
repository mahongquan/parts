from django.conf.urls import patterns, include, url
from explore import views
urlpatterns = [
        url(r'^$',views.index),
]
