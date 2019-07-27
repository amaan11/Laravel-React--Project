import { FETCH_USER } from "../action/types";
import history from ".././history";
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
        // console.log(res.data[0].firstname + res.data[0].lastname);
        .then(res => {
            if (res.status) {
                history.push({
                    pathname: "/",
                    state: { value: res.data }
                });
            } else {
                swal({
                    icon: "error",
                    text: "Please Enter a Valid username and password"
                });
            }
        });
};

export const newUser = userData => dispatch => {
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
        .then(data => {
            if (data === "Saved successfully") {
                history.push("/");
            } else {
                swal({
                    icon: "error",
                    text: `Signup Failed! ${data.email}`
                });
            }
        });
};
