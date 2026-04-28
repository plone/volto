import React, { ComponentPropsWithoutRef } from 'react';
type MaybeWrapProps<T extends React.ElementType> = {
    condition: boolean;
    as: T;
} & ComponentPropsWithoutRef<React.ElementType extends T ? 'div' : T>;
declare function MaybeWrap<T extends React.ElementType = 'div'>(props: MaybeWrapProps<T>): any;
export default MaybeWrap;
