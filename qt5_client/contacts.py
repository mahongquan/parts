#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
import pickle
#sys.path.insert(0,os.getcwd())
from PyQt5 import QtCore, QtWidgets,QtWidgets
from .ui_contacts import Ui_MainWindow
from . import  backend  
#import getpath
import logging
from . import usepacks
from . import contactEdit
class CalculatorForm(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super(CalculatorForm, self).__init__(parent)
        backend.login()
        d=backend.getAllContacts()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.rows=len(d)
        self.cols=4
        self.ui.tableWidget.setRowCount(self.rows)
        self.ui.tableWidget.setColumnCount(self.cols)
        self.ui.tableWidget.setHorizontalHeaderItem(0,QtWidgets.QTableWidgetItem("id"))
        self.ui.tableWidget.setHorizontalHeaderItem(1,QtWidgets.QTableWidgetItem("用户"))
        self.ui.tableWidget.setHorizontalHeaderItem(2,QtWidgets.QTableWidgetItem("合同号"))
        self.ui.tableWidget.setHorizontalHeaderItem(3,QtWidgets.QTableWidgetItem("发货时间"))
        for i in range(len(d)):
            one=d[i]
            #print one
            if backend.USEREST:
                theid=one["id"]
                adr=one["yonghu"]
                val=one["hetongbh"]
                tm=one["yujifahuo_date"]
            else:
                theid=one.id
                adr=one.yonghu
                val=one.hetongbh
                tm=str(one.yujifahuo_date)
            self.ui.tableWidget.setItem(i, 0, QtWidgets.QTableWidgetItem(str(theid)))
            self.ui.tableWidget.setItem(i, 1, QtWidgets.QTableWidgetItem(adr))
            self.ui.tableWidget.setItem(i, 2, QtWidgets.QTableWidgetItem(val))
            self.ui.tableWidget.setItem(i, 3, QtWidgets.QTableWidgetItem(tm))
            i+=1 
    @QtCore.pyqtSlot()
    def add(self):
        row=self.ui.tableWidget.currentRow()
        it=self.ui.tableWidget.item(row,0)
        calculator = contactEdit.CalculatorForm()
        #calculator.showdata(int(it.text()))
        calculator.exec_()
        pass
    @QtCore.pyqtSlot()
    def delete(self):
        pass
    @QtCore.pyqtSlot()
    def change(self):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)#self.ui.tableWidget.currentColumn()))
        calculator = usepacks.ContactForm()
        calculator.showdata(int(it.text()))
        calculator.exec_()
    def myprint(self,s):
        #print dir(self.ui.textEdit)
        self.ui.textEdit.append(s)
    def closeEvent(self,e):
        pass
        #d=self.tableTodict()
        #pickle.dump(d,open(getpath.getpath()+"data.pickle","w"))
def main():
    import sys
    app = QtWidgets.QApplication(sys.argv)
    calculator = CalculatorForm()
    calculator.show()
    sys.exit(app.exec_())
if __name__ == '__main__':
    main()