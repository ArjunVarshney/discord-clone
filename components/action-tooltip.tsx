"use client";

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionTooltipProps {
   lable: string;
   children: React.ReactNode;
   side?: "top" | "right" | "bottom" | "left";
   align?: "start" | "center" | "end";
}

const ActionTooltip = ({
   lable,
   children,
   side,
   align,
}: ActionTooltipProps) => {
   return (
      <TooltipProvider>
         <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent side={side} align={align}>
               <p className="font-semibold text-sm capitalize">
                  {lable.toLowerCase()}
               </p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default ActionTooltip;
