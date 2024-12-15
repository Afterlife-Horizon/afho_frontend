import React from "react";
import { twMerge } from "tailwind-merge";

const ScrollDiv: React.FC<React.PropsWithChildren<{ className?: string, id?: string }>> = (props) => {
    const { children, ...propsWithoutChildren } = props
    return (
        <div {...propsWithoutChildren} className={twMerge(`overflow-auto scrollbar-thin scrollbar-thumb-accent-dark scrollbar-track-transperent`, props.className)}>
            {children}
        </div>
    );
}
 
export default ScrollDiv;