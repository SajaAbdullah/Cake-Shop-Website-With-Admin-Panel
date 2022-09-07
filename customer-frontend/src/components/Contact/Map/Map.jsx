export const Map = () => {
  return (
    <div className="contacts-map" style={{ marginTop: "20px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.6882673342207!2d73.06201331484314!3d33.717014442769404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd7a2921f946f1232!2zMzPCsDQzJzAxLjIiTiA3M8KwMDMnNTEuMSJF!5e0!3m2!1sen!2sro!4v1652538724784!5m2!1sen!2sro"
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  );
};
