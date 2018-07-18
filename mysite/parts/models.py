# -*- coding: utf-8 -*-
from django.db import models
import datetime
import logging
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.utils.encoding import python_2_unicode_compatible
from django.utils.safestring import mark_safe
from django.db.models.deletion import CASCADE, SET_DEFAULT, SET_NULL
import myutil
def addItem(items,item):
    find=False
    for i in items:
        if i.id==item.id:
            i.ct +=item.ct
            find=True
            break
    if not find:
        items.append(item)
    return items
class Contact(models.Model,myutil.MyModel):
    #=======销售===========
    yonghu = models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    addr = models.CharField(max_length=30,verbose_name="客户地址",null=True,blank=True)#用户单位
    channels = models.CharField(max_length=30,verbose_name="通道配置",null=True,blank=True)#用户单位
    yiqixinghao=models.CharField(max_length=30,verbose_name="仪器型号")#仪器型号
    yiqibh=models.CharField(unique=True,max_length=30,verbose_name="仪器编号")#仪器编号
    baoxiang =  models.CharField(max_length=30,verbose_name="包箱")#包箱
    shenhe =  models.CharField(max_length=30,verbose_name="审核")#审核
    yujifahuo_date = models.DateField(verbose_name="预计发货时间")#预计发货时间
    tiaoshi_date = models.DateField(null=True,blank=True,verbose_name="调试时间",default=datetime.datetime.now)#预计发货时间
    hetongbh=models.CharField(unique=True,max_length=30,verbose_name="合同编号")#合同编号
    dianqi=models.CharField(null=True,blank=True,max_length=30,verbose_name="电气")#合同编号
    jixie=models.CharField(null=True,blank=True,max_length=30,verbose_name="机械")#合同编号
    hongwai=models.CharField(null=True,blank=True,max_length=30,verbose_name="红外")#合同编号
    redao=models.CharField(null=True,blank=True,max_length=30,verbose_name="热导")#合同编号
    method=models.FileField(null=True,blank=True,verbose_name="方法")
    detail=models.TextField(null=True,blank=True,verbose_name="备注")
    def json(self):
        fields=type(self)._meta.fields
        dic1={}
        for f in fields:
            if f.name in ["image"]:
                pass
            else:
                exec("dic1['%s']=self.%s" %(f.name,f.name))
        dic1["_id"]=self.id
        return dic1
    def tablerow(self):
        return "%s\t%s\t%s\t%s\t%s\t%s\n" % (self.yonghu,self.addr,self.yiqixinghao,self.yiqibh,self.hetongbh,self.yujifahuo_date)
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
    @classmethod
    def mycreate(type1,data):
        logging.info(data)
        logging.info(type1)
        fields=type1._meta.fields
        c=Contact()     
        for f in fields:
            if data.get(f.name)!=None:
                exec("c.%s=data['%s']" %(f.name,f.name))
        return c    
    def myupdate(self,data):
        fields=type(self)._meta.fields
        logging.info(data)
        for f in fields:
            if data.get(f.name)!=None:
                exec("self.%s=data['%s']" %(f.name,f.name))         
    def huizong(self):
        items=[]
        items2=[]
        for cp in self.usepack_set.all():
            for pi in cp.pack.packitem_set.all():
                pi.item.ct=pi.ct
                if not pi.quehuo:
                    items=addItem(items,pi.item)
                else:
                    items2=addItem(items2,pi.item)
        return (items,items2)
    def huizong2(self):
        items=[]
        items2=[]
        for cp in self.usepack_set.all():
            for pi in cp.pack.packitem_set.all():
                pi.item.ct=pi.ct
                if not pi.quehuo:
                    items.append(pi.item)
                else:
                    items2.append(pi.item)#not leijia
        return (items,items2)        
class Pack(models.Model):
    #=======销售===========
    name = models.CharField(max_length=30,verbose_name="包名称")#用户单位
    def __str__(self):
        return str(self.id)+":"+self.name
    class Meta:
        verbose_name="包"
        verbose_name_plural=verbose_name
class UsePack(models.Model):
    contact=models.ForeignKey(Contact,on_delete=CASCADE,verbose_name="合同")#合同
    pack=models.ForeignKey(Pack,on_delete=CASCADE,verbose_name="包")#备件
    def __str__(self):
        return self.contact.hetongbh+"_"+self.pack.name
    class Meta:
        verbose_name="包条目"
        verbose_name_plural=verbose_name
  
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
    def json(self):
        fields=type(self)._meta.fields
        dic1={}
        for f in fields:
            if f.name in ["image"]:
                pass
            else:
                exec("dic1['%s']=self.%s" %(f.name,f.name))
        dic1["_id"]=self.id
        return dic1    
    @classmethod
    def mycreate(type1,data):
        logging.info(data)
        logging.info(type1)
        fields=type1._meta.fields
        c=Item()     
        for f in fields:
            if data.get(f.name)!=None:
                exec("c.%s=data['%s']" %(f.name,f.name))
        return c    
    def myupdate(self,data):
        fields=type(self)._meta.fields
        logging.info(data)
        for f in fields:
            if data.get(f.name)!=None:
                exec("self.%s=data['%s']" %(f.name,f.name))        
    def __str__(self):
        return str(self.id)+":"+str(self.bh)+"_"+str(self.name)+"_"+str(self.guige)+"_"+str(self.danwei)
    class Meta:
        verbose_name="备件"
        verbose_name_plural=verbose_name
class PackItem(models.Model):
    pack=models.ForeignKey(Pack,on_delete=CASCADE,verbose_name="包")#合同
    item=models.ForeignKey(Item,on_delete=CASCADE,verbose_name="备件")#备件
    ct=  models.FloatField(verbose_name="数量",default=1)#数量
    quehuo=models.BooleanField(verbose_name="缺货",default=False)#数量
    def __str__(self):
        return self.pack.name+"_"+str(self.item.name)+"_"+str(self.item.guige)+"_"+str(self.ct)+str(self.item.danwei)
    class Meta:
        verbose_name="备件条目"
        verbose_name_plural=verbose_name
    def json(self):
        #logging.info("json-------")
        #logging.info(self.quehuo)
        if self.quehuo:
            return {"id":self.id,"pack":self.pack.id,"itemid":self.item.id,"ct":self.ct,"name":self.item.name,"guige":self.item.guige,"danwei":self.item.danwei,'bh':self.item.bh,'quehuo':True}
        else:
            return {"id":self.id,"pack":self.pack.id,"itemid":self.item.id,"ct":self.ct,"name":self.item.name,"guige":self.item.guige,"danwei":self.item.danwei,'bh':self.item.bh,'quehuo':False}
# class Standard(models.Model):
#     contact=models.ForeignKey(Contact,verbose_name="合同")#合同
#     ct=  models.IntegerField(verbose_name="数量",default=1)#数量
#     name = models.CharField(max_length=30,verbose_name="名称")#用户单位
#     def __str__(self):
#         return self.contact.hetongbh+"_"+self.pack.name
#     class Meta:
#         verbose_name="标样"
#         verbose_name_plural=verbose_name

class Danju(models.Model):
    danjuhao = models.CharField(max_length=30,verbose_name="单据号")
    danju_date = models.DateField(null=True,blank=True,verbose_name="单据日期",default=datetime.datetime.now)
    cangku = models.CharField(max_length=30,verbose_name="仓库",null=True,blank=True)
    bumeng = models.CharField(max_length=30,verbose_name="部门",null=True,blank=True)
    gongying=models.CharField(max_length=30,verbose_name="供应商")
    shenhe=models.DateField(null=True,blank=True,verbose_name="审核日期")
    leibie =  models.CharField(max_length=30,verbose_name="入库类别")
    beizhu =  models.CharField(max_length=30,verbose_name="备注")
    filename =  models.CharField(max_length=30,verbose_name="文件名")
    zhidan =  models.CharField(max_length=30,verbose_name="制单人")
    qianzi =  models.CharField(max_length=30,verbose_name="签字人")
    def __str__(self):
        return str(self.filename)+":"+self.beizhu
    class Meta:
        verbose_name="单据"
        verbose_name_plural="单据"
class DanjuItem(models.Model):
    danju=models.ForeignKey(Danju,on_delete=CASCADE,verbose_name="单据")#合同
    item=models.ForeignKey(Item,on_delete=CASCADE,verbose_name="备件")#备件
    ct=  models.IntegerField(verbose_name="数量",default=1)#数量
    def __str__(self):
        return self.danju.beizhu+"_"+self.item.name+"_"+self.item.guige+"_"+str(self.ct)+self.item.danwei
    class Meta:
        verbose_name="单据条目"
        verbose_name_plural=verbose_name         