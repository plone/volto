export default function MaybeWrap({ condition, as: Component, ...props }: {
    [x: string]: any;
    condition: any;
    as?: string;
}): any;
