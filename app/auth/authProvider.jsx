import { useContext, createContext, useState, useEffect } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
    windowLogin,
    login,
    getCurrentUser,
    getUserConsentedRecently,
} from "../lib/clientActions";
import { useMutation } from "@tanstack/react-query";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const router = useRouter();

    const handleSuccess = async (data) => {
        setCookie("token", data.access_token);

        let userData;
        try {
            userData = await getCurrentUser();
        } catch {
            deleteCookie("token");
            router.push("/login");
            return;
        }
        const user = userData.user;
        setUser(user);

        const consentedRecently = await getUserConsentedRecently(
            `id=${user.id}`
        );

        if (consentedRecently.data.has_confirmed_recently) {
            router.push("/news");
        } else {
            router.push("/disclaimer");
        }
    };

    const windowLoginMutation = useMutation({
        mutationFn: async () => {
            const data = await authLogin();
            const access_token = data.access_token;

            return await windowLogin(access_token);
        },
        onSuccess: handleSuccess,
    });

    const loginMutation = useMutation({
        mutationFn: ({ user, pw }) => {
            return login(
                new URLSearchParams({
                    grant_type: "password",
                    username: user,
                    password: pw,
                })
            );
        },
        mutationKey: ["login"],
        onSuccess: handleSuccess,
    });

    const handleLogin = async (user, pw) => {
        await loginMutation.mutate({ user: user, pw: pw });

        return loginMutation.isSuccess;
    };

    const handleWindowLogin = async () => {
        await windowLoginMutation.mutate();
        return windowLoginMutation.isSuccess;
    };

    useEffect(() => {
        const token = getCookie("token");

        if (token) {
            handleSuccess({
                access_token: token,
                token_type: "bearer",
            });
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                handleLogin,
                handleWindowLogin,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
