const shortid = require("shortid");
export const generateTemplate = (parentId) => {
  return {
    id: shortid.generate(),
    parentId: parentId,
    name: "",
    collapsed: false,
    completed: false,
    note: {
      dateUpdated: "",
      headline: "some notes here ",
      body: "This document will be saved as markdown style",
      tags: {},
    },
    children: [],
  };
};

export const generateFirstChild = (elements) => {
  const rootElement = elements.find((element) => element.id === "root");
  if (rootElement.children.length === 0) {
    const newEle = generateTemplate("root");
    rootElement.children.splice(0, 0, newEle.id);
    elements.splice(1, 0, newEle);
  }
};

export const swapIndex = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};

export const insertAt = (arr, currVal, newVal) => {
  let index = arr.indexOf(currVal);
  arr.splice(index + 1, 0, newVal);
};

export const zIndexDown = (elemIds, currId) => {
  let length = elemIds.length;
  let index = elemIds.indexOf(currId);
  if (index + 1 != length) {
    swapIndex(elemIds, index, index + 1);
  } else {
    console.log("Current index is last index");
  }
  return elemIds;
};

export const zIndexUp = (elemIds, currId) => {
  let index = elemIds.indexOf(currId);
  if (index != 0) {
    swapIndex(elemIds, index, index - 1);
  } else {
    console.log("Current index is first index");
  }
  return elemIds;
};

export const zIndexBottom = (elemIds, currId) => {
  let length = elemIds.length;
  let index = elemIds.indexOf(currId);
  if (index + 1 != length) {
    //首先判断当前元素需要上移几个位置,置底移动到数组的第一位
    var moveNum = length - 1 - index;

    //循环出需要一个一个上移的次数
    for (var i = 0; i < moveNum; i++) {
      swapIndex(arr, index, index + 1);

      index++;
    }
  } else {
    alert("已经处于置顶");
  }
};

//置底，即将当前元素移到数组的第一位

export const zIndexTop = (arr, index, length) => {
  if (index != 0) {
    //首先判断当前元素需要上移几个位置,置底移动到数组的第一位
    var moveNum = index - 0;

    //循环出需要一个一个上移的次数
    for (var i = 0; i < moveNum; i++) {
      swapIndex(arr, index, index - 1);

      index--;
    }
  } else {
    alert("已经处于置底");
  }
};
