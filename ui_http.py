# -*- coding: utf-8 -*-
 
# Form implementation generated from reading ui file 'httpWidget.ui'
#
# Created: Mon Jun 13 15:26:37 2011
#      by: PyQt4 UI code generator 4.8.4
#
# WARNING! All changes made in this file will be lost!
 
from PyQt5 import QtCore, QtGui,QtWidgets
from PyQt5 import QtWebKit ,QtWebKitWidgets
try:
    _fromUtf8 = QtCore.QString.fromUtf8
except AttributeError:
    _fromUtf8 = lambda s: s
 
class Ui_HttpWidget(object):
    def setupUi(self, HttpWidget):
        HttpWidget.setObjectName(_fromUtf8("HttpWidget"))
        HttpWidget.resize(636, 336)
        self.verticalLayout = QtWidgets.QVBoxLayout(HttpWidget)
        self.verticalLayout.setObjectName(_fromUtf8("verticalLayout"))
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setObjectName(_fromUtf8("horizontalLayout"))
        self.back = QtWidgets.QPushButton(HttpWidget)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(_fromUtf8("back.png")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        self.back.setIcon(icon)
        self.back.setObjectName(_fromUtf8("back"))
        self.horizontalLayout.addWidget(self.back)
        self.next = QtWidgets.QPushButton(HttpWidget)
        self.next.setEnabled(True)
        self.next.setLayoutDirection(QtCore.Qt.RightToLeft)
        icon1 = QtGui.QIcon()
        icon1.addPixmap(QtGui.QPixmap(_fromUtf8("next.png")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        self.next.setIcon(icon1)
        self.next.setObjectName(_fromUtf8("next"))
        self.horizontalLayout.addWidget(self.next)
        self.stop = QtWidgets.QPushButton(HttpWidget)
        icon2 = QtGui.QIcon()
        icon2.addPixmap(QtGui.QPixmap(_fromUtf8("stop.png")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        self.stop.setIcon(icon2)
        self.stop.setObjectName(_fromUtf8("stop"))
        self.horizontalLayout.addWidget(self.stop)
        self.reload = QtWidgets.QPushButton(HttpWidget)
        icon3 = QtGui.QIcon()
        icon3.addPixmap(QtGui.QPixmap(_fromUtf8("reload.png")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        self.reload.setIcon(icon3)
        self.reload.setObjectName(_fromUtf8("reload"))
        self.horizontalLayout.addWidget(self.reload)
        self.url = QtWidgets.QLineEdit(HttpWidget)
        self.url.setObjectName(_fromUtf8("url"))
        self.horizontalLayout.addWidget(self.url)
        self.verticalLayout.addLayout(self.horizontalLayout)
        self.webView = QtWebKitWidgets.QWebView(HttpWidget)
        self.webView.setUrl(QtCore.QUrl(_fromUtf8("about:blank")))
        self.webView.setObjectName(_fromUtf8("webView"))
        self.verticalLayout.addWidget(self.webView)
 
        self.retranslateUi(HttpWidget)
        QtCore.QMetaObject.connectSlotsByName(HttpWidget)
 
    def retranslateUi(self, HttpWidget):
        pass
        # HttpWidget.setWindowTitle(QtWidgets.QApplication.translate("HttpWidget", "Form", None, QtWidgets.QApplication.UnicodeUTF8))
        # self.back.setToolTip(QtWidgets.QApplication.translate("HttpWidget", "Back", None, QtWidgets.QApplication.UnicodeUTF8))
        # self.back.setText(QtWidgets.QApplication.translate("HttpWidget", "Back", None, QtWidgets.QApplication.UnicodeUTF8))
        # self.next.setToolTip(QtWidgets.QApplication.translate("HttpWidget", "Next", None, QtWidgets.QApplication.UnicodeUTF8))
        # self.next.setText(QtWidgets.QApplication.translate("HttpWidget", "    Next", None, QtWidgets.QApplication.UnicodeUTF8))
        # self.stop.setToolTip(QtWidgets.QApplication.translate("HttpWidget", "Stop", None, QtWidgets.QApplication.UnicodeUTF8))
        # self.stop.setText(QtWidgets.QApplication.translate("HttpWidget", "Stop", None, QtWidgets.QApplication.UnicodeUTF8))
        # self.reload.setToolTip(QtWidgets.QApplication.translate("HttpWidget", "Reload", None, QtWidgets.QApplication.UnicodeUTF8))
        # self.reload.setText(QtWidgets.QApplication.translate("HttpWidget", "Reload", None, QtWidgets.QApplication.UnicodeUTF8))
 
