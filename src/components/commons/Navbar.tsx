"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarLink {
  href: string;
  label: string;
}
const employeeLinks: NavbarLink[] = [
  { href: "", label: "Zamówienia" },
  { href: "", label: "Stan magazynowy" },
  { href: "/employee/products", label: "Zarządzanie produktami" },
  { href: "/employee/complaints", label: "Reklamacje" },
  { href: "", label: "Wyloguj" },
];
const customerLinks: NavbarLink[] = [
  { href: "", label: "Katalog" },
  { href: "/client/cart", label: "Koszyk" },
  { href: "", label: "Profil" },
  { href: "/client/loyaltyProg", label: "Program lojalnościowy" },
  { href: "", label: "Pomoc" },
  { href: "", label: "Wyloguj" },
];
type NavbarItemProps = NavbarLink & {
  pathname: string;
};
const NavbarItem = ({ href, label, pathname }: NavbarItemProps) => (
  <Button
    asChild
    variant="link"
    className={`${pathname === href ? "font-bold" : ""}`}
  >
    <Link href={href}>{label}</Link>
  </Button>
);

export const Navbar = () => {
  const pathname = usePathname();
  const isEmployee = /employee/i.test(pathname);
  const title = isEmployee
    ? "Panel administracyjny FreshCart"
    : "Witamy w FreshCart";
  const links = isEmployee ? employeeLinks : customerLinks;
  return (
    <div className="flex justify-between content-center px-4 py-8 bg-accent font-bold">
      <h1 className="text-xl">{title}</h1>
      <nav className="flex flex-row gap-5">
        {links.map((link) => (
          <NavbarItem key={link.label} {...link} pathname={pathname} />
        ))}
      </nav>
    </div>
  );
};
