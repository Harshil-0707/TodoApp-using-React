import React from "react";

const Navbar = () => {
    return (
        <nav className="flex justify-around items-center bg-green-600 text-green-100 py-2 mb-6">
            <h1 className="text-2xl">iTask</h1 >
            <ul className="flex gap-5">
                <li className="list-none"><a href="#" className="outline-0 border-0">Home</a></li>
                <li className="list-none"><a href="#" className="outline-0 border-0">Your Tasks</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;