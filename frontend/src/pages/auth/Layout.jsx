import React from "react";
import { Outlet } from "react-router-dom";
import {Button} from "../../components/ui/Button";

export default function Layout() {
  return (
    <div>
      <div className="mt-10 mx-auto w-max flex">
        <Button>Student</Button>
        <Button className={"ml-5"}>Company</Button>
      </div>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}
