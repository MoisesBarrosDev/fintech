import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Resumo" },
    { to: "/vendas", label: "Vendas" },
    { to: "/contato", label: "Contato" },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden p-2 rounded-lg bg-[#eceadd] text-[#463220]"
      >
        <Menu />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#eceadd] z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4">
          <span className="font-semibold text-[#463220]">Menu</span>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <ul className="flex flex-col gap-2 px-4">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setOpen(false)}
                className="block py-2 px-3 rounded-lg hover:bg-white"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
