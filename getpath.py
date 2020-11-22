import os
def getpath():
    print(__file__)
    return os.path.split(__file__)[0]
if __name__=="__main__":    
    print(getpath())
   
    