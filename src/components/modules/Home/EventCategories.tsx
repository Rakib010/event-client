import React from "react";
import { CategoryCard } from "./CategoryCard";
import { categories } from "@/utils/mockData";

export function CategoriesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explore by Category
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Find activities that match your interests
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}

          {/* View All Card */}
          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-6 hover:bg-slate-100 transition-colors cursor-pointer group">
            <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <span className="text-2xl text-slate-400 font-light">+</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">View All</h3>
            <p className="text-sm text-slate-500">More categories</p>
          </div>
        </div>
      </div>
    </section>
  );
}
