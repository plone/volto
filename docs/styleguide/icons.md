You can load icons from Volto with:

```js static
import { Icon } from '@plone/volto/components';
import addIcon from '@plone/volto/icons/add.svg';

const IconTest = () => <Icon name={addIcon} size="18px" />;
```

```jsx noeditor
import icons from '@plone/volto/icons/load-icons';
import { Icon } from '@plone/volto/components';

const iconElements = Object.keys(icons).map(iconName => {
  const icon = icons[iconName]
  return (
<center style={{float: 'left', width: '100px', display: 'inline-block', height: '100px'}}>
		<Icon key={iconName} name={icon} /> <br />
{`${iconName}.svg`}
</center>
  )
});

<div style={{overflow: 'hidden'}}>{iconElements}</div>
```

