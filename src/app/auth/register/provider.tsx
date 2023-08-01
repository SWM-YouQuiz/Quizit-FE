"use client"

import {ReactNode} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {registerApi} from "@/modules/auth/apiServices";

const Provider = ({children}: {children: ReactNode}) => {
    const methods = useForm<RegisterInputs>();

    return (
        <FormProvider {...methods}>
            <form className="w-full h-full">
                {children}
            </form>
        </FormProvider>
    )
}

export default Provider;