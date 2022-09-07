import { DetailBlock } from 'components/shared/DetailBlock/DetailBlock';
import contactBlockinfoData from 'data/contactBlockinfo/contactBlockinfo';

export const ContactDetailBlock = () => {
  const detailBlocks = [...contactBlockinfoData];
  return (
    <>
      {/* <!--  Contact DETAIL BLOCK --> */}
      <DetailBlock detailBlocks={detailBlocks} />
    </>
  );
};
