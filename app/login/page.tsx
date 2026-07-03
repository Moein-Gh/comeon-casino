import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16">
      <h1 className="text-2xl font-semibold">Log in to ComeOn</h1>
      <LoginForm />
    </div>
  );
}
