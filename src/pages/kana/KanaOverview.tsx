import KanaCard from "../../components/KanaCard";
import { groupByRow, kanaTable } from "../../data/kana";

const rows = groupByRow(kanaTable);

export default function KanaOverview() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-medium text-slate-900">平假名（ひらがな）</h2>
        <div className="mt-3 space-y-3">
          {rows.map((group) => (
            <div key={group.row} className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <KanaCard
                  key={item.id}
                  character={item.hiragana}
                  romaji={item.romaji}
                  script="hiragana"
                  kanaId={item.id}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium text-slate-900">片假名（カタカナ）</h2>
        <div className="mt-3 space-y-3">
          {rows.map((group) => (
            <div key={group.row} className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <KanaCard
                  key={item.id}
                  character={item.katakana}
                  romaji={item.romaji}
                  script="katakana"
                  kanaId={item.id}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
