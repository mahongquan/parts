#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
import pickle
sys.path.insert(0,os.getcwd())
from PyQt4 import QtCore, QtGui
from ui_server import Ui_MainWindow
import backend  
import getpath

class CalculatorForm(QtGui.QMainWindow):
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
        self.ui.tableWidget.setHorizontalHeaderItem(0,QtGui.QTableWidgetItem("id"))
        self.ui.tableWidget.setHorizontalHeaderItem(1,QtGui.QTableWidgetItem(u"用户"))
        self.ui.tableWidget.setHorizontalHeaderItem(2,QtGui.QTableWidgetItem(u"合同号"))
		self.ui.tableWidget.setHorizontalHeaderItem(2,QtGui.QTableWidgetItem(u"发货时间"))
        for i in range(len(d)):
            one=d[i]
            #print one
            theid=one["id"]
            #print theid
            adr=one["yonghu"]
            val=one["hetongbh"]
            self.ui.tableWidget.setItem(i, 0, QtGui.QTableWidgetItem(str(theid)))
            self.ui.tableWidget.setItem(i, 1, QtGui.QTableWidgetItem(adr))
            self.ui.tableWidget.setItem(i, 2, QtGui.QTableWidgetItem(val))
			self.ui.tableWidget.setItem(i, 2, QtGui.QTableWidgetItem(val))
            i+=1 
    #@QtCore.pyqtSlot()
    def add(self):
        self.rows+=1
        self.ui.tableWidget.setRowCount(self.rows)
    #@QtCore.pyqtSlot()
    def delete(self):
        self.rows-=1
        self.ui.tableWidget.setRowCount(self.rows)
    def tableTodict(self):
        d={}
        print self.rows
        for i in range(self.rows):
            if self.ui.tableWidget.item(i, 0)==None:
                continue
            adr=self.ui.tableWidget.item(i, 0).text()
            if adr=='':
                continue
            if self.ui.tableWidget.item(i, 1)==None:
                continue
            val=self.ui.tableWidget.item(i, 1).text()
            d[adr]=val
        return d
    #@QtCore.pyqtSlot()
    def change(self):
        d=self.tableTodict()
        backend.setStore(d)
        print "change"
        print backend.store.store['h'].values
        #backend.store.store['h'].values[1]=int(self.ui.lineEdit_2.text())
        #backend.store.store['h'].values[2]=int(self.ui.lineEdit_3.text())
    def myprint(self,s):
        #print dir(self.ui.textEdit)
        self.ui.textEdit.append(s)
    def closeEvent(self,e):
        d=self.tableTodict()
        pickle.dump(d,open(getpath.getpath()+"data.pickle","w"))
if __name__ == '__main__':
    import sys
    app = QtGui.QApplication(sys.argv)
    calculator = CalculatorForm()
    calculator.show()
    sys.exit(app.exec_())
