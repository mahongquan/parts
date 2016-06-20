    -- danjuhao = models.CharField(max_length=30,verbose_name="单据号")
    -- danju_date = models.DateField(null=True,blank=True,verbose_name="单据日期",default=datetime.datetime.now)
    -- cangku = models.CharField(max_length=30,verbose_name="仓库",null=True,blank=True)
    -- bumeng = models.CharField(max_length=30,verbose_name="部门",null=True,blank=True)
    -- gongying=models.CharField(max_length=30,verbose_name="供应商")
    -- shenhe=models.DateField(null=True,blank=True,verbose_name="审核日期")
    -- leibie =  models.CharField(max_length=30,verbose_name="入库类别")
    -- beizhu =  models.CharField(max_length=30,verbose_name="备注")
    -- zhidan =  models.CharField(max_length=30,verbose_name="制单人")
    -- qianzi =  models.CharField(max_length=30,verbose_name="签字人")
CREATE TABLE extjs_contact(
    id             INTEGER       PRIMARY KEY
                                 NOT NULL,
    firstname         VARCHAR (30)  NOT NULL,
    lastname         VARCHAR (30)  NOT NULL,
    age       INTEGER  NOT NULL
);
