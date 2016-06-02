# -*- coding: utf-8 -*-
from django.db import models
import datetime
import logging
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.utils.encoding import python_2_unicode_compatible
from django.utils.safestring import mark_safe
import myutil

@python_2_unicode_compatible 
class Contact(models.Model,myutil.MyModel):
    #=======销售===========
    yonghu = models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    addr = models.CharField(max_length=30,verbose_name="客户地址",null=True,blank=True)#用户单位
    channels = models.CharField(max_length=30,verbose_name="通道配置",null=True,blank=True)#用户单位
    yiqixinghao=models.CharField(max_length=30,verbose_name="仪器型号")#仪器型号
    yiqibh=models.CharField(max_length=30,verbose_name="仪器编号")#仪器编号
    baoxiang =  models.CharField(max_length=30,verbose_name="包箱")#包箱
    shenhe =  models.CharField(max_length=30,verbose_name="审核")#审核
    yujifahuo_date = models.DateField(verbose_name="预计发货时间")#预计发货时间
    tiaoshi_date = models.DateField(null=True,blank=True,verbose_name="调试时间",default=datetime.datetime.now)#预计发货时间
    hetongbh=models.CharField(max_length=30,verbose_name="合同编号")#合同编号
    method=models.FileField(null=True,blank=True,verbose_name="方法")
    def myurls(self):
        url0="<p><a href=/parts/showcontactP?id=%s>包信息</a></p>" %(self.id,)
        url1="<p><a href=/parts/showcontact?id=%s>详细</a></p>" %(self.id,)
        url2="<p><a href=/parts/zhuangxiangdan?id=%s>装箱单</a></p>" %(self.id,)
        url3="<p><a href=/parts/tar?id=%s>校准证书</a></p>" %(self.id,)
        return(mark_safe(url0+url1+url2+url3))
    myurls.short_description = " 操作 "
    def __str__(self):
        return str(self.id)+":"+self.hetongbh
    class Meta:
        verbose_name="合同"
        verbose_name_plural="合同"
@python_2_unicode_compatible 
class Pack(models.Model):
    #=======销售===========
    name = models.CharField(max_length=30,verbose_name="包名称")#用户单位
    def __str__(self):
        return str(self.id)+":"+self.name
    class Meta:
        verbose_name="包"
        verbose_name_plural=verbose_name
@python_2_unicode_compatible 
class UsePack(models.Model):
    contact=models.ForeignKey(Contact,verbose_name="合同")#合同
    pack=models.ForeignKey(Pack,verbose_name="包")#备件
    def __str__(self):
        return self.contact.hetongbh+"_"+self.pack.name
    class Meta:
        verbose_name="包条目"
        verbose_name_plural=verbose_name
@python_2_unicode_compatible    
class Item(models.Model):
    #ispack=models.BooleanField()
    bh = models.CharField(max_length=30,null=True,blank=True,verbose_name="库存编号")#库存编号
    name=models.CharField(max_length=30,verbose_name="备件名称")#备件名称
    name_en=models.CharField(max_length=30,null=True,blank=True,verbose_name="备件英文名称")#备件名称
    guige=models.CharField(max_length=30,null=True,blank=True,verbose_name="规格")#规格
    ct=  models.IntegerField(default=1,verbose_name="数量")#数量
    danwei =  models.CharField(max_length=30,verbose_name="单位",default="个")#数量单位
    image=models.ImageField(null=True,blank=True,upload_to="item")
    beizhu = models.CharField(max_length=30,verbose_name="备注",blank=True,null=True)#用户单位
    def __str__(self):
        return str(self.id)+":"+str(self.bh)+"_"+str(self.name)+"_"+str(self.guige)+"_"+str(self.danwei)
    class Meta:
        verbose_name="备件"
        verbose_name_plural=verbose_name
@python_2_unicode_compatible 
class PackItem(models.Model):
    pack=models.ForeignKey(Pack,verbose_name="包")#合同
    item=models.ForeignKey(Item,verbose_name="备件")#备件
    ct=  models.IntegerField(verbose_name="数量",default=1)#数量
    def __str__(self):
        return self.pack.name+"_"+self.item.name+"_"+self.item.guige+"_"+str(self.ct)+self.item.danwei
    class Meta:
        verbose_name="备件条目"
        verbose_name_plural=verbose_name

        