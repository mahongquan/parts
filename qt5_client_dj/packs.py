﻿#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
from PyQt4 import QtCore, QtGui
from ui_packs import Ui_Form
import backend  
import logging
import packitems
class ContactForm(QtGui.QDialog):
    def __init__(self, parent=None):
        print("init")
        super(ContactForm, self).__init__(parent)
        self.ui=Ui_Form()
        self.ui.setupUi(self)
    def showdata(self,contactid):
        if not backend.islogin:
            backend.login()
        d=backend.getAllPack()
        self.rows=len(d)
        self.cols=2
        self.ui.tableWidget.setRowCount(self.rows)
        self.ui.tableWidget.setColumnCount(self.cols)
        self.ui.tableWidget.setHorizontalHeaderItem(0,QtGui.QTableWidgetItem("id"))
        self.ui.tableWidget.setHorizontalHeaderItem(1,QtGui.QTableWidgetItem("名称"))
        for i in range(len(d)):
            one=d[i]
            self.ui.tableWidget.setItem(i, 0, QtGui.QTableWidgetItem(str(one["id"])))
            self.ui.tableWidget.setItem(i, 1, QtGui.QTableWidgetItem(one["name"]))
            i+=1
    #@QtCore.pyqtSlot()
    def add(self):
        pass
    #@QtCore.pyqtSlot()
    def delete(self):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)#self.ui.tableWidget.currentColumn()))
        backend.deleteUsePack(int(it.text()))
        calculator.exec_()
    #@QtCore.pyqtSlot()
    def change(self):
        print("to change pack")
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)#self.ui.tableWidget.currentColumn()))
        calculator = packitems.PackForm()
        calculator.showdata(int(it.text()))
        calculator.exec_()
    #@QtCore.pyqtSlot()
    def accept(self):
        print("accept")
        self.done(1)
        pass
    #@QtCore.pyqtSlot()
    def reject(self):
        print("reject")
        self.done(0)
        pass
if __name__ == '__main__':
    import sys
    app = QtGui.QApplication(sys.argv)
    calculator = ContactForm()
    calculator.showdata(9)
    #calculator.show()
    calculator.exec_()
    #sys.exit(app.exec_())
