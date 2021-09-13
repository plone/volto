import React from 'react';
import { Button, Checkbox, Header } from 'semantic-ui-react';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import AnimateHeight from 'react-animate-height';
import { useDetectClickOutside } from '@plone/volto/helpers';

const SelectFacet = (props) => {
  const { facet, choices, isMulti, onChange, value } = props;
  const facetValue = value;
  const [isOpen, setDropdown] = React.useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => setDropdown(false),
  });

  return (
    <div className="dropdown-checkbox-facet" ref={ref}>
      <Button
        icon
        basic
        className="handler-wrapper"
        onClick={() => setDropdown(!isOpen)}
      >
        <Header as="h4">{facet.title}</Header>
        <Icon name={isOpen ? downSVG : upSVG} size="18px" />
      </Button>

      <AnimateHeight
        className={cx('entries', { isOpen })}
        animateOpacity
        duration={200}
        height={isOpen ? 'auto' : 0}
      >
        {choices.map(({ label, value }, i) => (
          <div className="entry" key={value}>
            <label htmlFor={`field-${value}`}>{label}</label>
            <Checkbox
              // label={label}
              id={`field-${value}`}
              radio={!isMulti}
              checked={
                isMulti
                  ? !!facetValue?.find((f) => f.value === value)
                  : facetValue && facetValue.value === value
              }
              onChange={(e, { checked }) =>
                onChange(
                  facet.field.value,
                  isMulti
                    ? [
                        ...facetValue
                          .filter((f) => f.value !== value)
                          .map((f) => f.value),
                        ...(checked ? [value] : []),
                      ]
                    : checked
                    ? value
                    : null,
                )
              }
            />
          </div>
        ))}
      </AnimateHeight>
    </div>
  );
};

export default SelectFacet;
