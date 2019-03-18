const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

//-----------------------------------------------------------------

const {Menu, MenuItem, dialog, ipcMain }=electron;


//是否可以安全退出

let safeExit = false;

//-----------------------------------------------------------------



// Keep a global reference of the window object, if you don't, the window will

// be closed automatically when the JavaScript object is garbage collected.

let mainWindow;
ipcMain.on('getpath', (event, arg) => {
  event.returnValue = process.argv[1];
})
const createWindow = () => {
  console.log("createWindow");

  // Create the browser window.

  mainWindow = new BrowserWindow({

    width: 800,

    height: 600,

  });
  //menu
  const template=
    [{
      label: 'File',
      submenu: [
        {
          label: 'New Window',
          accelerator: 'Ctrl+N',
          click: () =>{createWindow()},
        },
        {
          label: '重启',
          accelerator: 'Ctrl+H',
          click: (item, win) =>{win.loadURL(`file://${__dirname}/src/index.html`);},
        },
        {
          label: 'BACK',
          accelerator: 'Ctrl+B',
          click: (item, win) =>{
            win.webContents.send("goback");
          },
        },
        {
          label: 'Exit',
          accelerator: 'Ctrl+E',
          click: (item, win) =>{
             // console.log(win);
             // console.log(mainWindow);
             win.close();
          },
        }
        ]
    }];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  //
  const devMode = (process.argv || []).indexOf('--local') !== -1;
  if (devMode) {
      mainWindow.openDevTools();
  }
  // and load the index.html of the app.

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);



  // Open the DevTools.

  // /mainWindow.webContents.openDevTools();
  // mainWindow.on('close', (e) => {

  //   if(!safeExit){

  //     e.preventDefault();

  //     mainWindow.webContents.send('action', 'exiting');

  //   }

  // });

  //-----------------------------------------------------------------



  // Emitted when the window is closed.

  mainWindow.on('closed', () => {

    // Dereference the window object, usually you would store windows

    // in an array if your app supports multi windows, this is the time

    // when you should delete the corresponding element.

    mainWindow = null;

  });

};



// This method will be called when Electron has finished

// initialization and is ready to create browser windows.

// Some APIs can only be used after this event occurs.

app.on('ready', createWindow);



// Quit when all windows are closed.

app.on('window-all-closed', () => {

  // On OS X it is common for applications and their menu bar

  // to stay active until the user quits explicitly with Cmd + Q

  if (process.platform !== 'darwin') {

    app.quit();

  }

});



app.on('activate', () => {

  // On OS X it's common to re-create a window in the app when the

  // dock icon is clicked and there are no other windows open.

  if (mainWindow === null) {

    createWindow();

  }

});


