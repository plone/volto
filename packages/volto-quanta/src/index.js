import DSInput from './components/DesignSystem/Input';
import DSTextArea from './components/DesignSystem/TextArea';
import DSSelect from './components/DesignSystem/Select';
import Input from './components/Input/Input';
import TextArea from './components/TextArea/TextArea';
import SelectWidget from './components/Select/SelectWidget';
import ArrayWidget from './components/Select/ArrayWidget';

import './styles/quanta.scss';

export default (config) => {
  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/designsystem/input',
      component: DSInput,
    },
    {
      path: '/designsystem/textarea',
      component: DSTextArea,
    },
    {
      path: '/designsystem/select',
      component: DSSelect,
    },
  ];

  config.widgets.default = Input;
  config.widgets.widget.textarea = TextArea;
  config.widgets.choices = SelectWidget;
  config.widgets.type.array = ArrayWidget;

  return config;
};
