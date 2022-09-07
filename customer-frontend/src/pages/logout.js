import { PublicLayout } from "layout/PublicLayout";
import { Logout } from "components/Logout/Logout"

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: "logout",
    path: "/logout",
  },
];

const LogoutPage =() =>{
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="logout">
      <Logout />
    </PublicLayout>
  );
};

export default LogoutPage;