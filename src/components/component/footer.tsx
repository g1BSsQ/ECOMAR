import Link from 'next/link';
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';
export function Footer() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-4 ">
        <p className="text-sm text-lime-800	text-lg">© 2024 ECOMAR. All rights reserved.</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 ">
        <div className="flex flex-col"> {/* Thay đổi thành flex-col */ }
          <div className="flex items-center gap-4 mb-5">
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center gap-4 mb-5">
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-0">  
        <div className="flex items-center gap-2 mb-5">
          <PhoneIcon className="w-5 h-5" />
          <a href="#" className="hover:underline">
            +8491 267 5677
          </a>
        </div>
        <div className="flex items-center gap-2 mb-5">
        <MailIcon className="w-5 h-5" />
      <a href="#" className="hover:underline">
        hung231230806@lms.utc.edu.vn
      </a>
    </div>
    <div className="flex items-center gap-2 mb-5">
      <MapPinIcon className="w-5 h-5"/>
      <span>University of Transport and Communications - No.3 Cau Giay, Ha Noi, Vietnam</span>
    </div>
  </div>
  </>
)}