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
    // confirmでOKクリックした場合
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
  describe("【関数テスト】handleChangeSearchKeyword", () => {
    test("【正常系】検索ワードがある場合、検索された結果が反映される", () => {
      // 予測値(期待値)
      const expectValue = [INIT_TODO_LIST[0]]; // Listどうしが被り、ややこしくならないように「 expectValue 」という変数名にしている
      // 引数
      const eventObject = {
        target: {
          value: "Todo1",
        },
      };
      const { result } = renderHook(() => useTodo());
      act(() => result.current[1].handleChangeSearchKeyword(eventObject));
      expect(result.current[0].showTodoList).toEqual(expectValue);
    });
  });
  test("【正常系】検索ワードがない場合、元のTodoリストが反映される", () => {
    const expectValue = INIT_TODO_LIST;
    // 引数
    const eventObject = {
      target: {
        value: "",
      },
    };
    const { result } = renderHook(() => useTodo());
    act(() => result.current[1].handleChangeSearchKeyword(eventObject));
    expect(result.current[0].showTodoList).toEqual(expectValue);
  });
});
