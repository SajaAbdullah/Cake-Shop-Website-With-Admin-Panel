import React, {  useState } from "react";
import "./toolbar.css";
import logo from "../../images/logo.ico";
import { MdDashboard } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { MdAssignment } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaPeopleCarry } from "react-icons/fa";
import { MdDynamicFeed } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { IoStorefrontOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const Toolbar = () => {
  const [currentLink, setCurrentLink] = useState(1);
  return (
    <div className="bt-toolbar">
      <div className="bt-toolbar-brand">
        <img src={logo} alt="logo" />
      </div>
      <div className="links">
        <ul>
          <li
            onClick={() => setCurrentLink(1)}
            className={currentLink === 1 ? "active" : ""}
          >
            <Link to="/admin/dashboard">
              <MdDashboard /> <span> Dashboard </span>{" "}
            </Link>{" "}
          </li>
          <li
            onClick={() => setCurrentLink(2)}
            className={currentLink === 2 ? "active" : ""}
          >
            <Link to="/admin/designtool">
              {" "}
              <MdDesignServices /> <span> Customize Orders </span>{" "}
            </Link>
          </li>
          {/* <li
            onClick={() => setCurrentLink(3)}
            className={currentLink === 3 ? "active" : ""}
          >
            <Link to='/admin/sales'>
              {" "}
              <GiCash /> <span> Sales </span>{" "}
            </Link>
          </li> */}
          <li
            onClick={() => setCurrentLink(4)}
            className={currentLink === 4 ? "active" : ""}
          >
            <Link to='/admin/orders'>
              <MdAssignment /> <span> Orders </span>{" "}
            </Link>
          </li>
          <li
            onClick={() => setCurrentLink(5)}
            className={currentLink === 5 ? "active" : ""}
          >
            <Link to='/admin/customers'>
              {" "}
              <BsFillPeopleFill /> <span> Customers </span>{" "}
            </Link>
          </li>
          <li
            onClick={() => setCurrentLink(6)}
            className={currentLink === 6 ? "active" : ""}
          >
            <Link to='/admin/staff'>
              {" "}
              <FaPeopleCarry /> <span> Staff  </span>{" "}
            </Link>
          </li>
          <li
            onClick={() => setCurrentLink(7)}
            className={currentLink === 7 ? "active" : ""}
          >
            <Link to='/admin/products'>
              {" "}
              <IoStorefrontOutline /> <span> Products </span>{" "}
            </Link>
          </li>
          <li
            onClick={() => setCurrentLink(8)}
            className={currentLink === 8 ? "active" : ""}
          >
            <Link to="/admin/feedbacks">
              {" "}
              <MdDynamicFeed /> <span> Reviews </span>{" "}
            </Link>
          </li>
          <li
            onClick={() => setCurrentLink(9)}
            className={currentLink === 9 ? "active" : ""}
          >
            <Link to="/admin/question">
              {" "}
              <MdNotifications /> <span> Messages </span>{" "}
            </Link>
          </li>
          <li
            onClick={() => setCurrentLink(10)}
            className={currentLink === 10 ? "active" : ""}
          >
            <Link to="/admin/Profile">
              {" "}
              <CgProfile  /> <span> Profile </span>{" "}
            </Link>
          </li>
          <li>
            <Link to="/logout">
              {" "}
              <BiLogOut /> <span> Log Out </span>{" "}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Toolbar;
