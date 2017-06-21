#!/usr/bin/env python
 
import sys
 
from PyQt5 import QtCore, QtGui,QtWidgets
from ui_http import Ui_HttpWidget
 
class httpWidget(QtWidgets.QWidget):
    def __init__(self, parent=None):
        super(httpWidget, self).__init__(parent)
        self.ui = Ui_HttpWidget()
        self.ui.setupUi(self)
         
        L = self.layout()
        #L.setMargin(0)
        #self.ui.horizontalLayout.setMargin(5)
         
        url = 'http://google.com'
        self.ui.url.setText(url)
         
        self.ui.webView.setUrl(QtCore.QUrl(url))
         
        self.ui.back.setEnabled(False)
        self.ui.next.setEnabled(False)
         
        self.ui.back.clicked.connect(self.back)
        self.ui.next.clicked.connect(
                        self.next)
        self.ui.url.returnPressed.connect(      self.url_changed)
        #self.ui.webView, QtCore.SIGNAL("linkClicked(const QUrl&)"),\
        #                 self.link_clicked)
        # QtCore.QObject.connect(self.ui.webView, QtCore.SIGNAL("urlChanged(const QUrl&)"),\
        #                 self.link_clicked)
        # QtCore.QObject.connect(self.ui.webView, QtCore.SIGNAL("loadProgress(int)"),\
        #                 self.load_progress)
        # QtCore.QObject.connect(self.ui.webView, QtCore.SIGNAL("titleChanged(const QString&)"),\
        #                 self.title_changed)
        # QtCore.QObject.connect(self.ui.reload, QtCore.SIGNAL("clicked()"),\
        #                 self.reload_page)
        # QtCore.QObject.connect(self.ui.stop, QtCore.SIGNAL("clicked()"),\
        #                 self.stop_page)
         
        # QtCore.QMetaObject.connectSlotsByName(self)
         
    def url_changed(self):
        page = self.ui.webView.page()
        history = page.history()
        if history.canGoBack():
            self.ui.back.setEnabled(True)
        else:
            self.ui.back.setEnabled(False)
             
        if history.canGoForward():
            self.ui.next.setEnabled(True)
        else:
            self.ui.next.setEnabled(False)
             
        url = self.ui.url.text()
        self.ui.webView.setUrl(QtCore.QUrl(url))
         
    def stop_page(self):
        self.ui.webView.stop()
         
    def title_changed(self, title):
        self.setWindowTitle(title)
         
    def reload_page(self):
        self.ui.webView.setUrl(QtCore.QUrl(self.ui.url.text()))
         
    def link_clicked(self, url):
        page = self.ui.webView.page()        
        self.__setHistButtonState(page, self.ui.back, self.ui.next)
             
        self.ui.url.setText(url.toString())
         
    def load_progress(self, load):
        if load == 100:
            self.ui.stop.setEnabled(False)
        else:
            self.ui.stop.setEnabled(True)
             
    def back(self):
        page = self.ui.webView.page()
        self.__setHistButtonState(page, self.ui.back, None)
        history = page.history()
        history.back()
             
    def next(self):
        page = self.ui.webView.page()
        history = page.history()
        history.forward()
         
        self.__setHistButtonState(page, None, self.ui.next)
           
    #control the navigator buttons enability
    def __setHistButtonState(self, page, back, next):
        history = page.history()
         
        if back is not None:
            if history.canGoBack():
                back.setEnabled(True)
            else:
                back.setEnabled(False)
             
        if next is not None:
            if history.canGoForward():
                next.setEnabled(True)
            else:
                next.setEnabled(False)
         
             
if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    myapp = httpWidget()
    myapp.show()
    sys.exit(app.exec_())