"use client"

import {Dispatch, SetStateAction} from "react";
import {Spinner} from "@nextui-org/react";

interface GenerateWeightedNumbersBtnProps {
    onGenerateWeighted: (aiNumbers: number[]) => void;
    setError: Dispatch<SetStateAction<string | null>>;
    setLoading: (loading: boolean) => void;
    loading: boolean;
}

const GenerateWeightedNumbersBtn: React.FC<GenerateWeightedNumbersBtnProps> = ({ onGenerateWeighted, setError, setLoading, loading }) => {

    const handleGenerateWeighted = async () => {
        setLoading(true);
        setError(null);

        try {

            const response = await fetch("/api/generate/weighted", {
                method: "POST"
            })

            if (!response.ok) {
                throw new Error("Failed to generate weighted numbers");
            }

            const data = await response.json();

            if (data.prediction) {
                onGenerateWeighted(data.prediction)
            } else {
                setError(data.error || "No preiction data received");
            }

        } catch {
            setError("Error generating weighted numbers.");
        } finally {
            setLoading(false);
        }

    }

    return (
        <button
            onClick={handleGenerateWeighted}
            className="max-w-md mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
        >
            <div
                className="button w-auto px-5 h-16 bg-yellow-500 cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#ec4899,0_0px_0_0_#f472b6] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#b3aa00,0_15px_0_0_#b3aa00] rounded-full border-[1px] border-yellow-400"
            >
                <span
                    className="flex gap-2 items-center h-full font-slackey text-white text-4xl text-shadow"
                >
                    {loading && <Spinner classNames={{
                        circle1: "border-b-white",
                        circle2: "border-white",
                    }} />}
                    Weighted
                </span>
            </div>
        </button>
    )
};

export default GenerateWeightedNumbersBtn;
