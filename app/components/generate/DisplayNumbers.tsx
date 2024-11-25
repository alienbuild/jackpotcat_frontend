"use client";

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import LotteryBall from "@/app/components/LotteryBall";

interface DisplayNumbersProps {
    predictedNumbers?: number[];
    heldNumbers: Set<number>;
    toggleHoldNumber: (number: number) => void;
    clearAllHolds: () => void;
    loading: boolean;
    setSavedNumbers: (numbers: number[][]) => void;
}

const DisplayNumbers: React.FC<DisplayNumbersProps> = ({
                                                           predictedNumbers = [],
                                                           heldNumbers,
                                                           toggleHoldNumber,
                                                           clearAllHolds,
                                                           loading,
                                                           setSavedNumbers
                                                       }) => {
    const { data: session } = useSession();
    // @ts-ignore
    const userId = session?.user?.id;

    const shouldShowQuestionMark = loading || predictedNumbers.length === 0;

    const saveNumbers = async () => {
        const savedNumbers = JSON.parse(localStorage.getItem("savedNumbers") || "[]");
        if (savedNumbers.length >= 10) {
            savedNumbers.shift();
        }
        savedNumbers.push(predictedNumbers);
        localStorage.setItem("savedNumbers", JSON.stringify(savedNumbers));

        if (userId) {
            try {
                const response = await fetch("/api/saveNumbers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userId}`,
                    },
                    body: JSON.stringify({ numbers: predictedNumbers }),
                });
                if (!response.ok) {
                    throw new Error("Failed to save numbers to API");
                }
            } catch (error) {
                console.error(error);
            }
        }

        setSavedNumbers(savedNumbers);
    };

    return (
        <>
            <h1 className="text-center text-4xl my-6 font-slackey text-shadow">Your Lottery Numbers:</h1>
            <ul className="flex gap-3 max-w-4xl mx-auto justify-between my-10 items-center">
                {Array(7).fill(null).map((_, index) => {
                    const number = shouldShowQuestionMark ? null : predictedNumbers[index];
                    return (
                        <LotteryBall
                            key={index}
                            number={number}
                            index={index}
                            heldNumbers={heldNumbers}
                            toggleHoldNumber={toggleHoldNumber}
                            loading={loading}
                        />
                    );
                })}
                <li className={"w-full h-full text-right"}>
                    <Button
                        variant={"ghost"}
                        size={"sm"}
                        className={"text-white disabled:opacity-50"}
                        disabled={loading}
                        onClick={saveNumbers}
                    >
                        Save
                    </Button>
                    <Button
                        variant={"ghost"}
                        size={"sm"}
                        className={"text-white mt-5 disabled:cursor-not-allowed disabled:opacity-50"}
                        onClick={clearAllHolds}
                        disabled={heldNumbers.size <= 0 || loading}
                    >
                        Clear
                    </Button>
                </li>
            </ul>
        </>
    );
};

export default DisplayNumbers;
