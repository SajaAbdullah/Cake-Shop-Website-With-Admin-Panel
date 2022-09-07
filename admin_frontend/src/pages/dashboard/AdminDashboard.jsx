import React from "react";
import "./dashboard.css";
import Chart from "./chart/Chart";
import FeaturedInfo from "./featuredInfo/FeaturedInfo";
import { userData } from "../../dummyData";
import WidgetSm from "./widgetSm/WidgetSm";
import WidgetLg from "./widgetLg/WidgetLg";

function AdminDashboard() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="Sales Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}

export default AdminDashboard;
