/**
*@module
#
 */
const {app,Menu}=require('electron');

function createArrayMenuTemplate(){
  const arrMenuTemplate = [{
      label: 'Edit',
      submenu: [{
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
      },
      {
          label:'Redo',
          accelerator:'CmdOrCtrl+Y',
          role:'redo'
      },
      {
          label:'Redo(alias)',
          accelerator:'Shift+CmdOrCtrl+Z',
          role:'redo'
      },
      {
          type:'separator'
      },
      {
          label:'Cut',
          accelerator:'CmdOrCtl+X',
          role:'cut'
      },
      {
          label:'Copy',
          accelerator:'CmdOrCtl+C',
          role:'copy'
      },
      {
          label:'Paste',
          accelerator:'CmdOrCtl+V',
          role:'paste'
      },
      {
          label:'Select All',
          accelerator:'CmdOrCtrl+A',
          role:'selectall'
      }
    ]
  },
  {
      label:'View',
      submenu:[
          {
              label:'Reload',
              accelerator:'CmdOrCtl+Shift+Alt+R',
              click(Item,FocusedWindow){
                  if(FocusedWindow){
                      FocusedWindow.reload();
                  }
              }
          },
          {
              label:'Toggle Developer Tools',
              accelerator:'CmdOrCtrl+Shift+Alt+D',
              click(Item,FocusedWindow){
                  if(FocusedWindow)
                  {
                      FocusedWindow.webContents.toggleDevTools();
                  }
              }

          }
      ]

  }
  ];

  if(process.platform ==='darwin'){
      arrMenuTemplate.unshift({
          label:'Application',
          submenu:[{
              label:'Hide',
              accelerator:'Command+H',
              role:'hide'
          },{
              type:'seperator'
          },
          {
              label:'Quit',
              accelerator:'Command+Q',
              click(){app.quit();}
          }]
      });
  }

return arrMenuTemplate;
}

function createMenu(){

    return Menu.buildFromTemplate(createArrayMenuTemplate());
}

module.exports.createMenuTemplate = createArrayMenuTemplate;
module.exports.createMenu = createMenu;