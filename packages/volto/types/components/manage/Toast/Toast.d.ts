export default Toast;
declare function Toast(props: any): JSX.Element;
declare namespace Toast {
    namespace propTypes {
        let title: any;
        let content: any;
        let info: any;
        let success: any;
        let error: any;
        let warning: any;
    }
}
