"use client"

import {ReactNode} from "react";
import {FormProvider, useForm} from "react-hook-form";

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