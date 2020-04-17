import React, { useState } from 'react';

export interface ISearchProps {
    label: string;
    onKeyup(val: string): void;
}

export function SearchComponent(props: ISearchProps): JSX.Element {
    const [search, setSearch] = useState('');

    return (
        <div className="search">
            <form>
                <div className="form-group">
                    <label htmlFor="search-input">
                        {props.label || 'Search'}
                    </label>
                    <input
                        type="text"
                        id="search-input"
                        value={search}
                        onChange={(e): void => {
                            setSearch(e.target.value);
                        }}
                        onKeyUp={(e): void => {
                            const target = e.target as HTMLInputElement;
                            props.onKeyup(target.value || '');
                        }}
                    />
                </div>
            </form>
        </div>
    );
}
