from PyQt5 import QtCore
from PyQt5.QtCore import *
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



