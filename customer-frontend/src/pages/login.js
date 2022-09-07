import { Login } from "components/Login/Login";
import { Subscribe } from "components/shared/Subscribe/Subscribe";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Login",
    path: "/login",
  },
];
const LoginPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Login">
      <Login />
    </PublicLayout>
  );
};

export default LoginPage;
