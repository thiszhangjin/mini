import { useContext } from 'react';
import RouterContext from './routerContext';

export default function useRouter() {
    const context = useContext(RouterContext);
    return context;
}