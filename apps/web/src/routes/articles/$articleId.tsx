import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "@convex-better-auth/backend/convex/_generated/api";
import type { Id } from "@convex-better-auth/backend/convex/_generated/dataModel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/$articleId")({
  component: ArticleDetail,
});

function ArticleDetail() {
  const { articleId } = Route.useParams();
  const article = useQuery(api.articles.getById, {
    id: articleId as Id<"articles">,
  });
  if (!article) {
    return <div>Article not found</div>;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>{article.content}</p>
        <CardDescription>
          By {article.author} on{" "}
          {new Date(article.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button>
          <Link to="/articles/edit/$articleId" params={{ articleId: article._id }}>
            Edit
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
