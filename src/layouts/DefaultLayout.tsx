import { Outlet } from "react-router";

export function DefaultLayout() {
  return (
    <>
      <h1>Sidebar</h1>
      <Outlet />
      <p>RightSideMenu</p>
    </>
  );
}