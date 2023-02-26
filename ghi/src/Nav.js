import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div>
      <NavLink to="client/new"></NavLink>
      <NavLink to="account"></NavLink>
      <NavLink to="client/login"></NavLink>
    </div>
  );
}
export default Nav;
