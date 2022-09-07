
import { PublicLayout } from "layout/PublicLayout";


const AboutPage = () => {

  const iframe = '<iframe height="1120" style="width: 100%;" scrolling="no" title="fx." src="./data/cake.html?height=500&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">See the Pen.</iframe>'; 

  function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
  }


  return (
    <PublicLayout style={{height: "80px"}} >
      <Iframe iframe={iframe} />
 

    </PublicLayout>
  );
};

export default AboutPage;
