# Database

Ufoco uses lowdb as a storage

## Default Storage

By default, Ufoco provides a storage, named `Ufoco`
The storage can not be deleted and renamed. User only can reset the data of it.

If it deleted from out of the app, the app will try to create it again.

## Schemes

### Note

| Attribute | type        | Note                                                         |
| --------- | ----------- | ------------------------------------------------------------ |
| meta      | Map<Any>    | Containing title, preview, todo status and other information |
| content   | String      | Raw content string                                           |
| tags      | Set<String> | Tag set. Tag is a string without space.                      |
| folder    | String      | Path of note                                                 |
| cratedAt  | Date        | Creation date                                                |
| updatedAt | Date        | Last update date                                             |
| rev       | String      | Rev key of pouchDB                                           |
