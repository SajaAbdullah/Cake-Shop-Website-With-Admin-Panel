import { applyMiddleware } from "@reduxjs/toolkit";

const storeToken = (value) => {
  if (value) {
    console.log("Store Token");
    const { access, refresh } = value;
    sessionStorage.setItem("access_token", access);
    sessionStorage.setItem("refresh_token", refresh);
  }
};

const getToken = () => {
  if (typeof window !== "undefined") {
    let access_token = sessionStorage.getItem("access_token");
    let refresh_token = sessionStorage.getItem("refresh_token");

    return { access_token, refresh_token };
  }
  return {};
};

const removeToken = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("customOrder_Id")
    return {};
  }
  return {};
};

export { storeToken, getToken, removeToken };
