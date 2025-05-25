import Navbar from "../../components/Navbar";
import LenisDiv from "../../lib/LenisDIv";

export default function RootLayout({ children }) {
    return (
        <LenisDiv>
            <main className="px-4 py-2 flex flex-col" >
                <Navbar />
                {children}
            </main>
        </LenisDiv>
    )
}