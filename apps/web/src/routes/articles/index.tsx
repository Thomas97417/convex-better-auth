import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "@convex-better-auth/backend/convex/_generated/api";
import ArticlesList from "@/components/articles-list";
import SearchArticle from "@/components/search-article";
import { useState } from "react";
import type { Doc } from "@convex-better-auth/backend/convex/_generated/dataModel";
export const Route = createFileRoute("/articles/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchArticles, setSearchArticles] = useState<Doc<"articles">[]>([]);
  return (
    <div className="space-y-4">
      <Button>
        <Link to="/articles/create">Create Article</Link>
      </Button>
      <SearchArticle setSearchArticles={setSearchArticles} />
      <ArticlesList articles={searchArticles} />
    </div>
  );
}
