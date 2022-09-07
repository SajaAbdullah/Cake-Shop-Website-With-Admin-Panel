import { Advantage } from "components/shared/Advantage/Advantage";
import { Banner } from "components/landing/Banner/Banner";
import { BrandLogo } from "components/shared/BrandLogo/BrandLogo";
import { Discount } from "components/landing/Discount/Discount";
import { Info } from "components/landing/Info/Info";

import { NewArrivals } from "components/landing/NewArrivals/NewArrivals";

import { Trending } from "components/landing/Trending/Trending";

import { Layout } from "layout/Layout";

export default function Home() {
  return (
      <Layout>
        <Banner />
        <Trending />
        <Discount />
        <Advantage />
        <Info />
        <NewArrivals />
      </Layout>
  );
}
