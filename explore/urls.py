from django.conf.urls import  include, url
from explore import views
urlpatterns = [
        url(r'^$',views.index),
]