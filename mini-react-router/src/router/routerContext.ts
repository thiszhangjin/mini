import { createContext } from 'react';
import { BrowserHistory, Location } from 'history';

export interface RouterContextProps {
  history: BrowserHistory;
  location: Location;
  params?: {
    [key: string]: string
  },
  path?: string
}

export default createContext<RouterContextProps>({
  history: {} as BrowserHistory,
  location: {} as Location
});
