import React from "react"

const SamplePage = (props : { titleNumber : number }) => {
    return (
        <React.Fragment>
            <h1>Title {props.titleNumber}</h1>
            <section>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptate saepe, quaerat quod, repudiandae totam beatae ipsa est ipsam, quos fugiat fuga molestiae natus similique alias reiciendis velit eius porro.
            </section>
        </React.Fragment>
    )
}

export {SamplePage};