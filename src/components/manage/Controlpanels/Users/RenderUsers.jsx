import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dropdown, Table, Checkbox } from 'semantic-ui-react';
import trashSVG from '@plone/volto/icons/delete.svg';
import { Icon } from '@plone/volto/components';
import ploneSVG from '@plone/volto/icons/plone.svg';

const RenderUsers = (props) => {
  const onChange = (event, { value }) => {
    const [user, role] = value.split('.');
    props.updateUser(user, role);
  };

  return (
    <Table.Row key={props.user.username}>
      <Table.Cell className="fullname">
        {props.user.fullname ? props.user.fullname : props.user.username}
      </Table.Cell>
      {props.roles.map((role) => (
        <Table.Cell key={role.id}>
          {props.inheritedRole && props.inheritedRole.includes(role.id) ? (
            <Icon
              name={ploneSVG}
              size="20px"
              color="#007EB1"
              title={'plone-svg'}
            />
          ) : (
            <Checkbox
              checked={props.user.roles.includes(role.id)}
              onChange={onChange}
              value={`${props.user.id}.${role.id}`}
            />
          )}
        </Table.Cell>
      ))}
      <Table.Cell textAlign="right">
        <Dropdown icon="ellipsis horizontal">
          <Dropdown.Menu className="left">
            <Dropdown.Item onClick={props.onDelete} value={props.user['@id']}>
              <Icon name={trashSVG} size="15px" />
              <FormattedMessage id="Delete" defaultMessage="Delete" />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Table.Cell>
    </Table.Row>
  );
};

RenderUsers.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    fullname: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default RenderUsers;
