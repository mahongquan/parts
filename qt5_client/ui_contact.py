# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'qt5_client\contact.ui'
#
# Created: Wed Apr 19 15:21:37 2017
#      by: PyQt5 UI code generator 5.4
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_Form(object):
    def setupUi(self, Form):
        Form.setObjectName("Form")
        Form.resize(744, 611)
        self.verticalLayout_5 = QtWidgets.QVBoxLayout(Form)
        self.verticalLayout_5.setObjectName("verticalLayout_5")
        self.gridLayout = QtWidgets.QGridLayout()
        self.gridLayout.setObjectName("gridLayout")
        self.label = QtWidgets.QLabel(Form)
        self.label.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label.setObjectName("label")
        self.gridLayout.addWidget(self.label, 0, 0, 1, 1)
        self.lineEdit_id = QtWidgets.QLineEdit(Form)
        self.lineEdit_id.setEnabled(False)
        self.lineEdit_id.setObjectName("lineEdit_id")
        self.gridLayout.addWidget(self.lineEdit_id, 0, 1, 1, 1)
        self.label_10 = QtWidgets.QLabel(Form)
        self.label_10.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_10.setObjectName("label_10")
        self.gridLayout.addWidget(self.label_10, 0, 2, 1, 1)
        self.lineEdit_yonghu = QtWidgets.QLineEdit(Form)
        self.lineEdit_yonghu.setObjectName("lineEdit_yonghu")
        self.gridLayout.addWidget(self.lineEdit_yonghu, 0, 3, 1, 1)
        self.label_2 = QtWidgets.QLabel(Form)
        self.label_2.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_2.setObjectName("label_2")
        self.gridLayout.addWidget(self.label_2, 1, 0, 1, 1)
        self.lineEdit_addr = QtWidgets.QLineEdit(Form)
        self.lineEdit_addr.setStyleSheet("background-color:  rgba(124, 200,128, 255)")
        self.lineEdit_addr.setObjectName("lineEdit_addr")
        self.gridLayout.addWidget(self.lineEdit_addr, 1, 1, 1, 1)
        self.label_11 = QtWidgets.QLabel(Form)
        self.label_11.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_11.setObjectName("label_11")
        self.gridLayout.addWidget(self.label_11, 1, 2, 1, 1)
        self.lineEdit_channels = QtWidgets.QLineEdit(Form)
        self.lineEdit_channels.setObjectName("lineEdit_channels")
        self.gridLayout.addWidget(self.lineEdit_channels, 1, 3, 1, 1)
        self.label_3 = QtWidgets.QLabel(Form)
        self.label_3.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_3.setObjectName("label_3")
        self.gridLayout.addWidget(self.label_3, 2, 0, 1, 1)
        self.lineEdit_yiqixinghao = QtWidgets.QLineEdit(Form)
        self.lineEdit_yiqixinghao.setObjectName("lineEdit_yiqixinghao")
        self.gridLayout.addWidget(self.lineEdit_yiqixinghao, 2, 1, 1, 1)
        self.label_9 = QtWidgets.QLabel(Form)
        self.label_9.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_9.setObjectName("label_9")
        self.gridLayout.addWidget(self.label_9, 2, 2, 1, 1)
        self.lineEdit_yiqibh = QtWidgets.QLineEdit(Form)
        self.lineEdit_yiqibh.setObjectName("lineEdit_yiqibh")
        self.gridLayout.addWidget(self.lineEdit_yiqibh, 2, 3, 1, 1)
        self.label_5 = QtWidgets.QLabel(Form)
        self.label_5.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_5.setObjectName("label_5")
        self.gridLayout.addWidget(self.label_5, 3, 0, 1, 1)
        self.lineEdit_baoxiang = QtWidgets.QLineEdit(Form)
        self.lineEdit_baoxiang.setObjectName("lineEdit_baoxiang")
        self.gridLayout.addWidget(self.lineEdit_baoxiang, 3, 1, 1, 1)
        self.label_8 = QtWidgets.QLabel(Form)
        self.label_8.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_8.setObjectName("label_8")
        self.gridLayout.addWidget(self.label_8, 3, 2, 1, 1)
        self.lineEdit_shenhe = QtWidgets.QLineEdit(Form)
        self.lineEdit_shenhe.setObjectName("lineEdit_shenhe")
        self.gridLayout.addWidget(self.lineEdit_shenhe, 3, 3, 1, 1)
        self.label_6 = QtWidgets.QLabel(Form)
        self.label_6.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_6.setObjectName("label_6")
        self.gridLayout.addWidget(self.label_6, 4, 0, 1, 1)
        self.lineEdit_yujifahuo_date = QtWidgets.QLineEdit(Form)
        self.lineEdit_yujifahuo_date.setObjectName("lineEdit_yujifahuo_date")
        self.gridLayout.addWidget(self.lineEdit_yujifahuo_date, 4, 1, 1, 1)
        self.label_7 = QtWidgets.QLabel(Form)
        self.label_7.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_7.setObjectName("label_7")
        self.gridLayout.addWidget(self.label_7, 4, 2, 1, 1)
        self.lineEdit_tiaoshi_date = QtWidgets.QLineEdit(Form)
        self.lineEdit_tiaoshi_date.setObjectName("lineEdit_tiaoshi_date")
        self.gridLayout.addWidget(self.lineEdit_tiaoshi_date, 4, 3, 1, 1)
        self.label_4 = QtWidgets.QLabel(Form)
        self.label_4.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_4.setObjectName("label_4")
        self.gridLayout.addWidget(self.label_4, 5, 0, 1, 1)
        self.lineEdit_hetongbh = QtWidgets.QLineEdit(Form)
        self.lineEdit_hetongbh.setObjectName("lineEdit_hetongbh")
        self.gridLayout.addWidget(self.lineEdit_hetongbh, 5, 1, 1, 1)
        self.label_12 = QtWidgets.QLabel(Form)
        self.label_12.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.label_12.setObjectName("label_12")
        self.gridLayout.addWidget(self.label_12, 5, 2, 1, 1)
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.lineEdit_method = QtWidgets.QLineEdit(Form)
        self.lineEdit_method.setReadOnly(True)
        self.lineEdit_method.setObjectName("lineEdit_method")
        self.horizontalLayout.addWidget(self.lineEdit_method)
        self.pushButton_method = QtWidgets.QPushButton(Form)
        self.pushButton_method.setObjectName("pushButton_method")
        self.horizontalLayout.addWidget(self.pushButton_method)
        self.gridLayout.addLayout(self.horizontalLayout, 5, 3, 1, 1)
        self.verticalLayout_5.addLayout(self.gridLayout)
        self.horizontalLayout_2 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_2.setObjectName("horizontalLayout_2")
        self.pushButton_save = QtWidgets.QPushButton(Form)
        self.pushButton_save.setObjectName("pushButton_save")
        self.horizontalLayout_2.addWidget(self.pushButton_save)
        self.pushButton_clear = QtWidgets.QPushButton(Form)
        self.pushButton_clear.setObjectName("pushButton_clear")
        self.horizontalLayout_2.addWidget(self.pushButton_clear)
        self.pushButton_copy = QtWidgets.QPushButton(Form)
        self.pushButton_copy.setObjectName("pushButton_copy")
        self.horizontalLayout_2.addWidget(self.pushButton_copy)
        self.verticalLayout_5.addLayout(self.horizontalLayout_2)
        self.frame = QtWidgets.QFrame(Form)
        self.frame.setFrameShape(QtWidgets.QFrame.StyledPanel)
        self.frame.setFrameShadow(QtWidgets.QFrame.Raised)
        self.frame.setObjectName("frame")
        self.verticalLayout_4 = QtWidgets.QVBoxLayout(self.frame)
        self.verticalLayout_4.setObjectName("verticalLayout_4")
        self.horizontalLayout_5 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_5.setObjectName("horizontalLayout_5")
        self.tableWidget = QtWidgets.QTableWidget(self.frame)
        self.tableWidget.setObjectName("tableWidget")
        self.tableWidget.setColumnCount(0)
        self.tableWidget.setRowCount(0)
        self.horizontalLayout_5.addWidget(self.tableWidget)
        self.verticalLayout = QtWidgets.QVBoxLayout()
        self.verticalLayout.setObjectName("verticalLayout")
        self.horizontalLayout_3 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_3.setObjectName("horizontalLayout_3")
        self.lineEdit_pack = QtWidgets.QLineEdit(self.frame)
        self.lineEdit_pack.setFocusPolicy(QtCore.Qt.ClickFocus)
        self.lineEdit_pack.setObjectName("lineEdit_pack")
        self.horizontalLayout_3.addWidget(self.lineEdit_pack)
        self.comboBox = QtWidgets.QComboBox(self.frame)
        self.comboBox.setMinimumSize(QtCore.QSize(150, 0))
        self.comboBox.setEditable(False)
        self.comboBox.setObjectName("comboBox")
        self.horizontalLayout_3.addWidget(self.comboBox)
        self.pushButton_bibei = QtWidgets.QPushButton(self.frame)
        self.pushButton_bibei.setObjectName("pushButton_bibei")
        self.horizontalLayout_3.addWidget(self.pushButton_bibei)
        self.verticalLayout.addLayout(self.horizontalLayout_3)
        self.horizontalLayout_4 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_4.setObjectName("horizontalLayout_4")
        self.label_13 = QtWidgets.QLabel(self.frame)
        self.label_13.setObjectName("label_13")
        self.horizontalLayout_4.addWidget(self.label_13)
        self.lineEdit_packname = QtWidgets.QLineEdit(self.frame)
        self.lineEdit_packname.setObjectName("lineEdit_packname")
        self.horizontalLayout_4.addWidget(self.lineEdit_packname)
        self.pushButton_newpack = QtWidgets.QPushButton(self.frame)
        self.pushButton_newpack.setObjectName("pushButton_newpack")
        self.horizontalLayout_4.addWidget(self.pushButton_newpack)
        self.verticalLayout.addLayout(self.horizontalLayout_4)
        self.pushButton_deletepack = QtWidgets.QPushButton(self.frame)
        self.pushButton_deletepack.setObjectName("pushButton_deletepack")
        self.verticalLayout.addWidget(self.pushButton_deletepack)
        self.horizontalLayout_5.addLayout(self.verticalLayout)
        self.verticalLayout_4.addLayout(self.horizontalLayout_5)
        self.verticalLayout_2 = QtWidgets.QVBoxLayout()
        self.verticalLayout_2.setObjectName("verticalLayout_2")
        self.horizontalLayout_6 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_6.setObjectName("horizontalLayout_6")
        self.tableWidget_2 = QtWidgets.QTableWidget(self.frame)
        self.tableWidget_2.setObjectName("tableWidget_2")
        self.tableWidget_2.setColumnCount(0)
        self.tableWidget_2.setRowCount(0)
        self.horizontalLayout_6.addWidget(self.tableWidget_2)
        self.verticalLayout_3 = QtWidgets.QVBoxLayout()
        self.verticalLayout_3.setObjectName("verticalLayout_3")
        self.pushButton_edititem = QtWidgets.QPushButton(self.frame)
        self.pushButton_edititem.setObjectName("pushButton_edititem")
        self.verticalLayout_3.addWidget(self.pushButton_edititem)
        self.pushButton_deleteitem = QtWidgets.QPushButton(self.frame)
        self.pushButton_deleteitem.setObjectName("pushButton_deleteitem")
        self.verticalLayout_3.addWidget(self.pushButton_deleteitem)
        self.horizontalLayout_6.addLayout(self.verticalLayout_3)
        self.verticalLayout_2.addLayout(self.horizontalLayout_6)
        self.horizontalLayout_7 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_7.setObjectName("horizontalLayout_7")
        self.label_14 = QtWidgets.QLabel(self.frame)
        self.label_14.setObjectName("label_14")
        self.horizontalLayout_7.addWidget(self.label_14)
        self.lineEdit_item = QtWidgets.QLineEdit(self.frame)
        self.lineEdit_item.setObjectName("lineEdit_item")
        self.horizontalLayout_7.addWidget(self.lineEdit_item)
        self.comboBox_2 = QtWidgets.QComboBox(self.frame)
        self.comboBox_2.setMinimumSize(QtCore.QSize(150, 0))
        self.comboBox_2.setEditable(True)
        self.comboBox_2.setObjectName("comboBox_2")
        self.horizontalLayout_7.addWidget(self.comboBox_2)
        self.verticalLayout_2.addLayout(self.horizontalLayout_7)
        self.horizontalLayout_8 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_8.setObjectName("horizontalLayout_8")
        self.lineEdit_itemname = QtWidgets.QLineEdit(self.frame)
        self.lineEdit_itemname.setObjectName("lineEdit_itemname")
        self.horizontalLayout_8.addWidget(self.lineEdit_itemname)
        self.pushButton_2 = QtWidgets.QPushButton(self.frame)
        self.pushButton_2.setObjectName("pushButton_2")
        self.horizontalLayout_8.addWidget(self.pushButton_2)
        self.verticalLayout_2.addLayout(self.horizontalLayout_8)
        self.verticalLayout_4.addLayout(self.verticalLayout_2)
        self.verticalLayout_5.addWidget(self.frame)

        self.retranslateUi(Form)
        self.pushButton_save.clicked.connect(Form.save)
        self.pushButton_method.clicked.connect(Form.method)
        self.pushButton_clear.clicked.connect(Form.clear)
        self.pushButton_copy.clicked.connect(Form.copy)
        self.pushButton_bibei.clicked.connect(Form.bibei)
        self.pushButton_newpack.clicked.connect(Form.newpack)
        self.tableWidget.itemSelectionChanged.connect(Form.itemselect)
        self.pushButton_edititem.clicked.connect(Form.editpackitem)
        self.pushButton_deleteitem.clicked.connect(Form.deletepackitem)
        self.pushButton_2.clicked.connect(Form.newpackitem)
        self.pushButton_deletepack.clicked.connect(Form.deletepack)
        self.comboBox_2.activated['int'].connect(Form.selectitem)
        self.lineEdit_addr.textChanged['QString'].connect(Form.textchange)
        self.lineEdit_yiqixinghao.textChanged['QString'].connect(Form.textchange)
        self.lineEdit_baoxiang.textChanged['QString'].connect(Form.textchange)
        self.lineEdit_yujifahuo_date.textChanged['QString'].connect(Form.textchange)
        self.lineEdit_hetongbh.textChanged['QString'].connect(Form.textchange)
        self.lineEdit_yonghu.textChanged['QString'].connect(Form.textchange)
        self.lineEdit_channels.textChanged['QString'].connect(Form.textchange)
        self.lineEdit_yiqibh.textChanged['QString'].connect(Form.textchange)
        self.lineEdit_shenhe.textChanged['QString'].connect(Form.textchange)
        self.lineEdit_tiaoshi_date.textChanged['QString'].connect(Form.textchange)
        self.comboBox.activated['int'].connect(Form.selectpack)
        self.lineEdit_item.textChanged['QString'].connect(Form.iteminput)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        _translate = QtCore.QCoreApplication.translate
        Form.setWindowTitle(_translate("Form", "仪器信息"))
        self.label.setText(_translate("Form", "id:"))
        self.label_10.setText(_translate("Form", "用户单位:"))
        self.label_2.setText(_translate("Form", "客户地址:"))
        self.label_11.setText(_translate("Form", "通道配置:"))
        self.label_3.setText(_translate("Form", "仪器型号:"))
        self.label_9.setText(_translate("Form", "仪器编号:"))
        self.label_5.setText(_translate("Form", "包箱:"))
        self.label_8.setText(_translate("Form", "审核:"))
        self.label_6.setText(_translate("Form", "预计发货时间:"))
        self.label_7.setText(_translate("Form", "调试时间:"))
        self.label_4.setText(_translate("Form", "合同编号:"))
        self.label_12.setText(_translate("Form", "方法:"))
        self.pushButton_method.setText(_translate("Form", "选取文件"))
        self.pushButton_save.setText(_translate("Form", "保存"))
        self.pushButton_clear.setText(_translate("Form", "清除"))
        self.pushButton_copy.setText(_translate("Form", "复制"))
        self.pushButton_bibei.setText(_translate("Form", "必备"))
        self.label_13.setText(_translate("Form", "新包名称："))
        self.pushButton_newpack.setText(_translate("Form", "新包"))
        self.pushButton_deletepack.setText(_translate("Form", "移去"))
        self.pushButton_edititem.setText(_translate("Form", "编辑"))
        self.pushButton_deleteitem.setText(_translate("Form", "删除"))
        self.label_14.setText(_translate("Form", "输入已有备件"))
        self.pushButton_2.setText(_translate("Form", "新备件"))

