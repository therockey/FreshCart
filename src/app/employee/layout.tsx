"use client";
import React from 'react';
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/ui/custom/mode-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EmployeeLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname(); // Get the current pathname
    console.log(pathname); // Log the current path

    return (<>
            <div>
                <header className="flex flex-row justify-between content-center px-4 py-8 bg-accent font-bold">
                    <div style={styles.left}>
                        <h1 style={styles.title}>Panel administracyjny FreshCart</h1>
                    </div>
                    <nav className="flex flex-row gap-5">
                        <Button asChild variant="link">
                            <Link href="#">Zamówienia</Link>
                        </Button>
                        <Button asChild variant="link" className={`${pathname === "/" ? "font-bold" : ""}`}>
                            <Link href="#">Stan magazynowy</Link>
                        </Button>
                        <Button asChild variant="link" className={`${pathname === "/employee/products" ? "font-bold" : ""}`}>
                            <Link href="/employee/products">Zarządzanie produktami</Link>
                        </Button>
                        <Button asChild variant="link" className={`${pathname === "/employee/complaints" ? "font-bold" : ""}`}>
                            <Link href="/employee/complaints">Reklamacje</Link>
                        </Button>
                        <Button asChild variant="link" className={`${pathname === "/" ? "font-bold" : ""}`}>
                            <Link href="#">Wyloguj</Link>
                        </Button>
                    </nav>
                </header>

                <main style={styles.main}>
                    {children}
                </main>
            </div>
            <ModeToggle/>
        </>
    );
}

// Inline styles
const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },
    left: {
        flex: 1,
    },
    title: {
        margin: 0,
        fontSize: "20px",
    },
    right: {
        display: "flex",
        gap: "15px",
    },
    link: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "14px",
    },
    main: {
        padding: "20px",
    },
};