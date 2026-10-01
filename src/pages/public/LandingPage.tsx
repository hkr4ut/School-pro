import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Bell, CalendarDays, FolderOpen, Trophy, Languages, Calendar } from 'lucide-react';
import Button from '../../components/common/Button';

const weekBlocks: { label: string; items: { code: string; time: string; tone: string }[] }[] = [
  { label: 'Mon', items: [{ code: 'CS201', time: '9–10', tone: 'bg-[#EFF1EE] text-[#17213A]' }, { code: 'MATH110', time: '11–12', tone: 'bg-[#FCE9CE] text-[#8A5A17]' }] },
  { label: 'Tue', items: [{ code: 'ENG105', time: '10–11', tone: 'bg-[#DCEFE9] text-[#155445]' }] },
  { label: 'Wed', items: [{ code: 'CS201', time: '9–10', tone: 'bg-[#EFF1EE] text-[#17213A]' }, { code: 'PHY220', time: '1–2', tone: 'bg-[#DCEFE9] text-[#155445]' }] },
  { label: 'Thu', items: [{ code: 'MATH110', time: '11–12', tone: 'bg-[#FCE9CE] text-[#8A5A17]' }] },
  { label: 'Fri', items: [{ code: 'ENG105', time: '10–11', tone: 'bg-[#DCEFE9] text-[#155445]' }, { code: 'LAB301', time: '2–4', tone: 'bg-[#EFF1EE] text-[#17213A]' }] },
];

const features = [
  { icon: BookOpen, title: 'Courses', desc: 'Everything for each class, in one place.' },
  { icon: FileText, title: 'Assignments', desc: 'What is due, and when.' },
  { icon: Bell, title: 'Notices', desc: 'Department and college announcements.' },
  { icon: CalendarDays, title: 'Exam schedule', desc: 'Dates, rooms, and times.' },
  { icon: FolderOpen, title: 'Study materials', desc: 'Notes and slides your professors post.' },
  { icon: Trophy, title: 'Sports & events', desc: 'Campus activities worth showing up for.' },
  { icon: Languages, title: 'Nepali ↔ English', desc: 'A built-in translator for campus terms.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="px-6 lg:px-10 pt-16 pb-24 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] text-[#17213A] font-semibold mb-6">
              Every class, deadline, and notice — finally in one place.
            </h1>
            <p className="font-body text-lg text-[#4B5566] max-w-md mb-9">
              Student AI brings your courses, assignments, exam schedule, and notices into a single dashboard, in Nepali or English.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="marigold" size="lg" onClick={() => navigate('/login')}>Try the demo</Button>
              <a href="#features">
                <Button variant="inkGhost" size="lg">See what's inside</Button>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl border border-[#DCDFD8] shadow-[0_20px_60px_-25px_rgba(23,33,58,0.35)] p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="font-display text-lg text-[#17213A]">This week</span>
                <Calendar className="h-5 w-5 text-[#8B93A0]" />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {weekBlocks.map((day) => (
                  <div key={day.label} className="space-y-1.5">
                    <div className="text-center text-[10px] font-medium text-[#8B93A0] mb-1">{day.label}</div>
                    {day.items.map((b) => (
                      <div key={b.code} className={`rounded-md px-1.5 py-1.5 ${b.tone}`}>
                        <div className="text-[10px] font-semibold leading-tight">{b.code}</div>
                        <div className="text-[9px] opacity-80 leading-tight">{b.time}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-4 -right-3 rotate-6 bg-[#E29B3E] text-[#17213A] text-xs font-semibold px-3 py-2 rounded-lg shadow-md font-body">
              3 new notices
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 lg:px-10 py-20 bg-[#EFF1EE]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-[#17213A] mb-10">What's inside</h2>
          <div className="grid sm:grid-cols-2 border-t border-[#DCDFD8]">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 py-6 border-b border-[#DCDFD8] sm:odd:pr-8 sm:even:pl-8 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-[#DCDFD8]">
                <f.icon className="h-5 w-5 text-[#1F6F5C] mt-1 shrink-0" />
                <div>
                  <h3 className="font-body font-semibold text-[#17213A]">{f.title}</h3>
                  <p className="font-body text-sm text-[#5B6472]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-[#17213A] mb-12 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: '1', title: 'Log in', body: 'Sign in with your student, professor, or admin account.' },
              { n: '2', title: 'Open your dashboard', body: 'See today\u2019s classes, deadlines, and notices at a glance.' },
              { n: '3', title: 'Keep up, without digging', body: 'Everything updates in one place as the term moves.' },
            ].map((step) => (
              <div key={step.n}>
                <div className="font-display text-3xl text-[#E29B3E] mb-2">{step.n}</div>
                <h3 className="font-body font-semibold text-[#17213A] mb-1">{step.title}</h3>
                <p className="font-body text-sm text-[#5B6472]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}