import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "@convex-better-auth/backend/convex/_generated/api";
import { useMutation } from "convex/react";
import { Textarea } from "./ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import type { Doc } from "@convex-better-auth/backend/convex/_generated/dataModel";

export default function EditArticleForm({
  article,
}: {
  article: Doc<"articles">;
}) {
  const navigate = useNavigate({
    from: "/",
  });
  const updateArticle = useMutation(api.articles.update);

  const form = useForm({
    defaultValues: {
      title: article.title,
      content: article.content,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateArticle({
          id: article._id,
          title: value.title,
          content: value.content,
          updatedAt: Date.now(),
        });
        navigate({
          to: "/articles",
        });
        toast.success("Article updated successfully");
      } catch (error) {
        toast.error("Failed to update article");
      }
    },
    validators: {
      onSubmit: z.object({
        title: z.string().min(1, "Title is required"),
        content: z.string().min(1, "Content is required"),
      }),
    },
  });

  return (
    <div className="mx-auto w-full max-w-xl p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field name="title">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.target.value)
                  }
                  placeholder="Title"
                />
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-red-500">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="content">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Content</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    field.handleChange(e.target.value)
                  }
                  placeholder="Content"
                />
                {field.state.meta.errors.map((error) => (
                  <p key={error?.message} className="text-red-500">
                    {error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>
        </div>

        <form.Subscribe>
          {(state) => (
            <Button
              type="submit"
              className="w-full"
              disabled={!state.canSubmit || state.isSubmitting}
            >
              {state.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update Article"
              )}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
