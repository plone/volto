export function TextLineEdit(props: any): JSX.Element;
export namespace TextLineEdit {
    namespace propTypes {
        let properties: PropTypes.Validator<{
            [x: string]: any;
        }>;
        let selected: PropTypes.Validator<boolean>;
        let block: PropTypes.Validator<string>;
        let index: PropTypes.Validator<number>;
        let onChangeField: PropTypes.Validator<(...args: any[]) => any>;
        let onSelectBlock: PropTypes.Validator<(...args: any[]) => any>;
        let onDeleteBlock: PropTypes.Validator<(...args: any[]) => any>;
        let onAddBlock: PropTypes.Validator<(...args: any[]) => any>;
        let onFocusPreviousBlock: PropTypes.Validator<(...args: any[]) => any>;
        let onFocusNextBlock: PropTypes.Validator<(...args: any[]) => any>;
        let data: PropTypes.Validator<{
            [x: string]: any;
        }>;
        let editable: PropTypes.Requireable<boolean>;
        let detached: PropTypes.Requireable<boolean>;
        let blockNode: PropTypes.Requireable<any>;
        let renderTag: PropTypes.Requireable<string>;
        let renderClassName: PropTypes.Requireable<string>;
        let fieldDataName: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        let detached_1: boolean;
        export { detached_1 as detached };
        let editable_1: boolean;
        export { editable_1 as editable };
    }
}
export default TextLineEdit;
import PropTypes from 'prop-types';
