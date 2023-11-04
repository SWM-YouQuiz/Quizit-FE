import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(
    () =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    refetchIntervalInBackground: false,
                    refetchInterval: false,
                },
            },
        }),
);
export default getQueryClient;
