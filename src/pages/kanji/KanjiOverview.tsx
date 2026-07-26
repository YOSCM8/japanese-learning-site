import KanjiCard from "../../components/KanjiCard";
import { groupKanjiByCategory, kanjiTable } from "../../data/kanji";

const groups = groupKanjiByCategory(kanjiTable);

export default function KanjiOverview() {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.category.key}>
          <h2 className="text-lg font-medium text-slate-900">{group.category.label}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <KanjiCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
