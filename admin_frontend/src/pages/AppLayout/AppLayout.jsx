import "./AppLayout.css";
import { Toolbar, Header } from "../../adminExportFiles";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
        <div className="AppLayout">
          <Toolbar />
          <div className="layoutContent">
            {<Header />}
            <div className="layoutContentMain">
            { <Outlet />}</div>
          </div>
        </div>
    </div>
  );
};

export default AppLayout;
