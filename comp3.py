# -*- coding: utf-8 -*-
import sys
from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QApplication, QCompleter, QLineEdit
from PyQt5.QtCore import QStringListModel
from PyQt5 import QtCore
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

if __name__ == "__main__":

    app = QApplication(sys.argv)
    edit = QLineEdit()
    completer = QCompleter()
    edit.setCompleter(completer)

    model = MyStringListModel()#MyModel()#QStringListModel()
    completer.setModel(model)
    #get_data(model)

    edit.show()
    sys.exit(app.exec_())