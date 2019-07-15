# -*- coding: utf-8 -*-
from django.contrib import admin
from todos.models import *

class TodoAdmin(admin.ModelAdmin):
	list_display =  ("text","completed")
admin.site.register(Todo,TodoAdmin)
