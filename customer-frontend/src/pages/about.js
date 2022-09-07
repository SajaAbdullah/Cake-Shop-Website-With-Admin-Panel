import { AboutDetailBlock } from "components/About/AboutDetailBlock/AboutDetailBlock";
// import { AboutDiscount } from "components/About/AboutDiscount/AboutDiscount";

import { Advantage } from "components/shared/Advantage/Advantage";

import { Testimonials } from "components/shared/Tesimonials/Tesimonials";
import { PublicLayout } from "layout/PublicLayout";
import { Info } from "components/landing/Info/InfoAbout";

const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About Us",
    path: "/about",
  },
];
const AboutPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="About Us">
      <AboutDetailBlock />

      <Info />
      <Testimonials />
      <Advantage />
    </PublicLayout>
  );
};

export default AboutPage;
