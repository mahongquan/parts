#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
from PySide2 import QtCore, QtGui,QtWidgets
from PySide2.QtCore import *
from .ui_detail import Ui_Dialog
from .  import backend
import logging
import getpath
class ContactDlg(QtWidgets.QDialog):
    def __init__(self, parent=None):
        super(ContactDlg, self).__init__(parent)
        self.ui=Ui_Dialog()
        self.setWindowFlags(Qt.Dialog | Qt.WindowMaximizeButtonHint |Qt.WindowCloseButtonHint|Qt.WindowMinimizeButtonHint)
        self.ui.setupUi(self)
    def showdata(self,contactid):
        backend.genDetail(contactid)
        filepath="file://"+getpath.getpath()+"/out.html"
        print(filepath)
        self.ui.webView.setUrl(QtCore.QUrl(filepath))
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
