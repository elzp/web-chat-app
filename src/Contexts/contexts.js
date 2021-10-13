import {createContext} from 'react';

export const  UsernameContext = createContext(
    {
        name: undefined,
        id: -1,
    });