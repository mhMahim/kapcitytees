"use client";

import { QrCode } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
}

const QRCodeDialog = ({ open, onOpenChange, productName }: QRCodeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-97.5 max-w-97.5 p-4 rounded-2xl border-0 shadow-[0px_4px_21px_0px_rgba(98,101,120,0.12)] gap-0 backdrop:backdrop-blur-sm"
      >
        <DialogTitle className="sr-only">
          QR Code for {productName || "Product"}
        </DialogTitle>

        <div className="flex flex-col items-center gap-9.5 py-3">
          {/* Title */}
          <h3 className="text-xl font-medium text-[#0F2A3C] leading-7.5 text-center">
            Scan The QR Code
          </h3>

          {/* QR Code Placeholder */}
          <div className="w-89.5 aspect-square bg-white rounded-xl flex items-center justify-center">
            <div className="size-full flex items-center justify-center text-[#1E6FA8]">
              <QrCode className="size-64 stroke-[0.5]" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
