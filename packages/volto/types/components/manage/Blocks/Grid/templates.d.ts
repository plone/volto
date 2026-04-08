export default templates;
declare function templates(type: any): (intl: any) => {
    image: string;
    id: string;
    title: string;
    blocksData: any;
}[];
