CommentEditModal example:

```jsx static
<CommentEditModal />
```

Output:

```jsx noeditor
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { Button, Container } from 'semantic-ui-react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import CommentEditModal from './CommentEditModal';

const store = configureStore()({
  intl: {
    locale: 'en',
    messages: {},
  },
  comments: {
    items: [
      {
        ['@id']: '',
        author_name: '',
        creation_date: '',
        text: {
          data: '',
          'mime-type': '',
        },
        is_deletable: true,
        is_editable: true,
      },
    ],
  },
});
class Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      open: true,
    });
  }
  render() {
    return (
      <Container>
        <Button onClick={this.handleClick}>Click Me</Button>
        <Provider store={store}>
          <BrowserRouter>
            <CommentEditModal
              request={{
                loading: !this.state.open,
                loaded: this.state.open,
              }}
              updateComment={() => {}}
              open={this.state.open}
              onOk={() => {}}
              onCancel={() => {}}
            />
          </BrowserRouter>
        </Provider>
      </Container>
    );
  }
}
<Check />;
```
