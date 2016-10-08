
from PyQt5.QtGui import * 
from PyQt5.QtCore import * 
from PyQt5.QtPrintSupport import *
from PyQt5 import QtCore, QtWidgets,QtWidgets
import sys
app = QtWidgets.QApplication(sys.argv)
printer = QPrinter()
printer.setOutputFileName('test.pdf')
printer.setOutputFormat(QPrinter.PdfFormat)
printer.setPageSize(QPrinter.A4)
printer.setFullPage(True)
textDocument=QTextDocument()
textDocument.setHtml("<html><body><p>hello</p></body></html>");
textDocument.print(printer);
#sys.exit(app.exec_())


