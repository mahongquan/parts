import sys
from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QApplication, QCompleter, QLineEdit
from PyQt5.QtCore import QStringListModel
from PyQt5 import QtCore
import qslm
def get_data(model):
    model.setStringList(["completion", "data", "goes", "here","haa"])
class MyModel(QtCore.QAbstractItemModel):
    def __init__(self):
        super(MyModel, self).__init__()
        self.db=["completion", "data", "goes", "here","haa"]
    def rowCount(self,a):
        print("rowCount")
        print(a,dir(a))
        print(a.row(),a.column())
        return len(self.db)
    def columnCount(self,b):
        return 1
    def index(self,a,b,c):
        print("index")
        print(a,b,c)
        print(c.row(),c.column())
        return self.db[a]
    def data(self,index, role):
        print("data==============")
        print(index,role)
if __name__ == "__main__":

    app = QApplication(sys.argv)
    edit = QLineEdit()
    completer = QCompleter()
    edit.setCompleter(completer)

    model = qslm.MyStringListModel()#MyModel()#QStringListModel()
    completer.setModel(model)
    #get_data(model)

    edit.show()
    sys.exit(app.exec_())