import React from "react";
import { cn } from "@/lib/utils";
import {
  User,
  DollarSign,
  BarChart2,
  Umbrella,
  PiggyBank,
  Wallet,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavStore } from '@/store/useNavStore';

const navItems = [
  { name: "Personal Info", icon: User, progress: 70 },
  { name: "Financial Contributions", icon: DollarSign, progress: 50 },
  { name: "Assets and Liabilities", icon: BarChart2, progress: 30 },
  { name: "Insurance", icon: Umbrella, progress: 80 },
  { name: "Savings & Investments", icon: PiggyBank, progress: 60 },
  { name: "Income & Expenses", icon: Wallet, progress: 40 },
  { name: "Goals", icon: Target, progress: 20 },
];

const Sidebar = () => {
  const selectedNav = useNavStore((state) => state.selectedNav);
  const setSelectedNav = useNavStore((state) => state.setSelectedNav);

  const handleNavClick = (navTitle) => {
    setSelectedNav(navTitle);
  };

  return (
    <div className="w-64 bg-[#E9F5FE] text-black p-2 h-full overflow-y-auto">
      <div className="flex items-center mb-6 p-2">
        <DollarSign className="mr-2" size={24} />
        <h1 className="text-2xl font-bold text-[#0C7FDA]">FinTool</h1>
      </div>
      <nav>
        {navItems.map((item) => (
          <TooltipProvider key={item.title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  key={item.name}
                  className={cn(
                    "mb-5 p-2 rounded transition-colors ",
                    selectedNav === item.name
                      ? "bg-[#0C7FDA]"
                      : "hover:bg-[#0C7FDA] hover:bg-opacity-10"
                  )}
                >
                  <button
                    onClick={() => handleNavClick(item.name)}
                    className={cn(
                      "flex items-center w-full cursor-pointer",
                      selectedNav === item.name ? "text-white" : "text-black"
                    )}
                  >
                    <item.icon className="mr-2" size={20} />
                    <span className="text-base">{item.name}</span>
                  </button>
                  <div
                    className={cn(
                      "mt-4 rounded-full h-1.5",
                      selectedNav === item.name
                        ? "bg-white bg-opacity-30"
                        : "bg-gray-200"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-full h-1.5",
                        selectedNav === item.name ? "bg-white" : "bg-[#0C7FDA]"
                      )}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="mt-4 ">
                <p>{`${item.name}: ${item.progress}%`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
