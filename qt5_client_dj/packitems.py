#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
import pickle
from PySide2 import QtCore, QtWidgets,QtWidgets
from .ui_packitems import Ui_DialogPack
from . import  backend 
import logging
class PackForm(QtWidgets.QDialog):
    def __init__(self, parent=None):
        super(PackForm, self).__init__(parent)
        self.ui =Ui_DialogPack()
        self.ui.setupUi(self)
    def showdata(self,packid):
        # if not backend.islogin:
        #     backend.login()
        d=backend.getPackItem(packid)
        p=backend.getPack(packid)
        self.ui.lineEdit_id.setText(str(packid))
        self.ui.lineEdit_name.setText(p.name)
        self.rows=len(d)
        self.cols=4
        self.ui.tableWidget.setRowCount(self.rows)
        self.ui.tableWidget.setColumnCount(self.cols)
        self.ui.tableWidget.setHorizontalHeaderItem(0,QtWidgets.QTableWidgetItem("id"))
        self.ui.tableWidget.setHorizontalHeaderItem(1,QtWidgets.QTableWidgetItem("名称"))
        self.ui.tableWidget.setHorizontalHeaderItem(2,QtWidgets.QTableWidgetItem("itemid"))
        self.ui.tableWidget.setHorizontalHeaderItem(3,QtWidgets.QTableWidgetItem("ct"))
        for i in range(len(d)):
            one=d[i]
            if backend.USEREST:
                theid=one["id"]
                adr=one["name"]
                self.ui.tableWidget.setItem(i, 0, QtWidgets.QTableWidgetItem(str(theid)))
                self.ui.tableWidget.setItem(i, 1, QtWidgets.QTableWidgetItem(adr))
                self.ui.tableWidget.setItem(i, 2, QtWidgets.QTableWidgetItem(str(one["itemid"])))
                self.ui.tableWidget.setItem(i, 3, QtWidgets.QTableWidgetItem(str(one["ct"])))
            else:
                theid=one.id
                adr=one.item.name
                self.ui.tableWidget.setItem(i, 0, QtWidgets.QTableWidgetItem(str(theid)))
                self.ui.tableWidget.setItem(i, 1, QtWidgets.QTableWidgetItem(adr))
                self.ui.tableWidget.setItem(i, 2, QtWidgets.QTableWidgetItem(str(one.item.id)))
                self.ui.tableWidget.setItem(i, 3, QtWidgets.QTableWidgetItem(str(one.ct)))
            i+=1
    # #@QtCore.pyqtSlot()
    def add(self):
        self.done(0)
        pass
    # #@QtCore.pyqtSlot()
    def delete(self):
        self.done(0)
        pass
    # #@QtCore.pyqtSlot()
    def ok(self):
        #print "ok"
        self.done(0)
        pass
    # #@QtCore.pyqtSlot()
    def cancel(self):
        #print "cancel"
        self.done(1)
        pass
    # #@QtCore.pyqtSlot()
    def accept(self):
        self.done(0)
        pass
    # #@QtCore.pyqtSlot()
    def reject(self):
        self.done(1)
        pass
if __name__ == '__main__':
    import sys
    app = QtWidgets.QApplication(sys.argv)
    calculator = PackForm()
    calculator.show()
    calculator.showdata(1)
    sys.exit(app.exec_())
