const { app, BrowserWindow } = require('electron')

const electron = require('electron')

const path = require('path')
const url = require('url')
const Menu = electron.Menu

function createWindow() {
    // 创建浏览器窗口
    let win = new BrowserWindow({
        width: 1500,
        height: 1000,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // 隐藏菜单栏
    Menu.setApplicationMenu(null)
    // Create the browser window.设置窗口宽高，最小宽高，图标等
    win.on('closed', function () {
        win = null
    })

    // 并且为你的应用加载index.html
    win.loadFile('index.html')

    // 打开开发者工具
    // win.webContents.openDevTools()
}




// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// 您可以把应用程序其他的流程写在在此文件中
// 代码 也可以拆分成几个文件，然后用 require 导入。
