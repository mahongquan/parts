import os
import shutil
dir1=r".\node_modules\sqlite3\lib\binding\electron-v1.8-win32-x64"
if not os.path.exists(dir1):
	os.makedirs(dir1)
srcfile="node_sqlite3.node"
desfile=".\\node_modules\\sqlite3\\lib\\binding\\electron-v1.8-win32-x64\\node_sqlite3.node"
shutil.copyfile(srcfile,desfile)