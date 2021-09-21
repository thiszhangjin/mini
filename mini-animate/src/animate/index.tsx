import React, {useState ,useEffect, useRef} from 'react';

export interface IProps {
    showProp: string;
    transitionName: string;
    onEnter: () => void;
    onEnterActive: () => void;
    onLeave: () => void;
    onLeaveActive: () => void;
    children: React.ReactElement
}

function Animate(props: IProps) {
    const currentShowPropValue = useRef();
    const {showProp, transitionName, children} = props;
    const [currentChildren, setCurrentChildren] = useState(children);
    const [animateKey, setAnimateKey] = useState('');

    useEffect(() => {
        const showPropValue = children.props[showProp];
        if(showPropValue !== currentShowPropValue.current) {
            if(showPropValue) {
                // 进入动画
                onEnter();
            } else {
                onLeave();
            }
        }
        currentShowPropValue.current = showPropValue;
    })

    useEffect(() => {
        if(animateKey === 'enter') {
            onEnterActive()
        }else if(animateKey === 'leave') {
            onLeaveActive();
        }
    }, [animateKey])

    function onEnter() {
        addClass('enter');
        if(props.onEnter) {
            props.onEnter();
        }
    }

    function onEnterActive() {
        addActiveClass('enter-active')
        if(props.onEnterActive) {
            props.onEnterActive();
        }
    }

    function onLeave() {
        addClass('leave')
        if(props.onLeave) {
            props.onLeave();
        }
    }
    
    function onLeaveActive() {
        addActiveClass('leave-active')
        if(props.onLeaveActive) {
            props.onLeaveActive();
        }
    }

    function addClass(animateKey: string) {
        const childrenProps = children.props;
        const addClassName = animateKey && `${transitionName}-${animateKey}`;
        const nextChildren = React.cloneElement(children, {
            [showProp]: animateKey ? true : childrenProps[showProp],
            className: `${childrenProps.className} ${addClassName}`,
            onAnimationEnd: () => {
                if(childrenProps.onAnimationEnd) {
                    childrenProps.onAnimationEnd();
                };
                addClass('');
            },
            onTransitionEnd: () => {
                if(childrenProps.onTransitionEnd) {
                    childrenProps.onTransitionEnd();
                };
                addClass('');
            },
        })
        setCurrentChildren(nextChildren);
        setAnimateKey(animateKey);
    }

    function addActiveClass(activeClass: string) {
        const nextChildren = React.cloneElement(currentChildren, {
            className: `${currentChildren.props.className} ${transitionName}-${activeClass}`,
        })
        setTimeout(() => {
            setCurrentChildren(nextChildren);
        }, 0)
    }

    return (
        <div>
            {currentChildren}
        </div>
    )
}

export default Animate;