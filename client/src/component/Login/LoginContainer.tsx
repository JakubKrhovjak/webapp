import React, { useReducer } from "react";
import { restService } from "../../client/restClient";
import { useRouter } from "react-router5";
import { SignIn } from "./SigIn";
import { Login } from "./Login";
import { Grid } from "@material-ui/core";

export enum Auth {
    SIGN_IN,
    LOG_IN,
    NEW_ACCOUNT,
}

interface Credential {
    username: string;
    password: string;
}

const INIT_STATE = {
    loginType: Auth.SIGN_IN,
    header: "log in",
    username: "",
};

export const USERNAME = "USERNAME";

const reducer = (state, action) => {
    return {
        ...state,
        ...action,
    };

};

export const LoginContainer = (props) => {
    const router = useRouter();

    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const signIn = (username: string) => {
        restService
            .post("/sign-in", username)
            .then((res) => {
                if (res.data) {
                    dispatch({ loginType: Auth.LOG_IN, username });
                } else {
                    dispatch({
                        header: "New account",
                        loginType: Auth.NEW_ACCOUNT,
                        username,
                    });
                }
                localStorage.setItem(USERNAME, username);
            })
            .catch((e) => {
                console.info(e);
            });
    };

    const authenticate = async (
        values: Credential,
        setFieldError: (a: string, b: string) => void
    ) => {

        restService
            .authenticate(values.username, values.password)
            .then((res) => {
                router.navigate("basic");
            })
            .catch((e) => {
                setFieldError("password", "Invalid password!");
            });
    };

     const  createAccount = async (
        values: Credential,
        setFieldError: (a: string, b: string) => void
    ) => {
       const result  = await restService
            .post("/new-account", {
                username: values.username,
                password: values.password,
            });

       if(result.status === 200) {
           restService.authenticate(values.username, values.password)
               .then(res => router.navigate("basic"))
       }

     };

    const resolveComponent = () => {
        return state.loginType === Auth.SIGN_IN ? (
            <SignIn signIn={signIn} />
        ) : (
            <Login
                accountAction={Auth.NEW_ACCOUNT === state.loginType ? createAccount : authenticate}
                header={state.header}
                username={state.username}
            />
        );
    };

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ height: "100%" }}
        >
            {resolveComponent()}
        </Grid>
    );
};
