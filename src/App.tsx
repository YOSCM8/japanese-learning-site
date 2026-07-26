import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import KanaLayout from "./pages/kana/KanaLayout";
import KanaOverview from "./pages/kana/KanaOverview";
import KanaTest from "./pages/kana/KanaTest";
import Vocab from "./pages/Vocab";
import Grammar from "./pages/Grammar";
import Kanji from "./pages/Kanji";
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
        <Route path="kanji" element={<Kanji />} />
        <Route path="practice" element={<Practice />} />
        <Route path="review" element={<Review />} />
      </Route>
    </Routes>
  );
}

export default App;
