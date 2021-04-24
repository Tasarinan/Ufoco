export default {
  metadata: {
    application: 'Ufoco',
    version: '1.0.0',
    dateUpdated: 'Mon Nov 02 2020 15:13:02 GMT+0800',
  },
  elements: [
    {
      id: 'root',
      parentId: '',
      name: '',
      children: ['6ahrj', '30jo7', '70bkm'],
    },
    {
      id: '6ahrj',
      parentId: 'root',
      name: '<--- Your whole life can fit in this bullet (click the bullet to learn more',
      collapsed: false,
      completed: false,
      note: {
        dateUpdated: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Greenwich Mean Time)',
        headline: 'Diary Entry 1',
        body: 'This text is **bold** and _italic_.',
        tags: {},
      },
      children: ['5tba0', 'ujhc'],
    },
    {
      id: '30jo7',
      parentId: 'root',
      name: 'Every bullet is a document',
      collapsed: false,
      completed: false,
      note: {
        dateUpdated: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Greenwich Mean Time)',
        headline: 'Diary Entry 1',
        body: 'This text is **bold** and _italic_.',
        tags: {},
      },
      children: [],
    },
    {
      id: '30jo7',
      parentId: 'root',
      name: ' offers a unique way to organize information: a fractal document',
      collapsed: false,
      completed: false,
      note: {
        dateUpdated: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Greenwich Mean Time)',
        headline: 'Diary Entry 1',
        body: 'This text is **bold** and _italic_.',
        tags: {},
      },
      children: [],
    },
    {
      id: '70bkm',
      parentId: 'root',
      name: 'Every bullet is a document.',
      collapsed: false,
      completed: false,
      note: {
        dateUpdated: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Greenwich Mean Time)',
        headline: 'Diary Entry 2',
        body:
          "Here's a bulleted list:\n\n- One\n- Two\n- Three\n\nAnd here's a numbered list:\n\n1. One\n2. Two\n3. Three",
        tags: {},
      },
      children: [],
    },
    {
      id: '5tba0',
      parentId: '6ahrj',
      name: 'Every document can contain infinite documents.',
      collapsed: false,
      completed: false,
      note: {
        dateUpdated: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Greenwich Mean Time)',
        headline: 'Diary Entry 1',
        body: 'This text is **bold** and _italic_.',
        tags: {},
      },
      children: [],
    },

    {
      id: 'ujhc',
      parentId: '6ahrj',
      name: "It's simple, but extremely powerful. (click the bullet)",
      collapsed: false,
      completed: false,
      note: {
        dateUpdated: 'Tue Jan 01 2019 00:00:00 GMT+0000 (Greenwich Mean Time)',
        headline: 'Diary Entry 1',
        body: 'This text is **bold** and _italic_.',
        tags: {},
      },
      children: [],
    },
  ],
  tasklets: [
    {
      id: '6ahrj',
      flowletId: '30jo7',
      name: 'simple commit task based on one ACC',
      isCompleted: false,
      isPriority: false,
      priority: 2,
      isRecurring: false,
      rolledOver: false,
      streak: 2,
      isSuggested: false,
      suggested: 2,
      dateCreated: 'Sat Feb 06 2021 21:34:08 GMT+0800',
      dateUpdated: 'Sat Feb 06 2021 21:34:08 GMT+0800',
      calendar: {
        LE: 'Sat Feb 06 2021 21:34:08 GMT+0800',
        bookTime: [
          {
            beginAt: 'Mon Nov 02 2020 15:13:02 GMT+0800',
            endAt: 'Mon Nov 02 2020 15:13:02 GMT+0800',
          },
          {
            beginAt: 'Mon Nov 02 2020 15:13:02 GMT+0800',
            endAt: 'Mon Nov 02 2020 15:13:02 GMT+0800',
          },
        ],
        logTime: [
          {
            beginAt: 'Thu Jan 03 2019 00:00:00 GMT-0800',
            endAt: 'Thu Jan 03 2019 00:00:00 GMT-0800',
          },
        ],
      },
    },
  ],
};
