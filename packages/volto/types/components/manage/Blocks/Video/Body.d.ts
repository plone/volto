export default Body;
declare function Body({ data, isEditMode }: {
    data: any;
    isEditMode: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Body {
    namespace propTypes {
        let data: any;
    }
}
export function getVideoIDAndPlaceholder(url: any, peertubeInstances: any): {
    videoID: any;
    videoUrl: string;
    thumbnailURL: string;
    videoSource: string;
    hasMatch: boolean;
};
