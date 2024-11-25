import Link from "next/link";
import HeaderActions from "@/components/headers/HeaderActions";
import Logo from "@/components/headers/Logo";

const PrimaryHeader = () => {

    return(
        <header>
            <div className="w-full p-3 px-2 flex justify-between gap-2">
                <div className="w-full flex justify-center items-center">
                    <Link href={"/"} className={"flex items-center"}>
                        <img src={"/jackpotcat-logo.png"} alt={"Jackpotcat Logo"} className={"w-[100px]"}/>
                        <Logo />
                    </Link>
                </div>
            </div>
            <HeaderActions />
        </header>
    )
}

export default PrimaryHeader