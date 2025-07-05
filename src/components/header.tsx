import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.svg?react";

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center py-4 px-8 border-b border-gray-200">
        <div className="flex items-center gap-2">
            <Logo />
        <span className="text-2xl font-bold">Deal4U</span>
        <span className="text-md text-gray-500">당신을 위한 거래</span>
        </div>
        <div>
            <Button variant="outline">
                <span>로그인</span>
            </Button>
        </div>
    </div>
  )
}
