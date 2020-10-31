import os
import shutil
dir1=r".\node_modules\react-refresh\cjs"
if not os.path.exists(dir1):
	os.makedirs(dir1)
srcfile="react-refresh-runtime.development.js"
desfile=dir1+"\\"+srcfile
shutil.copyfile(srcfile,desfile)
os.system(r"xcopy /I /S /Y .\icons .\node_modules\@material-ui\icons")