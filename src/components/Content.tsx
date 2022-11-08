import Common from '../styles/common.module.css';

const Content = (props : {children? : JSX.Element[] | JSX.Element}) => {
    return (
        <div id={Common.content}>
            {props.children}
        </div>
    )
}

export {Content};