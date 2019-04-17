export default function(sequelize, DataTypes) {
  var Item = sequelize.define(
    'Item',
    {
      // bh = models.CharField(max_length=30,null=True,blank=True,verbose_name="库存编号")#库存编号
      // name=models.CharField(max_length=30,verbose_name="备件名称")#备件名称
      // name_en=models.CharField(max_length=30,null=True,blank=True,verbose_name="备件英文名称")#备件名称
      // guige=models.CharField(max_length=30,null=True,blank=True,verbose_name="规格")#规格
      // ct=  models.IntegerField(default=1,verbose_name="数量")#数量
      // danwei =  models.CharField(max_length=30,verbose_name="单位",default="个")#数量单位
      // image=models.ImageField(null=True,blank=True,upload_to="item")
      // beizhu = models.CharField(max_length=30,verbose_name="备注",blank=True,null=True)
      bh: DataTypes.STRING, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
      name: DataTypes.STRING, // = models.CharField(max_length=30,verbose_name="客户地址",null=True,blank=True)#用户单位
      guige: DataTypes.STRING, // = models.CharField(max_length=30,verbose_name="通道配置",null=True,blank=True)#用户单位
      ct: DataTypes.INTEGER, //=models.CharField(max_length=30,verbose_name="仪器型号",choices=ACHOICE)#仪器型号
      danwei: DataTypes.STRING, //=models.CharField(max_length=30,verbose_name="仪器编号")#仪器编号
      beizhu: DataTypes.STRING, // =  models.CharField(max_length=30,verbose_name="包箱")#包箱
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'parts_item',
    }
  );

  return Item;
}
