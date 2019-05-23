#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
from PySide2 import QtCore, QtGui,QtWidgets
from .ui_packitem import Ui_Dialog
from .  import backend
import logging
# yonghu = models.CharField(max_length=30,verbose_name="用户单位")#用户单位
#     addr = models.CharField(max_length=30,verbose_name="客户地址",null=True,blank=True)#用户单位
#     channels = models.CharField(max_length=30,verbose_name="通道配置",null=True,blank=True)#用户单位
#     yiqixinghao=models.CharField(max_length=30,verbose_name="仪器型号")#仪器型号
#     yiqibh=models.CharField(unique=True,max_length=30,verbose_name="仪器编号")#仪器编号
#     baoxiang =  models.CharField(max_length=30,verbose_name="包箱")#包箱
#     shenhe =  models.CharField(max_length=30,verbose_name="审核")#审核
#     yujifahuo_date = models.DateField(verbose_name="预计发货时间")#预计发货时间
#     tiaoshi_date = models.DateField(null=True,blank=True,verbose_name="调试时间",default=datetime.datetime.now)#预计发货时间
#     hetongbh=models.CharField(max_length=30,verbose_name="合同编号")#合同编号
#     method=models.FileField(null=True,blank=True,verbose_name="方法")
class ContactDlg(QtWidgets.QDialog):
    def __init__(self, parent=None):
        print("init")
        super(ContactDlg, self).__init__(parent)
        self.ui=Ui_Dialog()
        self.ui.setupUi(self)
    def showdata(self,piid):  
        contactid=int(piid)     
        self.c=backend.getPackItemOne(piid)
        self.ui.lineEdit_id.setText(str(self.c.id))
        self.ui.lineEdit_bh.setText(str(self.c.item.bh))
        self.ui.lineEdit_name.setText(str(self.c.item.name))
        self.ui.lineEdit_guige.setText(str(self.c.item.guige))
        self.ui.lineEdit_danwei.setText(str(self.c.item.danwei))
        self.ui.lineEdit_ct.setText(str(self.c.ct))
    #@QtCore.pyqtSlot()
    def accept(self):
        self.c.item.name=self.ui.lineEdit_name.text()
        self.c.item.bh=self.ui.lineEdit_bh.text()
        self.c.item.guige=self.ui.lineEdit_guige.text()
        self.c.item.danwei=self.ui.lineEdit_danwei.text()
        self.c.item.save()
        if self.c.ct!=int(self.ui.lineEdit_ct.text()):
            self.c.ct=int(self.ui.lineEdit_ct.text())
            self.c.save()
        self.done(0)
    def reject(self):
        print("reject")
        self.done(1)
        pass
def main():        
    import sys
    app = QtWidgets.QApplication(sys.argv)
    calculator = ContactDlg()
    #calculator.showdata(9)
    #calculator.show()
    calculator.exec_()
    #sys.exit(app.exec_())

if __name__ == '__main__':
    import sys
    app = QtWidgets.QApplication(sys.argv)
    calculator = ContactDlg()
    calculator.showdata(9)
    #calculator.show()
    calculator.exec_()
    #sys.exit(app.exec_())
