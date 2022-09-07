import { useState  ,useRef } from "react";
import { CustomOrderCheckoutOrders } from "./CustomOrderCheckoutOrders";
import { CustomOrderCheckoutStep1 } from "./CustomOrderCheckoutSteps/CustomOrderCheckoutStep1";
import { CustomOrderCheckoutStep2 } from "./CustomOrderCheckoutSteps/CustomOrderCheckoutStep2";
import { CustomOrderCheckoutStep3 } from "./CustomOrderCheckoutSteps/CustomOrderCheckoutStep3";
import {useReactToPrint} from 'react-to-print';

const getCustomOrder_Id = () => {
  if (typeof window !== "undefined") {
    let CustomOrder_Id = sessionStorage.getItem("CustomOrder_Id");
    return CustomOrder_Id;
  }
  return 0;
};

const detailBlocks = [
  {
    step: "Step 1",
    title: "Order Details",
    icon: "icon-step1",
  },
  {
    step: "Step 2",
    title: "Payment method",
    icon: "icon-step2",
  },
  {
    step: "Step 3",
    title: "Finish!",
    icon: "icon-step3",
  },
];

export const CustomOrderCheckout = () => {
  const [activeStep, setActiveStep] = useState(1);
  const componentRef = useRef();


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Order_Invoice",
  });

  let CustomOrder_Id =getCustomOrder_Id()
  console.log('CustomOrder_Id' ,CustomOrder_Id)
  
  if(CustomOrder_Id== 0) return <h1>no order data in session storage</h1>;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <>
      <div className="wrapper">
        {/* <!-- BEGIN DETAIL MAIN BLOCK --> */}
        <div className="detail-block__items" style={{marginTop:"35px"}}>
          {detailBlocks.map((block, index) => (
            <div
              key={index}
              className={`detail-block__item ${
                activeStep <= index && "detail-block__item-inactive"
              }`}
            >
              <div className="detail-block__item-icon">
                <img
                  src={
                    activeStep <= index
                      ? "/assets/img/main-text-decor2.svg"
                      : "/assets/img/main-text-decor.svg"
                  }
                  className="js-img"
                  alt=""
                />
                <i className={block.icon}></i>
              </div>
              <div
                className="detail-block__item-info"
                style={{ color: "#000" }}
              >
                <h6>{block.step}</h6>
                {block.title}
              </div>
            </div>
          ))}
        </div>
        {/* <!-- DETAIL MAIN BLOCK EOF --> */}
      </div>

      {/* <!-- BEGIN CHECKOUT --> */}
      <div className={`checkout ${activeStep == 2 && "checkout-step2"}`}>
        <div className="wrapper">
          <div className="checkout-content" ref={componentRef}>
            {(() => {
              switch (activeStep) {
                case 1:
                  return <CustomOrderCheckoutStep1 onNext={handleNext} CustomOrder_Id={CustomOrder_Id}/>;
                case 2:
                  return (
                    <CustomOrderCheckoutStep2 onNext={handleNext} onPrev={handlePrev} />
                  );
                case 3:
                  return <CustomOrderCheckoutStep3 CustomOrder_Id={CustomOrder_Id} />;

                default:
                  return null;
              }
            })()}
            <div className="checkout-info">
              <CustomOrderCheckoutOrders CustomOrder_Id={CustomOrder_Id}/>
            </div>
          </div>
          {activeStep === 3 ?<button onClick={handlePrint} className="btn btn-icon">
          Print Order Details 
        </button> :("") }
          
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- CHECKOUT EOF   --> */}
    </>
  );
};
