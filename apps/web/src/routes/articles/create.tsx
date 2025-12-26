import { createFileRoute } from "@tanstack/react-router";
import CreateArticleForm from "@/components/create-article-form";

export const Route = createFileRoute("/articles/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>Create Article</p>
      <CreateArticleForm />
    </div>
  );
}
