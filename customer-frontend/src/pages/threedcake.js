
import { PublicLayout } from "layout/PublicLayout";


const AboutPage = () => {

  const iframe = '<iframe height="420" style="width: 118%;" scrolling="no" title="fx." src="https://clara.io/player/v2/7d1c0b62-4c8a-463d-8db3-c2775a78068b?wait=true?height=500&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">See the Pen.</iframe>'; 

  function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
  }


  return (
    <PublicLayout style={{height: "80px"}} >
      

    </PublicLayout>
  );
};

export default AboutPage;
