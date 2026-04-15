import FintechSVG from "@/assets/FintechSVG";
import resumo from "@/assets/icons/resumo.svg";
import vendas from "@/assets/icons/vendas.svg";
import contato from "@/assets/icons/contato.svg";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export function SideNav() {
  const links = [
    { to: "/", icon: resumo, label: "Resumo" },
    { to: "/vendas", icon: vendas, label: "Vendas" },
    { to: "/contato", icon: contato, label: "Contato" },
  ];

  return (
    <nav className="py-4 rounded-4xl bg-[#eceadd] w-full h-full">
      <div className="flex items-center justify-center mb-4 w-full">
        <FintechSVG title="Fintech" />
      </div>

      <ul className="space-y-1 px-2">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 px-3 py-2 rounded-xl no-underline transition-all",
                  isActive
                    ? "bg-white text-[#463220] shadow-sm font-semibold"
                    : "text-[#6b5a47] hover:bg-white",
                )
              }
            >
              <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-white">
                <img
                  src={link.icon}
                  alt="imagem-ilustrativa"
                  className="w-4 h-4"
                />
              </span>

              <span className="text-sm transition-colors group-hover:text-[#463220]">
                {link.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
