import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import Button from '../../components/common/Button';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password =
        'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        'Please confirm your password';
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Demo registration
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  /* ==========================================================
     SUCCESS SCREEN
  ========================================================== */

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F6F7F4] flex">

        {/* Left desktop panel */}
        <section className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-[#17213A] text-white">

          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#1F6F5C]/30 blur-3xl" />

          <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-[#E29B3E]/20 blur-3xl" />

          <div className="relative z-10 w-full p-12 xl:p-16 flex flex-col">

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

            <div className="flex-1 flex items-center">

              <div className="max-w-xl">

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 mb-7">
                  <Sparkles className="h-3.5 w-3.5 text-[#E29B3E]" />
                  Welcome to Student AI
                </div>

                <h1 className="font-display text-5xl xl:text-6xl font-semibold leading-[1.05]">
                  Your campus life,
                  <span className="block text-[#E29B3E]">
                    all in one place.
                  </span>
                </h1>

                <p className="mt-6 text-base xl:text-lg leading-7 text-white/60 max-w-lg">
                  Manage your classes, assignments, notices,
                  exams and study materials from one simple platform.
                </p>

              </div>

            </div>

            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Student AI
            </p>

          </div>

        </section>

        {/* Success panel */}
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

            <div className="bg-white rounded-2xl border border-[#DCDFD8] p-8 sm:p-10 shadow-[0_20px_60px_-25px_rgba(23,33,58,0.35)] text-center">

              <div className="mx-auto h-16 w-16 rounded-full bg-[#DCEFE9] flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-[#1F6F5C]" />
              </div>

              <p className="text-sm font-medium text-[#1F6F5C] mb-2">
                Account created
              </p>

              <h1 className="font-display text-3xl font-semibold text-[#17213A]">
                You're registered!
              </h1>

              <p className="font-body text-sm text-[#5B6472] mt-3 leading-6">
                Your Student AI account has been created successfully.
                Log in to access your personalized dashboard.
              </p>

              <Button
                variant="marigold"
                className="w-full !h-12 mt-7"
                onClick={() => navigate('/login')}
              >
                <span className="flex items-center justify-center gap-2">
                  Go to login
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>

              <Link
                to="/"
                className="block mt-5 text-sm text-[#1F6F5C] hover:underline"
              >
                Back to Student AI
              </Link>

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* ==========================================================
     REGISTER FORM
  ========================================================== */

  return (
    <main className="min-h-screen bg-[#F6F7F4] flex">

      {/* =====================================================
          LEFT PANEL
      ====================================================== */}

      <section className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-[#17213A] text-white">

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

          {/* Content */}
          <div className="flex-1 flex items-center">

            <div className="max-w-xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 mb-7">
                <Sparkles className="h-3.5 w-3.5 text-[#E29B3E]" />
                Join Student AI
              </div>

              <h1 className="font-display text-5xl xl:text-6xl font-semibold leading-[1.05] tracking-tight">
                Make student life
                <span className="block text-[#E29B3E]">
                  easier every day.
                </span>
              </h1>

              <p className="mt-6 text-base xl:text-lg leading-7 text-white/60 max-w-lg">
                Create your account and bring your classes,
                assignments, exams and campus notices together.
              </p>

              {/* Benefits */}
              <div className="mt-9 space-y-4">

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-[#55A88F]" />
                  <span>Organize all your courses</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-[#55A88F]" />
                  <span>Track assignments and deadlines</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-[#55A88F]" />
                  <span>Stay updated with campus notices</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-[#55A88F]" />
                  <span>Use Student AI in Nepali or English</span>
                </div>

              </div>

              {/* Small preview */}
              <div className="mt-12 max-w-md">

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="h-9 w-9 rounded-lg bg-[#E29B3E]/15 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-[#E29B3E]" />
                    </div>

                    <div>
                      <p className="text-xs text-white/40">
                        Student AI
                      </p>

                      <p className="text-sm font-medium">
                        Your academic companion
                      </p>
                    </div>

                  </div>

                  <div className="grid grid-cols-3 gap-2">

                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="text-[10px] text-white/40">
                        Courses
                      </p>
                      <p className="text-lg font-semibold mt-1">
                        06
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="text-[10px] text-white/40">
                        Tasks
                      </p>
                      <p className="text-lg font-semibold mt-1">
                        08
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="text-[10px] text-white/40">
                        Events
                      </p>
                      <p className="text-lg font-semibold mt-1">
                        04
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Student AI
          </p>

        </div>

      </section>

      {/* =====================================================
          RIGHT REGISTER PANEL
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
          <div className="mb-7">

            <p className="text-sm font-medium text-[#1F6F5C] mb-2">
              Get started
            </p>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#17213A] tracking-tight">
              Create your account
            </h1>

            <p className="font-body text-sm text-[#6B7280] mt-3">
              Join Student AI and keep your campus life organized.
            </p>

          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-[#DCDFD8] p-6 sm:p-7 shadow-[0_20px_60px_-25px_rgba(23,33,58,0.25)]">

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              noValidate
            >

              {/* Name */}
              <FormInput
                label="Full name"
                value={formData.name}
                onChange={(e) =>
                  handleChange('name', e.target.value)
                }
                error={errors.name}
                autoComplete="name"
                placeholder="Enter your full name"
                required
              />

              {/* Email */}
              <FormInput
                label="Email address"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  handleChange('email', e.target.value)
                }
                error={errors.email}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />

              {/* Role */}
              <FormSelect
                label="Account type"
                options={[
                  {
                    value: 'student',
                    label: 'Student',
                  },
                  {
                    value: 'professor',
                    label: 'Professor',
                  },
                ]}
                value={formData.role}
                onChange={(e) =>
                  handleChange('role', e.target.value)
                }
              />

              {/* Password */}
              <div className="relative">

                <FormInput
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    handleChange('password', e.target.value)
                  }
                  error={errors.password}
                  helperText={
                    !errors.password
                      ? 'At least 6 characters'
                      : undefined
                  }
                  autoComplete="new-password"
                  placeholder="Create a password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  className="absolute right-3 top-[34px] p-1 text-[#8B93A0] hover:text-[#17213A]"
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

              {/* Confirm password */}
              <div className="relative">

                <FormInput
                  label="Confirm password"
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange(
                      'confirmPassword',
                      e.target.value
                    )
                  }
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (value) => !value
                    )
                  }
                  className="absolute right-3 top-[34px] p-1 text-[#8B93A0] hover:text-[#17213A]"
                  aria-label={
                    showConfirmPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>

              </div>

              {/* Privacy notice */}
              <div className="flex gap-3 rounded-xl bg-[#EFF1EE] p-3">

                <ShieldCheck className="h-5 w-5 text-[#1F6F5C] shrink-0 mt-0.5" />

                <p className="text-xs leading-5 text-[#5B6472]">
                  Your account information is used to provide
                  your personalized Student AI experience.
                </p>

              </div>

              {/* Register button */}
              <Button
                type="submit"
                variant="marigold"
                className="w-full !h-12 mt-2"
                isLoading={isSubmitting}
              >
                {isSubmitting ? (
                  'Creating account…'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

            </form>

          </div>

          {/* Login */}
          <p className="mt-7 text-center text-sm text-[#6B7280]">

            Already have an account?{' '}

            <Link
              to="/login"
              className="font-semibold text-[#1F6F5C] hover:underline"
            >
              Log in
            </Link>

          </p>

          <p className="mt-6 text-center text-[11px] text-[#9CA3AF]">
            By creating an account, you agree to Student AI's
            terms and privacy policy.
          </p>

        </div>

      </section>

    </main>
  );
}