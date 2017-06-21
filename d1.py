from PyQt5.QtWidgets import QTreeView,QFileSystemModel,QApplication
from PyQt5.QtCore import QDir

class Main(QTreeView):
    def __init__(self):
        QTreeView.__init__(self)
        model = QFileSystemModel()
        model.setRootPath(r"D:\parts\media\仪器资料\3111664548")
        print(dir(model))
        self.setModel(model)
        self.doubleClicked.connect(self.test)
        index = model.index(r"D:\parts\media\仪器资料\3111664548")
        self.expand(index)      #当前项展开
        self.scrollTo(index)    #定位到当前项
        self.resizeColumnToContents(0)
    def test(self, signal):
        file_path=self.model().filePath(signal)
        print(file_path)


if __name__ == '__main__':
    import sys
    app = QApplication(sys.argv)
    w = Main()
    w.show()
    sys.exit(app.exec_())