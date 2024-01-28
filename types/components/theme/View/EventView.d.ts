export default EventView;
/**
 * EventView view component class.
 * @function EventView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function EventView(props: any): string;
declare namespace EventView {
    namespace propTypes {
        let content: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            description: PropTypes.Requireable<string>;
            text: PropTypes.Requireable<PropTypes.InferProps<{
                data: PropTypes.Requireable<string>;
            }>>;
            attendees: PropTypes.Validator<string[]>;
            contact_email: PropTypes.Requireable<string>;
            contact_name: PropTypes.Requireable<string>;
            contact_phone: PropTypes.Requireable<string>;
            end: PropTypes.Validator<string>;
            event_url: PropTypes.Requireable<string>;
            location: PropTypes.Requireable<string>;
            open_end: PropTypes.Requireable<boolean>;
            recurrence: PropTypes.Requireable<any>;
            start: PropTypes.Validator<string>;
            subjects: PropTypes.Validator<string[]>;
            whole_day: PropTypes.Requireable<boolean>;
        }>>>;
    }
}
import PropTypes from 'prop-types';
