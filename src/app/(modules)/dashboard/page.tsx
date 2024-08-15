"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Dashboard = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const router = useRouter();
    const user = false;

    const handleConfirm = () => {
        router.push("/sign-in");
    };

    const handleCancel = () => {
        router.push("/");
        setShowConfirmation(false);
    };

    if (!user && !showConfirmation) {
        setShowConfirmation(true);
        return null;
    }

    return (
        <div>
            {showConfirmation && (
                <Dialog open={true} >
                    <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle>Dashboard</DialogTitle>
                            <DialogDescription>
                                If you are admin so you should choose &quot;Yes&quot;
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <Button variant={"destructive"} onClick={handleCancel}>No</Button>
                            <Button variant={"default"} onClick={handleConfirm}>Yes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default Dashboard;
