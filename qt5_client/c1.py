# -*- coding: gb2312 -*-
from pymodbus.client.sync import ModbusSerialClient as ModbusClient
import pymodbus
class Plc(ModbusClient):
    def __init__(self):
        ModbusClient.__init__(self,method='rtu')
        self.port=0
        self.baudrate=9600
        self.bytesize=8
        self.parity="E"
        self.stopbits=1
        self.timeout=1
        self.connect()
        self.unit=1  #slave address
        self.nms={"pv":0x3,"sv":0x2,}
    def load(self):
        startAddress = 0
        numRegisters = 100
        registers=[]
        duanlie = 0
        pingheng = 0
        wk0_comm = 0
        wk1_comm = 0
        wk2_comm = 0
        plc_err = 0
        wk0_baojing = 0
        wk1_baojing = 0
        wk2_baojing = 0
        wd=[]
        wy=[]
        pv1=0, sp1=0, p1=0, i1=0, d1=0
        zzd1 = False
        pv2=0, sp2=0, p2=0, i2=0, d2=0
        zzd2 = False
        pv3=0, sp3=0, p3=0, i3=0, d3=0
        zzd3 = False
        try:
            startAddress = 0
            numRegisters = 100
            registers = self.read_holding_registers(startAddress, numRegisters,unit=self.unit)
            plc_err = ((registers[90] & 0xff00) >> 8)
            duanlie= ((registers[86] & 0xff00) >> 8)
            pingheng= ((registers[85] & 0xff00) >> 8)
            wk0_comm = ((registers[80] & 0xff00) >> 8)
            wk1_comm = (registers[80] & 0xff)
            wk2_comm = ((registers[81] & 0xff00) >> 8)
            wk0_baojing = registers[82]
            wk1_baojing = registers[83]
            wk2_baojing= registers[84]

            wd[0] = Program.uintToint(registers[22])
            wd[1] = Program.uintToint(registers[45])
            wd[2] = Program.uintToint(registers[64])

            wy[0] = Program.uintToLong(registers[0], registers[1]) * 0.1#todo ma
            wy[1] = Program.uintToLong(registers[2], registers[3]) * 0.1#todo ma
            pv1 = registers[20]
            sp1 = registers[23]
            zzd1 = registers[24] == 1 ? true : false
            p1 = registers[25]
            i1 = registers[26]
            d1 = registers[27]

            pv2 = registers[43]
            sp2 = registers[46]
            zzd2 = registers[47] == 1 ? true : false
            p2 = registers[48]
            i2 = registers[49]
            d2 = registers[50]

            pv3 = registers[62]

            sp3 = registers[65]
            zzd3 = registers[66] == 1 ? true : false
            p3 = registers[67]
            i3 = registers[68]
            d3 = registers[69]
            m_para.PLC报警 = "正常"# plccode(plc错误)
        exept:
            pass
        # }
        # catch (Modbus.SlaveException e3)#ArgumentException
        # {
            # m_para.PLC报警 = "通讯忙"
        # }
        # catch (TimeoutException e2)
        # {
            # m_para.PLC报警 = "中断"
        # }
    def getName(self,nm):
        reg=self.nms.get(nm)
        if (reg==None):
            return None
        else:
            return self.getOne(reg)
    def getOne(self,addr):
        #print "unit:",self.unit
        res=self.read_holding_registers(addr,1,unit=self.unit)
        if type(res)==pymodbus.pdu.ExceptionResponse:#
            return  "except:"+str(res.exception_code)
            return None
        elif type(res)==pymodbus.register_read_message.ReadHoldingRegistersResponse:
            return res.registers[0]
    def getPV(self):
        return self.getName("pv")
        #return self.getOne(0x100)
class SR90(ModbusClient):
    def __init__(self):
        ModbusClient.__init__(self,method='rtu')
        self.port=0
        self.baudrate=9600
        self.bytesize=8
        self.parity="E"
        self.stopbits=1
        self.timeout=1
        self.connect()
        self.unit=1  #slave address
        self.nms={"pv":0x3,"sv":0x2,}
    def getName(self,nm):
        reg=self.nms.get(nm)
        if (reg==None):
            return None
        else:
            return self.getOne(reg)
    def getOne(self,addr):
        #print "unit:",self.unit
        res=self.read_holding_registers(addr,1,unit=self.unit)
        if type(res)==pymodbus.pdu.ExceptionResponse:#
            return  "except:"+str(res.exception_code)
            return None
        elif type(res)==pymodbus.register_read_message.ReadHoldingRegistersResponse:
            return res.registers[0]
    def getPV(self):
        return self.getName("pv")
        #return self.getOne(0x100)
if __name__=="__main__":        
    s=SR90()
    for u in [1,2]:
        s.unit=u
        print s.unit
        #print s.getPV()
        #v=s.getName("pv")
        #print "res:",v
        for i in range(10):
            print i,s.getOne(i)
