"use client";

import { useEffect, useState } from "react";
import {Button, Spinner} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import MiniLotteryBall from "@/app/components/MiniLotteryBall";

interface SavedNumbersProps {
    setSavedNumbers: (numbers: number[][]) => void;
    savedNumbers: number[][];
}

const SavedNumbers: React.FC<SavedNumbersProps> = ({
                                                       setSavedNumbers,
                                                       savedNumbers,
                                                   }) => {
    const { data: session } = useSession();
    // @ts-ignore
    const userId = session?.user?.id;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSavedNumbers = async () => {
        let savedNumbersFromLocalStorage = JSON.parse(
            localStorage.getItem("savedNumbers") || "[]"
        );

        if (userId) {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("/api/getSavedNumbers", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${userId}`,
                    },
                });

                if (response.ok) {
                    const apiSavedNumbers = await response.json();
                    savedNumbersFromLocalStorage = apiSavedNumbers.savedNumbers || [];
                }
            } catch (error) {
                console.error("Error fetching saved numbers:", error);
                setError("Error fetching saved numbers.");
            } finally {
                setLoading(false);
            }
        }
        setSavedNumbers(savedNumbersFromLocalStorage);
        setLoading(false)
    };

    useEffect(() => {
        fetchSavedNumbers();
    }, [userId]);

    return (
        <section className="max-w-4xl mx-auto my-20">
            <div className="flex justify-between gap-2 items-center">
                <h2 className="text-center text-3xl my-6 font-slackey text-shadow">
                    Your Saved Lottery Numbers:
                </h2>
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    className={"text-white"}
                    onClick={() => {
                        setSavedNumbers([]);
                        localStorage.removeItem("savedNumbers");
                    }}
                >
                    Clear Saved Numbers
                </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <div className={"flex justify-center"}>
                    <Spinner classNames={{
                        circle1: "border-b-white",
                        circle2: "border-white",
                    }} />
                </div>
            ) : savedNumbers.length > 0 ? (
                savedNumbers.map((numbers, index) => (
                    <ul key={index} className="flex gap-2 max-w-4xl w-full mx-auto my-10 items-center">
                        {numbers.map((number, innerIndex) => (
                            <MiniLotteryBall key={innerIndex} number={number} index={innerIndex} />
                        ))}
                    </ul>
                ))
            ) : (
                <p className={"text-center bg-blue-600/50 text-blue-300 rounded-3xl p-3"}>
                    You have no saved numbers
                </p>
            )}
        </section>
    );
};

export default SavedNumbers;
