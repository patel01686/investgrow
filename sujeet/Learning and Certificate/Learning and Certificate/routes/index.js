const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Shared courses array for all routes

// Shared courses array for all routes
const courses = [
  {
    title: "JEE Mains & Advance",
    slug: "jee-mains-advance",
    category: "Entrance Exam",
    description: "Complete JEE Mains Advance coaching with expert faculty and comprehensive study material.",
    duration: "2 Year",
    level: "11th & 12th Standard",
    price: 120000,
    image: "/image/whatsapp-bg.jpg",
    details: {
      subjects: ["Physics", "Chemistry", "Mathematics"],
      mode: "Offline/Online",
      batchSize: "50 students",
      highlights: ["Doubt sessions", "Mock tests", "Expert faculty"],
      notes: "Comprehensive study notes and materials are provided for each subject, accessible online and offline."
    }
  },
  {
    title: "NEET",
    slug: "neet",
    category: "Entrance Exam",
    description: "Complete NEET coaching with in-depth coverage of Physics, Chemistry, and Biology.",
    duration: "2 Year",
    level: "11th & 12th Standard",
    price: 120000,
    badge: "",
    image: "/image/whatsapp-bg.jpg",
    details: {
      subjects: ["Physics", "Chemistry", "Biology"],
      mode: "Offline/Online",
      batchSize: "50 students",
      highlights: ["Mock tests", "Doubt clearing", "Expert faculty"],
      notes: "Comprehensive study notes and materials are provided for each subject, accessible online and offline."
    }
  },
  {
    title: "12th Standard",
    slug: "12th-standard",
    category: "Board Exam",
    description: "Subject-wise coaching for 12th standard (Science/Commerce/Arts).",
    duration: "1 Year",
    level: "12th Standard",
    price: 15000,
    image: "/image/whatsapp-bg.jpg",
    details: {
      subjects: ["Physics", "Chemistry", "Maths/Biology", "English", "Optional"],
      mode: "Offline/Online",
      highlights: ["Board-focused preparation", "Sample papers"],
      notes: "Comprehensive study notes and materials are provided for each subject, accessible online and offline."
    }
  },
  {
    title: "11th Standard",
    slug: "11th-standard",
    category: "Board Exam",
    description: "Subject-wise coaching for 11th standard (Science/Commerce/Arts).",
    duration: "1 Year",
    level: "11th Standard",
    price: 15000,
    image: "/image/whatsapp-bg.jpg",
    details: {
      subjects: ["Physics", "Chemistry", "Maths/Biology", "English", "Optional"],
      mode: "Offline/Online",
      highlights: ["Concept building", "Board-focused preparation", "Sample papers"],
      notes: "Comprehensive study notes and materials are provided for each subject, accessible online and offline."
    }
  },
  {
    title: "10th Standard",
    slug: "10th-standard",
    category: "Board Exam",
    description: "All subjects coaching for 10th standard students.",
    duration: "1 Year",
    level: "10th Standard",
    price: 15000,
    image: "/image/whatsapp-bg.jpg",
    details: {
      subjects: ["Maths", "Science", "English", "Social Science", "Hindi"],
      mode: "Offline/Online",
      highlights: ["Board exam tips", "Practice tests"],
      notes: "Comprehensive study notes and materials are provided for each subject, accessible online and offline."
    }
  },
  {
    title: "9th Standard",
    slug: "9th-standard",
    category: "Board Exam",
    description: "All subjects coaching for 9th standard students.",
    duration: "1 Year",
    level: "9th Standard",
    price: 15000,
    image: "/image/whatsapp-bg.jpg",
    details: {
      subjects: ["Maths", "Science", "English", "Social Science", "Hindi"],
      mode: "Offline/Online",
      highlights: ["Concept clarity", "Doubt sessions"],
      notes: "Comprehensive study notes and materials are provided for each subject, accessible online and offline."
    }
  },
  {
    title: "8th Standard",
    slug: "8th-standard",
    category: "Board Exam",
    description: "All subjects coaching for 8th standard students.",
    duration: "1 Year",
    level: "8th Standard",
    price: 12000,
    image: "/image/whatsapp-bg.jpg",
    details: {
      subjects: ["Maths", "Science", "English", "Social Science", "Hindi"],
      mode: "Offline/Online",
      highlights: ["Weekly tests", "Personal attention"],
      notes: "Comprehensive study notes and materials are provided for each subject, accessible online and offline."
    }
  },
  {
    title: "7th Standard",
    slug: "7th-standard",
    category: "Board Exam",
    description: "All subjects coaching for 7th standard students.",
    duration: "1 Year",
    level: "7th Standard",
    price: 12000,
    image: "/image/whatsapp-bg.jpg",
    details: {
      subjects: ["Maths", "Science", "English", "Social Science", "Hindi"],
      mode: "Offline/Online",
      highlights: ["Concept building", "Interactive classes"],
      notes: "Comprehensive study notes and materials are provided for each subject, accessible online and offline."
    }
  },
  {
    title: "6th Standard",
    slug: "6th-standard",
    category: "Board Exam",
    description: "All subjects coaching for 6th standard students.",
    duration: "1 Year",
    level: "6th Standard",
    price: 12000,
    image: "/image/whatsapp-bg.jpg",
    details: {
      subjects: ["Maths", "Science", "English", "Social Science", "Hindi"],
      mode: "Offline/Online",
      highlights: ["Foundation building", "Fun learning"],
      notes: "Comprehensive study notes and materials are provided for each subject, accessible online and offline."
    }
  },
  {
    title: "5th Standard",
    slug: "5th-standard",
    category: "Board Exam",
    description: "All subjects coaching for 5th standard students.",
    duration: "1 Year",
    level: "5th Standard",
    price: 10000,
    image: "/image/whatsapp-bg.jpg",
    details: {
      subjects: ["Maths", "Science", "English", "Social Science", "Hindi"],
      mode: "Offline/Online",
      highlights: ["Activity-based learning", "Small batches"],
      notes: "Comprehensive study notes and materials are provided for each subject, accessible online and offline."
    }
  },
  {
    title: "Online Course Demo",
    slug: "online-course-demo",
    category: "Online Only",
    description: "Experience our interactive online classroom with live sessions and digital resources.",
    duration: "Flexible",
    level: "All Standards",
    price: 0,
    image: "/image/whatsapp-bg.jpg",
    details: {
      subjects: ["All Subjects"],
      mode: "Online",
      highlights: ["Live classes", "Recorded lectures", "Digital notes", "Interactive chat"],
      notes: "Comprehensive study notes and materials are provided for each subject, accessible online and offline."
    }
  }
];

// About page
router.get("/about", (req, res) => {
  res.render("pages/about", {
    title: "About",
    currentPage: "about",
    user: req.session.user,
  });
});

// Contact page
router.get("/contact", (req, res) => {
  res.render("pages/contact", {
    title: "Contact",
    currentPage: "contact",
    user: req.session.user,
  });
});

// Instructors page
router.get("/instructors", (req, res) => {
  res.render("pages/instructors", {
    title: "Instructors",
    currentPage: "instructors",
    user: req.session.user,
  });
});

// Programs page
router.get("/programs", (req, res) => {
  res.render("pages/programs", {
    title: "Programs",
    currentPage: "programs",
    user: req.session.user,
  });
});

// Courses page
router.get("/courses", (req, res) => {
  res.render("pages/courses", {
    title: "Courses",
    currentPage: "courses",
    user: req.session.user,
    courses
  });
});

module.exports = router;
// ...existing code...
// Individual course detail page
router.get("/courses/:courseSlug", (req, res) => {
  const courseSlug = req.params.courseSlug;
  const course = courses.find((c) => c.slug === courseSlug);
  if (!course) {
    return res.status(404).render("pages/404", {
      title: "Course Not Found",
      user: req.session.user,
    });
  }
  res.render("pages/courses/course", {
    title: course.title,
    currentPage: "courses",
    user: req.session.user,
    course,
  });
});

// Home page
router.get("/", (req, res) => {
  // Use the same image URL as in the courses page for all courses
  const classroomImage = "/image/whatsapp-bg.jpg";
  res.render("pages/home", {
    title: "Home",
    currentPage: "home",
    user: req.session.user,
    stats: [
      { value: "5M+", label: "Learners" },
      { value: "1K+", label: "Courses" },
      { value: "100+", label: "Countries" },
    ],
    features: [
      {
        icon: "graduation-cap",
        title: "Expert Instructors",
        description: "Learn from industry leaders and top educators.",
      },
      {
        icon: "certificate",
        title: "Recognized Certificates",
        description: "Earn certificates to boost your career.",
      },
      {
        icon: "clock",
        title: "Flexible Learning",
        description: "Study at your own pace, anytime, anywhere.",
      },
    ],
    
    testimonials: [
      {
        content: "This platform changed my career!",
        initials: "AR",
        author: "Anjali Rao",
        position: "Software Engineer",
        rating: 5,
      },
      {
        content: "The courses are very practical and up-to-date.",
        initials: "VK",
        author: "Vikram Kumar",
        position: "Marketing Lead",
        rating: 4.5,
      },
      {
        content: "Highly recommend for anyone looking to upskill.",
        initials: "SP",
        author: "Sneha Patel",
        position: "Data Analyst",
        rating: 5,
      },
    ],
  });
});

// Dashboard route
router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  res.render("pages/courses", {
    title: "Courses",
    currentPage: "courses",
    user: req.session.user,
    courses
  });
});

module.exports = router;
