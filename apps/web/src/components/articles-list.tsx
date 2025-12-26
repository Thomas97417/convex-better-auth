import { HugeiconsIcon } from "@hugeicons/react";

import { Search01Icon } from "@hugeicons/core-free-icons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import type { Doc } from "@convex-better-auth/backend/convex/_generated/dataModel";
import { Link } from "@tanstack/react-router";
export default function ArticlesList({
  articles,
}: {
  articles: Doc<"articles">[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}

function ArticleCard({ article }: { article: Doc<"articles"> }) {
  return (
    <Card key={article._id}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <Link to="/articles/$articleId" params={{ articleId: article._id }}>
            <CardTitle>{article.title}</CardTitle>
          </Link>
          <Link to="/articles/$articleId" params={{ articleId: article._id }}>
            <HugeiconsIcon
              icon={Search01Icon}
              className="size-4 text-muted-foreground"
            />
          </Link>
        </div>
        <CardDescription>
          By {article.author} on{" "}
          {new Date(article.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{article.content.slice(0, 100)}...</p>
      </CardContent>
    </Card>
  );
}
