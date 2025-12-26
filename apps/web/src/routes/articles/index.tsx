import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute("/articles/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Button>
        <Link to="/articles/create">Create Article</Link>
      </Button>
    </div>
  );
}
