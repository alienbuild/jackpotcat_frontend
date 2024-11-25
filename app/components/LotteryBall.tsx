"use client";

import PickBtn from "@/app/components/generate/PickBtn";

interface LotteryBallProps {
    number: number | null;
    index: number;
    heldNumbers: Set<number>;
    toggleHoldNumber: (number: number) => void;
    loading: boolean;
}

const LotteryBall: React.FC<LotteryBallProps> = ({
                                                     number,
                                                     index,
                                                     heldNumbers,
                                                     toggleHoldNumber,
                                                     loading
                                                 }) => {
    const getBallColor = (number: number | null): string => {
        if (number === null) return 'border-white';
        if (number <= 10) return 'border-red-400';
        if (number <= 20) return 'border-blue-400';
        return 'border-green-400';
    };

    const getTextColor = (number: number | null): string => {
        if (number === null) return 'text-gray-400';
        if (number <= 10) return 'text-red-400';
        if (number <= 20) return 'text-blue-400';
        return 'text-green-400';
    };

    const isHeld = heldNumbers.has(number || 0);
    const delay = `${(index % 2) * 0.2}s`;

    return (
        <li className="w-full h-full text-center">
            <div
                className={`w-full ${isHeld ? 'opacity-50' : 'animate-floating'} aspect-square flex items-center justify-center rounded-full border-4 ${getBallColor(number)} text-black bg-white shadow-[inset_-10px_-10px_0px_0px_rgba(0,0,0,0.1)]`}
                style={{ animationDelay: delay }}
            >
                <div className="border-5 border-black rounded-full h-full w-full flex justify-center items-center">
                    <span className={`text-5xl leading-none rounded-full aspect-square w-5/6 flex ${getTextColor(number)} justify-center items-center font-cherry`}>
                        {number !== null ? number : "?"}
                    </span>
                </div>
            </div>
            <PickBtn
                onClick={() => toggleHoldNumber(number || 0)}
                isHeld={isHeld}
                loading={loading}
                number={number}
            />
        </li>
    );
};

export default LotteryBall;
