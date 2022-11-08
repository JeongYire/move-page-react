import React, { useMemo, useRef, useState, useTransition } from "react";
import { useSpring,animated } from "react-spring";

export const MoveAnimation = (props : {children : JSX.Element[]}) => {

    const index = useRef(0);
    const destinationIndex = useRef(0);
    const currentIndex = useRef(0);
    const [status,setStatus] = useState<'idle' | 'move'>('idle');
    const pages = Array(props.children.length).fill(null);

    
    const currentFrom = status == 'idle' ? 0 : 0;
    const currentTo = status == 'idle' ? 0 : -100;
    
    const currentSpring = useSpring({'left': `${currentTo}%`, from: {'left': `${currentFrom}%`}})

    const nextFrom = status == 'idle' ? 100 : 100;
    const nextTo = status == 'idle' ? 100 : 0;

    const nextSpring = useSpring({'left': `${nextTo}%`, from: {'left': `${nextFrom}%`},onRest:() => {
        if(status == 'move'){
            index.current = destinationIndex.current;
            setStatus('idle');
        }
    }})

    const action = ( destination : number ) => {
        if(status == 'idle' && index.current != destination){
            destinationIndex.current = destination; 
            currentIndex.current = destination;
            setStatus('move');
        }
    }

    const container : React.CSSProperties = {
        width:'100%'
        ,height : '100%'
        ,display:'flex'
        ,position:'relative'
    }

    const column : React.CSSProperties = {
        width:'100%'
        ,height : '100%'
        ,position:'absolute'
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
                            <span key={idx} style={style} onClick={() => action(idx)}>{idx+1}</span>
                        )
                    })
                }
            </div>
            <div style={container}>
                {
                    status == 'idle' && 
                    (
                    <animated.div style={column}> 
                        {props.children[index.current]}
                    </animated.div>
                    )
                }
                {
                    status == 'move' && 
                    (
                        <>
                            <animated.div style={{...column,...currentSpring}}> 
                                {props.children[index.current]}
                            </animated.div>
                            <animated.div style={{...column,...nextSpring}}> 
                                {props.children[destinationIndex.current]}
                            </animated.div>
                        </>
                    )
                }
               
            </div>
        </>
    );
}
