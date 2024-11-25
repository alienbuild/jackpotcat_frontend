"use client";

import {Dispatch, SetStateAction} from "react";
import {Spinner} from "@nextui-org/react";

interface GenerateAINumbersBtnProps {
    onGenerateAI: (aiNumbers: number[]) => void;
    setError: Dispatch<SetStateAction<string | null>>;
    setLoading: (loading: boolean) => void;
    loading: boolean;
}

const GenerateAINumbersBtn: React.FC<GenerateAINumbersBtnProps> = ({ onGenerateAI, setError, setLoading, loading }) => {

    const handleGenerateAI = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/generate/ai", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to generate AI numbers");
            }

            const data = await response.json();

            if (data.prediction) {
                onGenerateAI(data.prediction);
            } else {
                setError("No prediction data received");
            }
        } catch (err) {
            setError("Error generating AI numbers");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleGenerateAI}
            className="max-w-md mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
        >
            <div className="button w-auto px-5 h-16 bg-green-500 cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#11a65c,0_0px_0_0_#f472b6] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#11a65c,0_15px_0_0_#11a65c] rounded-full border-[1px] border-green-400">
        <span className="flex gap-2 items-center h-full font-slackey text-white text-4xl text-shadow">
            {loading && <Spinner classNames={{
                circle1: "border-b-white",
                circle2: "border-white",
            }} />}
          AI
        </span>
            </div>
        </button>
    );
};

export default GenerateAINumbersBtn;
