import { createContext } from 'react';
import {Store} from '../../redux/interface';

export interface RouterContextProps {
    store: Store | null
}

export default createContext<RouterContextProps>({
  store: null,
});
