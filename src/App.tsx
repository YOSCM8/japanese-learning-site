import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import KanaLayout from "./pages/kana/KanaLayout";
import KanaOverview from "./pages/kana/KanaOverview";
import KanaTest from "./pages/kana/KanaTest";
import Vocab from "./pages/Vocab";
import Grammar from "./pages/Grammar";
import KanjiLayout from "./pages/kanji/KanjiLayout";
import KanjiOverview from "./pages/kanji/KanjiOverview";
import KanjiTest from "./pages/kanji/KanjiTest";
import Practice from "./pages/Practice";
import Review from "./pages/Review";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="kana" element={<KanaLayout />}>
          <Route index element={<KanaOverview />} />
          <Route path="test/hiragana" element={<KanaTest script="hiragana" />} />
          <Route path="test/katakana" element={<KanaTest script="katakana" />} />
        </Route>
        <Route path="vocab" element={<Vocab />} />
        <Route path="grammar" element={<Grammar />} />
        <Route path="kanji" element={<KanjiLayout />}>
          <Route index element={<KanjiOverview />} />
          <Route path="test/reading" element={<KanjiTest mode="reading" />} />
          <Route path="test/character" element={<KanjiTest mode="character" />} />
          <Route path="test/compound" element={<KanjiTest mode="compound" />} />
        </Route>
        <Route path="practice" element={<Practice />} />
        <Route path="review" element={<Review />} />
      </Route>
    </Routes>
  );
}

export default App;
