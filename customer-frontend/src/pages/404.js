import { Error } from 'components/Error/Error';
import { PublicLayout } from 'layout/PublicLayout';

export default function Custom404() {
  return (
    <PublicLayout breadcrumbTitle='404 Page' description='Oops!'>
      <Error />
    </PublicLayout>
  );
}
