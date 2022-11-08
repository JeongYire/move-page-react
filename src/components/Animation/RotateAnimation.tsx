import React, { useMemo, useRef, useState, useTransition } from "react";
import { useSpring,animated } from "react-spring";

export const RotateAnimation = (props : {children : JSX.Element[]}) => {

    const index = useRef(0);
    const currentIndex = useRef(0);
    const nextIndex = useRef(1);
    const [status,setStatus] = useState<'idle' | 'move' | 'reverseMove'>('idle');
    const pages = Array(props.children.length).fill(null);

    const from = status == 'idle' || status == 'move' ? 0 : 90;
    const to = status == 'idle' ? 0 : status == 'move' ? 90 : 0;

    const spring = useSpring({'transform': `rotateY(${to}deg)`, from: {'transform': `rotateY(${from}deg)`},onRest:() => {
        if(status == 'move'){
            index.current = nextIndex.current;
            setStatus('reverseMove');
            return;
        }
        if(status == 'reverseMove'){
            setStatus('idle');
            return;
        }
    }})

    const movePage = (destination : number) => {
        if(status != 'idle')return;
        nextIndex.current = destination-1;
        currentIndex.current = nextIndex.current;
        setStatus('move');
    }

    const pageGroup : React.CSSProperties = {
        top:100,
        right:0,
        zIndex:5,
        height:50,
        position:'absolute'
        ,display:'flex'
    }
    const page : React.CSSProperties = {
        width:50,
        border:'2px solid black',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        cursor:'pointer'
    }

    const on : React.CSSProperties = {
        backgroundColor : 'black',
        color:'white',
    }

    return(
        <>
            <div style={pageGroup}>
                {
                    pages.map((obj,idx) => {
                        const style = idx == currentIndex.current ? {...page,...on} : page;
                        return (
                            <span key={idx} style={style} onClick={() => movePage(idx+1)}>{idx+1}</span>
                        )
                    })
                }
            </div>
            <animated.div style={spring}> 
                {props.children[index.current]}
            </animated.div>
        </>
    );
}
