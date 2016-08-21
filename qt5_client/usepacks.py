#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
from PyQt5 import QtCore, QtWidgets,QtWidgets
from .ui_contact import Ui_Form
from . import  backend 
import logging
from . import packitems
class ContactForm(QtWidgets.QDialog):
    def __init__(self, parent=None):
        #print "init"
        super(ContactForm, self).__init__(parent)
        self.ui=Ui_Form()
        self.ui.setupUi(self)
    def showdata(self,contactid):
        if not backend.islogin:
            backend.login()
        d=backend.getContactPack(contactid)
        self.rows=len(d)
        self.cols=3
        self.ui.tableWidget.setRowCount(self.rows)
        self.ui.tableWidget.setColumnCount(self.cols)
        self.ui.tableWidget.setHorizontalHeaderItem(0,QtWidgets.QTableWidgetItem("id"))
        self.ui.tableWidget.setHorizontalHeaderItem(1,QtWidgets.QTableWidgetItem("包id"))
        self.ui.tableWidget.setHorizontalHeaderItem(2,QtWidgets.QTableWidgetItem("名称"))
        for i in range(len(d)):
            one=d[i]
            if backend.USEREST:
                self.ui.tableWidget.setItem(i, 0, QtWidgets.QTableWidgetItem(str(one["id"])))
                self.ui.tableWidget.setItem(i, 1, QtWidgets.QTableWidgetItem(str(one["pack"])))
                self.ui.tableWidget.setItem(i, 2, QtWidgets.QTableWidgetItem(one["name"]))
            else:
                self.ui.tableWidget.setItem(i, 0, QtWidgets.QTableWidgetItem(str(one.id)))
                self.ui.tableWidget.setItem(i, 1, QtWidgets.QTableWidgetItem(str(one.pack.id)))
                self.ui.tableWidget.setItem(i, 2, QtWidgets.QTableWidgetItem(one.pack.name))
            i+=1
    @QtCore.pyqtSlot()
    def add(self):
        pass
    @QtCore.pyqtSlot()
    def delete(self):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)#self.ui.tableWidget.currentColumn()))
        backend.deleteUsePack(int(it.text()))
        calculator.exec_()
    @QtCore.pyqtSlot()
    def change(self):
        #print "to change pack"
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),1)#self.ui.tableWidget.currentColumn()))
        calculator = packitems.PackForm()
        calculator.showdata(int(it.text()))
        calculator.exec_()
    @QtCore.pyqtSlot()
    def accept(self):
        #print "accept"
        self.done(1)
        pass
    @QtCore.pyqtSlot()
    def reject(self):
        #print "reject"
        self.done(0)
        pass
if __name__ == '__main__':
    import sys
    app = QtWidgets.QApplication(sys.argv)
    calculator = ContactForm()
    calculator.showdata(9)
    #calculator.show()
    calculator.exec_()
    #sys.exit(app.exec_())
