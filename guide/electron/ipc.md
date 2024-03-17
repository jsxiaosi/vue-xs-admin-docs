---
outline: deep
---

# 进程间通信

在Electron应用中，[进程间通信](https://www.electronjs.org/zh/docs/latest/tutorial/ipc)（IPC）是Web渲染进程与主进程通信的关键机制，主要通过[ipcMain](https://www.electronjs.org/docs/latest/api/ipc-main)和[ipcRenderer](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer)模块实现。这两个模块分别在主进程和渲染进程中使用，允许这两个进程之间建立通信通道，以便进行数据和消息的交换。

## 主进程接收与响应消息

在主进程中`/electron/main/index.ts`，我们通过监听渲染进程发来的消息，并响应它们来实现通信：

``` ts
function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  if (NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173/');
    // 打开开发工具
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  // 监听渲染进程发送的消息 // [!code focus]
  ipcMain.on('message-to-main', (_event, args) => { // [!code focus]
    console.log(args); // 打印从渲染进程接收到的消息 // [!code focus]
    // 回应渲染进程 // [!code focus]
    mainWindow.webContents.send('message-from-main', 'Hello from Main Process', 123123); // [!code focus]
  });
}
```

## 启用渲染进程中的Node API

通过设置webPreferences中的nodeIntegration，我们可以控制渲染进程中Node.js API的可用性。

### 配置nodeIntegration

``` ts
function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true, // [!code focus]
      contextIsolation: false, // [!code focus]
    },
  });

  if (NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173/');
    // 打开开发工具
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  // 监听渲染进程发送的消息 
  ipcMain.on('message-to-main', (_event, args) => { 
    console.log(args); // 打印从渲染进程接收到的消息 
    // 回应渲染进程 
    mainWindow.webContents.send('message-from-main', 'Hello from Main Process', 123123); 
  });
}
```

### 在Web环境中调用IPC通信

Web环境中可以通过两种方式与主进程进行IPC通信

- [@vueuse/electron](https://vueuse.org/electron/README.html)
- [ipcRenderer](https://github.com/electron-vite/vite-plugin-electron-renderer)：通过electron引入ipcRenderer进行IPC通信

#### 使用@vueuse/electron进行通信

``` vue
<script setup lang="ts">
  import { useIpcRenderer } from '@vueuse/electron';

  const ipcRenderer = useIpcRenderer();

  ipcRenderer.send('message-to-main', 'Hello from Renderer Process');
  ipcRenderer.on('message-from-main', (_event, message: string) => {
    console.log('[Electron message]: ', message);
  });
</script>
```

#### 直接使用 ipcRenderer

在 `build/vite/plugin/electron` 添加如下代码

``` ts
export function configElectronPlugin(isDevelopment: boolean, isProduction: boolean): PluginOption {
  if (!isDevelopment) {
    return electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            sourcemap: !isProduction,
            minify: isProduction,
            outDir: 'dist_electron/config',
            rollupOptions: {
              output: {
                entryFileNames: 'main.js',
              },
            },
          },
        },
      },
      preload: {
        input: 'electron/preload/index.ts',
        vite: {
          build: {
            sourcemap: !isProduction,
            minify: isProduction,
            outDir: 'dist_electron/config',
            rollupOptions: {
              output: {
                entryFileNames: 'preload.mjs',
              },
            },
          },
        },
      },
      renderer: {}, // [!code focus]
    });
  } else {
    return [];
  }
}
```

``` vue
<script setup lang="ts">
  import { ipcRenderer } from 'electron';

  ipcRenderer.send('message-to-main', 'Hello from Renderer Process');
  ipcRenderer.on('message-from-main', (_event, message: string) => {
    console.log('[Electron message]: ', message);
  });
</script>
```

## 使用contextBridge暴露Node API给Web环境

contextBridge用于在预加载脚本中安全地向渲染进程暴露API，同时保持上下文隔离。

1. 在预加载脚本中暴露API`electron/preload/index.ts`：

    ``` ts
    import { ipcRenderer, contextBridge } from 'electron';
    import type { ExposeInMainWorldApi } from '#/electron';

    const exposeInMainWorldApi: ExposeInMainWorldApi = {
      sendMessageToMain: (message) => ipcRenderer.send('message-to-main', message),
      onMessageFromMain: (callback) => ipcRenderer.on('message-from-main', callback),
    };

    contextBridge.exposeInMainWorld('electronAPI', exposeInMainWorldApi);
    ```

2. 添加 typescript 类型
    `/types/electron.d.ts`

    ``` ts
    import { IpcRenderer,IpcRendererEvent } from 'electron'

    export interface ExposeInMainWorldApi {
      sendMessageToMain: (value: string) => void
      onMessageFromMain: (callback: IpcRendererListener<[string]>) => IpcRenderer
    }

    declare type IpcRendererListener<T extends any[] = any[]> = (event: IpcRendererEvent, ...args: T) => void
    ```

3. 在渲染进程中使用暴露的API

    ``` ts
    // 向主进程发送消息
    window.electronAPI.sendMessageToMain('Hello from Renderer Process');

    // 接收注册发送的消息
    window.electronAPI.onMessageFromMain((_event, message) => {
      console.log('[Electron message]: ', message);
    });
    ```
