import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuSquare, SquareChevronRight } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { Typing } from "./typing";
import { useState } from "react";
const MobileSidebar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger>
        <SquareChevronRight className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-start">
            <Typing />
          </SheetTitle>
          <SheetDescription>
            <SheetClose asChild>
              <Sidebar setSheetOpen={setSheetOpen} />
            </SheetClose>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
