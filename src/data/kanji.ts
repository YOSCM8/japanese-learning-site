export interface KanjiCompound {
  word: string;
  reading: string;
  meaning: string;
}

export interface KanjiItem {
  id: string;
  character: string;
  category: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  primaryReading: string;
  compounds: KanjiCompound[];
}

export interface KanjiCategoryMeta {
  key: string;
  label: string;
}

export const kanjiCategories: KanjiCategoryMeta[] = [
  { key: "numbers", label: "数字" },
  { key: "counters", label: "量词" },
  { key: "seasonsTime", label: "季节与时间" },
  { key: "body", label: "身体部位" },
  { key: "positions", label: "方位" },
  { key: "schoolLife", label: "校园生活" },
  { key: "family", label: "人物与家庭" },
  { key: "adjectives", label: "形容词与副词" },
  { key: "verbs", label: "动词" },
  { key: "natureAnimals", label: "动物与自然" },
  { key: "geography", label: "地理与旅行" },
  { key: "colours", label: "颜色" },
  { key: "repeatSign", label: "叠字符号" },
  { key: "misc", label: "其他" },
];

type CompoundTuple = [word: string, reading: string, meaning: string];

type KanjiTuple = [
  character: string,
  category: string,
  onyomi: string[],
  kunyomi: string[],
  meaning: string,
  primaryReading: string,
  compounds: CompoundTuple[],
];

const rawKanji: KanjiTuple[] = [
  // 数字
  ["一", "numbers", ["いち"], ["ひと"], "one", "いち", [["一つ", "ひとつ", "one thing"], ["一人", "ひとり", "one person"]]],
  ["二", "numbers", ["に"], ["ふた"], "two", "に", [["二つ", "ふたつ", "two things"], ["二人", "ふたり", "two people"]]],
  ["三", "numbers", ["さん"], ["み"], "three", "さん", [["三つ", "みっつ", "three things"], ["三月", "さんがつ", "March"]]],
  ["四", "numbers", ["し"], ["よん", "よ"], "four", "よん", [["四つ", "よっつ", "four things"], ["四月", "しがつ", "April"]]],
  ["五", "numbers", ["ご"], ["いつ"], "five", "ご", [["五つ", "いつつ", "five things"], ["五月", "ごがつ", "May"]]],
  ["六", "numbers", ["ろく"], ["む"], "six", "ろく", [["六つ", "むっつ", "six things"], ["六月", "ろくがつ", "June"]]],
  ["七", "numbers", ["しち"], ["なな"], "seven", "なな", [["七つ", "ななつ", "seven things"], ["七月", "しちがつ", "July"]]],
  ["八", "numbers", ["はち"], ["や"], "eight", "はち", [["八つ", "やっつ", "eight things"], ["八月", "はちがつ", "August"]]],
  ["九", "numbers", ["きゅう", "く"], ["ここの"], "nine", "きゅう", [["九つ", "ここのつ", "nine things"], ["九月", "くがつ", "September"]]],
  ["十", "numbers", ["じゅう"], ["とお"], "ten", "じゅう", [["十日", "とおか", "the 10th day"], ["十月", "じゅうがつ", "October"]]],
  ["百", "numbers", ["ひゃく"], [], "hundred", "ひゃく", [["百円", "ひゃくえん", "100 yen"], ["三百", "さんびゃく", "three hundred"]]],
  ["千", "numbers", ["せん"], [], "thousand", "せん", [["千円", "せんえん", "1000 yen"], ["三千", "さんぜん", "three thousand"]]],
  ["万", "numbers", ["まん"], [], "ten thousand", "まん", [["一万", "いちまん", "ten thousand"], ["万年筆", "まんねんひつ", "fountain pen"]]],

  // 量词
  ["本", "counters", ["ほん"], [], "book; counter for long objects", "ほん", [["本", "ほん", "book"], ["日本", "にほん", "Japan"]]],
  ["人", "counters", ["じん", "にん"], ["ひと"], "person", "ひと", [["日本人", "にほんじん", "Japanese person"], ["三人", "さんにん", "three people"]]],
  ["回", "counters", ["かい"], [], "times; counter for occurrences", "かい", [["一回", "いっかい", "one time/once"], ["今回", "こんかい", "this time"]]],
  ["才", "counters", ["さい"], [], "years old; talent", "さい", [["十才", "じゅっさい", "10 years old"], ["才能", "さいのう", "talent"]]],
  ["円", "counters", ["えん"], ["まる"], "yen; circle", "えん", [["円", "えん", "yen"], ["円い", "まるい", "round"]]],
  ["番", "counters", ["ばん"], [], "number; order", "ばん", [["一番", "いちばん", "number one/best"], ["番号", "ばんごう", "number"]]],

  // 季节与时间
  ["春", "seasonsTime", [], ["はる"], "spring", "はる", [["春", "はる", "spring"], ["春休み", "はるやすみ", "spring break"]]],
  ["夏", "seasonsTime", [], ["なつ"], "summer", "なつ", [["夏", "なつ", "summer"], ["夏休み", "なつやすみ", "summer break"]]],
  ["秋", "seasonsTime", [], ["あき"], "autumn", "あき", [["秋", "あき", "autumn"], ["秋分", "しゅうぶん", "autumn equinox"]]],
  ["冬", "seasonsTime", [], ["ふゆ"], "winter", "ふゆ", [["冬", "ふゆ", "winter"], ["冬休み", "ふゆやすみ", "winter break"]]],
  ["日", "seasonsTime", ["にち"], ["ひ"], "day; sun", "ひ", [["日曜日", "にちようび", "Sunday"], ["毎日", "まいにち", "every day"]]],
  ["月", "seasonsTime", ["げつ"], ["つき"], "moon; month", "つき", [["月曜日", "げつようび", "Monday"], ["一月", "いちがつ", "January"]]],
  ["火", "seasonsTime", ["か"], ["ひ"], "fire", "ひ", [["火曜日", "かようび", "Tuesday"], ["花火", "はなび", "fireworks"]]],
  ["水", "seasonsTime", ["すい"], ["みず"], "water", "みず", [["水曜日", "すいようび", "Wednesday"], ["水", "みず", "water"]]],
  ["木", "seasonsTime", ["もく"], ["き"], "tree; wood", "き", [["木曜日", "もくようび", "Thursday"], ["木", "き", "tree"]]],
  ["金", "seasonsTime", ["きん"], ["かね"], "gold; money", "かね", [["金曜日", "きんようび", "Friday"], ["お金", "おかね", "money"]]],
  ["土", "seasonsTime", ["ど"], ["つち"], "soil; earth", "つち", [["土曜日", "どようび", "Saturday"], ["土", "つち", "soil"]]],
  ["曜", "seasonsTime", ["よう"], [], "weekday marker", "よう", [["曜日", "ようび", "day of the week"], ["何曜日", "なんようび", "what day of the week"]]],
  ["年", "seasonsTime", ["ねん"], ["とし"], "year", "ねん", [["今年", "ことし", "this year"], ["来年", "らいねん", "next year"]]],
  ["時", "seasonsTime", ["じ"], ["とき"], "time; hour", "じ", [["時間", "じかん", "time/hours"], ["何時", "なんじ", "what time"]]],
  ["分", "seasonsTime", ["ふん", "ぶん"], ["わ"], "minute; part; understand", "ふん", [["分かる", "わかる", "to understand"], ["三分", "さんぷん", "three minutes"]]],
  ["夕", "seasonsTime", [], ["ゆう"], "evening", "ゆう", [["夕方", "ゆうがた", "evening"], ["夕食", "ゆうしょく", "dinner"]]],
  ["半", "seasonsTime", ["はん"], [], "half", "はん", [["半分", "はんぶん", "half"], ["半年", "はんとし", "half a year"]]],
  ["午", "seasonsTime", ["ご"], [], "noon", "ご", [["午前", "ごぜん", "a.m."], ["午後", "ごご", "p.m."]]],
  ["毎", "seasonsTime", ["まい"], [], "every", "まい", [["毎日", "まいにち", "every day"], ["毎週", "まいしゅう", "every week"]]],
  ["週", "seasonsTime", ["しゅう"], [], "week", "しゅう", [["今週", "こんしゅう", "this week"], ["週末", "しゅうまつ", "weekend"]]],
  ["間", "seasonsTime", ["かん"], ["あいだ"], "interval; between", "あいだ", [["間", "あいだ", "between"], ["人間", "にんげん", "human being"]]],
  ["今", "seasonsTime", ["こん"], ["いま"], "now", "いま", [["今", "いま", "now"], ["今週", "こんしゅう", "this week"]]],
  ["先", "seasonsTime", ["せん"], ["さき"], "previous; ahead", "せん", [["先生", "せんせい", "teacher"], ["先週", "せんしゅう", "last week"]]],
  ["朝", "seasonsTime", ["ちょう"], ["あさ"], "morning", "あさ", [["朝", "あさ", "morning"], ["朝食", "ちょうしょく", "breakfast"]]],
  ["晩", "seasonsTime", ["ばん"], [], "evening", "ばん", [["今晩", "こんばん", "tonight"], ["毎晩", "まいばん", "every night"]]],
  ["昼", "seasonsTime", [], ["ひる"], "noon; daytime", "ひる", [["昼", "ひる", "noon"], ["昼休み", "ひるやすみ", "lunch break"]]],
  ["夜", "seasonsTime", ["や"], ["よる"], "night", "よる", [["夜", "よる", "night"], ["今夜", "こんや", "tonight"]]],
  ["去", "seasonsTime", ["きょ"], ["さ"], "past; leave", "きょ", [["去年", "きょねん", "last year"], ["過去", "かこ", "the past"]]],

  // 身体部位
  ["目", "body", ["もく"], ["め"], "eye", "め", [["目", "め", "eye"], ["目的", "もくてき", "purpose"]]],
  ["口", "body", ["こう"], ["くち"], "mouth", "くち", [["口", "くち", "mouth"], ["人口", "じんこう", "population"]]],
  ["耳", "body", ["じ"], ["みみ"], "ear", "みみ", [["耳", "みみ", "ear"], ["耳鼻科", "じびか", "ENT (ear/nose/throat)"]]],
  ["手", "body", ["しゅ"], ["て"], "hand", "て", [["手", "て", "hand"], ["上手", "じょうず", "skillful"]]],
  ["体", "body", ["たい"], ["からだ"], "body", "からだ", [["体", "からだ", "body"], ["体育", "たいいく", "physical education"]]],

  // 方位
  ["上", "positions", ["じょう"], ["うえ"], "up; above", "うえ", [["上", "うえ", "above/on top"], ["上手", "じょうず", "skillful"]]],
  ["中", "positions", ["ちゅう"], ["なか"], "middle; inside", "なか", [["中", "なか", "inside/middle"], ["中学校", "ちゅうがっこう", "middle school"]]],
  ["下", "positions", ["か"], ["した"], "down; below", "した", [["下", "した", "below"], ["下手", "へた", "unskillful"]]],
  ["右", "positions", ["う"], ["みぎ"], "right", "みぎ", [["右", "みぎ", "right"], ["右手", "みぎて", "right hand"]]],
  ["左", "positions", ["さ"], ["ひだり"], "left", "ひだり", [["左", "ひだり", "left"], ["左手", "ひだりて", "left hand"]]],
  ["前", "positions", ["ぜん"], ["まえ"], "front; before", "まえ", [["前", "まえ", "front/before"], ["午前", "ごぜん", "a.m."]]],
  ["後", "positions", ["ご"], ["うしろ", "あと"], "behind; after", "うしろ", [["後ろ", "うしろ", "behind"], ["午後", "ごご", "p.m."]]],
  ["東", "positions", ["とう"], ["ひがし"], "east", "ひがし", [["東", "ひがし", "east"], ["東京", "とうきょう", "Tokyo"]]],
  ["西", "positions", ["せい"], ["にし"], "west", "にし", [["西", "にし", "west"], ["関西", "かんさい", "Kansai region"]]],
  ["南", "positions", ["なん"], ["みなみ"], "south", "みなみ", [["南", "みなみ", "south"], ["南口", "みなみぐち", "south exit"]]],
  ["北", "positions", ["ほく"], ["きた"], "north", "きた", [["北", "きた", "north"], ["北海道", "ほっかいどう", "Hokkaido"]]],
  ["外", "positions", ["がい"], ["そと"], "outside", "そと", [["外", "そと", "outside"], ["外国", "がいこく", "foreign country"]]],

  // 校园生活
  ["学", "schoolLife", ["がく"], [], "study; learning", "がく", [["学校", "がっこう", "school"], ["学生", "がくせい", "student"]]],
  ["校", "schoolLife", ["こう"], [], "school", "こう", [["学校", "がっこう", "school"], ["校長", "こうちょう", "principal"]]],
  ["英", "schoolLife", ["えい"], [], "English; excellent", "えい", [["英語", "えいご", "English language"], ["英国", "えいこく", "England"]]],
  ["語", "schoolLife", ["ご"], [], "language", "ご", [["日本語", "にほんご", "Japanese language"], ["語学", "ごがく", "language study"]]],
  ["文", "schoolLife", ["ぶん"], ["ふみ"], "sentence; writing", "ぶん", [["文", "ぶん", "sentence"], ["作文", "さくぶん", "composition"]]],
  ["漢", "schoolLife", ["かん"], [], "Chinese (Han)", "かん", [["漢字", "かんじ", "kanji character"], ["漢文", "かんぶん", "classical Chinese text"]]],
  ["字", "schoolLife", ["じ"], [], "character; letter", "じ", [["漢字", "かんじ", "kanji character"], ["字", "じ", "character/handwriting"]]],
  ["勉", "schoolLife", ["べん"], [], "diligent; endeavour", "べん", [["勉強", "べんきょう", "study"], ["勉強家", "べんきょうか", "hard worker"]]],
  ["強", "schoolLife", ["きょう"], ["つよ"], "strong", "きょう", [["勉強", "べんきょう", "study"], ["強い", "つよい", "strong"]]],

  // 人物与家庭
  ["父", "family", ["ふ"], ["ちち"], "father", "ちち", [["父", "ちち", "father"], ["お父さん", "おとうさん", "dad (polite)"]]],
  ["母", "family", ["ぼ"], ["はは"], "mother", "はは", [["母", "はは", "mother"], ["お母さん", "おかあさん", "mom (polite)"]]],
  ["子", "family", ["し"], ["こ"], "child", "こ", [["子供", "こども", "child"], ["女の子", "おんなのこ", "girl"]]],
  ["家", "family", ["か"], ["いえ"], "house; family", "いえ", [["家", "いえ", "house"], ["家族", "かぞく", "family"]]],
  ["族", "family", ["ぞく"], [], "family; tribe", "ぞく", [["家族", "かぞく", "family"], ["民族", "みんぞく", "ethnic group"]]],
  ["兄", "family", ["きょう"], ["あに"], "older brother", "あに", [["兄", "あに", "older brother"], ["お兄さん", "おにいさん", "older brother (polite)"]]],
  ["弟", "family", ["てい"], ["おとうと"], "younger brother", "おとうと", [["弟", "おとうと", "younger brother"], ["兄弟", "きょうだい", "siblings"]]],
  ["姉", "family", ["し"], ["あね"], "older sister", "あね", [["姉", "あね", "older sister"], ["お姉さん", "おねえさん", "older sister (polite)"]]],
  ["妹", "family", ["まい"], ["いもうと"], "younger sister", "いもうと", [["妹", "いもうと", "younger sister"], ["姉妹", "しまい", "sisters"]]],
  ["友", "family", ["ゆう"], ["とも"], "friend", "とも", [["友達", "ともだち", "friend"], ["親友", "しんゆう", "close friend"]]],
  ["私", "family", ["し"], ["わたし"], "I; private", "わたし", [["私", "わたし", "I/me"], ["私立", "しりつ", "private (institution)"]]],
  ["男", "family", ["だん"], ["おとこ"], "man", "おとこ", [["男", "おとこ", "man"], ["男の子", "おとこのこ", "boy"]]],
  ["女", "family", ["じょ"], ["おんな"], "woman", "おんな", [["女", "おんな", "woman"], ["女の子", "おんなのこ", "girl"]]],

  // 形容词与副词
  ["大", "adjectives", ["だい", "たい"], ["おお"], "big", "おおきい", [["大きい", "おおきい", "big"], ["大学", "だいがく", "university"]]],
  ["小", "adjectives", ["しょう"], ["ちい"], "small", "ちいさい", [["小さい", "ちいさい", "small"], ["小学校", "しょうがっこう", "elementary school"]]],
  ["好", "adjectives", ["こう"], ["す"], "fond; like", "すき", [["好き", "すき", "like/fond of"], ["大好き", "だいすき", "love/really like"]]],
  ["安", "adjectives", ["あん"], ["やす"], "cheap; safe", "やすい", [["安い", "やすい", "cheap"], ["安心", "あんしん", "relief"]]],
  ["高", "adjectives", ["こう"], ["たか"], "tall; expensive", "たかい", [["高い", "たかい", "tall/expensive"], ["高校", "こうこう", "high school"]]],
  ["新", "adjectives", ["しん"], ["あたら"], "new", "あたらしい", [["新しい", "あたらしい", "new"], ["新聞", "しんぶん", "newspaper"]]],
  ["古", "adjectives", ["こ"], ["ふる"], "old", "ふるい", [["古い", "ふるい", "old"], ["中古", "ちゅうこ", "secondhand"]]],
  ["多", "adjectives", ["た"], ["おお"], "many", "おおい", [["多い", "おおい", "many"], ["多分", "たぶん", "probably"]]],
  ["少", "adjectives", ["しょう"], ["すく", "すこ"], "few; little", "すこし", [["少ない", "すくない", "few"], ["少し", "すこし", "a little"]]],
  ["楽", "adjectives", ["がく", "らく"], ["たの"], "fun; comfortable", "たのしい", [["楽しい", "たのしい", "fun"], ["音楽", "おんがく", "music"]]],
  ["長", "adjectives", ["ちょう"], ["なが"], "long", "ながい", [["長い", "ながい", "long"], ["校長", "こうちょう", "principal"]]],
  ["近", "adjectives", ["きん"], ["ちか"], "near", "ちかい", [["近い", "ちかい", "near"], ["近く", "ちかく", "nearby"]]],
  ["正", "adjectives", ["せい", "しょう"], ["ただ"], "correct", "ただしい", [["正しい", "ただしい", "correct"], ["正月", "しょうがつ", "New Year"]]],
  ["広", "adjectives", ["こう"], ["ひろ"], "wide; spacious", "ひろい", [["広い", "ひろい", "spacious"], ["広告", "こうこく", "advertisement"]]],
  ["早", "adjectives", ["そう"], ["はや"], "early", "はやい", [["早い", "はやい", "early"], ["早朝", "そうちょう", "early morning"]]],
  ["明", "adjectives", ["めい"], ["あか"], "bright", "あかるい", [["明るい", "あかるい", "bright"], ["説明", "せつめい", "explanation"]]],

  // 动词
  ["行", "verbs", ["こう", "ぎょう"], ["い", "おこな"], "go; conduct", "いく", [["行く", "いく", "to go"], ["旅行", "りょこう", "travel"]]],
  ["来", "verbs", ["らい"], ["く"], "come", "くる", [["来る", "くる", "to come"], ["来年", "らいねん", "next year"]]],
  ["休", "verbs", ["きゅう"], ["やす"], "rest", "やすむ", [["休む", "やすむ", "to rest"], ["休み", "やすみ", "holiday/break"]]],
  ["出", "verbs", ["しゅつ"], ["で", "だ"], "exit; put out", "でる", [["出る", "でる", "to go out"], ["出口", "でぐち", "exit"]]],
  ["入", "verbs", ["にゅう"], ["はい", "い"], "enter", "はいる", [["入る", "はいる", "to enter"], ["入学", "にゅうがく", "school enrollment"]]],
  ["生", "verbs", ["せい"], ["い"], "life; student", "いきる", [["生きる", "いきる", "to live"], ["学生", "がくせい", "student"]]],
  ["思", "verbs", ["し"], ["おも"], "think", "おもう", [["思う", "おもう", "to think"], ["思い出", "おもいで", "memory"]]],
  ["書", "verbs", ["しょ"], ["か"], "write", "かく", [["書く", "かく", "to write"], ["図書館", "としょかん", "library"]]],
  ["言", "verbs", ["げん", "ごん"], ["い"], "say", "いう", [["言う", "いう", "to say"], ["言葉", "ことば", "word/language"]]],
  ["話", "verbs", ["わ"], ["はな"], "talk", "はなす", [["話す", "はなす", "to speak"], ["電話", "でんわ", "telephone"]]],
  ["読", "verbs", ["どく"], ["よ"], "read", "よむ", [["読む", "よむ", "to read"], ["読書", "どくしょ", "reading"]]],
  ["売", "verbs", ["ばい"], ["う"], "sell", "うる", [["売る", "うる", "to sell"], ["売店", "ばいてん", "kiosk/stand"]]],
  ["買", "verbs", ["ばい"], ["か"], "buy", "かう", [["買う", "かう", "to buy"], ["買い物", "かいもの", "shopping"]]],
  ["食", "verbs", ["しょく"], ["た"], "eat", "たべる", [["食べる", "たべる", "to eat"], ["食べ物", "たべもの", "food"]]],
  ["飲", "verbs", ["いん"], ["の"], "drink", "のむ", [["飲む", "のむ", "to drink"], ["飲み物", "のみもの", "beverage"]]],
  ["知", "verbs", ["ち"], ["し"], "know", "しる", [["知る", "しる", "to know"], ["知らせる", "しらせる", "to inform"]]],
  ["作", "verbs", ["さく"], ["つく"], "make", "つくる", [["作る", "つくる", "to make"], ["作文", "さくぶん", "composition"]]],
  ["住", "verbs", ["じゅう"], ["す"], "live; reside", "すむ", [["住む", "すむ", "to live/reside"], ["住所", "じゅうしょ", "address"]]],
  ["会", "verbs", ["かい"], ["あ"], "meet", "あう", [["会う", "あう", "to meet"], ["会社", "かいしゃ", "company"]]],
  ["使", "verbs", ["し"], ["つか"], "use", "つかう", [["使う", "つかう", "to use"], ["使用", "しよう", "usage"]]],
  ["着", "verbs", ["ちゃく"], ["き", "つ"], "wear; arrive", "きる", [["着る", "きる", "to wear"], ["到着", "とうちゃく", "arrival"]]],
  ["発", "verbs", ["はつ", "ほつ"], [], "depart; emit", "はつ", [["出発", "しゅっぱつ", "departure"], ["発見", "はっけん", "discovery"]]],
  ["聞", "verbs", ["ぶん", "もん"], ["き"], "hear; ask", "きく", [["聞く", "きく", "to listen/ask"], ["新聞", "しんぶん", "newspaper"]]],
  ["帰", "verbs", ["き"], ["かえ"], "return", "かえる", [["帰る", "かえる", "to go home"], ["帰国", "きこく", "returning to one's country"]]],
  ["持", "verbs", ["じ"], ["も"], "hold", "もつ", [["持つ", "もつ", "to hold"], ["気持ち", "きもち", "feeling"]]],
  ["待", "verbs", ["たい"], ["ま"], "wait", "まつ", [["待つ", "まつ", "to wait"], ["待合室", "まちあいしつ", "waiting room"]]],
  ["教", "verbs", ["きょう"], ["おし"], "teach", "おしえる", [["教える", "おしえる", "to teach"], ["教室", "きょうしつ", "classroom"]]],
  ["乗", "verbs", ["じょう"], ["の"], "ride", "のる", [["乗る", "のる", "to ride"], ["乗り物", "のりもの", "vehicle"]]],
  ["働", "verbs", [], ["はたら"], "work", "はたらく", [["働く", "はたらく", "to work"], ["働き者", "はたらきもの", "hard worker"]]],
  ["動", "verbs", ["どう"], ["うご"], "move", "うごく", [["動く", "うごく", "to move"], ["運動", "うんどう", "exercise"]]],
  ["歩", "verbs", ["ほ"], ["ある"], "walk", "あるく", [["歩く", "あるく", "to walk"], ["散歩", "さんぽ", "a walk/stroll"]]],
  ["終", "verbs", ["しゅう"], ["お"], "end", "おわる", [["終わる", "おわる", "to end/finish"], ["終電", "しゅうでん", "last train"]]],
  ["始", "verbs", ["し"], ["はじ"], "begin", "はじまる", [["始まる", "はじまる", "to begin"], ["開始", "かいし", "start/commencement"]]],
  ["泊", "verbs", ["はく"], ["と"], "stay overnight", "とまる", [["泊まる", "とまる", "to stay the night"], ["一泊", "いっぱく", "one night's stay"]]],
  ["洗", "verbs", ["せん"], ["あら"], "wash", "あらう", [["洗う", "あらう", "to wash"], ["洗濯", "せんたく", "laundry"]]],
  ["立", "verbs", ["りつ"], ["た"], "stand", "たつ", [["立つ", "たつ", "to stand"], ["国立", "こくりつ", "national/state-established"]]],
  ["考", "verbs", ["こう"], ["かんが"], "think; consider", "かんがえる", [["考える", "かんがえる", "to think/consider"], ["考え", "かんがえ", "thought/idea"]]],
  ["習", "verbs", ["しゅう"], ["なら"], "learn", "ならう", [["習う", "ならう", "to learn"], ["練習", "れんしゅう", "practice"]]],

  // 动物与自然
  ["山", "natureAnimals", ["さん"], ["やま"], "mountain", "やま", [["山", "やま", "mountain"], ["富士山", "ふじさん", "Mt. Fuji"]]],
  ["川", "natureAnimals", ["せん"], ["かわ"], "river", "かわ", [["川", "かわ", "river"], ["小川", "おがわ", "stream"]]],
  ["田", "natureAnimals", ["でん"], ["た"], "rice field", "た", [["田んぼ", "たんぼ", "rice paddy"], ["田舎", "いなか", "countryside"]]],
  ["島", "natureAnimals", ["とう"], ["しま"], "island", "しま", [["島", "しま", "island"], ["半島", "はんとう", "peninsula"]]],
  ["花", "natureAnimals", ["か"], ["はな"], "flower", "はな", [["花", "はな", "flower"], ["花見", "はなみ", "flower viewing"]]],
  ["海", "natureAnimals", ["かい"], ["うみ"], "sea", "うみ", [["海", "うみ", "sea"], ["海外", "かいがい", "overseas"]]],
  ["天", "natureAnimals", ["てん"], [], "sky; heaven", "てん", [["天気", "てんき", "weather"], ["天才", "てんさい", "genius"]]],
  ["雨", "natureAnimals", ["う"], ["あめ"], "rain", "あめ", [["雨", "あめ", "rain"], ["大雨", "おおあめ", "heavy rain"]]],
  ["雪", "natureAnimals", ["せつ"], ["ゆき"], "snow", "ゆき", [["雪", "ゆき", "snow"], ["雪国", "ゆきぐに", "snow country"]]],
  ["牛", "natureAnimals", ["ぎゅう"], ["うし"], "cow", "うし", [["牛", "うし", "cow"], ["牛肉", "ぎゅうにく", "beef"]]],
  ["魚", "natureAnimals", ["ぎょ"], ["さかな"], "fish", "さかな", [["魚", "さかな", "fish"], ["魚屋", "さかなや", "fish shop"]]],
  ["馬", "natureAnimals", ["ば"], ["うま"], "horse", "うま", [["馬", "うま", "horse"], ["馬力", "ばりょく", "horsepower"]]],
  ["犬", "natureAnimals", ["けん"], ["いぬ"], "dog", "いぬ", [["犬", "いぬ", "dog"], ["子犬", "こいぬ", "puppy"]]],

  // 地理与旅行
  ["京", "geography", ["きょう", "けい"], [], "capital", "きょう", [["東京", "とうきょう", "Tokyo"], ["京都", "きょうと", "Kyoto"]]],
  ["都", "geography", ["と"], ["みやこ"], "capital city", "と", [["京都", "きょうと", "Kyoto"], ["都会", "とかい", "city"]]],
  ["市", "geography", ["し"], [], "city", "し", [["市", "し", "city"], ["市場", "いちば", "market"]]],
  ["県", "geography", ["けん"], [], "prefecture", "けん", [["県", "けん", "prefecture"], ["県庁", "けんちょう", "prefectural office"]]],
  ["州", "geography", ["しゅう"], [], "state; region", "しゅう", [["九州", "きゅうしゅう", "Kyushu"], ["州", "しゅう", "state/region"]]],
  ["国", "geography", ["こく"], ["くに"], "country", "くに", [["国", "くに", "country"], ["外国", "がいこく", "foreign country"]]],
  ["町", "geography", ["ちょう"], ["まち"], "town", "まち", [["町", "まち", "town"], ["町長", "ちょうちょう", "town mayor"]]],
  ["神", "geography", ["しん", "じん"], ["かみ"], "god", "かみ", [["神社", "じんじゃ", "shrine"], ["神様", "かみさま", "god"]]],
  ["寺", "geography", ["じ"], ["てら"], "temple", "てら", [["お寺", "おてら", "temple"], ["寺院", "じいん", "temple (formal)"]]],
  ["駅", "geography", ["えき"], [], "station", "えき", [["駅", "えき", "station"], ["駅前", "えきまえ", "in front of the station"]]],
  ["店", "geography", ["てん"], ["みせ"], "shop", "みせ", [["店", "みせ", "shop"], ["店員", "てんいん", "shop clerk"]]],
  ["電", "geography", ["でん"], [], "electricity", "でん", [["電車", "でんしゃ", "train"], ["電話", "でんわ", "telephone"]]],
  ["車", "geography", ["しゃ"], ["くるま"], "car", "くるま", [["車", "くるま", "car"], ["自転車", "じてんしゃ", "bicycle"]]],
  ["道", "geography", ["どう"], ["みち"], "road; way", "みち", [["道", "みち", "road/way"], ["北海道", "ほっかいどう", "Hokkaido"]]],
  ["旅", "geography", ["りょ"], ["たび"], "travel", "たび", [["旅行", "りょこう", "travel"], ["旅館", "りょかん", "Japanese-style inn"]]],

  // 颜色
  ["赤", "colours", ["せき"], ["あか"], "red", "あか", [["赤", "あか", "red"], ["赤ちゃん", "あかちゃん", "baby"]]],
  ["青", "colours", ["せい"], ["あお"], "blue", "あお", [["青", "あお", "blue"], ["青年", "せいねん", "youth"]]],
  ["白", "colours", ["はく"], ["しろ"], "white", "しろ", [["白", "しろ", "white"], ["白い", "しろい", "white (adj.)"]]],
  ["黒", "colours", ["こく"], ["くろ"], "black", "くろ", [["黒", "くろ", "black"], ["黒板", "こくばん", "blackboard"]]],
  ["色", "colours", ["しょく"], ["いろ"], "colour", "いろ", [["色", "いろ", "colour"], ["景色", "けしき", "scenery"]]],
  ["銀", "colours", ["ぎん"], [], "silver", "ぎん", [["銀行", "ぎんこう", "bank"], ["銀色", "ぎんいろ", "silver colour"]]],

  // 叠字符号
  ["々", "repeatSign", [], [], "repeats the previous kanji (iteration mark)", "", [["人々", "ひとびと", "people"], ["時々", "ときどき", "sometimes"]]],

  // 其他
  ["何", "misc", ["か"], ["なに", "なん"], "what", "なに", [["何", "なに", "what"], ["何時", "なんじ", "what time"]]],
  ["紙", "misc", ["し"], ["かみ"], "paper", "かみ", [["紙", "かみ", "paper"], ["手紙", "てがみ", "letter"]]],
  ["元", "misc", ["げん"], ["もと"], "origin", "もと", [["元気", "げんき", "healthy/energetic"], ["元", "もと", "origin"]]],
  ["気", "misc", ["き"], [], "spirit; feeling", "き", [["元気", "げんき", "healthy"], ["天気", "てんき", "weather"]]],
  ["活", "misc", ["かつ"], [], "lively", "かつ", [["生活", "せいかつ", "daily life"], ["活動", "かつどう", "activity"]]],
  ["社", "misc", ["しゃ"], [], "company; shrine", "しゃ", [["会社", "かいしゃ", "company"], ["神社", "じんじゃ", "shrine"]]],
  ["自", "misc", ["じ"], [], "self", "じ", [["自分", "じぶん", "oneself"], ["自転車", "じてんしゃ", "bicycle"]]],
  ["物", "misc", ["ぶつ"], ["もの"], "thing", "もの", [["物", "もの", "thing"], ["買い物", "かいもの", "shopping"]]],
  ["名", "misc", ["めい"], ["な"], "name", "な", [["名前", "なまえ", "name"], ["有名", "ゆうめい", "famous"]]],
  ["方", "misc", ["ほう"], ["かた"], "direction; person", "かた", [["方", "かた", "person (polite)"], ["夕方", "ゆうがた", "evening"]]],
  ["院", "misc", ["いん"], [], "institution", "いん", [["病院", "びょういん", "hospital"], ["大学院", "だいがくいん", "graduate school"]]],
  ["所", "misc", ["しょ"], ["ところ"], "place", "ところ", [["所", "ところ", "place"], ["台所", "だいどころ", "kitchen"]]],
  ["屋", "misc", ["おく"], ["や"], "shop; roof", "や", [["部屋", "へや", "room"], ["本屋", "ほんや", "bookstore"]]],
  ["肉", "misc", ["にく"], [], "meat", "にく", [["肉", "にく", "meat"], ["牛肉", "ぎゅうにく", "beef"]]],
  ["場", "misc", ["じょう"], ["ば"], "place", "ば", [["場所", "ばしょ", "location"], ["会場", "かいじょう", "venue"]]],
  ["飯", "misc", ["はん"], ["めし"], "rice; meal", "はん", [["ご飯", "ごはん", "rice/meal"], ["朝ご飯", "あさごはん", "breakfast"]]],
  ["洋", "misc", ["よう"], [], "Western", "よう", [["洋服", "ようふく", "Western clothes"], ["洋食", "ようしょく", "Western food"]]],
  ["和", "misc", ["わ"], [], "Japanese-style; harmony", "わ", [["和食", "わしょく", "Japanese food"], ["平和", "へいわ", "peace"]]],
  ["病", "misc", ["びょう"], ["やまい"], "illness", "びょう", [["病気", "びょうき", "sickness"], ["病院", "びょういん", "hospital"]]],
  ["次", "misc", ["じ"], ["つぎ"], "next", "つぎ", [["次", "つぎ", "next"], ["次回", "じかい", "next time"]]],
  ["同", "misc", ["どう"], ["おな"], "same", "おなじ", [["同じ", "おなじ", "same"], ["同時", "どうじ", "same time"]]],
  ["仕", "misc", ["し"], [], "serve", "し", [["仕事", "しごと", "work/job"], ["仕方", "しかた", "way of doing"]]],
  ["事", "misc", ["じ"], ["こと"], "thing; matter", "こと", [["仕事", "しごと", "work"], ["事故", "じこ", "accident"]]],
  ["点", "misc", ["てん"], [], "point; dot", "てん", [["点", "てん", "point"], ["百点", "ひゃくてん", "100 points/perfect score"]]],
];

export const kanjiTable: KanjiItem[] = rawKanji.map(
  ([character, category, onyomi, kunyomi, meaning, primaryReading, compounds], index) => ({
    id: `k${index}`,
    character,
    category,
    onyomi,
    kunyomi,
    meaning,
    primaryReading,
    compounds: compounds.map(([word, reading, compoundMeaning]) => ({
      word,
      reading,
      meaning: compoundMeaning,
    })),
  }),
);

export function groupKanjiByCategory(items: KanjiItem[]): { category: KanjiCategoryMeta; items: KanjiItem[] }[] {
  return kanjiCategories
    .map((category) => ({ category, items: items.filter((item) => item.category === category.key) }))
    .filter((group) => group.items.length > 0);
}
