import { Input } from "./ui/input";
import { useForm } from "@tanstack/react-form";
import type { Doc } from "@convex-better-auth/backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@convex-better-auth/backend/convex/_generated/api";
export default function SearchArticle({
  setSearchArticles,
}: {
  setSearchArticles: (articles: Doc<"articles">[]) => void;
}) {
  const articles = useQuery(api.articles.getAll) || [];

  return (
    <Input
      type="text"
      placeholder="Search articles"
      onChange={(e) => {
        const filteredArticles = articles.filter((article) =>
          article.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchArticles(filteredArticles);
      }}
    />
  );
}
