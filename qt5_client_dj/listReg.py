import winreg
def getComPorts():
    rt=[]
    k=winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE,"HARDWARE\DEVICEMAP\SERIALCOMM")
    #print k,dir(k)
    index=0
    while True:
        try:
            v=winreg.EnumValue(k,index)
            print(index,v[1])#,dir(v),type(v)
            rt.append(v[1])
            index+=1
        except WindowsError as e:
            break
    return rt
if __name__=="__main__":
    print(getComPorts())
    