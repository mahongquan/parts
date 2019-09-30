# -*- coding: utf-8 -*-
import json
new="""@babel/core@7.6.2, @babel/plugin-proposal-class-properties@7.5.5, @babel/plugin-proposal-decorators@7.6.0, @babel/plugin-proposal-do-expressions@7.6.0, @babel/plugin-proposal-export-default-from@7.5.2, @babel/plugin-proposal-export-namespace-from@7.5.2, @babel/plugin-proposal-optional-chaining@7.6.0, @babel/plugin-proposal-pipeline-operator@7.5.0, @babel/plugin-transform-react-jsx-source@7.5.0, @babel/plugin-transform-typescript@7.6.0, @babel/polyfill@7.6.0, @babel/preset-env@7.6.2, @babel/preset-typescript@7.6.0, @babel/register@7.6.2, @date-io/date-fns@1.3.11, @date-io/moment@1.3.11, @material-ui/core@4.4.3, @material-ui/icons@4.4.3, @material-ui/pickers@3.2.6, better-sqlite3@5.4.3, cassandra-driver@4.2.0, electron@3.1.13, electron-updater@4.1.2, html2canvas@1.0.0-rc.4, jszip@3.2.2, lodash@4.17.15, lodash.defaultsdeep@4.6.1, lodash.template@4.5.0, moment-timezone@0.5.26, node-gyp@5.0.4, react@16.9.0, react-chartjs-2@2.8.0, react-dom@16.9.0, react-tabs@2.3.1, rollbar@2.13.0, sequelize@4.44.3, socket.io@2.3.0, socket.io-client@2.3.0, sqlite3@4.1.0, ssh2@0.8.5, twilio@3.35.0, jest@24.9.0"""
ps=new.split(",")
# print(ps)
nm=[]
for p in ps:
	nms=p.split("@")
	# print(nms)
	if(len(nms)==3):
		n1="@"+nms[1]
		n2=nms[2]
		nm.append((n1.decode("utf-8"),n2.decode("utf-8")))
	else:
		n1=nms[0].replace(" ","")
		n2=nms[1]
		nm.append((n1.decode("utf-8"),n2.decode("utf-8")))
# print(nm)
f=open("package.json","r")
s=f.read()
print(s)
print(dir(json))
j=json.loads(s)
ds=j["dependencies"]
devs=j["devDependencies"]
print(ds)
for n in  nm:
	print(n)
	print(ds.get(n[0]))
	if ds.get(n[0])!=None:
		print("change",n)
		ds[n[0]]=n[1]
	if devs.get(n[0])!=None:
		devs[n[0]]=n[1]
print(ds)
json.dump(j,open("package.json","w"))