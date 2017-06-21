import sys
from PyQt5 import QtWidgets
app = QtWidgets.QApplication(sys.argv)
clipboard = QtWidgets.QApplication.clipboard()
print(dir(clipboard))
data=clipboard.mimeData()
if data.hasFormat('text/uri-list'):
    for path in data.urls():
        print(path)
if data.hasText():
    print(data.text())
