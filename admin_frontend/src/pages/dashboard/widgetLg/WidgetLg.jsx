import "./widgetLg.css";
import {useGetAllOrderQuery} from '../../../services/orderApi'
import logo from '../../../images/logo.ico';

export default function WidgetLg() {
  const { data, isSuccess } = useGetAllOrderQuery()
  let arr = [];
  
  if(!isSuccess) return <div>Loading.....</div>

  if(isSuccess){
    arr = data.slice(-5);
  }

  const Button = ({ type }) => {
    let type1 = "";
    if(type === 'On The way to deliver') type1 = 'way';
    else if (type === 'Order Placed') type1='Placed';
    else if (type === 'Under Package') type1 ='Package';
    else if (type === 'Deliverd') type1 ='Deliverd';
    else if (type === 'Canceled') type1 ='Canceled';

    return <button className={"widgetLgButton " + type1}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Orders</h3>
      <table className="widgetLgTable">
      <tbody>  
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Order ID</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Total Amount</th>
          <th className="widgetLgTh">Order Status</th>
        </tr>
        {arr.map((data, index) => (
          <tr  key={index} className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src={logo}
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">{data.order_Id}</span>
          </td>
          <td className="widgetLgDate">{data.order_Placment_Date}</td>
          <td className="widgetLgAmount"> Rs. {' '} {data.total_Amount}</td>
          <td className="widgetLgStatus">
            <Button type={data.order_Status} />
          </td>
        </tr>
        ))}
      </tbody>  
      </table>
    </div>
  );
}
