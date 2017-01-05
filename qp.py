
from PyQt5.QtGui import * 
from PyQt5.QtCore import * 
from PyQt5.QtPrintSupport import *
from PyQt5 import QtCore, QtWidgets,QtWidgets
import sys
app = QtWidgets.QApplication(sys.argv)
def test1():
	printer = QPrinter()
	printer.setOutputFileName('test.pdf')
	printer.setOutputFormat(QPrinter.PdfFormat)
	#printer.setPageSize(QPrinter.A4)
	printer.setPaperSize(QSizeF(80,60),QPrinter.Millimeter)
	printer.setFullPage(True)
	#textDocument=QTextDocument()
	#textDocument.setHtml("<html><body><p>hello</p></body></html>");
	#textDocument.print(printer);
	painter=QPainter(printer)
	pen=QPen() 
	pen.setColor(Qt.black);  
	pen.setWidth(1);  
	painter.setPen(pen);
	#painter.setPen(QColor(0, 160, 230))
	#painter.begin(printer)
	painter.drawLine(0, 0, 20, 20)
	#painter.drawText(, Qt.AlignCenter, "Qt")
	#painter.end()
	#sys.exit(app.exec_())
def test2():
	printer_pixmap=QPrinter(QPrinter.HighResolution)
	printer_pixmap.setPageSize(QPrinter.A4)#设置纸张大小为A4
	printer_pixmap.setOutputFormat(QPrinter.PdfFormat)#设置输出格式为pdf
	printer_pixmap.setOutputFileName("test_pixmap.pdf")#设置输出路径
	#QPixmap pixmap = QPixmap::grabWidget(main_widget,main_widget->rect());#获取界面的图片

	painter_pixmap=QPainter()
	painter_pixmap.begin(printer_pixmap)
	#rect = painter_pixmap.viewport()
	#multiple = rect.width()/pixmap.width()
	#painter_pixmap.scale(multiple, multiple)#将图像(所有要画的东西)在pdf上放大multiple-1倍
	#painter_pixmap.drawPixmap(0, 0, pixmap)#画图
	painter_pixmap.drawLine(0, 0, 20, 20)
	painter_pixmap.end()
test2()


