import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  category: any;
}
export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;
  return (
    <Card className="p-6 flex flex-col items-center text-center transition-all hover:bg-slate-50">
      <div
        className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-4 ${category.color}`}
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{category.name}</h3>
      <p className="text-sm text-slate-500">{category.count} events</p>
    </Card>
  );
}
