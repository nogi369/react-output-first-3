// アロー関数 : 関数の本体が一文のとき
// https://qiita.com/deBroglieeeen/items/f146afd1cdf1e89c4121#%E9%96%A2%E6%95%B0%E3%81%AE%E6%9C%AC%E4%BD%93%E3%81%8C%E4%B8%80%E6%96%87%E3%81%AE%E3%81%A8%E3%81%8D
export const searchTodo = (todoList, keyword) =>
  todoList.filter((todo) => {
    // 第1引数 = 検索したい文字, 第2引数 = フラグ
    const regexp = new RegExp("^" + keyword, "i");
    return todo.title.match(regexp);
  });
