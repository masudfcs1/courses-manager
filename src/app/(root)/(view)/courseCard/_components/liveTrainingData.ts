const createSlug = (text: string) => text.toLowerCase().replace(/.\s+/g, '-');

export const liveTrainingData = [
  {
    id: 'course-1',
    title: 'Semiconductor Fundamentals & VLSI Design',
    slug: createSlug('Semiconductor Fundamentals & VLSI Design'),
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80',
    priceBD: 3500,
    description:
      'Learn the core principles of semiconductor technology and modern VLSI design with practical simulation tools and real-world projects.',
    relatedTopics: ['Semiconductor', 'VLSI', 'Chip Design', 'Verilog'],
    learningOutcome: [
      'Understand semiconductor physics and device operation',
      'Design and simulate digital circuits using Verilog',
      'Gain hands-on experience with EDA tools',
      'Build and optimize your own VLSI projects',
    ],
    requirement: [
      'Basic knowledge of digital electronics',
      'A computer with internet access',
      'Interest in chip design or hardware engineering',
    ],
    overview:
      'This course provides in-depth coverage of semiconductor concepts, fabrication processes, and advanced VLSI design techniques. It’s perfect for engineering students and professionals aiming to enter the semiconductor industry.',
    createdAt: '2025-10-01',
    updatedAt: '2025-10-04',
    instructors: [
      {
        id: 'inst-1',
        name: 'Dr. Anika Rahman',
        slug: createSlug('Dr. Anika Rahman'),
        title: 'Senior VLSI Engineer, Intel',
        profile: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        id: 'inst-2',
        name: 'Engr. Saiful Islam',
        slug: createSlug('Engr. Saiful Islam'),
        title: 'Semiconductor Researcher, BUET',
        profile: 'https://randomuser.me/api/portraits/men/47.jpg',
      },
    ],
  },
  {
    id: 'course-2',
    title: 'Full-Stack Web Development with React & Node.js',
    slug: createSlug('Full-Stack Web Development with React & Node.js'),
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    priceBD: 2800,
    description:
      'Master React, Node.js, and modern JavaScript to build dynamic, scalable, and interactive full-stack web applications.',
    relatedTopics: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
    learningOutcome: [
      'Build powerful front-end apps using React and Tailwind CSS',
      'Develop RESTful APIs using Node.js and Express',
      'Integrate MongoDB for database management',
      'Deploy your projects to cloud platforms',
    ],
    requirement: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'A computer with Node.js installed',
      'Eagerness to learn and build real-world apps',
    ],
    overview:
      'This full-stack development training is designed for beginners and professionals who want to learn how to create modern web applications using React, Node.js, and MongoDB in a project-based environment.',
    createdAt: '2025-09-25',
    updatedAt: '2025-10-03',
    instructors: [
      {
        id: 'inst-3',
        name: 'Masud Rana',
        slug: createSlug('Masud Rana'),
        title: 'Full-Stack Developer, E-Mith',
        profile: 'https://randomuser.me/api/portraits/men/29.jpg',
      },
      {
        id: 'inst-4',
        name: 'Poppy Akter',
        slug: createSlug('Poppy Akter'),
        title: 'Frontend Engineer, CodeLab',
        profile: 'https://randomuser.me/api/portraits/women/36.jpg',
      },
    ],
  },
  {
    id: 'course-3',
    title: 'Full-Stack Web Development with React & Node.js',
    slug: createSlug('Full-Stack Web Development with React & Node.js'),
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    priceBD: 2800,
    description:
      'Master React, Node.js, and modern JavaScript to build dynamic, scalable, and interactive full-stack web applications.',
    relatedTopics: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
    learningOutcome: [
      'Build powerful front-end apps using React and Tailwind CSS',
      'Develop RESTful APIs using Node.js and Express',
      'Integrate MongoDB for database management',
      'Deploy your projects to cloud platforms',
    ],
    requirement: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'A computer with Node.js installed',
      'Eagerness to learn and build real-world apps',
    ],
    overview:
      'This full-stack development training is designed for beginners and professionals who want to learn how to create modern web applications using React, Node.js, and MongoDB in a project-based environment.',
    createdAt: '2025-09-25',
    updatedAt: '2025-10-03',
    instructors: [
      {
        id: 'inst-3',
        name: 'Masud Rana',
        slug: createSlug('Masud Rana'),
        title: 'Full-Stack Developer, E-Mith',
        profile: 'https://randomuser.me/api/portraits/men/29.jpg',
      },
      {
        id: 'inst-4',
        name: 'Poppy Akter',
        slug: createSlug('Poppy Akter'),
        title: 'Frontend Engineer, CodeLab',
        profile: 'https://randomuser.me/api/portraits/women/36.jpg',
      },
    ],
  },
  {
    id: 'course-4',
    title: 'Full-Stack Web Development with React & Node.js',
    slug: createSlug('Full-Stack Web Development with React & Node.js'),
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    priceBD: 2800,
    description:
      'Master React, Node.js, and modern JavaScript to build dynamic, scalable, and interactive full-stack web applications.',
    relatedTopics: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
    learningOutcome: [
      'Build powerful front-end apps using React and Tailwind CSS',
      'Develop RESTful APIs using Node.js and Express',
      'Integrate MongoDB for database management',
      'Deploy your projects to cloud platforms',
    ],
    requirement: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'A computer with Node.js installed',
      'Eagerness to learn and build real-world apps',
    ],
    overview:
      'This full-stack development training is designed for beginners and professionals who want to learn how to create modern web applications using React, Node.js, and MongoDB in a project-based environment.',
    createdAt: '2025-09-25',
    updatedAt: '2025-10-03',
    instructors: [
      {
        id: 'inst-3',
        name: 'Masud Rana',
        slug: createSlug('Masud Rana'),
        title: 'Full-Stack Developer, E-Mith',
        profile: 'https://randomuser.me/api/portraits/men/29.jpg',
      },
      {
        id: 'inst-4',
        name: 'Poppy Akter',
        slug: createSlug('Poppy Akter'),
        title: 'Frontend Engineer, CodeLab',
        profile: 'https://randomuser.me/api/portraits/women/36.jpg',
      },
    ],
  },
  {
    id: 'course-5',
    title: 'Advanced FPGA & Embedded Systems Design',
    slug: createSlug('Advanced FPGA & Embedded Systems Design'),
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    priceBD: 4000,
    description:
      'Dive deep into FPGA architecture, embedded systems design, and real-time hardware programming with expert engineers.',
    relatedTopics: ['FPGA', 'Embedded Systems', 'Hardware Design', 'Microcontrollers'],
    learningOutcome: [
      'Understand FPGA architectures and programming models',
      'Develop embedded firmware using C/C++',
      'Integrate sensors and actuators with microcontrollers',
      'Implement real-time embedded applications',
    ],
    requirement: [
      'Basic knowledge of electronics and programming',
      'Familiarity with C language',
      'Passion for hardware and embedded development',
    ],
    overview:
      'This course is ideal for engineers and students looking to specialize in embedded systems and FPGA design, combining theory with practical hands-on projects.',
    createdAt: '2025-10-02',
    updatedAt: '2025-10-05',
    instructors: [
      {
        id: 'inst-5',
        name: 'Engr. Tanvir Hasan',
        slug: createSlug('Engr. Tanvir Hasan'),
        title: 'Embedded Systems Specialist, Samsung R&D',
        profile: 'https://randomuser.me/api/portraits/men/12.jpg',
      },
      {
        id: 'inst-6',
        name: 'Dr. Sara Ahmed',
        slug: createSlug('Dr. Sara Ahmed'),
        title: 'FPGA Research Lead, Texas Instruments',
        profile: 'https://randomuser.me/api/portraits/women/25.jpg',
      },
      {
        id: 'inst-5',
        name: 'Engr. Masud Hasan',
        slug: createSlug('Engr. Tanvir Hasan'),
        title: 'Embedded Systems Specialist, Samsung R&D',
        profile: 'https://randomuser.me/api/portraits/men/11.jpg',
      },
    ],
  },
];
