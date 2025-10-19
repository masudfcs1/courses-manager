import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Live Training Courses',
  description:
    'Live Training is an advanced online learning platform offering real-time sessions on Semiconductor Technology, VLSI Design, and related engineering courses to boost your technical expertise and career growth.',
  keywords: [
    'Live Training',
    'Online Learning',
    'Semiconductor Courses',
    'VLSI Design Training',
    'Chip Design',
    'ASIC Design',
    'FPGA Programming',
    'Digital Electronics',
    'Embedded Systems',
    'Hardware Design',
    'EDA Tools',
    'Circuit Simulation',
    'Semiconductor Fabrication',
    'Microelectronics',
    'Analog Design',
    'Mixed Signal Design',
    'RTL Design',
    'Verilog',
    'SystemVerilog',
    'VHDL',
    'Physical Design',
    'IC Design',
    'SoC Development',
    'Semiconductor Engineering',
    'Electronic Design Automation',
    'Online VLSI Course',
    'Live Semiconductor Training',
    'Hardware Verification',
    'Silicon Design',
    'Technology Learning',
    'Skill Development',
    'Engineering Courses',
  ],
};

export default function LiveTrainingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
   
      <main className="mx-auto">{children}</main>
   
    </>
  );
}
