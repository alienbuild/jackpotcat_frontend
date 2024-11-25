"use client";

import { useState } from "react";
import DisplayNumbers from "@/app/components/generate/DisplayNumbers";
import GenerateRandomNumbersBtn from "@/app/components/generate/GenerateRandomNumbersBtn";
import GenerateWeightedNumbersBtn from "@/app/components/generate/GenerateWeightedNumbersBtn";
import GenerateAINumbersBtn from "@/app/components/generate/GenerateAINumbersBtn";
import { generateRandomNumbers } from "@/utils";
import SavedNumbers from "@/app/components/SavedNumbers";

export default function Home() {

    const [savedNumbers, setSavedNumbers] = useState<number[][]>([]);
    const [predictedNumbers, setPredictedNumbers] = useState<number[]>([]);
    const [heldNumbers, setHeldNumbers] = useState<Set<number>>(new Set());
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Function to generate new random numbers (7 unique numbers between 1 and 49)
    const generateNewNumbers = () => {
        const remainingNumbersCount = 7 - heldNumbers.size;
        let newNumbers = generateRandomNumbers(remainingNumbersCount);

        // Keep the held numbers static and ensure no duplicates
        newNumbers = newNumbers.filter(num => !heldNumbers.has(num));

        // If there are not enough numbers generated (possible edge case), keep generating more numbers
        while (newNumbers.length < remainingNumbersCount) {
            const additionalNumbers = generateRandomNumbers(remainingNumbersCount - newNumbers.length);
            newNumbers = [...newNumbers, ...additionalNumbers.filter(num => !heldNumbers.has(num))];
        }

        // Combine the new numbers and the held ones
        const finalNumbers = [...newNumbers, ...Array.from(heldNumbers)];
        setPredictedNumbers(finalNumbers.sort((a, b) => a - b));
    };

    const toggleHoldNumber = (number: number) => {
        setHeldNumbers(prev => {
            const updated = new Set(prev);
            if (updated.has(number)) {
                updated.delete(number);
            } else {
                updated.add(number);
            }
            return updated;
        });
    };

    const clearAllHolds = () => {
        setHeldNumbers(new Set());
        generateNewNumbers();
    };

    const handleWeightedNumbers = (weightedNumbers: number[]) => {
        setHeldNumbers(new Set());
        setPredictedNumbers(weightedNumbers)
    }

    const handleAIgeneratedNumbers = (aiNumbers: number[]) => {
        setHeldNumbers(new Set());
        setPredictedNumbers(aiNumbers);
    };

    return (
        <main>
            {error && <span>{error}</span>}
            <section>
                <div className="w-full px-5">
                    <DisplayNumbers
                        predictedNumbers={predictedNumbers}
                        heldNumbers={heldNumbers}
                        toggleHoldNumber={toggleHoldNumber}
                        clearAllHolds={clearAllHolds}
                        loading={loading}
                        setSavedNumbers={setSavedNumbers}
                    />
                    <span className={"block mb-3 text-sm text-blue-100 text-center"}>
                    Use the buttons below to generate lottery numbers
                </span>
                    <div className="flex max-w-xl gap-3 justify-center mx-auto">
                        <GenerateRandomNumbersBtn
                            onGenerate={generateNewNumbers}
                            loading={loading}
                        />
                        <GenerateWeightedNumbersBtn
                            onGenerateWeighted={handleWeightedNumbers}
                            setError={setError}
                            setLoading={setLoading}
                            loading={loading}
                        />
                        <GenerateAINumbersBtn
                            onGenerateAI={handleAIgeneratedNumbers}
                            setError={setError}
                            setLoading={setLoading}
                            loading={loading}
                        />
                    </div>
                </div>
            </section>
            <SavedNumbers setSavedNumbers={setSavedNumbers} savedNumbers={savedNumbers}/>
        </main>
    );
}
