import Navbar from "../../components/Navbar";

export default function RootLayout({ children }) {
    return(
        <main className="px-4 py-2 flex flex-col" >
            <Navbar/>
            {children}
        </main>
    )
}