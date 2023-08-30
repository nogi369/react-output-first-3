import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useTodo } from "./useTodo";
import { act } from "react-dom/test-utils";
import { INIT_TODO_LIST } from "../constants/data";

describe("【hooksテスト】useApp test", () => {
  describe("【関数テスト】onChangeAddInputValue", () => {
    test("【正常系】addInputValueを更新できること", () => {
      // 予測値(期待値)
      const expectValue = "テスト";
      // 引数
      const eventObject = {
        target: {
          value: expectValue,
        },
      };
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      // hooks関数の実行「前」
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      // 結果判定
      expect(result.current[0].addInputValue).toBe(expectValue);
    });
  });
  describe("【関数テスト】handleAddTodo", () => {
    // let : test関数ブロックで値の再代入が行われるため、変数をletで宣言する
    // https://qiita.com/cheez921/items/7b57835cb76e70dd0fc4#%E5%86%8D%E4%BB%A3%E5%85%A5

    // 予測値(期待値)
    let expectTodoList = [];
    // 引数
    let eventObject = {
      target: {
        value: "テスト",
      },
      key: "Enter",
    };
    beforeEach(() => {
      eventObject = {
        target: {
          value: "テスト",
        },
        key: "Enter",
      };
    });
    test("【正常系】todoList, uniqueIdが更新されること、addInputValueがリセットされること", () => {
      const expectTodoTitle = "Todo3";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      eventObject.target.value = expectTodoTitle;
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      // hooks関数の実行「前」
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行(onChangeAddInputValue)
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      // 結果判定
      expect(result.current[0].addInputValue).toBe(expectTodoTitle);
      // hooks関数の実行(handleAddTodo)
      act(() => result.current[1].handleAddTodo(eventObject));
      // showTodoList(表示用Todoリスト)で表示するリストが、test関数内に定義したTodoデータを含むTodoリストになっていること
      expect(result.current[0].showTodoList).toEqual(expectTodoList);
      // 新規データ追加時、入力フォームを空にする
      expect(result.current[0].addInputValue).toBe("");
    });
    test("【正常系】エンターキーを押していない場合、処理が発生しないこと", () => {
      const expectTodoTitle = "Todo4";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      eventObject.target.value = expectTodoTitle; // expectTodoTitleをテスト関数内で使えるようにする
      eventObject.key = ""; // 「Enterキーが押していない」
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      // hooks関数の実行「前」
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行(onChangeAddInputValue)
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      // 結果判定
      expect(result.current[0].addInputValue).toBe(expectTodoTitle);
      // hooks関数の実行(handleAddTodo)
      act(() => result.current[1].handleAddTodo(eventObject));
      // 表示用Todoリストが更新されない
      expect(result.current[0].showTodoList).not.toEqual(expectTodoList);
      // 入力値がリセットされない
      expect(result.current[0].addInputValue).not.toBe(""); // ***
    });
    test("【正常系】入力値がない場合、処理が発生しないこと", () => {
      const expectTodoTitle = "Todo5";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      eventObject.target.value = ""; //入力値が空
      eventObject.key = ""; // 「Enterキーを押していない」ことも入力値に含む
      const { result } = renderHook(() => useTodo());
      expect(result.current[0].addInputValue).toBe("");
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe(""); // 入力値の変更なし
      act(() => result.current[1].handleAddTodo(eventObject));
      expect(result.current[0].showTodoList).not.toEqual(expectTodoList);
    });
  });
  describe("【関数テスト】handleDeleteTodo", () => {
    // 予測値(期待値)
    let expectTodoList = [];
    beforeEach(() => {
      expectTodoList = [];
    });
    // confirmでをOKクリックした場合
    test("【正常系】todoが削除されること", () => {
      const targetId = 1;
      const targetTitle = "テスト";
      // Jestのmock使い方(https://stackoverflow.com/questions/41732903/stubbing-window-functions-in-jest#:~:text=I%20just%20used%20Jest%20mock%20and%20it%20works%20for%20me%20%3A)
      window.confirm = vi.fn().mockReturnValueOnce(true);
      expectTodoList = INIT_TODO_LIST.filter((todo) => todo.id !== targetId);
      const { result } = renderHook(() => useTodo());
      act(() => result.current[1].handleDeleteTodo(targetId, targetTitle));
      expect(result.current[0].showTodoList).toEqual(expectTodoList);
    });
    // TC1の反対
    test("【正常系】confirmでキャンセルをクリックした場合、todoが削除されないこと", () => {
      const targetId = 1;
      const targetTitle = "テスト";
      window.confirm = vi.fn().mockReturnValueOnce(false);
      expectTodoList = INIT_TODO_LIST;
      const { result } = renderHook(() => useTodo());
      act(() => result.current[1].handleDeleteTodo(targetId, targetTitle));
      expect(result.current[0].showTodoList).toEqual(expectTodoList);
    });
  });
});

/**
 * ＜テスト流れ＞
 * データ用意: 予測値(期待値) = 配列、引数 = オブジェクト
 * 引数を初期化
 * 用意したデータを編集する
 * カスタムフック呼び出し
 * テスト実行
 */

/**
 * ＜ TC: 削除 ＞
 * (自解)
 * targetId, targetTitleが渡ってきたとき、Todoが削除されること
 * confirmモーダルで「 OK 」を押した場合、Todoが削除されること
 * todoListが更新されること
 * (サンプル)
 * todoが削除されること
 * confirmでキャンセルをクリックした場合、todoが削除されないこと
 * "検索キーワードがある場合" TODO: 確認: 検索結果でshowTodoListが更新されること (showTodoListへもTodo削除処理の結果が反映されること)
 */

// 最初にデータを用意する
// 文字入力を受け付ける(◯)
// 発火
// 新規データ作成
// データ作成に伴う各種更新処理

/**
 * ＜テストケース＞
 *
 * (自分)
 * 新規データを作成できること
 * 配列に新規データを追加できること
 * データ作成に伴う各種更新ができること
 *
 * (サンプル)
 * todoList, uniqueIdが更新されること、addInputValueがリセットされること(正)
 * エンターキーを押していない場合、処理が発生しないこと(異)
 * 入力値がない場合、処理が発生しないこと(異)
 * "検索キーワードがある場合" TODO: 確認1: 検索結果でshowTodoListが更新されること
 *
 * ＜テストケース掘り下げ＞
 *
 * todoList, uniqueIdが更新されること、addInputValueがリセットされること( TC: 1 )
 *
 * (自分の思考)
 * => todoList = 配列, uniqueId = id を用意する必要がありそう・・・
 *
 * (サンプル)
 * データ用意: 予測値(期待値) = 配列、引数 = オブジェクト
 * 引数を初期化
 * 用意したデータを編集する
 * カスタムフック呼び出し
 * テスト実行
 *
 *
 * エンターキーを押していない場合、処理が発生しないこと( TC: 2 )
 *
 * (自分の思考)
 * 新規データ定義(必要なもの)
 * eventObject.key = ""(期待する結果)
 * エンターキーを押していない場合の定義が分からない
 *
 * (サンプル)
 * フォームに入力したTodoタイトルで更新されること
 * 表示用TodoListが予想通り更新されないこと
 * 入力値(addInputValue)がリセットされない
 *
 *
 * 入力値がない場合、処理が発生しないこと( TC: 3 )
 * (自分の思考)
 * 「入力値がない場合」の定義どうすればいいのだろうか？
 *
 *
 * (サンプル)
 * eventObject.target.value = ""; //入力値が空
 * eventObject.key = ""; // 「Enterキーが押されない」ことも入力値に含む
 * expect(result.current[0].addInputValue).toBe(""); // onChangeAddInputValueのテストで確かめてるので、handleAddTodoのテストでは記述不要
 *
 *
 * 削除TC
 *
 * (自分の思考)
 * Todoが削除できること
 * confirmモーダルでキャンセルしたとき、Todoが削除できないこと
 *
 * (サンプル)
 * todoが削除されること
 * confirmでキャンセルをクリックした場合、todoが削除されないこと
 *
 * (感じたこと)
 * サンプルのTCの方が、より具体的なものとなっている
 *
 *
 * todoが削除されること( TC: 1 )
 * (自分の思考)
 * 配列を用意
 * わからないこと
 * hooks関数に引数として渡す値は(eventObject? clickイベント？)
 * Todoを削除するのに、入力値は要らないはず
 *
 * (サンプル)
 * 用意ブロック
 * 予測値(配列)を用意
 * 予測値(配列)の初期化
 *
 * testブロック
 * targetId
 * targetTitle
 * window.confirmをモック化(mock: https://qiita.com/Fudeko/items/301f8a80963dfcaafb80#mock%E3%81%A8%E3%81%AF)
 * expectTodoListに削除対象のidをフィルターしたINIT_TODO_LISTを代入
 * hooks呼び出し
 * テスト実行
 * handleDeleteTodoに渡すのは、テストブロックで定義した(targetId, targetTitle)
 * 「表示用TodoListが予想通り更新されないこと」を確認する(テストで確認すること)
 *
 *
 * confirmでキャンセルをクリックした場合、todoが削除されないこと( TC: 2 )
 * (自分の思考)
 * 操作の観点から、"【正常系】todoが削除されること"の逆のコードを定義すればいいと思っていた
 * => 配列の確認はfilterしていないnewTodoListとshowTodoListを突き合わせて一致しないことを確かめればいいと思っていた
 *
 * (サンプル)
 * 比較用の配列:expectTodoListには、通常の配列: INIT_TODO_LISTを指定すれば良かった(filterは不要)
 *
 * (感じたこと)
 * 基本的に使わなくて済むのなら、「 .not.toEqual 」は使わない
 *
 *
 *
 * (自分の思考)
 * (サンプル)
 */
