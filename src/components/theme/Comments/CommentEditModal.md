```jsx noeditor
import Wrapper from '@plone/volto/styleguide';
import CommentEditModal from './CommentEditModal';

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
      <Wrapper customStore={{
  comments: {
    update: {
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
}
  }}}>
        <button onClick={this.handleClick}>Open modal</button>
          <CommentEditModal
            request={{
              loading: !this.state.open,
              loaded: this.state.open,
            }}
            updateComment={() => {}}
            open={this.state.open}
            onOk={() => {}}
            onCancel={() => {}}
            text="Some comment to edit..."
          />
      </Wrapper>
    );
  }
}

<Check />;
```
