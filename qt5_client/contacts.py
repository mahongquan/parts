#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
import pickle
from PyQt5 import QtCore, QtWidgets,QtWidgets
from PyQt5.QtWidgets import QFileDialog
from .ui_contacts import Ui_MainWindow
from . import  backend  
import logging
from . import usepacks
from . import detail
from . import chuku
import readChuKu
from . import contact
import xlrd
def readBeiliaofile(fn):
    book = xlrd.open_workbook(fn)
    table=book.sheets()[0]
    nrows = table.nrows
    ncols = table.ncols
    begin=False
    dan=[]
    for i in range(nrows-7):
        #print(i,table.row_values(i)[0])
        cells=table.row_values(7+i)
        dan.append((cells[0],cells[1],cells[7]))#bh,name,ct
    return dan
def inItems(item,items):
    inIt=False
    equal=False
    v=None
    for i in range(len(items)):
        if items[i][0]==item[0]:
            inIt=True
            if items[i][2]==item[2]:
                equal=True
            v=items[i]
            items.remove(items[i])
            break
    return(inIt,equal,v)
def printList(items):
    r=[]
    for item in items:
        r1=[]
        for one in item:
            r1.append(str(one))
        r.append(",".join(r1))
    return "\n".join(r)
def bjitems(items,items_chuku):
    #(left,middle,right)bjitems(items,items_chuku)
    left=[]
    equal=[]
    notequal=[]
    for item in items:
        (inIt,equalv,v)=inItems(item,items_chuku)
        if inIt:
            if equalv:
                equal.append(item)
            else:
                notequal.append(item)
                notequal.append(v)
        else:
            left.append(item)
    # print("left")
    # print(printList(left))
    # print("equal")
    # print(printList(equal))
    # print("!equal")
    # print(printList(notequal))
    # print("right")
    # print(printList(items_chuku))
    return(left,notequal,items_chuku)
class CalculatorForm(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super(CalculatorForm, self).__init__(parent)
        
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.nm=""
        self.baoxiang=""
        self.ui.comboBox.addItem("马红权")
        self.ui.comboBox.addItem("陈旺")
        self.ui.comboBox.addItem("")
        self.ui.comboBox.activated['int'].connect(self.filter)
        d=backend.getContacts("","")
        self.showdata(d)
        self.ui.pushButton_chukudan.clicked.connect(self.bj)
        self.ui.pushButton_7.clicked.connect(self.importstand)
    def showdata(self,d):
        self.rows=len(d)
        self.cols=6
        self.ui.tableWidget.setRowCount(self.rows)
        self.ui.tableWidget.setColumnCount(self.cols)
        self.ui.tableWidget.setHorizontalHeaderItem(0,QtWidgets.QTableWidgetItem("id"))
        self.ui.tableWidget.setHorizontalHeaderItem(1,QtWidgets.QTableWidgetItem("用户"))
        self.ui.tableWidget.setHorizontalHeaderItem(2,QtWidgets.QTableWidgetItem("合同号"))
        self.ui.tableWidget.setHorizontalHeaderItem(3,QtWidgets.QTableWidgetItem("发货时间"))
        self.ui.tableWidget.setHorizontalHeaderItem(4,QtWidgets.QTableWidgetItem("包箱"))
        self.ui.tableWidget.setHorizontalHeaderItem(5,QtWidgets.QTableWidgetItem("仪器编号"))
        for i in range(len(d)):
            one=d[i]
            #print one
            # if backend.USEREST:
            #     theid=one["id"]
            #     adr=one["yonghu"]
            #     val=one["hetongbh"]
            #     tm=one["yujifahuo_date"]
            # else:
            theid=one.id
            adr=one.yonghu
            val=one.hetongbh
            tm=str(one.yujifahuo_date)
            bx=one.baoxiang
            self.ui.tableWidget.setItem(i, 0, QtWidgets.QTableWidgetItem(str(theid)))
            self.ui.tableWidget.setItem(i, 1, QtWidgets.QTableWidgetItem(adr))
            self.ui.tableWidget.setItem(i, 2, QtWidgets.QTableWidgetItem(val))
            self.ui.tableWidget.setItem(i, 3, QtWidgets.QTableWidgetItem(tm))
            self.ui.tableWidget.setItem(i, 4, QtWidgets.QTableWidgetItem(bx))
            self.ui.tableWidget.setItem(i, 5, QtWidgets.QTableWidgetItem(one.yiqibh))
            i+=1 
    def yiqi(self):
        #row=self.ui.tableWidget.currentRow()
        #t=self.ui.tableWidget.item(row,0)
        #postdata={"htbh":"1"}
        #backend.newContact(postdata)
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)
        c=contact.ContactDlg(self)
        if it!=None:
            c.showdata(int(it.text()))
        else:
            #c.showdata(-1)
            pass
        c.exec()

        pass
    def itemchanged(self,i):
        #print("itemchanged",i)
        pass
    def search(self):
        self.nm=self.ui.lineEdit.text()
        cs=backend.getContacts(self.nm,self.baoxiang)
        self.showdata(cs)
        pass
    def filter(self):
        self.baoxiang=self.ui.comboBox.currentText()
        cs=backend.getContacts(self.nm,self.baoxiang)
        self.showdata(cs)
        pass
    @QtCore.pyqtSlot()
    def change(self):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)
        c=detail.ContactDlg(self)
        c.showMaximized()
        if it!=None:
            c.showdata(int(it.text()))
        else:
            pass
        c.exec()
    def importstand(self):
        (fileName,fileType)= QFileDialog.getOpenFileName(None,"Open Excel file", r"C:\Users\group2\Desktop","Excel Files ( *.xlsx *.xls)")
        backend.readStandardFile(fileName)
    def bj(self):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)#self.ui.tableWidget.currentColumn()))
        if it==None:
            return        
        contactid=int(it.text())
        (fileName,fileType)= QFileDialog.getOpenFileName(None,"Open Excel file", r"C:\Users\group2\Desktop\备料计划导出文件","Excel Files ( *.xlsx *.xls)")
        items_chuku=readBeiliaofile(fileName)
        r=backend.getContactItems(contactid)
        print(r,items_chuku)
        (left,notequal,right)=bjitems(r,items_chuku)
        c=chuku.ContactDlg(self)
        c.showdata(left,notequal,right)
        c.showMaximized()
        c.exec()
    def myprint(self,s):
        #print dir(self.ui.textEdit)
        self.ui.textEdit.append(s)
    def closeEvent(self,e):
        pass
        #d=self.tableTodict()
        #pickle.dump(d,open(getpath.getpath()+"data.pickle","w"))
def main():
    import sys
    from .login import LoginDlg
    app = QtWidgets.QApplication(sys.argv)
    # calculator = LoginDlg()
    # r=calculator.exec_()
    # print(r)
    # if r==1:
    #     m = CalculatorForm()
    #     m.show()
    #     sys.exit(app.exec_())
    m = CalculatorForm()
    m.showMaximized()
    sys.exit(app.exec_())
if __name__ == '__main__':
    main()