import {ReactNode} from "react";
import Provider from "@/app/auth/register/provider";

const RegisterLayout = async ({children}: {children: ReactNode}) => {

    return (
        <Provider>
            {children}
        </Provider>

    )
}

export default RegisterLayout;