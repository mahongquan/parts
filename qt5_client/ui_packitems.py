# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'qt5_client\packitems.ui'
#
# Created by: PyQt5 UI code generator 5.5.1
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_DialogPack(object):
    def setupUi(self, DialogPack):
        DialogPack.setObjectName("DialogPack")
        DialogPack.setWindowModality(QtCore.Qt.NonModal)
        DialogPack.resize(568, 505)
        self.verticalLayout_2 = QtWidgets.QVBoxLayout(DialogPack)
        self.verticalLayout_2.setObjectName("verticalLayout_2")
        self.horizontalLayout_2 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_2.setObjectName("horizontalLayout_2")
        self.label = QtWidgets.QLabel(DialogPack)
        self.label.setObjectName("label")
        self.horizontalLayout_2.addWidget(self.label)
        self.lineEdit_id = QtWidgets.QLineEdit(DialogPack)
        self.lineEdit_id.setObjectName("lineEdit_id")
        self.horizontalLayout_2.addWidget(self.lineEdit_id)
        self.label_2 = QtWidgets.QLabel(DialogPack)
        self.label_2.setObjectName("label_2")
        self.horizontalLayout_2.addWidget(self.label_2)
        self.lineEdit_name = QtWidgets.QLineEdit(DialogPack)
        self.lineEdit_name.setObjectName("lineEdit_name")
        self.horizontalLayout_2.addWidget(self.lineEdit_name)
        self.verticalLayout_2.addLayout(self.horizontalLayout_2)
        self.horizontalLayout_3 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_3.setObjectName("horizontalLayout_3")
        self.tableWidget = QtWidgets.QTableWidget(DialogPack)
        self.tableWidget.setObjectName("tableWidget")
        self.tableWidget.setColumnCount(0)
        self.tableWidget.setRowCount(0)
        self.horizontalLayout_3.addWidget(self.tableWidget)
        self.verticalLayout = QtWidgets.QVBoxLayout()
        self.verticalLayout.setObjectName("verticalLayout")
        self.pushButton = QtWidgets.QPushButton(DialogPack)
        self.pushButton.setObjectName("pushButton")
        self.verticalLayout.addWidget(self.pushButton)
        self.pushButton_3 = QtWidgets.QPushButton(DialogPack)
        self.pushButton_3.setObjectName("pushButton_3")
        self.verticalLayout.addWidget(self.pushButton_3)
        self.horizontalLayout_3.addLayout(self.verticalLayout)
        self.verticalLayout_2.addLayout(self.horizontalLayout_3)
        self.horizontalLayout_4 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_4.setObjectName("horizontalLayout_4")
        self.label_3 = QtWidgets.QLabel(DialogPack)
        self.label_3.setObjectName("label_3")
        self.horizontalLayout_4.addWidget(self.label_3)
        self.lineEdit_3 = QtWidgets.QLineEdit(DialogPack)
        self.lineEdit_3.setObjectName("lineEdit_3")
        self.horizontalLayout_4.addWidget(self.lineEdit_3)
        self.verticalLayout_2.addLayout(self.horizontalLayout_4)
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.lineEdit_4 = QtWidgets.QLineEdit(DialogPack)
        self.lineEdit_4.setObjectName("lineEdit_4")
        self.horizontalLayout.addWidget(self.lineEdit_4)
        self.pushButton_2 = QtWidgets.QPushButton(DialogPack)
        self.pushButton_2.setObjectName("pushButton_2")
        self.horizontalLayout.addWidget(self.pushButton_2)
        self.verticalLayout_2.addLayout(self.horizontalLayout)

        self.retranslateUi(DialogPack)
        self.pushButton_2.clicked.connect(DialogPack.add)
        QtCore.QMetaObject.connectSlotsByName(DialogPack)

    def retranslateUi(self, DialogPack):
        _translate = QtCore.QCoreApplication.translate
        DialogPack.setWindowTitle(_translate("DialogPack", "Dialog"))
        self.label.setText(_translate("DialogPack", "包id:"))
        self.label_2.setText(_translate("DialogPack", "包名称:"))
        self.pushButton.setText(_translate("DialogPack", "编辑"))
        self.pushButton_3.setText(_translate("DialogPack", "删除"))
        self.label_3.setText(_translate("DialogPack", "输入已有备件"))
        self.pushButton_2.setText(_translate("DialogPack", "新备件"))

