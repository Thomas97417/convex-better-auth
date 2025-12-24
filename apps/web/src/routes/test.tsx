import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: TestComponent,
});

export default function TestComponent() {
  return (
    <div className="bg-blue-500">
      <h1>Test</h1>
      <Button asChild>
        <Link to="/">Home</Link>
      </Button>
      <Outlet />
    </div>
  );
}
