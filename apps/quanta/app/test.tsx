import Button from 'react-bootstrap/Button';
import { Button as ButtonTW } from '@plone/cmsui/components/Button';

export default function Test() {
  return (
    <div>
      <div className="bootstrap-wrapper">
        <h1>Bootstrap button</h1>
        <Button variant="danger">Primary</Button>
      </div>

      <div className="plone-components-tw-wrapper">
        <h1>@plone/components TW button</h1>
        <ButtonTW variant="primary">Primary</ButtonTW>
      </div>
    </div>
  );
}
