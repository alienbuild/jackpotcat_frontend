"use client";

import { Button } from "@nextui-org/react";

interface PickBtnProps {
    onClick: () => void;
    isHeld: boolean;
    loading: boolean;
    number: number | null | undefined;
}

const PickBtn: React.FC<PickBtnProps> = ({ onClick, isHeld, loading, number }) => {
    return (
        <Button
            size={"sm"}
            variant={"ghost"}
            className={"text-white mt-3 disabled:opacity-50"}
            onClick={onClick}
            disabled={loading || !number}
        >
            {isHeld ? "Unhold" : "Hold"}
        </Button>
    );
};

export default PickBtn;
