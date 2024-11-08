/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // กำหนดให้ Tailwind CSS ตรวจสอบไฟล์ใน src folder ของคุณทั้งหมด
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),  // เพิ่ม DaisyUI เป็นปลั๊กอิน
  ],
}
