function Validd(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const pnum_pattern = /^[0-9\b]+$/

    if(values.username === ""){
        error.username = "Username should not empty"
    }else{
        error.username = ""
    }

    if(values.phonenumber === ""){
        error.phonenumber = "Phonenumber should not empty"
    }else if(!pnum_pattern.test(values.phonenumber)){
        error.phonenumber = "số"
    }else if(values.phonenumber.length > 10){
        error.phonenumber = "quá dài"
    }else{
        error.phonenumber = ""
    }

    if(values.email === ""){
        error.email = "Email should not empty"
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
export default Validd;