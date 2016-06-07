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
CREATE TABLE parts_danju (
    id             INTEGER       PRIMARY KEY
                                 NOT NULL,
    danjuhao         VARCHAR (30)  NOT NULL,
    danju_date    DATE          NOT NULL,
    cangku         VARCHAR (30)  NOT NULL,
    bumeng       VARCHAR (30)  NOT NULL,
    gongying         VARCHAR (30) ,
    shenhe       DATE ,
    leibie           VARCHAR (30),
    beizhu       VARCHAR (30),
    filename       VARCHAR (30),
    zhidan       VARCHAR (30),
    qianzi       VARCHAR (30)
);
CREATE TABLE parts_danjuitem (
    id      INTEGER NOT NULL
                    PRIMARY KEY AUTOINCREMENT,
    danju_id INTEGER NOT NULL
                    REFERENCES parts_pack (id),
    item_id INTEGER NOT NULL
                    REFERENCES parts_item (id),
    ct      INTEGER NOT NULL
);
