import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Checkbox } from 'semantic-ui-react';
import { messages } from '@plone/volto/helpers';
import { listGroups } from '@plone/volto/actions';
import { Toast } from '@plone/volto/components';
import { updateGroup, listUsers } from '@plone/volto/actions';

const ListingTemplate = ({ query_user, query_group, groups_filter }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  let groups = useSelector((state) => state.groups.groups);
  let matrix_options = groups.map((group) => ({
    value: group.id,
    label: group.title || `${group.id}`,
  }));
  matrix_options.sort(function (a, b) {
    var labelA = a.label.toUpperCase();
    var labelB = b.label.toUpperCase();
    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  });
  let items = useSelector((state) => state.users.users);
  items.sort(function (a, b) {
    var labelA = a.fullname.split(' ').reverse().join(' ');
    var labelB = b.fullname.split(' ').reverse().join(' ');
    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    // Get users.
    dispatch(listUsers(query_user, groups_filter));
  }, [dispatch, query_user, groups_filter]);

  useEffect(() => {
    // Get matrix groups.
    dispatch(listGroups(query_group));
  }, [dispatch, query_group]);

  const onSelectOptionHandler = (item, selectedvalue, checked) => {
    let group = selectedvalue.y;
    let username = selectedvalue.x;

    dispatch(
      updateGroup(group, {
        users: {
          [username]: checked ? true : false,
        },
      }),
    )
      .then((resp) => {
        dispatch(listUsers(query_user, groups_filter));
      })
      .then(() => {
        toast.success(
          <Toast
            success
            title={intl.formatMessage(messages.success)}
            content="Membership updated"
          />,
        );
      });
  };

  const onSelectAllHandler = (mtxoption, checked) => {
    let elements = document.querySelectorAll(`div.checkbox_${mtxoption} input`);
    let identifier;
    elements.forEach((element) => {
      element.checked = checked;
      identifier = element.name.split('_-_');
      dispatch(
        updateGroup(identifier[2], {
          users: {
            [identifier[1]]: checked ? true : false,
          },
        }),
      );
    });
  };

  return (
    <div className="administration_matrix">
      <div className="label-options">
        {matrix_options?.map((matrix_option) => (
          <div
            className="label-options-label inclined"
            key={matrix_option.value}
          >
            <div>
              <span className="label">{matrix_option.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="items">
        {items.length > 0 ? (
          <>
            <div className="listing-row selectall" key="selectall">
              <div className="listing-item">
                <div />
                <div className="matrix_options">
                  {matrix_options?.map((matrix_option) => (
                    <div
                      title={
                        intl.formatMessage(messages.addUsersToGroup) +
                        ` ${matrix_option.label}`
                      }
                    >
                      <Checkbox
                        name={`member_selectall_${matrix_option.value}`}
                        key={matrix_option.value}
                        title={matrix_option.label}
                        defaultChecked={false}
                        onChange={(event, { checked }) => {
                          onSelectAllHandler(matrix_option.value, checked);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {items.map((item) => (
              <div className="listing-row" key={item.id}>
                <div className="listing-item" key={item['@id']}>
                  <div>
                    <h4>
                      {item.fullname} ({item.id})
                    </h4>
                  </div>
                  <div className="matrix_options">
                    {matrix_options?.map((matrix_option) => (
                      <Checkbox
                        name={`member_-_${item.id}_-_${matrix_option.value}`}
                        className={`checkbox_${matrix_option.value}`}
                        key={matrix_option.value}
                        title={matrix_option.title}
                        defaultChecked={item.groups?.items?.includes(
                          matrix_option.value,
                        )}
                        onChange={(event, { checked }) => {
                          onSelectOptionHandler(
                            item,
                            { y: matrix_option.value, x: item.id },
                            checked,
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>{intl.formatMessage(messages.nouserfound)}</div>
        )}
      </div>
    </div>
  );
};
export default ListingTemplate;
