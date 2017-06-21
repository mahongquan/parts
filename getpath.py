def getpath():
    ps=__file__.split("\\")
    r=""
    for i in ps[:-1]:
        r=r+i+"\\"
    return(r)
if __name__=="__main__":    
    print(getpath())
   
    