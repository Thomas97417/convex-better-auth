import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import UserMenu from "./user-menu";

export default function ProfileButton() {
  return (
    <>
      <Unauthenticated>
        <Button variant="outline" onClick={() => console.log("Logged")}>
          <Link to="/dashboard">Login</Link>
        </Button>
      </Unauthenticated>
      <Authenticated>
        <UserMenu />
      </Authenticated>
    </>
  );
}
