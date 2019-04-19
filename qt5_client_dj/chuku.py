#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
from PySide2 import QtCore, QtGui,QtWidgets
from PySide2.QtCore import *
from .ui_chuku import Ui_Dialog
import logging
class ContactDlg(QtWidgets.QDialog):
    def __init__(self, parent=None):
        super(ContactDlg, self).__init__(parent)
        self.ui=Ui_Dialog()
        self.setWindowFlags(Qt.Dialog | Qt.WindowMaximizeButtonHint |Qt.WindowCloseButtonHint|Qt.WindowMinimizeButtonHint)
        self.ui.setupUi(self)
    def showdata(self,left,notequal,right):
        n=len(left)
        if n<len(right):
          n=len(right)
        table=[]
        table.append(["装箱单","","","备料计划","",""])
        i=0
        while(i<n):
          tr=[]
          if i<len(left):
            for one in left[i]:
                tr.append(str(one))
          else:
            tr.append("")
            tr.append("")
            tr.append("")
          if i<len(right):
            for one in right[i]:
                tr.append(str(one))
          else:
            tr.append("")
            tr.append("")
            tr.append("")
          table.append(tr)
          i+=1
        n=len(notequal)
        i=0
        while(i<n/2):
            tr=[]
            l=2*i+0
            for one in notequal[l]:
                tr.append(str(one))
            r=2*i+1
            for one in notequal[r]:
                tr.append(str(one))
            table.append(tr)
            i+=1
        self.ui.tableWidget.setRowCount(len(table))
        self.ui.tableWidget.setColumnCount(6)
        for i in range(len(table)):
            j=0
            for one in table[i]:
                self.ui.tableWidget.setItem(i, j, QtWidgets.QTableWidgetItem(one))
                j+=1
        pass
    #@QtCore.pyqtSlot()
    def accept(self):
        self.done(1)
    #@QtCore.pyqtSlot()
    def reject(self):
        print("reject")
        self.done(0)
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
