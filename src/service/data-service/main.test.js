const {TEST_CATAGORIES, TEST_DATA} = require(`./test-mocks`);

const MainService = require(`./main`);



describe(`Check simple get-methods for getting datas in API`, () => {
  it(`should return TEST_DATA array`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    expect(mainService.getAll()).toEqual(TEST_DATA);
  });

  it(`should return TEST_CATAGORIES array`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    expect(mainService.getCategories()).toEqual(TEST_CATAGORIES);
  });
});

describe(`Check find method API`, () => {
  it(`should find data with id: OkuBh5`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    expect(mainService.find(`OkuBh5`)).toEqual(TEST_DATA[2]);
  });

  it(`should return undefined for unnecessary id`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    expect(mainService.find(`111`)).toBeUndefined();
  });
});

describe(`Check getSearchedData method API`, () => {
  it(`should return array with items, who includes in title text: 'достигнуть'`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    expect(mainService.getSearchedData(`достигнуть`)).toEqual([TEST_DATA[0]]);
  });

  it(`should return array with items, who includes in title text: 'ДосТИгнутЬ'`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    expect(mainService.getSearchedData(`ДосТИгнутЬ`)).toEqual([TEST_DATA[0]]);
  });

  it(`should return array with items, who includes in title text: 'как'`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    expect(mainService.getSearchedData(`как`)).toEqual([TEST_DATA[0], TEST_DATA[1]]);
  });

  it(`should return empty array with items, who includes in title text: 'TEZD'`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    expect(mainService.getSearchedData(`TEZD`)).toEqual([]);
  });
});

describe(`Check deleteArticle method API`, () => {
  it(`should return array without item with id: 'PHfSY9'`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    expect(mainService.deleteArticle(`PHfSY9`)).toEqual([TEST_DATA[1], TEST_DATA[2]]);
  });
});

describe(`Check deleteComment method API`, () => {
  it(`should return first TEST_DATA item, without comment with id: lUC2nW in comments`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);
    const deletedCommentItem = mainService.deleteComment(`PHfSY9`, `lUC2nW`);

    expect(deletedCommentItem[0].comments).toEqual(
      expect.not.arrayContaining([{
        id:"lUC2nW",
        text: "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.",
      }]),
    )
  });
});

describe(`Check editArticle method API`, () => {
  it(`should return TEST_DATA with edited first item title contain text 'test done'`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    expect(mainService.editArticle(`PHfSY9`, {
      title: `test done`,
    })[0].title).toBe(`test done`);
  });

  it(`should return TEST_DATA with edited first item title contain text 'test done' and item announce contain text 'ok'`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    const newData = mainService.editArticle(`PHfSY9`, {
      title: `test done`,
      announce: `ok`,
    });

    const newTitle = newData[0].title;
    const newAnnounce = newData[0].announce;

    expect(newTitle).toBe(`test done`);
    expect(newAnnounce).toBe(`ok`);
  });
});

describe(`Check addNewArticle method API`, () => {
  it(`should return new TEST_DATA witn new item by array index 3`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);

    const newData = mainService.addNewArticle({
      title: `title`,
      announce: `announce`,
      fullText: `fullText`,
      сategory: [`сategory`],
    });

    expect(newData[3]).toHaveProperty(`title`, `title`);
    expect(newData[3]).toHaveProperty(`announce`, `announce`);
    expect(newData[3]).toHaveProperty(`fullText`, `fullText`);
    expect(newData[3]).toHaveProperty(`сategory`, [`сategory`]);
  });
});

describe(`Check addNewComment method API`, () => {
  it(`should return new TEST_DATA with new comment in first item`, () => {
    const mainService = new MainService(TEST_DATA, TEST_CATAGORIES);
    const newData = mainService.addNewComment(`PHfSY9`, `new comment`);

    expect(newData[0].comments[2].text).toBe(`new comment`);
  });
});
