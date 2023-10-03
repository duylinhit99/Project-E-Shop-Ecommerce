function Error(props){
    function renderError(){
        let {err} = props
        if(Object.keys(err).length > 0){
            return(Object.keys(err).map((key, index)=>{
                return(
                    <li key={key}>
                        {err[key]}
                    </li>
                )
            }))
        }
    }
    return(
        <>
            {renderError()}
        </>
    )
}
export default Error;