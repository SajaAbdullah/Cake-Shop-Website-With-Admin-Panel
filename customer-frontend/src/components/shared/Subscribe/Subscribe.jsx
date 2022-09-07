export const Subscribe = () => {
  return (
    <>
      {/* <!-- BEGIN SUBSCRIBE --> */}
      <div className='subscribe'>
        <div className='wrapper'>
          <div className='subscribe-form'>
            <div className='subscribe-form__img'>
              <img
                src='/assets/img/subscribe-img.png'
                className='js-img'
                alt=''
              />
            </div>
            <form>
              <h3>Stay in touch</h3>
              <p>Nourish your skin with toxin-free cosmetic roducts.</p>
              <div className='box-field__row'>
                <div className='box-field'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Enter your email'
                  />
                </div>
                <button type='submit' className='btn'>
                  subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- SUBSCRIBE EOF   --> */}
    </>
  );
};
