import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useTodo } from "./hooks";
import { act } from "react-dom/test-utils";

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
});

// 最初にデータを用意して、それを更新してテストする
