import { ReactNode } from "react";
import Layout from "@/components/Layout";

const RankingLayout = ({ children }: { children: ReactNode }) => {
    return <Layout>{children}</Layout>;
};

export default RankingLayout;
