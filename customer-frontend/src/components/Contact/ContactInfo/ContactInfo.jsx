import socialData from "data/social";

export const ContactInfo = () => {
  const footerSocial = [...socialData];
  return (
    <>
      {/* <!-- BEGIN CONTACTS INFO --> */}
      <div className="contacts-info">
        <div className="wrapper">
          <div className="contacts-info__content">
            <div className="contacts-info__text">
              <h4>We take care of you</h4>
              <p>
                Email us if you have any questions, we will be sure to contact
                you and find a solution. Also, our managers will help you choose
                the product that suits you best, at the best price. From year to
                year, the Bake and Takenetwork develops and improves, taking
                into account all consumer needs and market trends. But for us,
                the concern remains that when coming to the Bake and Takestore,
                customers do not have questions about the convenience and
                comfort of shopping, product quality and the level of
                professionalism of sales consultants.
              </p>
            </div>
            <div className="contacts-info__social">
              <span>Find us here:</span>
              <ul>
                {footerSocial.map((social, index) => (
                  <li key={index}>
                    <a href={social.path}>
                      <i className={social.icon}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- CONTACTS INFO EOF   -->  */}
    </>
  );
};
