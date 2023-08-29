import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
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
      // test関数内に定義したTodoデータを含むTodoリストにshowTodoList(useMemo)の処理で更新する
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
      eventObject.target.value = expectTodoTitle; // ***
      eventObject.key = "";
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
      eventObject.key = ""; // 「Enterキーが押されない」ことも入力値に含む
      const { result } = renderHook(() => useTodo());
      expect(result.current[0].addInputValue).toBe("");
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe(""); // 入力値の変更なし
      act(() => result.current[1].handleAddTodo(eventObject));
      expect(result.current[0].showTodoList).not.toEqual(expectTodoList);
    });
  });
});

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
 *
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
 * (自分の思考)
 * (サンプル)
 */
