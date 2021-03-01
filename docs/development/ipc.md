# IPC events

## Global

To get Main and Preferences window easily, they are bound to global.

```JS
// send ipc event to Main window
global.windows.main.webContents.send('Go')

// send ipc event to Preferences window
global.windows.preferences.webContents.send('Stop')
```

## Events

### Main

                         |

### Preferences

Preferences window doesn't take any ipc event for now.
