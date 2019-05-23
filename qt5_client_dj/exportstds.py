#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
from PySide2 import QtCore, QtGui,QtWidgets
from .ui_exportstds import Ui_Form
import logging
import datetime
from PySide2 import QtCore
from PySide2.QtCore import *
from . import  backend 
class ExportStdsDlg(QtWidgets.QDialog):
    def __init__(self, parent=None):
        print("init")
        #print(dir(Qt.FocusReason))
        super(ExportStdsDlg, self).__init__(parent)
        self.pid=None
        self.c=None
        self.ui=Ui_Form()
        self.ui.setupUi(self)
        self.ui.pushButton.clicked.connect(self.export)
        self.showpack()
    def showpack(self):
        d=backend.getPacks("xls")
        rows=len(d)
        cols=2
        self.ui.tableWidget.setRowCount(rows)
        self.ui.tableWidget.setColumnCount(cols)
        self.ui.tableWidget.setColumnWidth(1,260)
        self.ui.tableWidget.setHorizontalHeaderItem(0,QtWidgets.QTableWidgetItem("包id"))
        self.ui.tableWidget.setHorizontalHeaderItem(1,QtWidgets.QTableWidgetItem("名称"))
        for i in range(len(d)):
            one=d[i]
            self.ui.tableWidget.setItem(i, 0, QtWidgets.QTableWidgetItem(str(one.id)))
            self.ui.tableWidget.setItem(i, 1, QtWidgets.QTableWidgetItem(one.name))
            i+=1
    def export(self):
        self.ui.pushButton.setEnabled(False)
        (fileName,fileType)=QtWidgets.QFileDialog.getOpenFileName(None,"Open Excel file", r"C:\Users\group2\Desktop","Excel Files ( *.xlsx *.xls)")
        if fileName!="":
            backend.readStandardFile(fileName)
            self.showpack()
        self.ui.pushButton.setEnabled(True)

def main():        
    import sys
    app = QtWidgets.QApplication(sys.argv)
    calculator = ExportStdsDlg()
    calculator.exec_()

if __name__ == '__main__':
    import sys
    app = QtWidgets.QApplication(sys.argv)
    calculator = ExportStdsDlg()
    calculator.exec_()
