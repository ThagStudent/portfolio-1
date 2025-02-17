
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Sign In",
};
export default function SignInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="relative">{children}</div>;
}
