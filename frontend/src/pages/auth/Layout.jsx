import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export default function Layout() {
  return (
    <div>
      <div className="mt-10 mx-auto w-max flex">
        <Link to={"/auth/student/login"}>
          <Button>Student</Button>
        </Link>
        <Link to={"/auth/company/login"}>
          <Button className={"ml-5"}>Company</Button>
        </Link>
      </div>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}
