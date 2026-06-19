import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// ============================================
// DATA
// ============================================
const subjectsData = [
  { 
    id: 1,
    name: "Mathematics", 
    icon: "📐",
    description: "Learn algebra, calculus, geometry & more!",
    topics: ["Algebra", "Calculus", "Geometry", "Trigonometry"],
    quiz: {
      questions: [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4", explanation: "2 + 2 = 4" },
        { question: "What is √16?", options: ["2", "4", "6", "8"], correct: "4", explanation: "√16 = 4" },
        { question: "What is 10 × 10?", options: ["50", "100", "200", "1000"], correct: "100", explanation: "10 × 10 = 100" }
      ]
    },
    flashcards: [
      { term: "Algebra", definition: "Branch of math dealing with symbols" },
      { term: "Calculus", definition: "Study of continuous change" },
      { term: "Geometry", definition: "Study of shapes and sizes" }
    ]
  },
  { 
    id: 2,
    name: "Computer Science", 
    icon: "💻",
    description: "Programming, algorithms, data structures & AI!",
    topics: ["Programming", "Algorithms", "Data Structures", "AI"],
    quiz: {
      questions: [
        { question: "Which language is used for web development?", options: ["Python", "Java", "JavaScript", "C++"], correct: "JavaScript", explanation: "JavaScript is used for web" },
        { question: "What does CPU stand for?", options: ["Central Process Unit", "Computer Personal Unit", "Central Processing Unit", "Core Process Unit"], correct: "Central Processing Unit", explanation: "CPU = Central Processing Unit" },
        { question: "What is an algorithm?", options: ["A type of computer", "A set of instructions", "A programming language", "A data type"], correct: "A set of instructions", explanation: "Algorithm = set of instructions" }
      ]
    },
    flashcards: [
      { term: "HTML", definition: "HyperText Markup Language" },
      { term: "CSS", definition: "Cascading Style Sheets" },
      { term: "JavaScript", definition: "Programming language for web" }
    ]
  },
  { 
    id: 3,
    name: "English", 
    icon: "📖",
    description: "Grammar, literature, writing skills & communication!",
    topics: ["Grammar", "Literature", "Writing", "Communication"],
    quiz: {
      questions: [
        { question: "What is the past tense of 'Go'?", options: ["Goed", "Went", "Gone", "Going"], correct: "Went", explanation: "Past of Go is Went" },
        { question: "What is a noun?", options: ["An action word", "A person, place, or thing", "A describing word", "A connecting word"], correct: "A person, place, or thing", explanation: "Noun = person, place, or thing" },
        { question: "What is the plural of 'Child'?", options: ["Childs", "Children", "Childes", "Childrens"], correct: "Children", explanation: "Plural of Child is Children" }
      ]
    },
    flashcards: [
      { term: "Noun", definition: "A person, place, or thing" },
      { term: "Verb", definition: "An action or state of being" },
      { term: "Adjective", definition: "A word describing a noun" }
    ]
  },
  { 
    id: 4,
    name: "General Knowledge", 
    icon: "🌍",
    description: "History, science, geography & current affairs!",
    topics: ["History", "Science", "Geography", "Current Affairs"],
    quiz: {
      questions: [
        { question: "What is the capital of Pakistan?", options: ["Karachi", "Lahore", "Islamabad", "Peshawar"], correct: "Islamabad", explanation: "Capital of Pakistan is Islamabad" },
        { question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: "7", explanation: "There are 7 continents" },
        { question: "Who is known as the father of computers?", options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"], correct: "Charles Babbage", explanation: "Charles Babbage = father of computers" }
      ]
    },
    flashcards: [
      { term: "Pakistan", definition: "Country in South Asia, capital Islamabad" },
      { term: "Solar System", definition: "Sun and all objects orbiting it" },
      { term: "DNA", definition: "Deoxyribonucleic Acid - genetic material" }
    ]
  }
];

// ✅ FIX: English teacher changed to Dr. Alisha Rasheed
const teachersData = [
  { id: 1, name: "Dr. Ahmad Khan", department: "Mathematics", email: "ahmad.khan@edunova.com", expertise: "Calculus & Algebra" },
  { id: 2, name: "Prof. Sara Ali", department: "Computer Science", email: "sara.ali@edunova.com", expertise: "AI & Programming" },
  { id: 3, name: "Dr. Alisha Rasheed", department: "English", email: "alisha.rasheed@edunova.com", expertise: "Literature & Grammar" },
  { id: 4, name: "Mr. Usman Raza", department: "General Knowledge", email: "usman.raza@edunova.com", expertise: "History & Geography" },
  { id: 5, name: "Dr. Zara Ahmed", department: "Chemistry", email: "zara.ahmed@edunova.com", expertise: "Organic Chemistry" },
  { id: 6, name: "Prof. Ali Hassan", department: "Physics", email: "ali.hassan@edunova.com", expertise: "Mechanics & Optics" },
  { id: 7, name: "Ms. Nida Khan", department: "Biology", email: "nida.khan@edunova.com", expertise: "Genetics & Botany" },
];

const studentReviews = [
  { id: 1, name: "Ali Ahmed", course: "Mathematics", review: "Excellent platform! The quizzes helped me understand complex concepts easily.", rating: 5, date: "2026-06-15" },
  { id: 2, name: "Sana Khan", course: "Computer Science", review: "The flashcards are amazing for quick revision. Highly recommended!", rating: 5, date: "2026-06-14" },
  { id: 3, name: "Usman Ali", course: "English", review: "Best interactive learning platform I've ever used.", rating: 4, date: "2026-06-13" },
  { id: 4, name: "Fatima Noor", course: "General Knowledge", review: "I love the quiz explanations. They tell you why the answer is correct.", rating: 5, date: "2026-06-12" },
];

const recordedLectures = [
  { id: 1, title: "Introduction to Algebra", subject: "Mathematics", duration: "45:30", views: 1250, date: "2026-06-10" },
  { id: 2, title: "HTML & CSS Basics", subject: "Computer Science", duration: "52:15", views: 980, date: "2026-06-09" },
  { id: 3, title: "English Grammar Essentials", subject: "English", duration: "38:45", views: 760, date: "2026-06-08" },
  { id: 4, title: "World History Overview", subject: "General Knowledge", duration: "55:20", views: 540, date: "2026-06-07" },
];

// ============================================
// MAIN APP
// ============================================
function App() {
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState("");
  
  const [generatedCode, setGeneratedCode] = useState("");
  const [pendingUsername, setPendingUsername] = useState("");
  const [pendingPassword, setPendingPassword] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetPendingEmail, setResetPendingEmail] = useState("");
  const [resetPendingUsername, setResetPendingUsername] = useState("");

  // App States
  const [activeTab, setActiveTab] = useState("home");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showSubjectDetail, setShowSubjectDetail] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [lastQuestion, setLastQuestion] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showTeacherAccess, setShowTeacherAccess] = useState(false);
  
  // ✅ FIX: Counters with real numbers (not 0+)
  const [counters] = useState({ schools: 50, users: 1000, students: 50000 });

  // Features
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateName, setCertificateName] = useState("");
  const [certificateCourse, setCertificateCourse] = useState("");
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [showCourseRegistration, setShowCourseRegistration] = useState(false);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regCourse, setRegCourse] = useState("");
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  // ✅ FIX: Refs for cursor stability
  const verificationInputRef = useRef(null);
  const resetPasswordRef = useRef(null);
  const resetConfirmRef = useRef(null);
  const certificateNameRef = useRef(null);
  const certificateCourseRef = useRef(null);
  const regNameRef = useRef(null);
  const regEmailRef = useRef(null);
  const regCourseRef = useRef(null);

  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const showNotif = (msg) => {
    setNotification(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // AUTH FUNCTIONS
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      setLoginError("❌ Please fill all fields!");
      return;
    }
    if (password.length < 6) {
      setLoginError("❌ Password must be at least 6 characters!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("edunova_users") || "[]");
    if (users.find(u => u.username === username)) {
      setLoginError("❌ Username already exists!");
      return;
    }
    if (users.find(u => u.email === email)) {
      setLoginError("❌ Email already registered!");
      return;
    }
    const code = generateCode();
    setGeneratedCode(code);
    setPendingUsername(username);
    setPendingPassword(password);
    setPendingEmail(email);
    setIsVerification(true);
    setLoginError("");
    setVerificationError("");
    setVerificationSuccess("");
    alert(`📧 Verification Code: ${code}`);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const enteredCode = verificationInputRef.current?.value || "";
    if (enteredCode === generatedCode) {
      const users = JSON.parse(localStorage.getItem("edunova_users") || "[]");
      users.push({ 
        username: pendingUsername, 
        password: pendingPassword, 
        email: pendingEmail,
        isVerified: true,
        signupDate: new Date().toISOString() 
      });
      localStorage.setItem("edunova_users", JSON.stringify(users));
      setVerificationSuccess("✅ Email verified successfully!");
      setTimeout(() => {
        setIsVerification(false);
        setIsSignUp(false);
        setSignUpSuccess("✅ Account created and verified! Please login.");
        setUsername("");
        setPassword("");
        setEmail("");
        if (verificationInputRef.current) verificationInputRef.current.value = "";
        setGeneratedCode("");
        setPendingUsername("");
        setPendingPassword("");
        setPendingEmail("");
      }, 1500);
    } else {
      setVerificationError("❌ Invalid verification code! Please try again.");
    }
  };

  const handleForgotPasswordRequest = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("edunova_users") || "[]");
    const user = users.find(u => u.email === resetEmail);
    if (!user) {
      setResetMessage("❌ Email not found!");
      return;
    }
    const code = generateCode();
    setGeneratedCode(code);
    setResetPendingEmail(resetEmail);
    setResetPendingUsername(user.username);
    setIsVerification(true);
    setVerificationError("");
    setVerificationSuccess("");
    setResetMessage("");
    alert(`📧 Password Reset Code: ${code}`);
  };

  const handleVerifyResetCode = (e) => {
    e.preventDefault();
    const enteredCode = verificationInputRef.current?.value || "";
    if (enteredCode === generatedCode) {
      setVerificationSuccess("✅ Code verified!");
      setTimeout(() => {
        setIsVerification(false);
        setIsResetPassword(true);
        if (verificationInputRef.current) verificationInputRef.current.value = "";
        setGeneratedCode("");
        setResetMessage("");
      }, 800);
    } else {
      setVerificationError("❌ Invalid verification code!");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const newPass = resetPasswordRef.current?.value || "";
    const confirmPass = resetConfirmRef.current?.value || "";
    if (newPass.length < 6) {
      setResetMessage("❌ Password must be at least 6 characters!");
      return;
    }
    if (newPass !== confirmPass) {
      setResetMessage("❌ Passwords do not match!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("edunova_users") || "[]");
    const userIndex = users.findIndex(u => u.email === resetPendingEmail);
    if (userIndex === -1) {
      setResetMessage("❌ User not found!");
      return;
    }
    users[userIndex].password = newPass;
    localStorage.setItem("edunova_users", JSON.stringify(users));
    setResetMessage("✅ Password reset successfully!");
    setTimeout(() => {
      setIsResetPassword(false);
      setIsForgotPassword(false);
      setResetMessage("");
      setResetEmail("");
      if (resetPasswordRef.current) resetPasswordRef.current.value = "";
      if (resetConfirmRef.current) resetConfirmRef.current.value = "";
      setResetPendingEmail("");
      setResetPendingUsername("");
    }, 2000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("edunova_users") || "[]");
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      if (!user.isVerified) {
        setLoginError("❌ Please verify your email first!");
        return;
      }
      setIsLoggedIn(true);
      setLoginError("");
      setUsername("");
      setPassword("");
    } else if (username === "student" && password === "password123") {
      setIsLoggedIn(true);
      setLoginError("");
      setUsername("");
      setPassword("");
    } else {
      setLoginError("❌ Invalid username or password!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("home");
    setUsername("");
    setPassword("");
  };

  const toggleAuth = () => {
    setIsSignUp(!isSignUp);
    setIsForgotPassword(false);
    setIsResetPassword(false);
    setLoginError("");
    setSignUpSuccess("");
    setResetMessage("");
    setUsername("");
    setPassword("");
    setEmail("");
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(true);
    setIsSignUp(false);
    setLoginError("");
    setResetMessage("");
    setResetEmail("");
  };

  // ✅ FIX: Certificate Handler with refs
  const handleGenerateCertificate = (e) => {
    e.preventDefault();
    const name = certificateNameRef.current?.value || "";
    const course = certificateCourseRef.current?.value || "";
    if (name && course) {
      setCertificateName(name);
      setCertificateCourse(course);
      setCertificateGenerated(true);
      showNotif(`🎓 Certificate generated for ${name}!`);
    }
  };

  // Contact Handler
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSubmitted(true);
      showNotif("📧 Message sent successfully!");
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      }, 3000);
    }
  };

  // ✅ FIX: Course Registration Handler with refs
  const handleCourseRegistration = (e) => {
    e.preventDefault();
    const name = regNameRef.current?.value || "";
    const email = regEmailRef.current?.value || "";
    const course = regCourseRef.current?.value || "";
    if (name && email && course) {
      setRegName(name);
      setRegEmail(email);
      setRegCourse(course);
      setRegSubmitted(true);
      showNotif(`✅ Registered for ${course}!`);
      setTimeout(() => {
        setRegSubmitted(false);
        setRegName("");
        setRegEmail("");
        setRegCourse("");
        setShowCourseRegistration(false);
        if (regNameRef.current) regNameRef.current.value = "";
        if (regEmailRef.current) regEmailRef.current.value = "";
        if (regCourseRef.current) regCourseRef.current.value = "";
      }, 3000);
    }
  };

  // QUIZ FUNCTIONS
  const startQuiz = (subject) => {
    setCurrentQuiz(subject.quiz.questions);
    setQuizIndex(0);
    setQuizScore(0);
    setShowQuiz(true);
    setShowSubjectDetail(false);
    setShowExplanation(false);
    setLastAnswer(null);
    setLastQuestion(null);
  };

  const handleQuizAnswer = (selectedAnswer) => {
    const currentQuestion = currentQuiz[quizIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;
    const newScore = isCorrect ? quizScore + 1 : quizScore;
    setQuizScore(newScore);
    setLastAnswer(selectedAnswer);
    setLastQuestion(currentQuestion);
    setShowExplanation(true);
    if (isCorrect) {
      setTimeout(() => {
        if (quizIndex < currentQuiz.length - 1) {
          setQuizIndex(quizIndex + 1);
          setShowExplanation(false);
          setLastAnswer(null);
          setLastQuestion(null);
        } else {
          alert(`🎉 Quiz Complete! Score: ${newScore}/${currentQuiz.length}`);
          setShowQuiz(false);
          setCurrentQuiz(null);
          setShowSubjectDetail(false);
          setShowExplanation(false);
        }
      }, 1500);
    }
  };

  const nextQuestion = () => {
    if (quizIndex < currentQuiz.length - 1) {
      setQuizIndex(quizIndex + 1);
      setShowExplanation(false);
      setLastAnswer(null);
      setLastQuestion(null);
    } else {
      alert(`🎉 Quiz Complete! Score: ${quizScore}/${currentQuiz.length}`);
      setShowQuiz(false);
      setCurrentQuiz(null);
      setShowSubjectDetail(false);
      setShowExplanation(false);
    }
  };

  const startFlashcards = (subject) => {
    setSelectedSubject(subject);
    setFlashcardIndex(0);
    setShowAnswer(false);
    setShowFlashcards(true);
    setShowSubjectDetail(false);
  };

  const nextFlashcard = () => {
    if (flashcardIndex < selectedSubject.flashcards.length - 1) {
      setFlashcardIndex(flashcardIndex + 1);
      setShowAnswer(false);
    } else {
      alert("🎉 You've completed all flashcards!");
      setShowFlashcards(false);
      setShowSubjectDetail(true);
    }
  };

  const filteredTeachers = teachersData.filter(t => 
    selectedDepartment ? t.department === selectedDepartment : true
  );

  const resendCode = () => {
    const newCode = generateCode();
    setGeneratedCode(newCode);
    alert(`📧 New verification code: ${newCode}`);
    setVerificationError("");
  };

  // ============================================
  // POPUPS
  // ============================================
  const VerificationPopup = () => (
    <div className="modal-overlay">
      <div className="modal-content verification-modal">
        <h2>📧 Email Verification</h2>
        <p style={{ color: '#4b5563' }}>Verification code sent to:</p>
        <p style={{ fontWeight: '600', color: '#2563eb', marginBottom: '20px' }}>
          {resetPendingEmail || pendingEmail}
        </p>
        {verificationError && <div className="auth-error">{verificationError}</div>}
        {verificationSuccess && <div className="auth-success">{verificationSuccess}</div>}
        <form onSubmit={resetPendingEmail ? handleVerifyResetCode : handleVerifyCode}>
          <input ref={verificationInputRef} type="text" placeholder="Enter 6-digit code" className="auth-input verification-input" maxLength="6" autoComplete="off" required />
          <button type="submit" className="auth-btn" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>✅ Verify</button>
        </form>
        <div style={{ marginTop: '15px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button onClick={resendCode} className="resend-btn">🔄 Resend</button>
          <button onClick={() => { setIsVerification(false); if (verificationInputRef.current) verificationInputRef.current.value = ""; setGeneratedCode(""); setPendingUsername(""); setPendingPassword(""); setPendingEmail(""); setResetPendingEmail(""); setResetPendingUsername(""); if (resetPendingEmail) setIsForgotPassword(true); }} className="cancel-btn">✕ Cancel</button>
        </div>
      </div>
    </div>
  );

  const ResetPasswordPopup = () => (
    <div className="modal-overlay">
      <div className="modal-content verification-modal">
        <h2>🔑 Reset Password</h2>
        <p style={{ fontWeight: '600', color: '#2563eb', marginBottom: '20px' }}>{resetPendingUsername}</p>
        {resetMessage && <div className={resetMessage.includes('✅') ? 'auth-success' : 'auth-error'}>{resetMessage}</div>}
        <form onSubmit={handleResetPassword}>
          <input ref={resetPasswordRef} type="password" placeholder="New Password (min 6 chars)" className="auth-input reset-password-input" autoComplete="new-password" required />
          <input ref={resetConfirmRef} type="password" placeholder="Confirm New Password" className="auth-input reset-password-input" autoComplete="new-password" required />
          <button type="submit" className="auth-btn" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>🔄 Reset</button>
        </form>
        <button onClick={() => { setIsResetPassword(false); setIsForgotPassword(true); setResetMessage(""); if (resetPasswordRef.current) resetPasswordRef.current.value = ""; if (resetConfirmRef.current) resetConfirmRef.current.value = ""; }} className="cancel-btn" style={{ marginTop: '15px' }}>← Back</button>
      </div>
    </div>
  );

  // ✅ FIX: Certificate Modal with refs for cursor stability
  const CertificateModal = () => (
    <div className="modal-overlay" onClick={() => { setShowCertificate(false); setCertificateGenerated(false); setCertificateName(""); setCertificateCourse(""); if (certificateNameRef.current) certificateNameRef.current.value = ""; if (certificateCourseRef.current) certificateCourseRef.current.value = ""; }}>
      <div className="modal-content certificate-modal" onClick={(e) => e.stopPropagation()}>
        <h2>🎓 Generate Certificate</h2>
        {!certificateGenerated ? (
          <form onSubmit={handleGenerateCertificate}>
            <input ref={certificateNameRef} type="text" placeholder="Your Full Name" className="auth-input" required />
            <input ref={certificateCourseRef} type="text" placeholder="Course Name" className="auth-input" required />
            <button type="submit" className="auth-btn" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>🎓 Generate</button>
          </form>
        ) : (
          <div className="certificate-preview">
            <div className="certificate-border">
              <h1>🎓 CERTIFICATE</h1>
              <p>This certifies that</p>
              <h2>{certificateName}</h2>
              <p>has successfully completed</p>
              <h3>{certificateCourse}</h3>
              <p>at EduNova Interactive Learning Platform</p>
              <p className="cert-date">Date: {new Date().toLocaleDateString()}</p>
            </div>
            <button className="close-btn" onClick={() => { setShowCertificate(false); setCertificateGenerated(false); setCertificateName(""); setCertificateCourse(""); if (certificateNameRef.current) certificateNameRef.current.value = ""; if (certificateCourseRef.current) certificateCourseRef.current.value = ""; }}>✕ Close</button>
          </div>
        )}
      </div>
    </div>
  );

  // ✅ FIX: Course Registration Modal with refs for cursor stability
  const CourseRegistrationModal = () => (
    <div className="modal-overlay" onClick={() => setShowCourseRegistration(false)}>
      <div className="modal-content registration-modal" onClick={(e) => e.stopPropagation()}>
        <h2>📚 Course Registration</h2>
        <p>Register for your desired course today!</p>
        {!regSubmitted ? (
          <form onSubmit={handleCourseRegistration}>
            <input ref={regNameRef} type="text" placeholder="Full Name" className="auth-input" required />
            <input ref={regEmailRef} type="email" placeholder="Email Address" className="auth-input" required />
            <select ref={regCourseRef} className="auth-input" style={{ appearance: 'auto' }} required>
              <option value="">Select Course</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Computer Science">Computer Science</option>
              <option value="English">English</option>
              <option value="General Knowledge">General Knowledge</option>
            </select>
            <button type="submit" className="auth-btn" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>📚 Register</button>
          </form>
        ) : (
          <div className="success-message">
            <h2>✅ Registration Successful!</h2>
            <p>You are registered for <strong>{regCourse}</strong>.</p>
            <button className="close-btn" onClick={() => { setShowCourseRegistration(false); setRegSubmitted(false); setRegName(""); setRegEmail(""); setRegCourse(""); if (regNameRef.current) regNameRef.current.value = ""; if (regEmailRef.current) regEmailRef.current.value = ""; if (regCourseRef.current) regCourseRef.current.value = ""; }}>✕ Close</button>
          </div>
        )}
      </div>
    </div>
  );

  // ============================================
  // LOGIN SCREEN
  // ============================================
  if (!isLoggedIn) {
    return (
      <div className="auth-page">
        <video className="auth-video-bg" autoPlay muted loop playsInline>
          <source src="https://res.cloudinary.com/dz3csdzyk/video/upload/v1781892079/Photorealistic_dark_professional_library_with_shelves_full_of_books_warm_yellow_ambient_lighting_in_background_student_s_hand_reaching_and_pulling_out_a_book_from_shelf_hand_opening_the_book_book_fills_entire_nue7di.mp4" type="video/mp4" />
        </video>
        <div className="auth-overlay"></div>
        {isVerification && <VerificationPopup />}
        {isResetPassword && <ResetPasswordPopup />}
        <div className="auth-content">
          <div className="auth-box">
            <h1>📚 EDUNOVA</h1>
            {!isForgotPassword ? (
              <>
                <h2>{isSignUp ? "Create Account" : "Welcome Back!"}</h2>
                {loginError && <div className="auth-error">{loginError}</div>}
                {signUpSuccess && <div className="auth-success">{signUpSuccess}</div>}
                <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                  {isSignUp && <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="auth-input" autoComplete="email" />}
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="auth-input" autoComplete="username" />
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="auth-input" autoComplete={isSignUp ? "new-password" : "current-password"} />
                  <button type="submit" className="auth-btn">{isSignUp ? "✨ Sign Up" : "🔐 Login"}</button>
                </form>
                <p className="auth-toggle">{isSignUp ? "Already have an account?" : "Don't have an account?"}<span onClick={toggleAuth}>{isSignUp ? " Login" : " Sign Up"}</span></p>
                {!isSignUp && <p className="forgot-password-link" onClick={toggleForgotPassword}>🔑 Forgot Password?</p>}
              </>
            ) : (
              <>
                <h2>🔑 Forgot Password</h2>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>Enter your registered email.</p>
                {resetMessage && <div className={resetMessage.includes('✅') ? 'auth-success' : 'auth-error'}>{resetMessage}</div>}
                <form onSubmit={handleForgotPasswordRequest}>
                  <input type="email" placeholder="Registered Email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required className="auth-input" autoComplete="email" />
                  <button type="submit" className="auth-btn">📧 Send Code</button>
                </form>
                <p className="auth-toggle" onClick={() => { setIsForgotPassword(false); setResetMessage(""); setResetEmail(""); }} style={{ cursor: 'pointer' }}>← Back to Login</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // MAIN APP
  // ============================================
  return (
    <div className="app-main">
      {showNotification && <div className="notification">{notification}</div>}
      {showCertificate && <CertificateModal />}
      {showCourseRegistration && <CourseRegistrationModal />}

      <nav className="navbar-main">
        <div className="nav-container">
          <div className="nav-logo">📚 EduNova</div>
          <div className="nav-links">
            <button className={activeTab === "home" ? "nav-active" : ""} onClick={() => setActiveTab("home")}>🏠 Home</button>
            <button className={activeTab === "subjects" ? "nav-active" : ""} onClick={() => setActiveTab("subjects")}>📚 Subjects</button>
            <button className={activeTab === "teachers" ? "nav-active" : ""} onClick={() => setActiveTab("teachers")}>👨‍🏫 Teachers</button>
            <button className={activeTab === "about" ? "nav-active" : ""} onClick={() => setActiveTab("about")}>ℹ️ About</button>
            <button className="nav-logout" onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>
      </nav>

      {activeTab === "home" && (
        <>
          <section className="hero-main">
            <div className="hero-content">
              <h1 className="animate-text">📚 EDUNOVA</h1>
              <h2 className="animate-text-delay">WELCOME BACK!</h2>
              <p className="animate-text-delay-2">Continue your learning journey with interactive quizzes, flashcards, and more.</p>
              <div className="made-by-badge animate-text-delay-3">
                <span>✨ Made by Aliha Zahra &amp; Ali Ahmad Asif</span>
                <span className="badge-sub">"Making learning easy, interactive, and accessible"</span>
              </div>
              <button className="hero-btn animate-text-delay-3" onClick={() => setActiveTab("subjects")}>🚀 Start Learning</button>
            </div>
          </section>

          <section className="counter-section">
            <h2>📊 Our Impact</h2>
            <div className="counter-grid">
              <div className="counter-box schools"><span className="counter-icon">🏫</span><h3 className="counter-number">50+</h3><p>Schools Connected</p></div>
              <div className="counter-box users"><span className="counter-icon">👥</span><h3 className="counter-number">1,000+</h3><p>Registered Users</p></div>
              <div className="counter-box students"><span className="counter-icon">🌍</span><h3 className="counter-number">50,000+</h3><p>International Students</p></div>
            </div>
          </section>

          <section className="free-education-section">
            <div className="free-education-content">
              <h2>🎓 Get Free Education</h2>
              <p>Access high-quality educational resources completely free.</p>
              <div className="free-features">
                <div className="free-feature"><span>📖</span><p>Free Study Material</p></div>
                <div className="free-feature"><span>🧠</span><p>Free Quizzes</p></div>
                <div className="free-feature"><span>👨‍🏫</span><p>Free Teacher Access</p></div>
                <div className="free-feature"><span>📊</span><p>Free Progress Tracking</p></div>
              </div>
              <button className="free-btn" onClick={() => setActiveTab("subjects")}>Start Learning 🚀</button>
            </div>
          </section>

          <section className="more-features-section">
            <h2>✨ More Features</h2>
            <div className="features-grid-main">
              <div className="feature-box"><span>📝</span><h3>Notes</h3><p>Detailed notes for every subject</p></div>
              <div className="feature-box"><span>📚</span><h3>Study Material</h3><p>Comprehensive resources</p></div>
              <div className="feature-box"><span>🎯</span><h3>Practice Tests</h3><p>Test your knowledge</p></div>
              <div className="feature-box"><span>🏆</span><h3>Certificates</h3><p>Earn certificates</p></div>
            </div>
          </section>

          <section className="edunova-details-section">
            <div className="edunova-details-content">
              <h2>🌟 About EduNova</h2>
              <p>Pakistan's first interactive learning platform designed to make education engaging, accessible, and effective.</p>
              <div className="details-grid">
                <div className="detail-item"><span>🎯</span><h3>Our Mission</h3><p>Quality education for every student</p></div>
                <div className="detail-item"><span>💡</span><h3>Our Vision</h3><p>Interactive learning for all</p></div>
                <div className="detail-item"><span>🌍</span><h3>Global Reach</h3><p>50+ countries using EduNova</p></div>
                <div className="detail-item"><span>📚</span><h3>Content Library</h3><p>1000+ resources available</p></div>
              </div>
            </div>
          </section>

          <section className="reviews-section">
            <h2>⭐ Student Reviews</h2>
            <div className="reviews-grid">
              {studentReviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header"><span className="review-icon">👤</span><div><h3>{review.name}</h3><p className="review-course">{review.course}</p></div></div>
                  <p className="review-text">"{review.review}"</p>
                  <div className="review-footer"><span className="review-stars">{"⭐".repeat(review.rating)}</span><span className="review-date">{review.date}</span></div>
                </div>
              ))}
            </div>
          </section>

          <section className="lectures-section">
            <h2>🎥 Recorded Lectures</h2>
            <div className="lectures-grid">
              {recordedLectures.map((lecture) => (
                <div key={lecture.id} className="lecture-card">
                  <div className="lecture-icon">🎬</div>
                  <h3>{lecture.title}</h3>
                  <p className="lecture-subject">📚 {lecture.subject}</p>
                  <div className="lecture-meta"><span>⏱️ {lecture.duration}</span><span>👁️ {lecture.views} views</span></div>
                  <p className="lecture-date">📅 {lecture.date}</p>
                  <button className="lecture-btn" onClick={() => showNotif(`▶️ Playing: ${lecture.title}`)}>▶️ Watch Now</button>
                </div>
              ))}
            </div>
          </section>

          <section className="cta-section">
            <div className="cta-grid">
              <div className="cta-card certificate-cta"><span>🎓</span><h3>Get Certificate</h3><p>Complete your course and earn a certificate</p><button className="cta-btn" onClick={() => setShowCertificate(true)}>Generate 🎓</button></div>
              <div className="cta-card registration-cta"><span>📚</span><h3>Course Registration</h3><p>Register for new courses</p><button className="cta-btn" onClick={() => setShowCourseRegistration(true)}>Register 📚</button></div>
            </div>
          </section>

          <section className="contact-section">
            <div className="contact-content">
              <h2>📧 Contact Us</h2>
              <p>We'll respond within 24 hours.</p>
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <input type="text" placeholder="Your Name" value={contactName} onChange={(e) => setContactName(e.target.value)} required className="auth-input" />
                  <input type="email" placeholder="Your Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required className="auth-input" />
                  <textarea placeholder="Your Message" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} required className="auth-input contact-textarea" rows="4"></textarea>
                  <button type="submit" className="auth-btn" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>📧 Send</button>
                </form>
              ) : (
                <div className="success-message"><h2>✅ Message Sent!</h2><p>We'll respond within 24 hours.</p></div>
              )}
            </div>
          </section>
        </>
      )}

      {activeTab === "subjects" && (
        <section className="subjects-main">
          <h2>📚 Subjects</h2>
          <div className="subject-grid">
            {subjectsData.map((subject) => (
              <div key={subject.id} className="subject-card" onClick={() => { setSelectedSubject(subject); setShowSubjectDetail(true); }}>
                <div className="subject-icon">{subject.icon}</div>
                <h3>{subject.name}</h3>
                <p>{subject.topics.slice(0, 3).join(", ")}...</p>
              </div>
            ))}
          </div>

          {showSubjectDetail && selectedSubject && (
            <div className="modal-overlay" onClick={() => setShowSubjectDetail(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{selectedSubject.icon} {selectedSubject.name}</h2>
                <p>{selectedSubject.description}</p>
                <div className="subject-actions">
                  <button className="action-btn quiz-btn" onClick={() => startQuiz(selectedSubject)}>🧠 Quiz</button>
                  <button className="action-btn flashcard-btn" onClick={() => startFlashcards(selectedSubject)}>🃏 Flashcards</button>
                </div>
                <button className="close-btn" onClick={() => setShowSubjectDetail(false)}>✕ Close</button>
              </div>
            </div>
          )}

          {showQuiz && currentQuiz && (
            <div className="modal-overlay">
              <div className="modal-content quiz-modal">
                <h2>🧠 Quiz: {selectedSubject.name}</h2>
                <div className="quiz-progress">Q {quizIndex + 1}/{currentQuiz.length}</div>
                <h3>{currentQuiz[quizIndex].question}</h3>
                <div className="quiz-options">
                  {currentQuiz[quizIndex].options.map((option, idx) => (
                    <button key={idx} className={`quiz-option ${showExplanation && option === currentQuiz[quizIndex].correct ? 'correct' : ''} ${showExplanation && option === lastAnswer && option !== currentQuiz[quizIndex].correct ? 'wrong' : ''}`} onClick={() => { if (!showExplanation) handleQuizAnswer(option); }} disabled={showExplanation}>
                      {option}{showExplanation && option === currentQuiz[quizIndex].correct && ' ✅'}{showExplanation && option === lastAnswer && option !== currentQuiz[quizIndex].correct && ' ❌'}
                    </button>
                  ))}
                </div>
                {showExplanation && (
                  <div className="explanation-box">
                    <p className="explanation-text">{lastAnswer === currentQuiz[quizIndex].correct ? '✅ Correct!' : '❌ Wrong!'}</p>
                    <p className="explanation-detail"><strong>Explanation:</strong> {currentQuiz[quizIndex].explanation}</p>
                    {lastAnswer !== currentQuiz[quizIndex].correct && <p className="explanation-correct"><strong>Correct Answer:</strong> {currentQuiz[quizIndex].correct}</p>}
                    <button className="next-btn" onClick={nextQuestion}>{quizIndex < currentQuiz.length - 1 ? 'Next ➜' : 'Results 🏆'}</button>
                  </div>
                )}
                <div className="quiz-score">Score: {quizScore}</div>
              </div>
            </div>
          )}

          {showFlashcards && selectedSubject && (
            <div className="modal-overlay">
              <div className="modal-content flashcard-modal">
                <h2>🃏 Flashcards: {selectedSubject.name}</h2>
                <div className="flashcard-progress">{flashcardIndex + 1}/{selectedSubject.flashcards.length}</div>
                <div className="flashcard" onClick={() => setShowAnswer(!showAnswer)}>
                  <div className="flashcard-content">{!showAnswer ? <h3>{selectedSubject.flashcards[flashcardIndex].term}</h3> : <p>{selectedSubject.flashcards[flashcardIndex].definition}</p>}</div>
                  <div className="flashcard-hint">{!showAnswer ? "👆 Click to reveal" : "👆 Click to see term"}</div>
                </div>
                <div className="flashcard-actions">
                  <button className="action-btn" onClick={nextFlashcard}>Next ➜</button>
                  <button className="close-btn" onClick={() => { setShowFlashcards(false); setShowSubjectDetail(true); }}>✕ Close</button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {activeTab === "teachers" && (
        <section className="teachers-main">
          <h2>👨‍🏫 Our Teachers</h2>
          <p className="teachers-subtitle">Select your department.</p>
          <div className="department-filter">
            <button className={`dept-btn ${!selectedDepartment ? 'active' : ''}`} onClick={() => setSelectedDepartment("")}>All</button>
            {[...new Set(teachersData.map(t => t.department))].map(dept => (
              <button key={dept} className={`dept-btn ${selectedDepartment === dept ? 'active' : ''}`} onClick={() => setSelectedDepartment(dept)}>{dept}</button>
            ))}
          </div>
          <div className="teachers-grid">
            {filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="teacher-card">
                <div className="teacher-avatar">👨‍🏫</div>
                <h3>{teacher.name}</h3>
                <p className="teacher-dept">{teacher.department}</p>
                <p className="teacher-expertise">Expertise: {teacher.expertise}</p>
                <a href={`mailto:${teacher.email}`} className="teacher-email">📧 {teacher.email}</a>
                <div className="teacher-promise"><span className="promise-icon">🤝</span><p>Response within 24 hours</p></div>
              </div>
            ))}
          </div>
          <div className="teacher-access-section-bottom">
            <button className="teacher-access-btn" onClick={() => setShowTeacherAccess(true)}>Need a Teacher? 🎓</button>
          </div>
        </section>
      )}

      {activeTab === "about" && (
        <section className="about-main">
          <h2>ℹ️ About EduNova</h2>
          <div className="about-content">
            <div className="about-hero"><h1>📚 EduNova</h1><p>Pakistan's First Interactive Learning Platform</p></div>
            <div className="about-grid">
              <div className="about-card"><span>🎯</span><h3>Our Mission</h3><p>Quality education accessible to all</p></div>
              <div className="about-card"><span>💡</span><h3>Our Vision</h3><p>Interactive learning for everyone</p></div>
              <div className="about-card"><span>🌍</span><h3>Global Impact</h3><p>50+ countries</p></div>
              <div className="about-card"><span>📚</span><h3>Content Library</h3><p>1000+ resources</p></div>
            </div>

            {/* ✅ Team Section with Profile View */}
            <div className="about-team">
              <h2>👨‍💻 Meet the Team</h2>
              <div className="team-grid">
                <div className="team-member">
                  <div className="team-avatar">👩‍🎓</div>
                  <h3>Aliha Zahra</h3>
                  <p>Project Lead & Developer</p>
                  <div className="team-bio">
                    <p>Full-stack developer with passion for educational technology.</p>
                  </div>
                </div>
                <div className="team-member">
                  <div className="team-avatar">👨‍🎓</div>
                  <h3>Ali Ahmad Asif</h3>
                  <p>Developer & Designer</p>
                  <div className="team-bio">
                    <p>UI/UX designer and frontend developer creating interactive experiences.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-item"><h3>50+</h3><p>Schools Connected</p></div>
              <div className="stat-item"><h3>1,000+</h3><p>Registered Users</p></div>
              <div className="stat-item"><h3>50,000+</h3><p>International Students</p></div>
              <div className="stat-item"><h3>1,000+</h3><p>Study Resources</p></div>
            </div>
          </div>
        </section>
      )}

      {showTeacherAccess && (
        <div className="modal-overlay" onClick={() => setShowTeacherAccess(false)}>
          <div className="modal-content teacher-access-modal" onClick={(e) => e.stopPropagation()}>
            <h2>👨‍🏫 Access a Teacher</h2>
            <p>Select your department.</p>
            <div className="department-grid">
              {[...new Set(teachersData.map(t => t.department))].map(dept => (
                <button key={dept} className="dept-access-btn" onClick={() => { setSelectedDepartment(dept); setActiveTab("teachers"); setShowTeacherAccess(false); }}>{dept}</button>
              ))}
            </div>
            <div className="promise-badge"><span>🤝</span><p>Response within 24 hours</p></div>
            <button className="close-btn" onClick={() => setShowTeacherAccess(false)}>✕ Close</button>
          </div>
        </div>
      )}

      <footer className="footer-main">
        <p>© 2026 EduNova - Interactive Learning Platform</p>
        <p>Made with ❤️ by <strong>Aliha Zahra &amp; Ali Ahmad Asif</strong></p>
        <p className="footer-mission">"Making learning easy, interactive, and accessible for everyone"</p>
      </footer>
    </div>
  );
}

export default App;