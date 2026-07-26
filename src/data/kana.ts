export type KanaScript = "hiragana" | "katakana";

export interface KanaItem {
  id: string;
  row: string;
  hiragana: string;
  katakana: string;
  romaji: string;
}

// 标准五十音图（清音 46 个）
export const kanaTable: KanaItem[] = [
  { id: "a", row: "a", hiragana: "あ", katakana: "ア", romaji: "a" },
  { id: "i", row: "a", hiragana: "い", katakana: "イ", romaji: "i" },
  { id: "u", row: "a", hiragana: "う", katakana: "ウ", romaji: "u" },
  { id: "e", row: "a", hiragana: "え", katakana: "エ", romaji: "e" },
  { id: "o", row: "a", hiragana: "お", katakana: "オ", romaji: "o" },

  { id: "ka", row: "ka", hiragana: "か", katakana: "カ", romaji: "ka" },
  { id: "ki", row: "ka", hiragana: "き", katakana: "キ", romaji: "ki" },
  { id: "ku", row: "ka", hiragana: "く", katakana: "ク", romaji: "ku" },
  { id: "ke", row: "ka", hiragana: "け", katakana: "ケ", romaji: "ke" },
  { id: "ko", row: "ka", hiragana: "こ", katakana: "コ", romaji: "ko" },

  { id: "sa", row: "sa", hiragana: "さ", katakana: "サ", romaji: "sa" },
  { id: "shi", row: "sa", hiragana: "し", katakana: "シ", romaji: "shi" },
  { id: "su", row: "sa", hiragana: "す", katakana: "ス", romaji: "su" },
  { id: "se", row: "sa", hiragana: "せ", katakana: "セ", romaji: "se" },
  { id: "so", row: "sa", hiragana: "そ", katakana: "ソ", romaji: "so" },

  { id: "ta", row: "ta", hiragana: "た", katakana: "タ", romaji: "ta" },
  { id: "chi", row: "ta", hiragana: "ち", katakana: "チ", romaji: "chi" },
  { id: "tsu", row: "ta", hiragana: "つ", katakana: "ツ", romaji: "tsu" },
  { id: "te", row: "ta", hiragana: "て", katakana: "テ", romaji: "te" },
  { id: "to", row: "ta", hiragana: "と", katakana: "ト", romaji: "to" },

  { id: "na", row: "na", hiragana: "な", katakana: "ナ", romaji: "na" },
  { id: "ni", row: "na", hiragana: "に", katakana: "ニ", romaji: "ni" },
  { id: "nu", row: "na", hiragana: "ぬ", katakana: "ヌ", romaji: "nu" },
  { id: "ne", row: "na", hiragana: "ね", katakana: "ネ", romaji: "ne" },
  { id: "no", row: "na", hiragana: "の", katakana: "ノ", romaji: "no" },

  { id: "ha", row: "ha", hiragana: "は", katakana: "ハ", romaji: "ha" },
  { id: "hi", row: "ha", hiragana: "ひ", katakana: "ヒ", romaji: "hi" },
  { id: "fu", row: "ha", hiragana: "ふ", katakana: "フ", romaji: "fu" },
  { id: "he", row: "ha", hiragana: "へ", katakana: "ヘ", romaji: "he" },
  { id: "ho", row: "ha", hiragana: "ほ", katakana: "ホ", romaji: "ho" },

  { id: "ma", row: "ma", hiragana: "ま", katakana: "マ", romaji: "ma" },
  { id: "mi", row: "ma", hiragana: "み", katakana: "ミ", romaji: "mi" },
  { id: "mu", row: "ma", hiragana: "む", katakana: "ム", romaji: "mu" },
  { id: "me", row: "ma", hiragana: "め", katakana: "メ", romaji: "me" },
  { id: "mo", row: "ma", hiragana: "も", katakana: "モ", romaji: "mo" },

  { id: "ya", row: "ya", hiragana: "や", katakana: "ヤ", romaji: "ya" },
  { id: "yu", row: "ya", hiragana: "ゆ", katakana: "ユ", romaji: "yu" },
  { id: "yo", row: "ya", hiragana: "よ", katakana: "ヨ", romaji: "yo" },

  { id: "ra", row: "ra", hiragana: "ら", katakana: "ラ", romaji: "ra" },
  { id: "ri", row: "ra", hiragana: "り", katakana: "リ", romaji: "ri" },
  { id: "ru", row: "ra", hiragana: "る", katakana: "ル", romaji: "ru" },
  { id: "re", row: "ra", hiragana: "れ", katakana: "レ", romaji: "re" },
  { id: "ro", row: "ra", hiragana: "ろ", katakana: "ロ", romaji: "ro" },

  { id: "wa", row: "wa", hiragana: "わ", katakana: "ワ", romaji: "wa" },
  { id: "wo", row: "wa", hiragana: "を", katakana: "ヲ", romaji: "wo" },

  { id: "n", row: "n", hiragana: "ん", katakana: "ン", romaji: "n" },
];

export const kanaRowOrder = ["a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa", "n"];

export function groupByRow(items: KanaItem[]): { row: string; items: KanaItem[] }[] {
  return kanaRowOrder
    .map((row) => ({ row, items: items.filter((item) => item.row === row) }))
    .filter((group) => group.items.length > 0);
}
