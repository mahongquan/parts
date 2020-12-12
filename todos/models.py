from django.db import models

# Create your models here.
class Todo(models.Model):
    text = models.CharField(max_length=100,verbose_name="事件",null=False,blank=False)#用户单位
    completed=models.BooleanField(verbose_name="完成",default=False)#数量
    class Meta:
        verbose_name="待办"
        verbose_name_plural="待办"