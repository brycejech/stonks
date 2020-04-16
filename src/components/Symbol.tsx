import React from 'react';

export interface ISymbolProps {
    path: string;
}

export function Symbol(props: ISymbolProps): JSX.Element {
    return <h1>Hello from symbol page - {props.path}</h1>;
}
