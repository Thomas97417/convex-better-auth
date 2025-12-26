import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "@convex-better-auth/backend/convex/_generated/api";
import type { Id } from "@convex-better-auth/backend/convex/_generated/dataModel";
import EditArticleForm from "@/components/edit-article-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/articles/edit/$articleId")({
  beforeLoad: async ({ params }) => {
    if (!params.articleId) {
      throw redirect({ to: "/articles" });
    }
  },
  component: EditArticle,
});

function EditArticle() {
  const { articleId } = Route.useParams();
  const navigate = useNavigate();

  const article = useQuery(api.articles.getById, {
    id: articleId as Id<"articles">,
  });

  if (article === undefined) {
    return <div className="p-6">Loading article...</div>;
  }

  if (article === null) {
    console.log("ARTICLE NOT FOUND");
    navigate({
      to: "/articles",
      search: { error: "Article not found" },
    });
    toast.error("Article not found");
    return null;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold p-6">Edit Article</h1>
      <EditArticleForm article={article} />
    </div>
  );
}
