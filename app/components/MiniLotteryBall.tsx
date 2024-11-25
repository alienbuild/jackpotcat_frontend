"use client";

interface SmallLotteryBallProps {
    number: number | null;
    index: number;
}

const SmallLotteryBall: React.FC<SmallLotteryBallProps> = ({ number }) => {
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

    return (
        <li className="w-16 h-full">
            <div
                className={`w-full aspect-square flex items-center justify-center rounded-full border-2 ${getBallColor(number)} text-black bg-white shadow-[inset_-10px_-10px_0px_0px_rgba(0,0,0,0.1)]`}
            >
                <div className="border-3 border-black rounded-full h-full w-full flex justify-center items-center">
                    <span className={`text-xl leading-none rounded-full aspect-square w-5/6 flex ${getTextColor(number)} justify-center items-center font-cherry`}>
                        {number !== null ? number : "?"}
                    </span>
                </div>
            </div>
        </li>
    );
};

export default SmallLotteryBall;
