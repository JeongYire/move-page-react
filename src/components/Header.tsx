import Common from '../styles/common.module.css';

const Header = (props : {children? : JSX.Element[] | JSX.Element}) => {
    return (
        <div id={Common.header}>
            {props.children}
        </div>
    )
}

export {Header};