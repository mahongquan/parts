#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
from PyQt5 import QtCore, QtGui,QtWidgets
from .ui_login import Ui_Dialog
from .backend  import *
import logging

class LoginDlg(QtWidgets.QDialog):
    def __init__(self, parent=None):
        print("init")
        super(LoginDlg, self).__init__(parent)
        self.ui=Ui_Dialog()
        self.ui.setupUi(self)
    @QtCore.pyqtSlot()
    def accept(self):
        print("accept")
        print(self.ui.lineEdit_username.text())
        print(self.ui.lineEdit_password.text())
        r=login(self.ui.lineEdit_username.text(),self.ui.lineEdit_password.text())
        if r["success"]:
            self.done(1)
        else:
            h=QtWidgets.QMessageBox.information(self,"",r["message"])
            print(h)
        pass
    @QtCore.pyqtSlot()
    def reject(self):
        print("reject")
        self.done(0)
        pass
def main():        
    import sys
    app = QtWidgets.QApplication(sys.argv)
    calculator = LoginDlg()
    #calculator.showdata(9)
    #calculator.show()
    calculator.exec_()
    #sys.exit(app.exec_())

if __name__ == '__main__':
    import sys
    app = QtWidgets.QApplication(sys.argv)
    calculator = LoginDlg()
    calculator.showdata(9)
    #calculator.show()
    calculator.exec_()
    #sys.exit(app.exec_())
