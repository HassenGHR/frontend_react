import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbGps } from "react-icons/tb";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-gray-800 text-white py-4 rounded-lg mb-1">
        <div className="container mx-auto px-4">
          <div className="footer flex flex-wrap -mx-4 items-center justify-between">
            <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
              <div className="order-1 md:order-2 p-3 flex items-center">
                <TbGps className="mr-1" style={{ fontSize: "1.5rem" }} />
                <Link
                  className="tracking-wide no-underline hover:no-underline font-bold text-white text-xl"
                  to="/"
                >
                  AutoNav
                </Link>
              </div>
              <p className="text-gray-300">
                © 2023, AutoNav All Rights Reserved.
              </p>
            </div>
            <div className="w-full lg:w-1/2 px-4 text-right">
              <h3 className="font-bold text-xl mb-4 pr-4">Follow Us</h3>
              <div className="flex justify-end space-x-4">
                <Link to="https://web.facebook.com/profile.php?id=100091316903532">
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="text-gray-300 hover:text-white hover:scale-95 transform transition-transform duration-300 text-2xl"
                  />
                </Link>
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-gray-300 hover:text-white hover:scale-95 transform transition-transform duration-300 text-2xl"
                />
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-gray-300 hover:text-white hover:scale-95 transform transition-transform duration-300 text-2xl"
                />
                <Link to="https://t.me/TestStore2383_bot">
                  <FontAwesomeIcon
                    icon={faTelegram}
                    className="text-gray-300 hover:text-white hover:scale-95 transform transition-transform duration-300 text-2xl"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
