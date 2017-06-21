# -*- coding: utf-8 -*-
import os
import sys
import codecs
import jinja2
dic={}
dic["user"]={"url":"http://a","username":"mhq"}
t=jinja2.Template("""{% block content %}
          <ul>
            <li><a href="{{ user.url }}">{{ user.username }}</a></li>
          </ul>
{% endblock %}
	""")
print(t.render(dic))

