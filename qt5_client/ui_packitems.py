# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'packitems.ui'
#
# Created by: PyQt5 UI code generator 5.5
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_DialogPack(object):
    def setupUi(self, DialogPack):
        DialogPack.setObjectName("DialogPack")
        DialogPack.setWindowModality(QtCore.Qt.NonModal)
        DialogPack.resize(462, 329)
        self.verticalLayout = QtWidgets.QVBoxLayout(DialogPack)
        self.verticalLayout.setObjectName("verticalLayout")
        self.tableWidget = QtWidgets.QTableWidget(DialogPack)
        self.tableWidget.setObjectName("tableWidget")
        self.tableWidget.setColumnCount(0)
        self.tableWidget.setRowCount(0)
        self.verticalLayout.addWidget(self.tableWidget)
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.pushButton_2 = QtWidgets.QPushButton(DialogPack)
        self.pushButton_2.setObjectName("pushButton_2")
        self.horizontalLayout.addWidget(self.pushButton_2)
        self.pushButton = QtWidgets.QPushButton(DialogPack)
        self.pushButton.setObjectName("pushButton")
        self.horizontalLayout.addWidget(self.pushButton)
        self.buttonBox = QtWidgets.QDialogButtonBox(DialogPack)
        self.buttonBox.setOrientation(QtCore.Qt.Horizontal)
        self.buttonBox.setStandardButtons(QtWidgets.QDialogButtonBox.Cancel|QtWidgets.QDialogButtonBox.Ok)
        self.buttonBox.setObjectName("buttonBox")
        self.horizontalLayout.addWidget(self.buttonBox)
        self.verticalLayout.addLayout(self.horizontalLayout)

        self.retranslateUi(DialogPack)
        self.buttonBox.accepted.connect(DialogPack.ok)
        self.pushButton_2.clicked.connect(DialogPack.add)
        self.pushButton.clicked.connect(DialogPack.delete)
        self.buttonBox.clicked['QAbstractButton*'].connect(DialogPack.cancel)
        QtCore.QMetaObject.connectSlotsByName(DialogPack)

    def retranslateUi(self, DialogPack):
        _translate = QtCore.QCoreApplication.translate
        DialogPack.setWindowTitle(_translate("DialogPack", "Dialog"))
        self.pushButton_2.setText(_translate("DialogPack", "add"))
        self.pushButton.setText(_translate("DialogPack", "delete"))

