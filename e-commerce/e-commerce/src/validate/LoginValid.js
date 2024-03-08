function Valid(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === ""){
        error.email = "Email should not empty"
    }
    else if(!email_pattern?.test(values.email)){
        error.email = "Email didn't exist"
    }else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Password should not empty"
    }else{
        error.password = ""
    }
    return error;
}
export default Valid;