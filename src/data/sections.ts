export interface SectionMeta {
  path: string;
  label: string;
  description: string;
  emoji: string;
}

export const sections: SectionMeta[] = [
  {
    path: "/kana",
    label: "五十音图",
    description: "平假名 / 片假名的认读与书写练习",
    emoji: "あ",
  },
  {
    path: "/vocab",
    label: "词汇",
    description: "按等级与主题分类的单词学习",
    emoji: "語",
  },
  {
    path: "/grammar",
    label: "语法",
    description: "语法点讲解与例句",
    emoji: "文",
  },
  {
    path: "/kanji",
    label: "汉字",
    description: "读音、笔顺与组词",
    emoji: "漢",
  },
  {
    path: "/practice",
    label: "听力 / 阅读",
    description: "音频与短文练习",
    emoji: "耳",
  },
  {
    path: "/review",
    label: "测验与复习",
    description: "间隔重复复习与错题本",
    emoji: "習",
  },
];
