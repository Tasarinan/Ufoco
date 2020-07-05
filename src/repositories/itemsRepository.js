import pouchDB from "./pouchdbPersistence";

export default {
  changeItemValue(itemId, itemVal) {
    const item = await pouchDB.findItemById(itemId);
    Object.assign({}, item, {
      text: itemVal,
      updated: new Date()
    });
    pouchDB.updateItem(item);
  },
  changeItemTimeRecord(itemId, start, end) {
    const item = await pouchDB.findItemById(itemId);
    Object.assign({}, item, {
      startTime: start,
      endTime:end,
      updated: new Date()
    });
    pouchDB.updateItem(item);
  },
  changeItemStreak(streakId,itemId) {
    const item = await pouchDB.findItemById(itemId);
    Object.assign({}, item, {
      streakId: streakId,
      updated: new Date()
    });
    pouchDB.updateItem(item);
  },
  removeItem(itemId) {
    await pouchDB.deleteItemById(itemId);
  },
  switchIsDone(boardId, itemId, value) {
    const board = db.get("boards").find({ id: boardId });

    board.assign({ updated: new Date() }).write();
    const oldBoardVal = board.cloneDeep().value();

    const res = board
      .get("items")
      .find({ id: itemId })
      .assign({
        isDone: value,
        updated: new Date()
      })
      .write();
    const newBoardVal = board.cloneDeep().value();
    syncRepository.addToSyncQueue(oldBoardVal, newBoardVal);

    return res;
  },
  switchPrependNewItem(boardId, value) {
    const board = db.get("boards").find({ id: boardId });
    const oldBoardVal = board.cloneDeep().value();

    const res = board.assign({ prependNewItem: value }).write();
    const newBoardVal = board.cloneDeep().value();
    syncRepository.addToSyncQueue(oldBoardVal, newBoardVal);

    return res;
  },
  switchShowProgress(boardId, val) {
    const board = db.get("boards").find({ id: boardId });
    const oldBoardVal = board.cloneDeep().value();

    const res = board.assign({ showProgress: val }).write();
    const newBoardVal = board.cloneDeep().value();
    syncRepository.addToSyncQueue(oldBoardVal, newBoardVal);

    return res;
  }
};
