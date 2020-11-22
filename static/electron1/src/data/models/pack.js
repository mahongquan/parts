export default function(sequelize, DataTypes) {
  var Pack = sequelize.define(
    'Pack',
    {
      name: DataTypes.STRING, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    },
    {
      timestamps: false,
      tableName: 'parts_pack',
    }
  );

  return Pack;
}
