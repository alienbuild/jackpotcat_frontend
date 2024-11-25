"use client";

import {Spinner} from "@nextui-org/react";

interface GenerateRandomNumbersBtnProps {
    onGenerate: () => void;
    loading: boolean;
}

const GenerateRandomNumbersBtn: React.FC<GenerateRandomNumbersBtnProps> = ({ onGenerate, loading }) => {
    return (
        <button
            className="max-w-md mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onGenerate}
            disabled={loading}
        >
            <div className="button auto px-5 h-16 bg-pink-500 cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#ec4899,0_0px_0_0_#f472b6] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#ec4899,0_15px_0_0_#ec4899] rounded-full border-[1px] border-pink-400">
        <span className="flex gap-2 items-center h-full font-slackey text-white text-4xl text-shadow">
           {loading && <Spinner classNames={{
               circle1: "border-b-white",
               circle2: "border-white",
           }} />}
            Random
        </span>
            </div>
        </button>
    );
};

export default GenerateRandomNumbersBtn;
