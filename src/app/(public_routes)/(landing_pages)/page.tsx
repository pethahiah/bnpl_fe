'use client'
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigate = useRouter();
  return (
    <div className="text-4xl font-extrabold w-full h-[100vh] flex flex-col justify-center items-center">
      <p>Welcome to BNPL</p>
      <div className="w-30 flex flex-row h-auto gap-2">
        <Button
          label="Register"
          type={"flat"}
          onClick={() =>  navigate.push('/signup')}
        />
        <Button
          label="Login"
          type={"flat"}
          onClick={() =>  navigate.push('/login')}
        />
      </div>
    </div>
  );
}
