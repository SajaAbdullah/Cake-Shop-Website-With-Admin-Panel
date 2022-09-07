import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem" style={{backgroundColor:"#abebc6"}}>
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs. 20,000</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub" >Compared to last month</span>
      </div>
      <div className="featuredItem" style={{backgroundColor:"#f9e79f"}}>
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs. 4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem" style={{backgroundColor:"#d2b4de"}}>
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs.14,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
