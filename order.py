dic1={"add_11":"add 1","add_10":"add 0"}
adds=[]
for k in dic1:
    if k[:6]=="delete":
        deletes.append(k.split("_")[1])
    elif k[:3]=="add":
        adds.append((int(k[4:]),dic1[k]))
#adds=[(1, 'add 1'), (0, 'add 0')]        
adds.sort()        
print(adds)