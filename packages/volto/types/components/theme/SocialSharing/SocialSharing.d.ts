export default SocialSharing;
/**
 * Social sharing component class.
 * @function SocialSharing
 * @param {string} url Url to share.
 * @param {string} title Title of the content.
 * @param {string} description Description of the content.
 * @returns {string} Markup of the component.
 */
declare function SocialSharing({ url, title, description }: string): string;
declare namespace SocialSharing {
    namespace propTypes {
        let url: any;
        let title: any;
        let description: any;
    }
}
