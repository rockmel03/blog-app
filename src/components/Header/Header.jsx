import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "home",
      slug: "/",
      active: true,
    },
    {
      name: "login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "all posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "add post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-[#1d3557] sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between h-[10vh] ">
          <div>
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>

          <ul className="flex items-center gap-3">
            {navItems.map(
              (item, index) =>
                item.active && (
                  <li key={index}>
                    <Link
                      to={item.slug}
                      className="px-4 py-1 hover:bg-zinc-400/50 rounded-full capitalize transition-all duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
