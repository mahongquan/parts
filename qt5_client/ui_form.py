# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'form.ui'
#
# Created: Sun Sep 28 11:08:10 2014
#      by: PyQt4 UI code generator 4.9.6
#
# WARNING! All changes made in this file will be lost!

from PyQt4 import QtCore, QtGui

try:
    _fromUtf8 = QtCore.QString.fromUtf8
except AttributeError:
    def _fromUtf8(s):
        return s

try:
    _encoding = QtGui.QApplication.UnicodeUTF8
    def _translate(context, text, disambig):
        return QtGui.QApplication.translate(context, text, disambig, _encoding)
except AttributeError:
    def _translate(context, text, disambig):
        return QtGui.QApplication.translate(context, text, disambig)

class Ui_CalculatorForm(object):
    def setupUi(self, CalculatorForm):
        CalculatorForm.setObjectName(_fromUtf8("CalculatorForm"))
        CalculatorForm.resize(492, 527)
        sizePolicy = QtGui.QSizePolicy(QtGui.QSizePolicy.Preferred, QtGui.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(CalculatorForm.sizePolicy().hasHeightForWidth())
        CalculatorForm.setSizePolicy(sizePolicy)
        self.verticalLayout_7 = QtGui.QVBoxLayout(CalculatorForm)
        self.verticalLayout_7.setObjectName(_fromUtf8("verticalLayout_7"))
        self.groupBox = QtGui.QGroupBox(CalculatorForm)
        self.groupBox.setTitle(_fromUtf8(""))
        self.groupBox.setObjectName(_fromUtf8("groupBox"))
        self.verticalLayout_5 = QtGui.QVBoxLayout(self.groupBox)
        self.verticalLayout_5.setObjectName(_fromUtf8("verticalLayout_5"))
        self.horizontalLayout_9 = QtGui.QHBoxLayout()
        self.horizontalLayout_9.setObjectName(_fromUtf8("horizontalLayout_9"))
        self.gridLayout = QtGui.QGridLayout()
        self.gridLayout.setObjectName(_fromUtf8("gridLayout"))
        self.horizontalLayout = QtGui.QHBoxLayout()
        self.horizontalLayout.setObjectName(_fromUtf8("horizontalLayout"))
        self.label = QtGui.QLabel(self.groupBox)
        self.label.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label.setObjectName(_fromUtf8("label"))
        self.horizontalLayout.addWidget(self.label)
        self.inputSpinBox_com = QtGui.QComboBox(self.groupBox)
        self.inputSpinBox_com.setObjectName(_fromUtf8("inputSpinBox_com"))
        self.horizontalLayout.addWidget(self.inputSpinBox_com)
        self.gridLayout.addLayout(self.horizontalLayout, 0, 0, 1, 1)
        self.horizontalLayout_6 = QtGui.QHBoxLayout()
        self.horizontalLayout_6.setObjectName(_fromUtf8("horizontalLayout_6"))
        self.label_6 = QtGui.QLabel(self.groupBox)
        self.label_6.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_6.setObjectName(_fromUtf8("label_6"))
        self.horizontalLayout_6.addWidget(self.label_6)
        self.inputSpinBox_databit = QtGui.QSpinBox(self.groupBox)
        self.inputSpinBox_databit.setObjectName(_fromUtf8("inputSpinBox_databit"))
        self.horizontalLayout_6.addWidget(self.inputSpinBox_databit)
        self.gridLayout.addLayout(self.horizontalLayout_6, 0, 1, 1, 1)
        self.horizontalLayout_2 = QtGui.QHBoxLayout()
        self.horizontalLayout_2.setObjectName(_fromUtf8("horizontalLayout_2"))
        self.label_2 = QtGui.QLabel(self.groupBox)
        self.label_2.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_2.setObjectName(_fromUtf8("label_2"))
        self.horizontalLayout_2.addWidget(self.label_2)
        self.inputSpinBox_baud = QtGui.QSpinBox(self.groupBox)
        self.inputSpinBox_baud.setObjectName(_fromUtf8("inputSpinBox_baud"))
        self.horizontalLayout_2.addWidget(self.inputSpinBox_baud)
        self.gridLayout.addLayout(self.horizontalLayout_2, 1, 0, 1, 1)
        self.horizontalLayout_5 = QtGui.QHBoxLayout()
        self.horizontalLayout_5.setObjectName(_fromUtf8("horizontalLayout_5"))
        self.label_5 = QtGui.QLabel(self.groupBox)
        self.label_5.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_5.setObjectName(_fromUtf8("label_5"))
        self.horizontalLayout_5.addWidget(self.label_5)
        self.inputSpinBox_stopbit = QtGui.QSpinBox(self.groupBox)
        self.inputSpinBox_stopbit.setObjectName(_fromUtf8("inputSpinBox_stopbit"))
        self.horizontalLayout_5.addWidget(self.inputSpinBox_stopbit)
        self.gridLayout.addLayout(self.horizontalLayout_5, 1, 1, 1, 1)
        self.horizontalLayout_3 = QtGui.QHBoxLayout()
        self.horizontalLayout_3.setObjectName(_fromUtf8("horizontalLayout_3"))
        self.label_3 = QtGui.QLabel(self.groupBox)
        self.label_3.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_3.setObjectName(_fromUtf8("label_3"))
        self.horizontalLayout_3.addWidget(self.label_3)
        self.inputSpinBox_parity = QtGui.QSpinBox(self.groupBox)
        self.inputSpinBox_parity.setObjectName(_fromUtf8("inputSpinBox_parity"))
        self.horizontalLayout_3.addWidget(self.inputSpinBox_parity)
        self.gridLayout.addLayout(self.horizontalLayout_3, 2, 0, 1, 1)
        self.horizontalLayout_9.addLayout(self.gridLayout)
        self.pushButton_set = QtGui.QPushButton(self.groupBox)
        self.pushButton_set.setMaximumSize(QtCore.QSize(60, 16777215))
        self.pushButton_set.setObjectName(_fromUtf8("pushButton_set"))
        self.horizontalLayout_9.addWidget(self.pushButton_set)
        self.verticalLayout_5.addLayout(self.horizontalLayout_9)
        self.verticalLayout_7.addWidget(self.groupBox)
        self.groupBox_2 = QtGui.QGroupBox(CalculatorForm)
        self.groupBox_2.setTitle(_fromUtf8(""))
        self.groupBox_2.setObjectName(_fromUtf8("groupBox_2"))
        self.verticalLayout_8 = QtGui.QVBoxLayout(self.groupBox_2)
        self.verticalLayout_8.setObjectName(_fromUtf8("verticalLayout_8"))
        self.horizontalLayout_8 = QtGui.QHBoxLayout()
        self.horizontalLayout_8.setContentsMargins(100, -1, 200, -1)
        self.horizontalLayout_8.setObjectName(_fromUtf8("horizontalLayout_8"))
        self.label_7 = QtGui.QLabel(self.groupBox_2)
        self.label_7.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_7.setObjectName(_fromUtf8("label_7"))
        self.horizontalLayout_8.addWidget(self.label_7)
        self.lineEdit_slaveid = QtGui.QLineEdit(self.groupBox_2)
        self.lineEdit_slaveid.setObjectName(_fromUtf8("lineEdit_slaveid"))
        self.horizontalLayout_8.addWidget(self.lineEdit_slaveid)
        self.verticalLayout_8.addLayout(self.horizontalLayout_8)
        self.horizontalLayout_4 = QtGui.QHBoxLayout()
        self.horizontalLayout_4.setObjectName(_fromUtf8("horizontalLayout_4"))
        self.groupBox_3 = QtGui.QGroupBox(self.groupBox_2)
        self.groupBox_3.setAutoFillBackground(False)
        self.groupBox_3.setTitle(_fromUtf8(""))
        self.groupBox_3.setObjectName(_fromUtf8("groupBox_3"))
        self.verticalLayout_3 = QtGui.QVBoxLayout(self.groupBox_3)
        self.verticalLayout_3.setObjectName(_fromUtf8("verticalLayout_3"))
        self.verticalLayout = QtGui.QVBoxLayout()
        self.verticalLayout.setObjectName(_fromUtf8("verticalLayout"))
        self.gridLayout_2 = QtGui.QGridLayout()
        self.gridLayout_2.setObjectName(_fromUtf8("gridLayout_2"))
        self.label_8 = QtGui.QLabel(self.groupBox_3)
        self.label_8.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_8.setObjectName(_fromUtf8("label_8"))
        self.gridLayout_2.addWidget(self.label_8, 0, 0, 1, 1)
        self.lineEdit_startaddress = QtGui.QLineEdit(self.groupBox_3)
        self.lineEdit_startaddress.setObjectName(_fromUtf8("lineEdit_startaddress"))
        self.gridLayout_2.addWidget(self.lineEdit_startaddress, 0, 1, 1, 1)
        self.label_9 = QtGui.QLabel(self.groupBox_3)
        self.label_9.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_9.setObjectName(_fromUtf8("label_9"))
        self.gridLayout_2.addWidget(self.label_9, 1, 0, 1, 1)
        self.lineEdit_registernum = QtGui.QLineEdit(self.groupBox_3)
        self.lineEdit_registernum.setObjectName(_fromUtf8("lineEdit_registernum"))
        self.gridLayout_2.addWidget(self.lineEdit_registernum, 1, 1, 1, 1)
        self.verticalLayout.addLayout(self.gridLayout_2)
        self.pushButton_read = QtGui.QPushButton(self.groupBox_3)
        self.pushButton_read.setMaximumSize(QtCore.QSize(60, 16777215))
        self.pushButton_read.setObjectName(_fromUtf8("pushButton_read"))
        self.verticalLayout.addWidget(self.pushButton_read)
        self.verticalLayout_3.addLayout(self.verticalLayout)
        self.horizontalLayout_4.addWidget(self.groupBox_3)
        self.groupBox_4 = QtGui.QGroupBox(self.groupBox_2)
        self.groupBox_4.setStyleSheet(_fromUtf8("background:rgb(129, 155, 228)"))
        self.groupBox_4.setTitle(_fromUtf8(""))
        self.groupBox_4.setObjectName(_fromUtf8("groupBox_4"))
        self.verticalLayout_6 = QtGui.QVBoxLayout(self.groupBox_4)
        self.verticalLayout_6.setObjectName(_fromUtf8("verticalLayout_6"))
        self.verticalLayout_2 = QtGui.QVBoxLayout()
        self.verticalLayout_2.setContentsMargins(0, 0, 14, 12)
        self.verticalLayout_2.setObjectName(_fromUtf8("verticalLayout_2"))
        self.horizontalLayout_7 = QtGui.QHBoxLayout()
        self.horizontalLayout_7.setContentsMargins(46, -1, 38, -1)
        self.horizontalLayout_7.setObjectName(_fromUtf8("horizontalLayout_7"))
        self.label_10 = QtGui.QLabel(self.groupBox_4)
        self.label_10.setObjectName(_fromUtf8("label_10"))
        self.horizontalLayout_7.addWidget(self.label_10)
        self.lineEdit_startaddress2 = QtGui.QLineEdit(self.groupBox_4)
        self.lineEdit_startaddress2.setStyleSheet(_fromUtf8("background:rgb(255,255,255)"))
        self.lineEdit_startaddress2.setObjectName(_fromUtf8("lineEdit_startaddress2"))
        self.horizontalLayout_7.addWidget(self.lineEdit_startaddress2)
        self.verticalLayout_2.addLayout(self.horizontalLayout_7)
        self.tableWidget = QtGui.QTableWidget(self.groupBox_4)
        self.tableWidget.setStyleSheet(_fromUtf8("background:rgb(255,255,255)"))
        self.tableWidget.setObjectName(_fromUtf8("tableWidget"))
        self.tableWidget.setColumnCount(0)
        self.tableWidget.setRowCount(0)
        self.verticalLayout_2.addWidget(self.tableWidget)
        self.pushButton_write = QtGui.QPushButton(self.groupBox_4)
        self.pushButton_write.setMaximumSize(QtCore.QSize(60, 16777215))
        self.pushButton_write.setLayoutDirection(QtCore.Qt.RightToLeft)
        self.pushButton_write.setObjectName(_fromUtf8("pushButton_write"))
        self.verticalLayout_2.addWidget(self.pushButton_write)
        self.verticalLayout_6.addLayout(self.verticalLayout_2)
        self.horizontalLayout_4.addWidget(self.groupBox_4)
        self.verticalLayout_8.addLayout(self.horizontalLayout_4)
        self.verticalLayout_7.addWidget(self.groupBox_2)
        self.verticalLayout_4 = QtGui.QVBoxLayout()
        self.verticalLayout_4.setObjectName(_fromUtf8("verticalLayout_4"))
        self.textEdit = QtGui.QTextEdit(CalculatorForm)
        self.textEdit.setObjectName(_fromUtf8("textEdit"))
        self.verticalLayout_4.addWidget(self.textEdit)
        self.pushButton_clear = QtGui.QPushButton(CalculatorForm)
        self.pushButton_clear.setMaximumSize(QtCore.QSize(60, 16777215))
        self.pushButton_clear.setObjectName(_fromUtf8("pushButton_clear"))
        self.verticalLayout_4.addWidget(self.pushButton_clear)
        self.verticalLayout_7.addLayout(self.verticalLayout_4)

        self.retranslateUi(CalculatorForm)
        QtCore.QObject.connect(self.pushButton_set, QtCore.SIGNAL(_fromUtf8("clicked()")), CalculatorForm.setClick)
        QtCore.QObject.connect(self.pushButton_read, QtCore.SIGNAL(_fromUtf8("clicked()")), CalculatorForm.readClick)
        QtCore.QObject.connect(self.pushButton_write, QtCore.SIGNAL(_fromUtf8("clicked()")), CalculatorForm.readClick)
        QtCore.QObject.connect(self.pushButton_clear, QtCore.SIGNAL(_fromUtf8("clicked()")), CalculatorForm.clearClick)
        QtCore.QMetaObject.connectSlotsByName(CalculatorForm)

    def retranslateUi(self, CalculatorForm):
        CalculatorForm.setWindowTitle(_translate("CalculatorForm", "Modbus", None))
        self.label.setText(_translate("CalculatorForm", "COM", None))
        self.label_6.setText(_translate("CalculatorForm", "数据位", None))
        self.label_2.setText(_translate("CalculatorForm", "波特率", None))
        self.label_5.setText(_translate("CalculatorForm", "停止位", None))
        self.label_3.setText(_translate("CalculatorForm", "校验", None))
        self.pushButton_set.setText(_translate("CalculatorForm", "更改生效", None))
        self.label_7.setText(_translate("CalculatorForm", "设备号", None))
        self.label_8.setText(_translate("CalculatorForm", "起始地址", None))
        self.label_9.setText(_translate("CalculatorForm", "寄存器个数", None))
        self.pushButton_read.setText(_translate("CalculatorForm", "read", None))
        self.label_10.setText(_translate("CalculatorForm", "起始地址", None))
        self.pushButton_write.setText(_translate("CalculatorForm", "write", None))
        self.pushButton_clear.setText(_translate("CalculatorForm", "clear", None))

