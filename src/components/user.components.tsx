
import { useSession } from "next-auth/react";
import {LoginButton, LogoutButton, ProfileButton, RegisterButton} from "@/components/buttons.component";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/lib/auth";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";



type UserProps = {
    session: Session | null
}
const User = ({session}: UserProps) => {
    //const { data: session } = useSession();
    console.log("session", session);

    return (
        <>
            <h1>Client Session</h1>
            <LoginButton />
            <RegisterButton />
            <LogoutButton />
            <ProfileButton />
            <pre>{JSON.stringify(session)}</pre>
        </>
    );
};

export default User;