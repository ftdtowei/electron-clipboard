// import { app, BrowserWindow } from 'electron'

const electron = require('electron')
const {app, BrowserWindow} = electron

const path = require('path');

//用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
const Menu = electron.Menu;
const Tray = electron.Tray;

//托盘对象
var appTray = null;

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {

  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height:  500,//高 
    useContentSize: true,
    width: 400,//宽
    resizable : false, //禁止选择窗口大小
    movable:false,//不可移动
    y:height -560, //距离屏幕顶部位置
    x:width -420,//距离屏幕左边位置
    skipTaskbar :false,
    alwaysOnTop :true
    
  })
  mainWindow.setMenu(null)

  // mainWindow.show()

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

//   var trayMenuTemplate = [
//     {
//         label: '设置',
//         click: function () {} //打开相应页面
//     },
//      {
//         label: '意见反馈',
//         click: function () {}
//     },
//     {
//         label: '帮助',
//         click: function () {}
//     },
//     {
//         label: '关于',
//         click: function () {}
//     },
//     {
//         label: '退出',
//         click: function () {
//             //ipc.send('close-main-window');
//              app.quit();
//         }
//     }
// ];

// //系统托盘图标目录
// trayIcon = path.join(__dirname, 'tray');

// appTray = new Tray(path.join(trayIcon, '1.ico'));

// //图标的上下文菜单
// const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

// //设置此托盘图标的悬停提示内容
// appTray.setToolTip('This is my application.');

// //设置此图标的上下文菜单
// appTray.setContextMenu(contextMenu);

// appTray.on('click',function(){  
//   mainWindow.show();  
// })  

// mainWindow.on('close',(e) => {    
//         //回收BrowserWindow对象  
//         if(mainWindow.isMinimized()){  
//           mainWindow = null;  
//         }else{  
//             e.preventDefault();  
//             mainWindow.minimize();  
//         }   
//     });  

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
