import { FETCH_USER } from "../action/types";
import history from '.././history';
import { NEW_USER } from "../action/types";


export const fetchUser = userData => dispatch => {
   
    fetch("login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data =>{
            if(data.status){
                history.push('home')
            }
            else{
                swal({
                icon: "error",
                text:'Please Enter a Valid username and password'
                })
            }
        })
            
           
};

export const newUser=userData=>dispatch=>{
    console.log("data",userData)
    fetch("signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data =>{
                 if(data==='Saved successfully'){
                history.push('home')
            }
            else{
                swal({
                icon: "error",
                text:'Signup Failed!PLease Try Again'
                })
            }
        })
}
