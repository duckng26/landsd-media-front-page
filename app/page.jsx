"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loading from "./loading";

const Homepage = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(router.push("/login"), 500);
        return;
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            <div>Homepage</div>
        </Suspense>
    );
};

export default Homepage;
