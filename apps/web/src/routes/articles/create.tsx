import { createFileRoute, Link } from "@tanstack/react-router";
import CreateArticleForm from "@/components/create-article-form";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
export const Route = createFileRoute("/articles/create")({
  component: CreateArticle,
});

function CreateArticle() {
  return (
    <div className="space-y-4">
      <div className="flex gap-8 items-center">
        <Link to="/articles">
          <HugeiconsIcon
            icon={ArrowLeft02Icon}
            className="size-5 text-muted-foreground"
          />
        </Link>
        <h1 className="text-2xl font-bold py-6">Create Article</h1>
      </div>
      <CreateArticleForm />
    </div>
  );
}
