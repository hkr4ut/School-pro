import { Link, Outlet } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="bg-white border-b border-[#DCDFD8] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <GraduationCap
                className="h-7 w-7 text-[#1F6F5C]"
              />

              <span className="font-display text-xl font-semibold text-[#17213A]">
                Student AI
              </span>
            </Link>


            {/* Navigation */}
            <nav className="flex items-center gap-6">

              {/* Features */}
              <a
                href="/#features"
                className="
                  hidden sm:block
                  text-sm font-medium
                  text-[#4B5566]
                  hover:text-[#1F6F5C]
                  transition-colors
                "
              >
                Features
              </a>


              {/* How it works */}
              <a
                href="/#how-it-works"
                className="
                  hidden sm:block
                  text-sm font-medium
                  text-[#4B5566]
                  hover:text-[#1F6F5C]
                  transition-colors
                "
              >
                How it works
              </a>


              {/* Login */}
              <Link
                to="/login"
                className="
                  text-sm font-medium
                  text-[#17213A]
                  hover:text-[#1F6F5C]
                  transition-colors
                "
              >
                Login
              </Link>


              {/* Register */}
              <Link
                to="/register"
                className="
                  px-5 py-2.5
                  bg-[#E29B3E]
                  text-[#17213A]
                  text-sm font-semibold
                  rounded-lg
                  hover:bg-[#C77F22]
                  hover:text-white
                  transition-colors
                "
              >
                Register
              </Link>

            </nav>
          </div>
        </div>
      </header>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="flex-1">
        <Outlet />
      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="bg-[#17213A] text-[#B8BFCA]">

        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">

          {/* Footer columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">


            {/* =================================================
                BRAND
            ================================================= */}
            <div className="lg:col-span-1">

              <Link
                to="/"
                className="flex items-center gap-2"
              >
                <GraduationCap
                  className="h-7 w-7 text-[#E29B3E]"
                />

                <span className="font-display text-xl font-semibold text-white">
                  Student AI
                </span>
              </Link>

              <p className="mt-4 text-sm leading-6 text-[#B8BFCA]">
                Bringing courses, assignments, exams, notices and
                study materials together in one simple platform.
              </p>

            </div>


            {/* =================================================
                PRODUCT
            ================================================= */}
            <div>

              <h4 className="text-white font-semibold mb-4">
                Product
              </h4>

              <ul className="space-y-3 text-sm">

                <li>
                  <a
                    href="/#features"
                    className="hover:text-[#E29B3E] transition-colors"
                  >
                    Courses
                  </a>
                </li>

                <li>
                  <a
                    href="/#features"
                    className="hover:text-[#E29B3E] transition-colors"
                  >
                    Assignments
                  </a>
                </li>

                <li>
                  <a
                    href="/#features"
                    className="hover:text-[#E29B3E] transition-colors"
                  >
                    Notices
                  </a>
                </li>

                <li>
                  <a
                    href="/#features"
                    className="hover:text-[#E29B3E] transition-colors"
                  >
                    Exam Schedule
                  </a>
                </li>

              </ul>

            </div>


            {/* =================================================
                STUDENTS
            ================================================= */}
            <div>

              <h4 className="text-white font-semibold mb-4">
                Students
              </h4>

              <ul className="space-y-3 text-sm">

                <li>
                  <Link
                    to="/login"
                    className="hover:text-[#E29B3E] transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <a
                    href="/#features"
                    className="hover:text-[#E29B3E] transition-colors"
                  >
                    Study Materials
                  </a>
                </li>

                <li>
                  <a
                    href="/#features"
                    className="hover:text-[#E29B3E] transition-colors"
                  >
                    Events
                  </a>
                </li>

                <li>
                  <a
                    href="/#features"
                    className="hover:text-[#E29B3E] transition-colors"
                  >
                    Nepali ↔ English
                  </a>
                </li>

              </ul>

            </div>


            {/* =================================================
                ACCOUNT
            ================================================= */}
            <div>

              <h4 className="text-white font-semibold mb-4">
                Account
              </h4>

              <ul className="space-y-3 text-sm">

                <li>
                  <Link
                    to="/login"
                    className="hover:text-[#E29B3E] transition-colors"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="hover:text-[#E29B3E] transition-colors"
                  >
                    Register
                  </Link>
                </li>

              </ul>

            </div>

          </div>


          {/* =================================================
              FOOTER BOTTOM
          ================================================= */}
          <div
            className="
              mt-12 pt-6
              border-t border-white/10
              flex flex-col sm:flex-row
              justify-between
              gap-3
              text-sm
            "
          >

            <p>
              © {new Date().getFullYear()} Student AI. All rights reserved.
            </p>

            <p>
              Built for students.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}