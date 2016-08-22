# -*- coding: gb2312 -*-
import ctypes
from ctypes.wintypes import HANDLE
from ctypes.wintypes import BOOL
from ctypes.wintypes import HWND
from ctypes.wintypes import DWORD
from ctypes.wintypes import WORD
from ctypes.wintypes import LONG
from ctypes.wintypes import ULONG
from ctypes.wintypes import LPCSTR
from ctypes.wintypes import HKEY
from ctypes.wintypes import BYTE
NULL = 0
LPDWORD = PDWORD = ctypes.POINTER(DWORD)
api = ctypes.windll.LoadLibrary("winspool.drv")
# Public Type PORT_INFO_2
        # pPortName As String
        # pMonitorName As String
        # pDescription As String
        # fPortType As Long
        # Reserved As Long
# End Type
class PORT_INFO_2(ctypes.Structure):
    _fields_ = [
        ('pPortName', LPCSTR),
        ('pMonitorName', LPCSTR),
        ('pDescription', LPCSTR),
        ('fPortType', LONG),
        ('Reserved', LONG),
    ]
class PORT_INFO_1(ctypes.Structure):
    _fields_ = [
        ('pPortName', LPCSTR),
    ]
def comports_1():
    m_nSerialPortNum=0# ���ڼ��� 
    strSerialList=[]  # ��ʱ���� 256 ���ַ����� 
    pBite=NULL #LPBYTE pBite  = None 
    level=DWORD(1)
    pcbNeeded=DWORD() #DWORD pcbNeeded = 0  # bytes received or required 
    pcReturned=DWORD()  #DWORD pcReturned = 0  # number of ports received 
    m_nSerialPortNum = 0 
    # ��ȡ�˿���Ϣ���ܵõ��˿���Ϣ�Ĵ�С pcbNeeded 
    api.EnumPortsA(NULL,level,NULL,NULL,ctypes.pointer(pcbNeeded),ctypes.pointer(pcReturned)) 
    buf = ctypes.c_buffer(pcbNeeded.value) 
    # ö�ٶ˿ڣ��ܵõ��˿ڵľ�����Ϣ pBite �Լ��˿ڵĵĸ��� pcReturned 
    api.EnumPortsA(NULL,level,ctypes.pointer(buf),pcbNeeded, ctypes.pointer(pcbNeeded), ctypes.pointer(pcReturned)) 
    pPorts=ctypes.cast(buf, ctypes.POINTER(PORT_INFO_1*20))
    for i in range(pcReturned.value):
        print(pPorts[0][i].pPortName) #,pPorts[0][i].pMonitorName,pPorts[0][i].pDescription,pPorts[0][i].fPortType
def comports():
    m_nSerialPortNum=0# ���ڼ��� 
    strSerialList=[]  # ��ʱ���� 256 ���ַ����� 
    pBite=NULL #LPBYTE pBite  = None 
    level=DWORD(2)
    pcbNeeded=DWORD() #DWORD pcbNeeded = 0  # bytes received or required 
    pcReturned=DWORD()  #DWORD pcReturned = 0  # number of ports received 
    m_nSerialPortNum = 0 
    # ��ȡ�˿���Ϣ���ܵõ��˿���Ϣ�Ĵ�С pcbNeeded 
    api.EnumPortsA(NULL,level,NULL,NULL,ctypes.pointer(pcbNeeded),ctypes.pointer(pcReturned)) 
    buf = ctypes.c_buffer(pcbNeeded.value) 
    # ö�ٶ˿ڣ��ܵõ��˿ڵľ�����Ϣ pBite �Լ��˿ڵĵĸ��� pcReturned 
    api.EnumPortsA(NULL,level,ctypes.pointer(buf),pcbNeeded, ctypes.pointer(pcbNeeded), ctypes.pointer(pcReturned)) 
    pPorts=ctypes.cast(buf, ctypes.POINTER(PORT_INFO_2*20))
    for i in range(pcReturned.value):
        print(pPorts[0][i].pPortName,pPorts[0][i].pMonitorName,pPorts[0][i].pDescription,pPorts[0][i].fPortType)
comports_1()