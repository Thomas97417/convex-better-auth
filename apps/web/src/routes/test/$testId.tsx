import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/test/$testId")({
  component: TestIdRouteComponent,
});

function TestIdRouteComponent() {
  const { testId } = Route.useParams();
  return (
    <div className="mx-auto font-bold flex gap-4">
      <Button asChild>
        <Link to={`/test/${Number(testId) - 1}` as any}>Previous test</Link>
      </Button>
      <p>
        This is the test id: <span className="tabular-nums">{testId}</span>
      </p>{" "}
      <Button asChild>
        <Link to={`/test/${Number(testId) + 1}` as any}>Next test</Link>
      </Button>
    </div>
  );
}
