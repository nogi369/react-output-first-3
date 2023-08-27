/**
 * type, placeholder, value
 * 確認方法: DevToolsのElementタブ
 *
 * onChange
 * https://magazine.techacademy.jp/magazine/20723
 *
 * onKeyDown
 * https://magazine.techacademy.jp/magazine/27030
 */

export const InputForm = (props) => {
  const { placeholder, inputValue, handleChangeValue, handleKeyDown } = props;

  /**
   * 渡ってくるpropsを確認する方法
   * DevToolsのComponentsタブの該当コンポーネントの左辺が親から渡ってくるprops
   */
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChangeValue}
      onKeyDown={handleKeyDown}
    />
  );
};
