import Button from 'react-bootstrap/Button';
import { Button as ButtonTW } from '@plone/cmsui/components/Button';

export default function Test() {
  return (
    <div className="flex flex-col text-center items-center justify-center min-h-screen">
      <div className="bootstrap-wrapper">
        <h1>Bootstrap button</h1>
        <Button variant="danger">Primary</Button>
      </div>

      <div className="plone-components-tw-wrapper mt-10">
        <h1>
          @plone/components TW button (Notice this is an TW H1, not styled!)
        </h1>
        <ButtonTW variant="primary" className="mt-4">
          Primary
        </ButtonTW>
      </div>
    </div>
  );
}
