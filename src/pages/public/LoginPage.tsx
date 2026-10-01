import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

import FormInput from '../../components/forms/FormInput';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import type { UserRole } from '../../types';

const demoRoles: { role: UserRole; label: string }[] = [
  {
    role: 'student',
    label: 'Student',
  },
  {
    role: 'professor',
    label: 'Professor',
  },
  {
    role: 'admin',
    label: 'Admin',
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoLoadingRole, setDemoLoadingRole] =
    useState<UserRole | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Enter your email and password to continue.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Demo authentication
    setTimeout(() => {
      login('student');
      navigate('/student/dashboard');
    }, 400);
  };

  const handleDemo = (role: UserRole) => {
    setDemoLoadingRole(role);

    setTimeout(() => {
      login(role);
      navigate(`/${role}/dashboard`);
    }, 300);
  };

  return (
    <main className="min-h-screen bg-[#F6F7F4] flex">

      {/* =====================================================
          DESKTOP LEFT PANEL
      ====================================================== */}
      <section className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-[#17213A] text-white">

        {/* Background decoration */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#1F6F5C]/30 blur-3xl" />

        <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-[#E29B3E]/20 blur-3xl" />

        <div className="relative z-10 w-full p-12 xl:p-16 flex flex-col">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 w-fit"
          >
            <div className="h-11 w-11 rounded-xl bg-[#E29B3E] flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-[#17213A]" />
            </div>

            <div>
              <div className="font-display text-xl font-semibold">
                Student AI
              </div>

              <div className="text-xs text-white/50">
                Your campus, simplified.
              </div>
            </div>
          </Link>

          {/* Main content */}
          <div className="flex-1 flex items-center">

            <div className="max-w-xl">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 mb-7">
                <Sparkles className="h-3.5 w-3.5 text-[#E29B3E]" />
                Smarter student life
              </div>

              {/* Heading */}
              <h1 className="font-display text-5xl xl:text-6xl font-semibold leading-[1.05] tracking-tight">
                Everything you need
                <span className="block text-[#E29B3E]">
                  for your campus life.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-base xl:text-lg leading-7 text-white/60 max-w-lg">
                Classes, assignments, exams, notices and study materials —
                organized in one simple dashboard.
              </p>

              {/* Benefits */}
              <div className="mt-9 space-y-4">

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-[#55A88F]" />
                  <span>Keep track of every deadline</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-[#55A88F]" />
                  <span>See your schedule at a glance</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-[#55A88F]" />
                  <span>Access everything in Nepali or English</span>
                </div>

              </div>

              {/* Dashboard preview */}
              <div className="mt-12 relative max-w-md">

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm p-5 shadow-2xl">

                  {/* Preview header */}
                  <div className="flex items-center justify-between mb-5">

                    <div>
                      <p className="text-xs text-white/40">
                        Good morning
                      </p>

                      <p className="text-sm font-medium mt-1">
                        Your day at a glance
                      </p>
                    </div>

                    <div className="h-8 w-8 rounded-lg bg-[#E29B3E]/15 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-[#E29B3E]" />
                    </div>

                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-3 gap-2">

                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="text-[10px] text-white/40">
                        Classes
                      </p>

                      <p className="text-lg font-semibold mt-1">
                        04
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="text-[10px] text-white/40">
                        Tasks
                      </p>

                      <p className="text-lg font-semibold mt-1">
                        03
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="text-[10px] text-white/40">
                        Notices
                      </p>

                      <p className="text-lg font-semibold mt-1">
                        02
                      </p>
                    </div>

                  </div>

                </div>

                {/* Floating notification */}
                <div className="absolute -right-8 -top-5 rounded-xl bg-white text-[#17213A] shadow-xl px-4 py-3 flex items-center gap-3">

                  <div className="h-8 w-8 rounded-lg bg-[#E29B3E]/15 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-[#E29B3E]" />
                  </div>

                  <div>
                    <p className="text-[10px] text-[#8B93A0]">
                      Student AI
                    </p>

                    <p className="text-xs font-semibold">
                      3 new updates
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Copyright */}
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Student AI
          </p>

        </div>
      </section>

      {/* =====================================================
          RIGHT LOGIN PANEL
      ====================================================== */}
      <section className="w-full lg:w-[48%] flex items-center justify-center p-5 sm:p-8">

        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">

            <Link
              to="/"
              className="flex items-center gap-3"
            >

              <div className="h-10 w-10 rounded-xl bg-[#E29B3E] flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-[#17213A]" />
              </div>

              <span className="font-display text-xl font-semibold text-[#17213A]">
                Student AI
              </span>

            </Link>

          </div>

          {/* Heading */}
          <div className="mb-8">

            <p className="text-sm font-medium text-[#1F6F5C] mb-2">
              Welcome back
            </p>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#17213A] tracking-tight">
              Sign in to your account
            </h1>

            <p className="font-body text-sm text-[#6B7280] mt-3">
              Continue to your personalized student dashboard.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Login form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <FormInput
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            {/* Password */}
            <div className="relative">

              <FormInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-[34px] p-1 text-[#8B93A0] transition-colors hover:text-[#17213A]"
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>

            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">

              <label
                htmlFor="remember-me"
                className="flex items-center gap-2 text-sm text-[#5B6472] cursor-pointer"
              >

                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#DCDFD8] accent-[#E29B3E]"
                />

                <span>
                  Remember me
                </span>

              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-[#1F6F5C] hover:underline"
              >
                Forgot password?
              </Link>

            </div>

            {/* Login button */}
            <Button
              type="submit"
              variant="marigold"
              className="w-full !h-12"
              isLoading={isSubmitting}
            >
              {isSubmitting ? (
                'Signing in…'
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>

          </form>

          {/* Demo accounts */}
          <div className="mt-8">

            <div className="flex items-center gap-3 mb-4">

              <div className="h-px flex-1 bg-[#DCDFD8]" />

              <span className="text-[11px] uppercase tracking-wider font-medium text-[#9CA3AF]">
                Explore demo
              </span>

              <div className="h-px flex-1 bg-[#DCDFD8]" />

            </div>

            <div className="grid grid-cols-3 gap-2">

              {demoRoles.map(({ role, label }) => (
                <Button
                  key={role}
                  type="button"
                  variant="inkGhost"
                  onClick={() => handleDemo(role)}
                  className="!h-11 border border-[#DCDFD8] text-xs hover:border-[#1F6F5C] hover:text-[#1F6F5C]"
                  isLoading={demoLoadingRole === role}
                >
                  {label}
                </Button>
              ))}

            </div>

          </div>

          {/* Register */}
          <p className="mt-8 text-center text-sm text-[#6B7280]">

            Don't have an account?{' '}

            <Link
              to="/register"
              className="font-semibold text-[#1F6F5C] hover:underline"
            >
              Create an account
            </Link>

          </p>

          {/* Terms */}
          <p className="mt-8 text-center text-[11px] text-[#9CA3AF]">
            By continuing, you agree to Student AI's terms and privacy policy.
          </p>

        </div>

      </section>

    </main>
  );
}