import { ContactDetailBlock } from "components/Contact/ContactDetailBlock/ContactDetailBlock";
import { ContactFrom } from "components/Contact/ContactForm/ContactForm";
import { ContactInfo } from "components/Contact/ContactInfo/ContactInfo";
import { Map } from "components/Contact/Map/Map";

import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];
const ContactPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Contact">
      <ContactDetailBlock />
      <ContactInfo />

      <ContactFrom />
      <Map />
    </PublicLayout>
  );
};

export default ContactPage;
