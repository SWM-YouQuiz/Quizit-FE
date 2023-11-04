"use client";
import { ReactNode, useEffect, useReducer, useState } from "react";
import { QuizContext } from "@/lib/context/Context";
import { quizReducer } from "@/lib/context/Reducer";
import { postRefresh } from "@/modules/auth/serverApiActions";
import { useRouter } from "next/navigation";
import { pathToRegexp } from "path-to-regexp";
import { config } from "@/middleware";
import { deleteToken } from "@/modules/serverActions";
import { getUser } from "@/modules/profile/serverApiActions";
import Loading from "@/components/Loading";

type QuizContextProps = {
    children: ReactNode;
};

const JWT_EXPIRRY_TIME = 10000 * 60 * 1000;

const QuizContainer = ({ children }: QuizContextProps) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(quizReducer, {
        user: undefined,
        accessToken: "",
    });
    const [loading, setLoading] = useState(true);

    const setAccessToken = async (_accessToken: string) => {
        if (!_accessToken) return;
        dispatch({
            type: "SET_TOKEN",
            payload: _accessToken,
        });
        try {
            // await setCookie({ key: "accessToken", value: _accessToken });
            await setUser(_accessToken);
        } catch (error) {
            console.error("An error occurred when setting the access token:", error);
        }
    };

    const setUser = async (accessToken: string) => {
        if (!dispatch) return;
        try {
            const user = await getUser({ accessToken });
            dispatch({ type: "SET_USER", payload: user });
        } catch (error) {
            console.error("An error occurred when setting the user:", error);
        }
    };

    const checkIsAuthRequiredRoute = () => {
        const currentPath = window.location.pathname;
        console.log("currentPath", currentPath);
        for (const pattern of config.matcher) {
            const regex = pathToRegexp(pattern);

            if (regex.exec(currentPath)) {
                return true;
            }
        }
        return false;
    };

    const onSilentRefresh = async () => {
        postRefresh()
            .then((token) => {
                onLoginSuccess({ accessToken: token.accessToken });
            })
            .catch((e) => console.error("Token refresh failed!"));
    };

    const onLoginSuccess = async ({ accessToken }: AccessToken) => {
        await setAccessToken(accessToken);
        // await setCookie({ key: "refreshToken", value: accessToken });
        setTimeout(onSilentRefresh, JWT_EXPIRRY_TIME - 60000);
    };

    const _postRefresh = async () => {
        try {
            const token = await postRefresh();
            await onLoginSuccess({ accessToken: token.accessToken });
        } catch (error) {
            console.error("An error occurred during token refresh:", error);
            deleteToken();
            if (checkIsAuthRequiredRoute()) {
                window.location.href = "/auth/login";
            }
        }
    };

    useEffect(() => {
        (async () => {
            await _postRefresh();
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <QuizContext.Provider
            value={{
                accessToken: state.accessToken,
                user: state.user,
                dispatch,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};

export default QuizContainer;
