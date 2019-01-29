 An example of source code 

export class LogoutComponent extends Component {
  
  static propTypes = {
    logout: PropTypes.func.isRequired,
    purgeMessages: PropTypes.func.isRequired,
    query: PropTypes.shape({
      return_url: PropTypes.string,
    }),
  };

  
  static defaultProps = {
    query: null,
  };
