import { createContext } from 'react';
import { BrowserHistory, Location } from 'history';

export interface RouterContextProps {
  history: BrowserHistory;
  location: Location;
}

export default createContext<RouterContextProps>({
  history: {} as BrowserHistory,
  location: {} as Location
});
