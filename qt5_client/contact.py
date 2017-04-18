#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
from PyQt5 import QtCore, QtGui,QtWidgets
from .ui_contact import Ui_Form
from .  import backend
from . import packitems
from . import packitem
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
from PyQt5 import QtCore
from PyQt5.QtCore import *
class MyStringListModel(QtCore.QAbstractListModel):
    def __init__(self):
        super(MyStringListModel, self).__init__(None)
        self.lst=["completion", "data", "goes", "here","让网民更便捷地获取信"]
    def rowCount(self,parent):
        if parent.isValid():
            return 0
        return len(self.lst)
    def columnCount(self,b):
        return 1
    def data(self,index, role):
        if index.row() < 0 or index.row() >= len(self.lst):
            return QtCore.QVariant()
        if (role == Qt.DisplayRole or role == Qt.EditRole):
            return self.lst[index.row()]
        return QtCore.QVariant()
class ContactDlg(QtWidgets.QDialog):
    def __init__(self, parent=None):
        print("init")
        #print(dir(Qt.FocusReason))
        super(ContactDlg, self).__init__(parent)
        self.pid=None
        self.c=None
        self.ui=Ui_Form()
        self.ui.setupUi(self)

        # completer = QtWidgets.QCompleter()
        # self.ui.lineEdit_pack.setCompleter(completer)

        # self.model = QStringListModel()#MyModel()#QStringListModel()
        # completer.setModel(self.model)
        self.ui.lineEdit_pack.textChanged['QString'].connect(self.packinput)
        self.ui.lineEdit_pack.setFocus()
    @QtCore.pyqtSlot()
    def bibei(self):
        n="必备"
        self.packinput(n)
        # r=backend.getPacks(n)
        # self.ui.lineEdit_pack.clear()
        # at=0
        # for p in r:
        #     #print(dir(self.ui.comboBox))
        #     self.ui.lineEdit_pack.addItem(p.name)
        #     self.ui.lineEdit_pack.setItemData(at,p.id)
        #     at+=1                       
        # self.ui.lineEdit_pack.showPopup()
    def packinput(self,n):
        #self.ui.lineEdit_pack.clear()
        print("packinput",n)
        r=backend.getPacks(n)
        self.ui.comboBox.clear()
        at=0
        for p in r:
            self.ui.comboBox.addItem(p.name)
            self.ui.comboBox.setItemData(at,p.id)
            at+=1
        #self.ui.comboBox.showPopup()
        #print(dir(self.ui.lineEdit_pack))
        #self.ui.comboBox.clearFocus()
        #self.ui.lineEdit_pack.setFocus()
    def textchange(self,text):
        s=self.sender()
        fn=s.objectName()[9:]
        #exec("tmp=self.c."+fn)
        if text!=str(eval("self.c."+fn)):
            s.setStyleSheet("background-color:  rgba(124, 200,128, 255)")
        else:
            s.setStyleSheet("background-color:  rgba(255, 255,255, 255)")
    def showdata(self,contactid):  
        print(contactid) 
        contactid=int(contactid)     
        if contactid>-1:
            self.c=backend.getContact(contactid)
            # print(c)
            # print(dir(self.ui.lineEdit_id))
            self.ui.lineEdit_id.setText(str(self.c.id))
            self.ui.lineEdit_yonghu.setText(str(self.c.yonghu))
            self.ui.lineEdit_addr.setText(str(self.c.addr))
            self.ui.lineEdit_channels.setText(str(self.c.channels))
            self.ui.lineEdit_yiqixinghao.setText(str(self.c.yiqixinghao))
            self.ui.lineEdit_yiqibh.setText(str(self.c.yiqibh))
            self.ui.lineEdit_baoxiang.setText(str(self.c.baoxiang))
            self.ui.lineEdit_shenhe.setText(str(self.c.shenhe))
            self.ui.lineEdit_yujifahuo_date.setText(str(self.c.yujifahuo_date))
            self.ui.lineEdit_tiaoshi_date.setText(str(self.c.tiaoshi_date))
            self.ui.lineEdit_hetongbh.setText(str(self.c.hetongbh))
            self.ui.lineEdit_method.setText(str(self.c.method))
            self.showpack()
        else:
            self.ui.frame.hide()
    def showpack(self):
        d=backend.getContactPack(self.c.id)
        rows=len(d)
        cols=3
        self.ui.tableWidget.setRowCount(rows)
        self.ui.tableWidget.setColumnCount(cols)
        self.ui.tableWidget.setHorizontalHeaderItem(0,QtWidgets.QTableWidgetItem("id"))
        self.ui.tableWidget.setHorizontalHeaderItem(1,QtWidgets.QTableWidgetItem("包id"))
        self.ui.tableWidget.hideColumn(1)
        self.ui.tableWidget.setHorizontalHeaderItem(2,QtWidgets.QTableWidgetItem("名称"))
        for i in range(len(d)):
            one=d[i]
            self.ui.tableWidget.setItem(i, 0, QtWidgets.QTableWidgetItem(str(one.id)))
            self.ui.tableWidget.setItem(i, 1, QtWidgets.QTableWidgetItem(str(one.pack.id)))
            self.ui.tableWidget.setItem(i, 2, QtWidgets.QTableWidgetItem(one.pack.name))
            i+=1
    def showpackitems(self,packid):        
        d=backend.getPackItem(packid)
        p=backend.getPack(packid)
        rows=len(d)
        cols=7
        self.ui.tableWidget_2.setRowCount(rows)
        self.ui.tableWidget_2.setColumnCount(cols)
        self.ui.tableWidget_2.setHorizontalHeaderItem(0,QtWidgets.QTableWidgetItem("id"))
        self.ui.tableWidget_2.setHorizontalHeaderItem(1,QtWidgets.QTableWidgetItem("名称"))
        self.ui.tableWidget_2.setHorizontalHeaderItem(2,QtWidgets.QTableWidgetItem("itemid"))
        self.ui.tableWidget_2.setHorizontalHeaderItem(3,QtWidgets.QTableWidgetItem("编号"))
        self.ui.tableWidget_2.setHorizontalHeaderItem(4,QtWidgets.QTableWidgetItem("规格"))
        self.ui.tableWidget_2.hideColumn(2)
        self.ui.tableWidget_2.setHorizontalHeaderItem(5,QtWidgets.QTableWidgetItem("数量"))
        self.ui.tableWidget_2.setHorizontalHeaderItem(6,QtWidgets.QTableWidgetItem("单位"))
        
        for i in range(len(d)):
            one=d[i]
            if backend.USEREST:
                theid=one["id"]
                adr=one["name"]
                self.ui.tableWidget_2.setItem(i, 0, QtWidgets.QTableWidgetItem(str(theid)))
                self.ui.tableWidget_2.setItem(i, 1, QtWidgets.QTableWidgetItem(adr))
                self.ui.tableWidget_2.setItem(i, 2, QtWidgets.QTableWidgetItem(str(one["itemid"])))
                self.ui.tableWidget_2.setItem(i, 3, QtWidgets.QTableWidgetItem(str(one["ct"])))
            else:
                theid=one.id
                adr=one.item.name
                self.ui.tableWidget_2.setItem(i, 0, QtWidgets.QTableWidgetItem(str(theid)))
                self.ui.tableWidget_2.setItem(i, 1, QtWidgets.QTableWidgetItem(adr))
                self.ui.tableWidget_2.setItem(i, 2, QtWidgets.QTableWidgetItem(str(one.item.id)))
                self.ui.tableWidget_2.setItem(i, 3, QtWidgets.QTableWidgetItem(str(one.item.bh)))                
                self.ui.tableWidget_2.setItem(i, 4, QtWidgets.QTableWidgetItem(str(one.item.guige)))                
                self.ui.tableWidget_2.setItem(i, 5, QtWidgets.QTableWidgetItem(str(one.ct)))
                self.ui.tableWidget_2.setItem(i, 6, QtWidgets.QTableWidgetItem(str(one.item.danwei)))
                
            i+=1
    @QtCore.pyqtSlot()
    def editpack(self):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),1)
        p=packitems.PackForm()
        if it!=None:
            p.showdata(int(it.text()))
        else:
            #c.showdata(-1)
            pass
        p.exec()
        pass
    @QtCore.pyqtSlot()
    def itemselect(self):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),1)
        if it!=None:
            self.pid=int(it.text())
            self.showpackitems(self.pid)
            print(self.pid)
        else:
            #c.showdata(-1)
            pass
    @QtCore.pyqtSlot()
    def editpackitem(self):
        it=self.ui.tableWidget_2.item(self.ui.tableWidget_2.currentRow(),0)
        if it!=None:
            piid=int(it.text())
            calculator = packitem.ContactDlg()
            calculator.showdata(piid)
            r=calculator.exec_()
            if r==0:
                self.showpackitems(self.pid)
        else:
            #c.showdata(-1)
            pass   
        pass
    @QtCore.pyqtSlot()
    def newpackitem(self):
        if self.pid!=None:
            nm=self.ui.lineEdit_itemname.text()
            if nm!="":
                backend.newpackitem(self.pid,nm)
                self.showpackitems(self.pid)     
    def deletepackitem(self):
        print("delete pi")
        it=self.ui.tableWidget_2.item(self.ui.tableWidget_2.currentRow(),0)
        if it!=None:
            piid=int(it.text())
            backend.removepi(piid)
            self.showpackitems(self.pid)
        else:
            #c.showdata(-1)
            pass        
        pass         
    def selectitem(self,data):
        #print(dir(self.ui.comboBox))
        iid=self.ui.comboBox_2.itemData(self.ui.comboBox_2.currentIndex())
        if iid!=None and self.pid!=None:
            backend.addItem(self.pid,iid)
            self.showpackitems(self.pid)
        pass              
    #@QtCore.pyqtSlot()
    def selectpack(self,data):
        #print(dir(self.ui.comboBox))
        pid=self.ui.comboBox.itemData(self.ui.comboBox.currentIndex())
        if pid!=None:
            backend.addPack(self.c,pid)
            self.showpack()
        pass      
    #@QtCore.pyqtSlot()
    def selectpack2(self,intdata):
        pass                         
 
    @QtCore.pyqtSlot()
    def iteminput(self):
        n=self.ui.lineEdit_item.text()
        r=backend.getItems(n)
        self.ui.comboBox_2.clear()
        at=0
        for p in r:
            #print(dir(self.ui.comboBox))
            self.ui.comboBox_2.addItem(p.name)
            self.ui.comboBox_2.setItemData(at,p.id)
            at+=1
        #self.ui.comboBox_2.showPopup()
        pass
    @QtCore.pyqtSlot()
    def deletepack(self):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)
        if it!=None:
            upid=int(it.text())
            backend.removeup(self.c,upid)
            self.showpack()
        else:
            #c.showdata(-1)
            pass        
        pass        
    @QtCore.pyqtSlot()
    def accept(self):
        pass
    @QtCore.pyqtSlot()
    def reject(self):
        print("reject")
        self.done(0)
        pass
    def resetbg(self):
        self.ui.lineEdit_yonghu.setStyleSheet("background-color:  rgba(255, 255,255, 255)")
        self.ui.lineEdit_addr.setStyleSheet("background-color:  rgba(255, 255,255, 255)")
        self.ui.lineEdit_channels.setStyleSheet("background-color:  rgba(255, 255,255, 255)")
        self.ui.lineEdit_yiqixinghao.setStyleSheet("background-color:  rgba(255, 255,255, 255)")
        self.ui.lineEdit_yiqibh.setStyleSheet("background-color:  rgba(255, 255,255, 255)")
        self.ui.lineEdit_shenhe.setStyleSheet("background-color:  rgba(255, 255,255, 255)")
        self.ui.lineEdit_baoxiang.setStyleSheet("background-color:  rgba(255, 255,255, 255)")
        self.ui.lineEdit_hetongbh.setStyleSheet("background-color:  rgba(255, 255,255, 255)")
    def save(self):
        self.ui.pushButton_save.setEnabled(False)
        self.c.yonghu=self.ui.lineEdit_yonghu.text()
        self.c.addr=self.ui.lineEdit_addr.text()
        self.c.channels=self.ui.lineEdit_channels.text()
        self.c.yiqixinghao=self.ui.lineEdit_yiqixinghao.text()
        self.c.yiqibh=self.ui.lineEdit_yiqibh.text()
        self.c.baoxiang=self.ui.lineEdit_baoxiang.text()
        self.c.shenhe=self.ui.lineEdit_shenhe.text()
        self.c.hetongbh=self.ui.lineEdit_hetongbh.text()
        self.c.save()
        self.resetbg()
        self.ui.pushButton_save.setEnabled(True)
        pass 
    @QtCore.pyqtSlot()
    def copy(self):
        print("reject")
        self.done(0)
        pass 
    @QtCore.pyqtSlot()
    def clear(self):
        print("reject")
        self.done(0)
        pass                        
    @QtCore.pyqtSlot()
    def method(self):
        print("method")
        pass                        
    @QtCore.pyqtSlot()
    def newpack(self):
        nm=self.ui.lineEdit_packname.text()
        if nm!="":
            backend.newpack(self.c,nm)
            self.showpack()

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
