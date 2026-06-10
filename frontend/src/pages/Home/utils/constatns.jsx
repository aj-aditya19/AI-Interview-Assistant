export const defaultSetup = {
  track: "internship",
  role: "",
  subjects: "",
  projects: "",
  techStack: [],
  experience: "",
  previousInternships: "",
  language: "",
  languageLevel: "",
  interviewLevel: "Beginner",
  durationMinutes: "3",
  notes: "",
};

export const defaultScores = {
  accuracy: 0,
  confidence: 0,
  vocabulary: 0,
  english: 0,
  overall: 0,
};

export const roleOptions = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Data Scientist",
  "Product Manager",
  "UI/UX Designer",
  "QA Engineer",
  "DevOps Engineer",
  "Mobile Developer",
];

export const skillOptions = [
  "OOPs",
  "System Design",
  "Computer Networking",
  "DBMS",
  "Python",
  "SQL",
  "Operating Systems",
];

export const techStackOptions = [
  "MERN",
  "MEAN",
  "React + Node.js",
  "Next.js",
  "Django",
  "Flask",
  "FastAPI",
  "Spring Boot",
  ".NET",
  "AWS",
  "Docker",
  "Kubernetes",
];

export const languageOptions = [
  "English",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Korean",
  "Hindi",
  "Arabic",
  "Mandarin",
  "Portuguese",
];

export const experienceOptions = [
  "No experience yet",
  "Internship experience",
  "Freelance experience",
  "1-2 years",
  "3-5 years",
  "5+ years",
];

export const previousInternshipOptions = [
  "None",
  "1 internship",
  "2 internships",
  "3+ internships",
];

export const interviewLevelOptions = ["Beginner", "Intermediate", "Advanced"];

export const durationOptions = ["3", "5"];

export const setupFields = [
  {
    name: "role",
    label: "Role",
    placeholder: "Describe the role you have held or are interested in",
    required: true,
    suggestions: roleOptions,
    tracks: ["internship", "job"],
  },
  {
    name: "subjects",
    label: "Topics/Subjects",
    placeholder:
      "Operating System, OOPs, DSA, Computer Networking, or any specific topics",
    required: true,
    suggestions: skillOptions,
    tracks: ["internship", "job"],
  },
  {
    name: "projects",
    label: "Projects",
    placeholder: "Describe projects or practical work you have done",
    required: true,
    tracks: ["internship", "job"],
  },
  {
    name: "techStack",
    label: "Tech Stack",
    placeholder: "Select technologies",
    required: true,
    type: "multiselect",
    suggestions: techStackOptions,
    tracks: ["internship", "job"],
  },
  {
    name: "experience",
    label: "Experience",
    placeholder: "Share job experience, freelance work, or say none",
    suggestions: experienceOptions,
    tracks: ["job"],
  },
  {
    name: "previousInternships",
    label: "Previous internships",
    placeholder: "Mention previous internships or say none",
    suggestions: previousInternshipOptions,
    tracks: ["job"],
  },
  {
    name: "language",
    label: "Language to learn",
    placeholder: "English, Spanish, German, French, or any language",
    required: true,
    suggestions: languageOptions,
    tracks: ["language"],
  },
  {
    name: "languageLevel",
    label: "Current level",
    placeholder: "Beginner, intermediate, or advanced",
    required: true,
    type: "select",
    options: ["Beginner", "Intermediate", "Advanced"],
    tracks: ["language"],
  },
  {
    name: "interviewLevel",
    label: "Interview level",
    placeholder: "Beginner, Intermediate, or Advanced",
    required: true,
    type: "select",
    options: interviewLevelOptions,
    tracks: ["internship", "job", "language"],
  },
  {
    name: "notes",
    label: "Anything else we should know?",
    placeholder: "Goals, interview focus, gaps, or special instructions",
    type: "textarea",
    tracks: ["internship", "job", "language"],
  },
];

export const trackOptions = [
  {
    value: "internship",
    label: "Ready for internship",
    description:
      "Focus on role fit, projects, skills, tech stack, and interview basics.",
  },
  {
    value: "job",
    label: "Ready for job",
    description:
      "Covers role fit plus experience, previous internships, and stronger depth.",
  },
  {
    value: "language",
    label: "Want to learn language",
    description:
      "Focuses on the language you want to learn and your current level.",
  },
];

export const getSetupFields = (track) =>
  setupFields.filter((field) => !field.tracks || field.tracks.includes(track));

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

export const isValidInterviewSetup = (setup) => {
  const track = normalize(setup?.track);
  const duration = String(setup?.durationMinutes || "").trim();

  if (!["internship", "job", "language"].includes(track)) {
    return false;
  }

  if (!durationOptions.includes(duration)) {
    return false;
  }

  if (track === "language") {
    if (!normalize(setup?.language) || !normalize(setup?.languageLevel)) {
      return false;
    }

    if (
      !["beginner", "intermediate", "advanced"].includes(
        normalize(setup?.languageLevel),
      )
    ) {
      return false;
    }
  } else {
    if (!normalize(setup?.role)) {
      return false;
    }
    if (!normalize(setup?.subjects)) {
      return false;
    }
  }

  if (!normalize(setup?.interviewLevel)) {
    return false;
  }

  return true;
};

export const getSetupValidationMessage = (setup) => {
  const track = normalize(setup?.track);

  if (!["internship", "job", "language"].includes(track)) {
    return "Please choose a valid interview track.";
  }

  if (!durationOptions.includes(String(setup?.durationMinutes || "").trim())) {
    return "Please choose a valid interview time.";
  }

  if (track === "language") {
    if (!normalize(setup?.language)) {
      return "Please choose the language you want to learn.";
    }

    if (!normalize(setup?.languageLevel)) {
      return "Please choose your current language level.";
    }
  } else {
    if (!normalize(setup?.role)) {
      return "Please choose a role first.";
    }

    if (!normalize(setup?.subjects)) {
      return "Please add your subjects first.";
    }

    if (!Array.isArray(setup?.techStack) || setup.techStack.length === 0) {
      return "Please add your tech stack first.";
    }
  }

  if (!normalize(setup?.interviewLevel)) {
    return "Please choose the interview level.";
  }

  return "";
};

export const getTrackLabel = (track) =>
  trackOptions.find((option) => option.value === track)?.label || "Interview";

export const getTrackSummary = (setup) => {
  if (setup.track === "language") {
    return [
      `Language: ${setup.language || "Not set"}`,
      `Level: ${setup.languageLevel || "Not set"}`,
    ];
  }

  return [
    `Role: ${setup.role || "Not set"}`,
    `Subjects: ${setup.subjects || "Not set"}`,
  ];
};

export const initialVoiceHint =
  "Speak your answer, then pause for 3-4 seconds to submit.";
