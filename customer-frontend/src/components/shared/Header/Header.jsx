import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useWindowSize from "components/utils/windowSize/windowSize";
import { header, navItem } from "data/data.header";
import Link from "next/link";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import { Nav } from "./Nav/Nav";
import { useDispatch } from "react-redux";
import { getToken } from "../../../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../../../services/userAuthApi";
import { setUserInfo } from "../../../features/userSlice";

export const Header = () => {
  const { cart } = useContext(CartContext);
  const [promo, setPromo] = useState(true);
  const [fixedNav, setFixedNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [height, width] = useWindowSize();
  
  // For Fixed nav
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  const isSticky = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 10) {
      setFixedNav(true);
    } else {
      setFixedNav(false);
    }
  };

  useEffect(() => {
    if (openMenu) {
      if (height < 767) {
        disableBodyScroll(document);
      } else {
        enableBodyScroll(document);
      }
    } else {
      enableBodyScroll(document);
    }
  }, [openMenu, height]);

  const dispatch = useDispatch();
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);

  const [userData, setUserData] = useState({
    id: "",
    first_Name: "",
    last_Name: "",
    email: "",
    phone_Number: "",
    type: "",
  });

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        id: data.first_Name,
        first_Name: data.first_Name,
        last_Name: data.last_Name,
        email: data.email,
        phone_Number: data.phone_Number,
        type: data.type,
      });
    }
  }, [data, isSuccess]);

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          id: data.id,
          first_Name: data.first_Name,
          last_Name: data.last_Name,
          email: data.email,
          phone_Number: data.phone_Number,
          type: data.type,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  return (
    <>
      {/* <!-- BEGIN HEADER --> */}
      <header className="header">
        {promo && (
          <div className="header-top">
            <span> Are you ready-to-eat slice of heaven</span>
            <i
              onClick={() => setPromo(false)}
              className="header-top-close js-header-top-close icon-close"
            ></i>
          </div>
        )}
        <div className={`header-content ${fixedNav ? "fixed" : ""}`}>
          <div className="header-logo" >
            <Link href="/">
              <a>
                <img src={header.logo} alt=""   style={{ width:'130px' }}/>
              </a>
            </Link>
          </div>
          <div style={{ right: openMenu ? 0 : -360 }} className="header-box">
            {/* Nav */}
            <Nav navItem={navItem}/>
            {/* header options */}
            <ul className="header-options">
              {/* <li>
                <Link href="/">
                  <a>
                    <i className="icon-search"></i>
                  </a>
                </Link>
              </li> */}
              {access_token ? ( <li> 
                  <Link href="/logout">
                    <a>
                       Log Out
                    </a>
                  </Link> </li> ):
                  (
                <li>
                  <Link href="/login">
                    <a>
                    Log In
                    </a>
                  </Link>
                </li>
              )}
              {access_token ? ( <li> 
                  <Link href="/profile" >
                    <a>
                      <i className="icon-user"></i>
                    </a>
                  </Link> </li> ):
                  (
                <li>
                  <Link href="/login">
                    <a>
                      <i className="icon-user"></i>
                    </a>
                  </Link>
                </li>
              )}
              {access_token ? <li>
                <Link href="/cart">
                  <a>
                    <i className="icon-cart"></i>
                    <span>{cart.length ?? "0"}</span>
                  </a>
                </Link>
              </li> :
               <li>
                  <Link href="/login">
                  <a>
                    <i className="icon-cart"></i>
                    <span>{cart.length ?? "0"}</span>
                  </a>
                </Link>
              </li> }
            </ul>
            <div>
              <h6 style={{marginLeft:'1rem'}}> {" "}{userData.first_Name} {" "}{userData.last_Name}</h6>
            </div>
          </div>

          <div
            onClick={() => setOpenMenu(!openMenu)}
            className={
              openMenu ? "btn-menu js-btn-menu active" : "btn-menu js-btn-menu"
            }
          >
            {[1, 2, 3].map((i) => (
              <span key={i}>&nbsp;</span>
            ))}
          </div>
        </div>
      </header>

      {/* <!-- HEADER EOF   --> */}
    </>
  );
};
