#!/usr/bin/env python
from PyQt4 import QtCore, QtGui
from ui_form import Ui_CalculatorForm
import c1
import pymodbus

# from serial.tools import list_ports
# gports=[]
# for port, desc, hwid in sorted(list_ports.comports()):
    # gports.append(port) #print "%s: %s [%s]" % (port, desc, hwid)
import listReg
gports=listReg.getComPorts()
  
class CalculatorForm(QtGui.QWidget):
    def __init__(self, parent=None):
        super(CalculatorForm, self).__init__(parent)
        self.ui = Ui_CalculatorForm()
        self.ui.setupUi(self)
        for com in gports:
            self.ui.inputSpinBox_com.addItem(com)
        self.client=c1.Plc()
    #@QtCore.pyqtSlot()
    def readClick(self):
        slave=int(self.ui.lineEdit_slaveid.text())
        num=int(self.ui.lineEdit_registernum.text())
        start=int(self.ui.lineEdit_startaddress.text())
        res=self.client.read_holding_registers(start,num,unit=slave)
        self.myprint("read %d %d %d" % (slave,start,num) )#self.ui.outputWidget.setText(str(value + self.ui.inputSpinBox2.value()))
        if type(res)==pymodbus.pdu.ExceptionResponse:#
            self.myprint("except:"+str(res.exception_code))
        elif type(res)==pymodbus.register_read_message.ReadHoldingRegistersResponse:
            self.myprint(str(res.registers))
    def myprint(self,s):
        #print dir(self.ui.textEdit)
        self.ui.textEdit.append(s)
    #@QtCore.pyqtSlot()
    def writeClick(self):
        print "write click"#self.ui.outputWidget.setText(str(value + self.ui.inputSpinBox2.value()))
    #@QtCore.pyqtSlot()
    def setClick(self):
        print "set click"#self.ui.outputWidget.setText(str(value + self.ui.inputSpinBox2.value()))
    #@QtCore.pyqtSlot()
    def clearClick(self):
        print "clear click"#self.ui.outputWidget.setText(str(value + self.ui.inputSpinBox2.value()))

    #@QtCore.pyqtSlot()
    def on_inputSpinBox2_valueChanged(self, value):
        self.ui.outputWidget.setText(str(value + self.ui.inputSpinBox1.value()))
if __name__ == '__main__':
    import sys
    app = QtGui.QApplication(sys.argv)
    calculator = CalculatorForm()
    calculator.show()
    sys.exit(app.exec_())
