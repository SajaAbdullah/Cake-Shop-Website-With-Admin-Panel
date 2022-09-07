export const Card = ({ advantage }) => {
  const { icon, title, body } = advantage;
  return (
    <div className='advantages-item'>
      <div className='advantages-item__icon'>
        <i className={icon}></i>
      </div>
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  );
};
