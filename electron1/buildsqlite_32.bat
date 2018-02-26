cd .\node_modules\sqlite3
npm install nan --save
npm run prepublishOnly
node-gyp configure  --module_name=node_sqlite3 --module_path=../lib/binding/electron-v1.8-win32-ia32
node-gyp rebuild   --target=1.8.2 --arch=ia32 --target_platform=win32 --dist-url=https://atom.io/download/electron/ --module_name=node_sqlite3 --module_path=../lib/binding/electron-v1.8-win32-ia32