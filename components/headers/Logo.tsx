
const Logo = () => {

    // Function to generate a random delay for animation
    const generateRandomDelay = () => (Math.random() * 2).toFixed(2) + 's'; // Delay between 0 to 2 seconds

    return (
        <div className={"flex items-center flex-col gap-0 -ml-5"}>
            <span className={"uppercase text-xs font-slackey"}>The</span>
            <div className={"font-slackey logo-text text-3xl flex tracking-tighter -mt-1"}>
                <span
                    className={"text-red-500 text-6xl animate-grow"}
                    style={{ animationDelay: generateRandomDelay() }}
                >
                    J
                </span>
                <span
                    className={"text-green-500 text-5xl animate-grow"}
                    style={{ animationDelay: generateRandomDelay() }}
                >
                    A
                </span>
                <span
                    className={"text-orange-500 text-4xl animate-grow"}
                    style={{ animationDelay: generateRandomDelay() }}
                >
                    C
                </span>
                <span
                    className={"text-indigo-500 z-10 animate-grow"}
                    style={{ animationDelay: generateRandomDelay() }}
                >
                    K
                </span>
                <span
                    className={"text-pink-500 z-20 text-4xl animate-grow"}
                    style={{ animationDelay: generateRandomDelay() }}
                >
                    P
                </span>
                <span
                    className={"text-cyan-500 text-5xl animate-grow"}
                    style={{ animationDelay: generateRandomDelay() }}
                >
                    O
                </span>
                <span
                    className={"text-yellow-500 text-6xl animate-grow"}
                    style={{ animationDelay: generateRandomDelay() }}
                >
                    T
                </span>
            </div>
            <div className="font-slackey text-3xl flex -mt-7 tracking-tighter">
                <span className={"mr-1 text-blue-400"}>—</span>
                <span>C</span>
                <span>A</span>
                <span>T</span>
                <span className={"ml-1 text-blue-400"}>—</span>
            </div>
        </div>
    );
};

export default Logo;
