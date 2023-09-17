import 'server-only';
import {authenticateSession} from "@/util/session";
import {authOptions} from "@/modules/auth/auth";
import {requestApi} from "@/util/fetcher";

export const updateUser = async (): Promise<User[]> => {
    const session = await authenticateSession(authOptions);

    return requestApi({
        endpoint: `${process.env.API_URL}/api/user/user`,
        method: 'PUT',
        token: session.user.accessToken,
    });
};