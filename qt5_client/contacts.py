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
from genDoc.excel_write import *
import datetime
from genDoc.docx_write import genPack,genQue
import genDoc.genLabel
from genDoc.recordXml import genRecord

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
    return(left,notequal,items_chuku)
class CalculatorForm(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super(CalculatorForm, self).__init__(parent)
        
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.nm=""
        self.baoxiang=""
        self.ui.comboBox.addItem("")
        self.ui.comboBox.addItem("马红权")
        self.ui.comboBox.addItem("吴振宁")
        self.ui.comboBox.addItem("陈旺")
        self.ui.comboBox.activated['int'].connect(self.filter)
        
        self.ui.pushButton_chukudan.clicked.connect(self.bj)
        self.ui.pushButton_7.clicked.connect(self.importstand)

        self.model = QtWidgets.QFileSystemModel()
        self.model.setRootPath(r"D:\parts\media\仪器资料")
        self.ui.treeView.setModel(self.model)
        self.ui.treeView.clicked.connect(self.test)
        index = self.model.index(r"D:\parts\media\仪器资料")
        self.ui.treeView.setRootIndex(index)
        self.ui.treeView.expand(index)      #当前项展开
        self.ui.treeView.scrollTo(index)    #定位到当前项
        self.ui.treeView.setColumnWidth(0,260)
        self.ui.treeView.setColumnHidden(1,True)
        self.ui.treeView.setColumnHidden(2,True)
        _translate = QtCore.QCoreApplication.translate
        self.ui.pushButton_4.setText(_translate("MainWindow", "生成文件"))
        self.ui.pushButton_4.clicked.connect(self.allfile)
        self.ui.pushButton_folder.clicked.connect(self.folder)
        self.ui.pushButton_newcontact.clicked.connect(self.newcontact)
        d=backend.getContacts("","")
        self.showdata(d)

        headerGoods = self.ui.tableWidget.horizontalHeader()
        #SortIndicator为水平标题栏文字旁边的三角指示器
        headerGoods.setSortIndicator(0, QtCore.Qt.AscendingOrder)
        headerGoods.setSortIndicatorShown(True);
        #print(dir(headerGoods))
        #headerGoods.setClickable(True)
        headerGoods.sectionClicked.connect(self.ui.tableWidget.sortByColumn)
    def showtree(self,contactid):
        c=backend.getContact(contactid)
        path="D:/parts/media/仪器资料/%s" % str(c.yiqibh)
        self.model.setRootPath(path)
        self.ui.treeView.setModel(self.model)
        self.ui.treeView.doubleClicked.connect(self.test)
        index = self.model.index(path)
        self.ui.treeView.setRootIndex(index)
        self.ui.treeView.expand(index)      #当前项展开
        #self.ui.treeView.scrollTo(index)    #定位到当前项
        #self.ui.treeView.resizeColumnToContents(0)
    def test(self, signal):
        file_path=self.model.filePath(signal)
        cmd='start %s' % file_path
        print(cmd)
        os.system(cmd)
    def showdata(self,d):
        self.rows=len(d)
        self.cols=8
        self.ui.tableWidget.setRowCount(self.rows)
        self.ui.tableWidget.setColumnCount(self.cols)
        self.ui.tableWidget.setHorizontalHeaderItem(0,QtWidgets.QTableWidgetItem("id"))
        self.ui.tableWidget.setHorizontalHeaderItem(1,QtWidgets.QTableWidgetItem("用户"))
        self.ui.tableWidget.setHorizontalHeaderItem(2,QtWidgets.QTableWidgetItem("合同号"))
        self.ui.tableWidget.setHorizontalHeaderItem(3,QtWidgets.QTableWidgetItem("发货时间"))
        self.ui.tableWidget.setHorizontalHeaderItem(4,QtWidgets.QTableWidgetItem("包箱"))
        self.ui.tableWidget.setHorizontalHeaderItem(5,QtWidgets.QTableWidgetItem("仪器编号"))
        self.ui.tableWidget.setHorizontalHeaderItem(6,QtWidgets.QTableWidgetItem("仪器型号"))
        self.ui.tableWidget.setHorizontalHeaderItem(7,QtWidgets.QTableWidgetItem("客户地址"))
        self.ui.tableWidget.setHorizontalHeaderItem(8,QtWidgets.QTableWidgetItem("通道"))
        for i in range(len(d)):
            one=d[i]
            theid=one.id
            adr=one.yonghu
            val=one.hetongbh
            tm=str(one.yujifahuo_date)
            bx=one.baoxiang
            item=QtWidgets.QTableWidgetItem()
            item.setData(QtCore.Qt.DisplayRole, theid)
            self.ui.tableWidget.setItem(i, 0,item)
            
            self.ui.tableWidget.setItem(i, 1, QtWidgets.QTableWidgetItem(adr))
            self.ui.tableWidget.setItem(i, 2, QtWidgets.QTableWidgetItem(val))
            self.ui.tableWidget.setItem(i, 3, QtWidgets.QTableWidgetItem(tm))
            self.ui.tableWidget.setItem(i, 4, QtWidgets.QTableWidgetItem(bx))
            self.ui.tableWidget.setItem(i, 5, QtWidgets.QTableWidgetItem(one.yiqibh))
            self.ui.tableWidget.setItem(i, 6, QtWidgets.QTableWidgetItem(one.yiqixinghao))
            self.ui.tableWidget.setItem(i, 7, QtWidgets.QTableWidgetItem(one.addr))
            self.ui.tableWidget.setItem(i, 8, QtWidgets.QTableWidgetItem(one.channels))
            i+=1 
        self.ui.tableWidget.setCurrentCell(0,0)
        self.ui.tableWidget.setColumnWidth(1,200)
    def newcontact(self):
        c=contact.ContactDlg(self)
        c.showdata(None)
        c.exec()
        cs=backend.getContacts(self.nm,self.baoxiang)
        self.showdata(cs)
    def yiqi(self):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)
        c=contact.ContactDlg(self)
        if it!=None:
            contactid=int(it.text())
            c.showdata(backend.getContact(contactid))
        else:
            c.showdata(None)
            pass
        c.exec()
        #refresh
        cs=backend.getContacts(self.nm,self.baoxiang)
        self.showdata(cs)
        pass
    def itemchanged(self,i):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)
        if it!=None:
            contactid=int(it.text())
            print(contactid)
            self.showtree(contactid)
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
    def folder(self):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)#self.ui.tableWidget.currentColumn()))
        if it==None:
            return 
        contactid=int(it.text())
        c=backend.getContact(contactid)
        MEDIA_ROOT="d:\\parts\\media"
        p=MEDIA_ROOT+"\\仪器资料\\"+c.yiqibh
        if not os.path.exists(p):
            os.makedirs(p)
        cmd="start %s" % p
        os.system(cmd)
    def allfile(self):
        it=self.ui.tableWidget.item(self.ui.tableWidget.currentRow(),0)#self.ui.tableWidget.currentColumn()))
        if it==None:
            return 
        contactid=int(it.text())
        c=backend.getContact(contactid)
        outfilename=c.yiqixinghao+"_"+c.yonghu
        outfilename=outfilename[0:30]
        dir1="证书_"+outfilename
        #p="d:/parts/media/仪器资料/"+c.yiqibh
        MEDIA_ROOT=r"d:/parts/media"
        p=os.path.join(MEDIA_ROOT,"仪器资料/"+c.yiqibh)
        #证书
        dir1=p+"/"+outfilename
        logging.info(dir1)
        if not os.path.exists(dir1):
            os.makedirs(dir1)
        file1=dir1+"/证书数据表.xlsx"
        if not os.path.exists(file1):
            fullfilepath = os.path.join(MEDIA_ROOT,"t_证书数据表.xlsx")
            data=genShujubiao(c,fullfilepath)
            open(file1,"wb").write(data)
        file2=dir1+"/"+c.yonghu+"证书.xlsx"
        if not os.path.exists(file2):
            data2=getJiaoZhunFile(c)
            open(file2,"wb").write(data2)
        file3=p+"/"+outfilename+"_装箱单.docx"
        if not os.path.exists(file3):
            fullfilepath = os.path.join(MEDIA_ROOT,"t_装箱单.docx")
            data_zxd=genPack(c,fullfilepath)
            open(file3,"wb").write(data_zxd)
        file4=p+"/"+"标签.lbx"
        if not os.path.exists(file4):
            data_lbl=genDoc.genLabel.genLabel(c.yiqixinghao,c.yiqibh,c.channels)
            open(file4,"wb").write(data_lbl)
        logging.info(c.method)
        logging.info(type(c.method))
        if c.method!=None:
            try:
                logging.info("here")
                fullfilepath = os.path.join(MEDIA_ROOT,c.method.path)
                logging.info(fullfilepath)
                (data_record,data_xishu)=genRecord(fullfilepath,c)
                file5=p+"/"+c.yiqibh+"调试记录.docx"
                if not os.path.exists(file5):
                    open(file5,"wb").write(data_record)
                file6=p+"/"+"系数.lbx"
                if not os.path.exists(file6):
                    open(file6,"wb").write(data_xishu)
            except ValueError as e:
                logging.info(e)
                try:
                    (data_record,data_xishu)=genRecord("",c)
                    file5=p+"/"+c.yiqibh+"调试记录.docx"
                    if not os.path.exists(file5):
                        open(file5,"wb").write(data_record)
                except ValueError as e:
                    logging.info(e)
                    pass
            except:
                traceback.print_exc()
                logging.info("except")
        QtWidgets.QMessageBox.information(self, "Title", "完成", QtWidgets.QMessageBox.Ok)
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
    m.show()#Maximized()
    sys.exit(app.exec_())
if __name__ == '__main__':
    main()