# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'qt5_client\contacts.ui'
#
# Created: Thu Apr 20 08:48:30 2017
#      by: PyQt5 UI code generator 5.4
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(777, 532)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.verticalLayout_2 = QtWidgets.QVBoxLayout(self.centralwidget)
        self.verticalLayout_2.setObjectName("verticalLayout_2")
        self.horizontalLayout_2 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_2.setObjectName("horizontalLayout_2")
        self.pushButton_newcontact = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_newcontact.setObjectName("pushButton_newcontact")
        self.horizontalLayout_2.addWidget(self.pushButton_newcontact)
        self.lineEdit = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit.setObjectName("lineEdit")
        self.horizontalLayout_2.addWidget(self.lineEdit)
        self.pushButton_search = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_search.setObjectName("pushButton_search")
        self.horizontalLayout_2.addWidget(self.pushButton_search)
        self.comboBox = QtWidgets.QComboBox(self.centralwidget)
        self.comboBox.setObjectName("comboBox")
        self.horizontalLayout_2.addWidget(self.comboBox)
        self.verticalLayout_2.addLayout(self.horizontalLayout_2)
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.tableWidget = QtWidgets.QTableWidget(self.centralwidget)
        self.tableWidget.setEditTriggers(QtWidgets.QAbstractItemView.AnyKeyPressed|QtWidgets.QAbstractItemView.CurrentChanged|QtWidgets.QAbstractItemView.DoubleClicked|QtWidgets.QAbstractItemView.EditKeyPressed)
        self.tableWidget.setSelectionMode(QtWidgets.QAbstractItemView.SingleSelection)
        self.tableWidget.setSelectionBehavior(QtWidgets.QAbstractItemView.SelectRows)
        self.tableWidget.setObjectName("tableWidget")
        self.tableWidget.setColumnCount(0)
        self.tableWidget.setRowCount(0)
        self.horizontalLayout.addWidget(self.tableWidget)
        self.verticalLayout = QtWidgets.QVBoxLayout()
        self.verticalLayout.setSizeConstraint(QtWidgets.QLayout.SetFixedSize)
        self.verticalLayout.setObjectName("verticalLayout")
        self.pushButton_yiqi = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_yiqi.setObjectName("pushButton_yiqi")
        self.verticalLayout.addWidget(self.pushButton_yiqi)
        self.pushButton = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton.setObjectName("pushButton")
        self.verticalLayout.addWidget(self.pushButton)
        self.pushButton_folder = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_folder.setObjectName("pushButton_folder")
        self.verticalLayout.addWidget(self.pushButton_folder)
        self.pushButton_4 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_4.setObjectName("pushButton_4")
        self.verticalLayout.addWidget(self.pushButton_4)
        self.pushButton_7 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_7.setObjectName("pushButton_7")
        self.verticalLayout.addWidget(self.pushButton_7)
        self.pushButton_chukudan = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton_chukudan.setObjectName("pushButton_chukudan")
        self.verticalLayout.addWidget(self.pushButton_chukudan)
        self.treeView = QtWidgets.QTreeView(self.centralwidget)
        self.treeView.setObjectName("treeView")
        self.verticalLayout.addWidget(self.treeView)
        self.verticalLayout.setStretch(1, 1)
        self.verticalLayout.setStretch(3, 1)
        self.verticalLayout.setStretch(4, 1)
        self.verticalLayout.setStretch(6, 1)
        self.horizontalLayout.addLayout(self.verticalLayout)
        self.horizontalLayout.setStretch(0, 5)
        self.horizontalLayout.setStretch(1, 2)
        self.verticalLayout_2.addLayout(self.horizontalLayout)
        MainWindow.setCentralWidget(self.centralwidget)

        self.retranslateUi(MainWindow)
        self.pushButton.clicked.connect(MainWindow.change)
        self.pushButton_yiqi.clicked.connect(MainWindow.yiqi)
        self.pushButton_search.clicked.connect(MainWindow.search)
        self.tableWidget.currentItemChanged['QTableWidgetItem*','QTableWidgetItem*'].connect(MainWindow.itemchanged)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "备件管理"))
        self.pushButton_newcontact.setText(_translate("MainWindow", "新合同"))
        self.pushButton_search.setText(_translate("MainWindow", "搜索"))
        self.pushButton_yiqi.setText(_translate("MainWindow", "仪器信息"))
        self.pushButton.setText(_translate("MainWindow", "详细"))
        self.pushButton_folder.setText(_translate("MainWindow", "资料文件夹"))
        self.pushButton_4.setText(_translate("MainWindow", "allfile"))
        self.pushButton_7.setText(_translate("MainWindow", "导入标样"))
        self.pushButton_chukudan.setText(_translate("MainWindow", "比对出库单"))

