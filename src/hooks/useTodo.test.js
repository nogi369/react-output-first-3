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
    // let : https://qiita.com/cheez921/items/7b57835cb76e70dd0fc4#%E5%86%8D%E4%BB%A3%E5%85%A5

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
  });
});

// 最初にデータを用意する
// 文字入力を受け付ける(◯)
// 発火
// 新規データ作成
// データ作成に伴う各種更新処理

/**
 * テストケース
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
 * テストケース掘り下げ
 *
 * (自分の思考)
 * todoList, uniqueIdが更新されること、addInputValueがリセットされること
 * => todoList = 配列, uniqueId = id を用意する必要がありそう・・・
 *
 * (サンプル)
 *
 */
