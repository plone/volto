import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Grid, Message } from 'semantic-ui-react';
import Image from '@plone/volto/components/theme/Image/Image';

const TemplateChooser = ({ templates, onSelectTemplate }) => {
  const intl = useIntl();
  return (
    <div className="template-chooser">
      <Message>
        <Grid columns={templates(intl).length}>
          {templates(intl).map((template, index) => (
            <Grid.Column key={template.id}>
              <Button
                type="button"
                className="template-chooser-item"
                onClick={() => onSelectTemplate(index)}
              >
                <Image src={template.image} alt="" fetchpriority="auto" />
                <div className="template-chooser-title">
                  {intl.formatMessage({
                    id: template.id,
                    defaultMessage: template.title,
                  })}
                </div>
              </Button>
            </Grid.Column>
          ))}
        </Grid>
      </Message>
    </div>
  );
};

TemplateChooser.propTypes = {
  templates: PropTypes.func.isRequired,
  onSelectTemplate: PropTypes.func.isRequired,
};

export default TemplateChooser;
