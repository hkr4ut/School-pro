import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import FormInput from '../../components/forms/FormInput';
import Button from '../../components/common/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Demo reset request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#F6F7F4] flex">

      {/* =====================================================
          LEFT PANEL
      ====================================================== */}

      <section className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-[#17213A] text-white">

        {/* Decorations */}
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

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 mb-7">

                <Sparkles className="h-3.5 w-3.5 text-[#E29B3E]" />

                Student AI account recovery

              </div>

              <h1 className="font-display text-5xl xl:text-6xl font-semibold leading-[1.05] tracking-tight">

                Get back to your
                <span className="block text-[#E29B3E]">
                  campus life.
                </span>

              </h1>

              <p className="mt-6 text-base xl:text-lg leading-7 text-white/60 max-w-lg">

                Forgot your password? We'll help you recover
                your account so you can get back to your classes,
                assignments and campus updates.

              </p>

              {/* Benefits */}
              <div className="mt-9 space-y-4">

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-[#55A88F]" />
                  <span>Quick account recovery</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-[#55A88F]" />
                  <span>Secure reset process</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-[#55A88F]" />
                  <span>Return to your dashboard</span>
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
          RIGHT PANEL
      ====================================================== */}

      <section className="w-full lg:w-[48%] flex items-center justify-center p-5 sm:p-8">

        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-10">

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

          {!submitted ? (

            <>
              {/* Heading */}
              <div className="mb-7">

                <p className="text-sm font-medium text-[#1F6F5C] mb-2">
                  Account recovery
                </p>

                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#17213A] tracking-tight">
                  Forgot your password?
                </h1>

                <p className="font-body text-sm text-[#6B7280] mt-3 leading-6">
                  Enter the email address connected to your
                  Student AI account and we'll send you a reset link.
                </p>

              </div>

              {/* Form card */}
              <div className="bg-white rounded-2xl border border-[#DCDFD8] p-6 sm:p-7 shadow-[0_20px_60px_-25px_rgba(23,33,58,0.25)]">

                {/* Icon */}
                <div className="h-12 w-12 rounded-xl bg-[#DCEFE9] flex items-center justify-center mb-6">
                  <Mail className="h-5 w-5 text-[#1F6F5C]" />
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

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  <FormInput
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />

                  <Button
                    type="submit"
                    variant="marigold"
                    className="w-full !h-12"
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending reset link…'
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send reset link
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>

                </form>

                {/* Security notice */}
                <div className="mt-6 flex gap-3 rounded-xl bg-[#EFF1EE] p-3">

                  <ShieldCheck className="h-5 w-5 text-[#1F6F5C] shrink-0 mt-0.5" />

                  <p className="text-xs leading-5 text-[#5B6472]">
                    For your security, we'll only send a reset
                    link to an email associated with an account.
                  </p>

                </div>

              </div>

              {/* Back to login */}
              <Link
                to="/login"
                className="mt-7 flex items-center justify-center gap-2 text-sm font-medium text-[#1F6F5C] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>

            </>

          ) : (

            /* =================================================
               SUCCESS STATE
            ================================================== */

            <div>

              <div className="bg-white rounded-2xl border border-[#DCDFD8] p-8 sm:p-10 shadow-[0_20px_60px_-25px_rgba(23,33,58,0.25)] text-center">

                {/* Success icon */}
                <div className="mx-auto h-16 w-16 rounded-full bg-[#DCEFE9] flex items-center justify-center mb-6">

                  <CheckCircle2 className="h-8 w-8 text-[#1F6F5C]" />

                </div>

                <p className="text-sm font-medium text-[#1F6F5C] mb-2">
                  Email sent
                </p>

                <h1 className="font-display text-3xl font-semibold text-[#17213A]">
                  Check your email
                </h1>

                <p className="font-body text-sm text-[#5B6472] mt-3 leading-6">

                  We've sent a password reset link to:

                </p>

                <p className="font-body text-sm font-semibold text-[#17213A] mt-2 break-all">
                  {email}
                </p>

                <p className="font-body text-xs text-[#8B93A0] mt-4 leading-5">
                  If you don't see the email, check your spam
                  or junk folder.
                </p>

                <Button
                  variant="marigold"
                  className="w-full !h-12 mt-7"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                >
                  Send again
                </Button>

                <Link
                  to="/login"
                  className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-[#1F6F5C] hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Link>

              </div>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}