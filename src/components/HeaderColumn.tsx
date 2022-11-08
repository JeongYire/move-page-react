import Common from '../styles/common.module.css';
import { PageMode } from '../types';

const HeaderColumn = (props : {children? : JSX.Element[] | JSX.Element,mode : PageMode,on : boolean,setMode : () => void}) => {
    return (
        <div className={`${Common.headerColumn} ${props.on ? Common.on : null}`} onClick={props.on ? undefined : props.setMode}>
            <pre>{props.mode}</pre>
        </div>
    )
}

export {HeaderColumn};