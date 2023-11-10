import React, { useContext, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbGps } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import AuthContext from "../../../../store/auth-context";

const Header = (props) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  const { isAuthenticated,logout } = useContext(AuthContext);

  const handleLogout = () => {
    // Call the logout function from the authentication context
    logout();
    navigate("/login");
  };
  return (
    <header>
      <nav id="header" className="w-full z-30 top-0 py-1">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer md:hidden block"
          >
            <svg
              className="fill-current text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>
          <input className="hidden" type="checkbox" id="menu-toggle" />
          <div
            className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
            id="menu"
          >
            <nav>
              <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                <li>
                  <Link
                    className="font-bold inline-block no-underline hover:text-black hover:underline py-2 px-4"
                    to="/"
                  >
                    Shop
                  </Link>
                </li>

                <li>
                  <Link
                    className="font-bold inline-block no-underline hover:text-black hover:underline py-2 px-4"
                    to={"/about"}
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="order-1 md:order-2 p-3 flex items-center">
            <TbGps
              className="mr-1 transition-transform transform hover:scale-110"
              style={{ fontSize: "1.5rem" }}
            />
            <Link
              className="tracking-wide no-underline hover:scale-110 font-bold text-gray-800 text-xl"
              to="/"
            >
              AutoNav
            </Link>
          </div>

          <div
            className="order-2 md:order-3 flex items-center"
            id="nav-content"
          >
            {!isAuthenticated &&      <Link
              className="inline-block no-underline hover:text-black mr-2"
              to="/login"
            >
              <svg
                className="fill-current hover:text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <circle fill="none" cx="12" cy="7" r="3" />
                <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
              </svg>
            </Link>}
       
            <HeaderCartButton onClick={props.onShowCart} />
            {isAuthenticated &&  <div className="inline-block relative z-50 p-2">
              <div
                onClick={toggleDropdown}
                className="cursor-pointer inline-block no-underline hover:text-black mr-2"
              >
                <RiArrowDropDownLine
                  className="fill-current hover:text-black"
                  style={{ fontSize: "24px" }}
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md">
                  <ul>
                    <li>
                      <Link
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        to="/"
                        onClick={() => {
                          closeDropdown();
                          handleLogout();
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>}
           
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
