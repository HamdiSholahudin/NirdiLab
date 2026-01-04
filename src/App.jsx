/** @format */

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Music,
  X,
  BookOpen,
  Code2,
  Dumbbell,
  SlidersHorizontal,
  Sparkles,
  Target,
  Bell,
  BellOff,
  Headphones,
  Volume2,
  VolumeX,
  ListTodo,
  Plus,
  Trash2,
  Check,
  Edit2,
  Save,
  Flame,
  Coffee,
  History,
  Pencil,
  Globe,
  Image as ImageIcon,
  Upload,
  Cpu,
  CircuitBoard,
  TrendingUp,
  Laptop,
  Wifi,
  Heart,
} from "lucide-react";

// --- GLOBAL STYLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap');
    
    body { font-family: 'Plus Jakarta Sans', sans-serif; transition: background-color 1s ease; }
    
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
    @keyframes float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
    
    .glass-panel {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    }
    .glass-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .glass-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
    .custom-scroll::-webkit-scrollbar { width: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
    
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  `}</style>
);

// --- TRANSLATIONS ---
const translations = {
  id: {
    greeting: "Hai",
    focusPlaceholder: "Apa target fokus hari ini?",
    focusMode: "WAKTU FOKUS",
    breakMode: "WAKTU ISTIRAHAT",
    study: "Belajar",
    work: "Kerja",
    health: "Sehat",
    edit: "Ubah",
    set: "Atur",
    taskList: "Daftar Tugas",
    addTask: "Tambah tugas baru...",
    noTask: "Belum ada tugas. Yuk produktif!",
    settings: "Pengaturan",
    focusTheme: "Tema Fokus",
    breakTheme: "Tema Istirahat",
    bgImage: "Gambar Background",
    uploadBtn: "Upload Gambar",
    save: "Simpan",
    resetStats: "Statistik direset",
    startMsg: "Bismillah, Semangat! 🤲",
    pauseMsg: "Timer Dipause ⏸️",
    resetMsg: "Timer Direset 🔄",
    focusDone: "Fokus Selesai! Istirahat yuk ☕",
    breakDone: "Istirahat Selesai! Kembali kerja 🚀",
    pauseAlert: "Pause dulu sebelum ganti mode!",
    soundscape: "Suara Latar",
    spotifyConn: "Spotify Terhubung",
  },
  en: {
    greeting: "Hi",
    focusPlaceholder: "What is our main focus?",
    focusMode: "FOCUS TIME",
    breakMode: "BREAK TIME",
    study: "Study",
    work: "Work",
    health: "Health",
    edit: "Edit",
    set: "Set",
    taskList: "Task List",
    addTask: "Add a new task...",
    noTask: "No tasks yet. Let's be productive!",
    settings: "Settings",
    focusTheme: "Focus Theme",
    breakTheme: "Break Theme",
    bgImage: "Background Image",
    uploadBtn: "Upload Image",
    save: "Save",
    resetStats: "Stats reset",
    startMsg: "Let's Start! You got this 🚀",
    pauseMsg: "Timer Paused ⏸️",
    resetMsg: "Timer Reset 🔄",
    focusDone: "Focus Finished! Take a break ☕",
    breakDone: "Break Over! Back to work 🚀",
    pauseAlert: "Pause first before changing mode!",
    soundscape: "Soundscape",
    spotifyConn: "Spotify Connected",
  },
};

// --- THEMES ---
const themes = {
  purple: {
    name: "Nebula",
    bg: "bg-[#0f172a]",
    blob1: "bg-purple-900/30",
    blob2: "bg-blue-900/20",
  },
  green: {
    name: "Nature",
    bg: "bg-[#064e3b]",
    blob1: "bg-green-900/30",
    blob2: "bg-emerald-900/20",
  },
  blue: {
    name: "Ocean",
    bg: "bg-[#1e3a8a]",
    blob1: "bg-blue-900/30",
    blob2: "bg-cyan-900/20",
  },
  orange: {
    name: "Sunset",
    bg: "bg-[#7c2d12]",
    blob1: "bg-orange-900/30",
    blob2: "bg-red-900/20",
  },
  dark: {
    name: "Midnight",
    bg: "bg-[#000000]",
    blob1: "bg-gray-800/30",
    blob2: "bg-slate-900/20",
  },
};

const App = () => {
  // --- ASSETS ---
  const customLogoUrl = "/images/nirdi.png"; // Simpan logo Anda disini

  // const imgLeftFocus =
  //   "https://api.dicebear.com/9.x/avataaars/svg?seed=NirdilaFinance&clothing=hijab&eyes=happy&mouth=smile&skinColor=f8d25c&accessories=roundGlasses";
  // const imgRightFocus =
  //   "https://api.dicebear.com/9.x/avataaars/svg?seed=HamdiEngineer&facialHair=beardLight&clothing=blazerAndShirt&eyes=happy&skinColor=f8d25c";
  // const imgLeftBreak =
  //   "https://api.dicebear.com/9.x/avataaars/svg?seed=NirdilaFinance&clothing=hijab&eyes=closed&mouth=smile&skinColor=f8d25c";
  // const imgRightBreak =
  //   "https://api.dicebear.com/9.x/avataaars/svg?seed=HamdiEngineer&facialHair=beardLight&clothing=blazerAndShirt&eyes=closed&skinColor=f8d25c&accessories=sunglasses";

  const localLeftFocus = "/images/muslimah-focus.png";
  const localRightFocus = "/images/engineer-focus.png";
  const localLeftBreak = "/images/muslimah-break.png";
  const localRightBreak = "/images/engineer-break.png";
  const imgLeftFocus = localLeftFocus;
  const imgRightFocus = localRightFocus;
  const imgLeftBreak = localLeftBreak;
  const imgRightBreak = localRightBreak;

  const currentImgLeft = (phase) =>
    phase === "focus" ? imgLeftFocus : imgLeftBreak;
  const currentImgRight = (phase) =>
    phase === "focus" ? imgRightFocus : imgRightBreak;

  const spotifyYoga =
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX9uKNf5jGX6m?utm_source=generator";
  const spotifyLofi =
    "https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator";
  const soundStart =
    "https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3";
  const soundFinish =
    "https://assets.mixkit.co/active_storage/sfx/989/989-preview.mp3";

  // --- STATE ---
  const [lang, setLang] = useState("id");
  const t = translations[lang];

  const [userName, setUserName] = useState("Hamdi");
  const [isEditingName, setIsEditingName] = useState(false);

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("study");
  const [phase, setPhase] = useState("focus");

  const [customFocus, setCustomFocus] = useState(30);
  const [customBreak, setCustomBreak] = useState(10);
  const [showSettings, setShowSettings] = useState(false);
  const [themeFocus, setThemeFocus] = useState("purple");
  const [themeBreak, _setThemeBreak] = useState("green");
  const [customBgImage, setCustomBgImage] = useState(null);

  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isNotifOn, setIsNotifOn] = useState(true);
  const [musicTab, setMusicTab] = useState("lofi");
  const [currentTrackUrl, setCurrentTrackUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const quote =
    "Discipline is choosing between what you want now and what you want most.";
  const [task, setTask] = useState("");
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [bubbles, setBubbles] = useState({
    left: false,
    right: false,
    msgLeft: "",
    msgRight: "",
  });

  const [stats, setStats] = useState({ focus: 0, break: 0 });
  const [showTaskList, setShowTaskList] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const audioRef = useRef(null);
  const musicPlayerRef = useRef(new Audio());
  const fileInputRef = useRef(null);

  // --- LOGIC ---

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const playSound = useCallback(
    (url) => {
      if (!isMuted) {
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play().catch((e) => console.log("Audio block:", e));
        } else {
          const audio = new Audio(url);
          audioRef.current = audio;
          audio.play().catch((e) => console.log("Audio block:", e));
        }
      }
    },
    [isMuted]
  );

  const sendNotification = useCallback(
    (title, body) => {
      if (
        isNotifOn &&
        "Notification" in window &&
        Notification.permission === "granted" &&
        document.hidden
      ) {
        const n = new Notification(title, { body, icon: "/vite.svg" });
        n.onclick = () => {
          window.focus();
          n.close();
        };
      }
    },
    [isNotifOn]
  );

  const showToast = useCallback(
    (msg, soundUrl = null) => {
      setToast({ show: true, msg });
      if (soundUrl) playSound(soundUrl);
      setTimeout(() => setToast({ show: false, msg: "" }), 3000);
    },
    [playSound]
  );

  const handleTimerFinish = useCallback(() => {
    setIsRunning(false);
    playSound(soundFinish);

    if (phase === "focus") {
      showToast(t.focusDone, null);
      sendNotification("Hanir Lab", t.focusDone);
      setStats((prev) => ({ ...prev, focus: prev.focus + 1 }));
      setPhase("break");
      const breakMap = { study: 5, work: 10, workout: 15, custom: customBreak };
      setTimeLeft((breakMap[mode] || 5) * 60);
    } else {
      showToast(t.breakDone, null);
      sendNotification("Hanir Lab", t.breakDone);
      setStats((prev) => ({ ...prev, break: prev.break + 1 }));
      setPhase("focus");
      const focusMap = {
        study: 25,
        work: 50,
        workout: 45,
        custom: customFocus,
      };
      setTimeLeft((focusMap[mode] || 25) * 60);
    }
  }, [
    phase,
    mode,
    customBreak,
    customFocus,
    soundFinish,
    playSound,
    showToast,
    sendNotification,
    t,
  ]);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      const timeout = setTimeout(() => handleTimerFinish(), 0);
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, handleTimerFinish]);

  useEffect(() => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    const timeStr = `${m}:${s < 10 ? "0" : ""}${s}`;
    document.title = `${timeStr} - ${
      phase === "focus" ? "Fokus" : "Istirahat"
    } | Hanir Lab`;
  }, [timeLeft, phase]);

  const toggleTimer = () => {
    if (!isRunning) {
      playSound(soundStart);
      showToast(t.startMsg);
    } else {
      showToast(t.pauseMsg);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setPhase("focus");
    const focusMap = { study: 25, work: 50, workout: 45, custom: customFocus };
    setTimeLeft((focusMap[mode] || 25) * 60);
    playSound(soundStart);
    showToast(t.resetMsg);
  };

  const changeMode = (m) => {
    if (isRunning) return showToast(t.pauseAlert);
    setMode(m);
    setPhase("focus");
    const focusMap = { study: 25, work: 50, workout: 45, custom: customFocus };
    setTimeLeft(focusMap[m] * 60);
  };

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const resetStats = () => {
    setStats({ focus: 0, break: 0 });
    showToast(t.resetStats);
  };

  const pokeCharacter = (side) => {
    const msgsLeft = [
      "Analisis Keuangan 📈",
      "ROI Stabil 💰",
      "Audit Data ✅",
      "Market Bullish 🚀",
    ];
    const msgsRight = [
      "Server Running ⚡",
      "IoT Connected 📡",
      "Circuit Aman 🔌",
      "Compiling... 💻",
    ];
    const msg =
      side === "left"
        ? msgsLeft[Math.floor(Math.random() * msgsLeft.length)]
        : msgsRight[Math.floor(Math.random() * msgsRight.length)];
    setBubbles((prev) => ({
      ...prev,
      [side]: true,
      [`msg${side === "left" ? "Left" : "Right"}`]: msg,
    }));
    setTimeout(() => setBubbles((prev) => ({ ...prev, [side]: false })), 2000);
  };

  const toggleLofi = (url) => {
    const p = musicPlayerRef.current;
    if (currentTrackUrl === url) {
      if (isPlayingAudio) p.pause();
      else p.play();
      setIsPlayingAudio(!isPlayingAudio);
    } else {
      p.src = url;
      p.play();
      setCurrentTrackUrl(url);
      setIsPlayingAudio(true);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTaskInput, completed: false },
    ]);
    setNewTaskInput("");
  };
  const toggleTask = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const saveEditing = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: editingText } : t)));
    setEditingTaskId(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomBgImage(imageUrl);
      setThemeFocus("custom");
      showToast("Background berhasil diganti! ✨");
    }
  };

  const currentTheme =
    phase === "focus"
      ? themes[themeFocus] || themes.purple
      : themes[themeBreak] || themes.green;
  const backgroundStyle = customBgImage
    ? {
        backgroundImage: `url(${customBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }
    : {};

  return (
    <div
      className={`min-h-screen flex flex-col items-center font-sans overflow-hidden relative transition-colors duration-1000 ease-in-out ${
        !customBgImage && currentTheme.bg
      }`}
      style={backgroundStyle}
    >
      <GlobalStyles />

      {/* BACKGROUND */}
      {customBgImage && (
        <div className='fixed inset-0 bg-black/50 z-0 pointer-events-none'></div>
      )}
      {!customBgImage && (
        <div className='fixed inset-0 pointer-events-none overflow-hidden z-0'>
          <div
            className={`absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[120px] animate-pulse transition-colors duration-1000 ${currentTheme.blob1}`}
          />
          <div
            className={`absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] transition-colors duration-1000 ${currentTheme.blob2}`}
          />
          <div className='absolute top-20 left-10 text-white/5 animate-float flex flex-col gap-8'>
            <Code2 size={64} />
            <Laptop size={48} />
          </div>
          <div className='absolute top-32 right-20 text-white/5 animate-float-delayed flex flex-col gap-10'>
            <TrendingUp size={64} />
            <span className='text-6xl font-bold font-mono'>$</span>
          </div>
          <div className='absolute bottom-20 left-20 text-white/5 animate-drift'>
            <Wifi size={56} />
          </div>
          <div className='absolute bottom-40 right-10 text-white/5 animate-float'>
            <Cpu size={72} />
            <CircuitBoard size={48} className='mt-4 ml-8' />
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className='w-full max-w-7xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-center z-20 gap-4'>
        {/* Bagian Kiri: Logo & Bahasa */}
        <div className='flex items-center gap-4 w-full md:w-auto justify-center md:justify-start'>
          <div className='flex items-center gap-3 glass-panel px-5 py-2.5 rounded-full hover:scale-105 transition-transform duration-300 group cursor-pointer'>
            <div className='w-10 h-10 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg text-white overflow-hidden'>
              <img
                src={customLogoUrl}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
                alt='Logo'
                className='w-full h-full object-cover'
              />
              <Sparkles
                size={20}
                fill='currentColor'
                className='text-white hidden group-hover:rotate-12 transition-transform'
              />
            </div>
            <h1 className='text-xl md:text-2xl font-[Fredoka] font-bold tracking-wide text-white leading-none'>
              NIRDI<span className='font-light text-pink-300'>Lab</span>
            </h1>
          </div>

          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className='glass-btn px-3 py-2 rounded-full flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white'
          >
            <Globe size={14} /> {lang.toUpperCase()}
          </button>
        </div>

        {/* Bagian Kanan: Tombol Notif/Suara/Musik */}
        <div className='flex gap-2 w-full md:w-auto justify-center'>
          <button
            onClick={() => setIsNotifOn(!isNotifOn)}
            className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full glass-btn transition-all ${
              !isNotifOn ? "bg-white/5 text-gray-500" : "text-yellow-300"
            }`}
            title='Notifikasi'
          >
            {isNotifOn ? <Bell size={18} /> : <BellOff size={18} />}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full glass-btn transition-all ${
              isMuted ? "bg-red-500/20 text-red-300" : "text-gray-300"
            }`}
            title='Suara'
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button
            onClick={() => setIsMusicOpen(true)}
            className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full glass-btn text-purple-300 hover:text-white transition-all'
          >
            <Music size={18} />
          </button>
        </div>
      </nav>

      {/* QUOTE */}
      <div className='z-10 animate-float-delayed mb-2'>
        <div className='glass-panel px-8 py-3 rounded-full flex items-center gap-3'>
          <Heart size={16} className='text-pink-400 fill-pink-400' />
          <span className='text-sm font-medium text-gray-200 tracking-wide italic'>
            "{quote}"
          </span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className='flex-grow w-full max-w-7xl px-4 md:px-6 grid grid-cols-2 lg:grid-cols-12 gap-4 md:gap-8 items-center z-10 pb-10'>
        {/* LEFT CHARACTER (Muslimah) */}
        {/* Di HP: Urutan ke-2 (Bawah Kiri), Lebar 1 kolom */}
        <div
          className='col-span-1 lg:col-span-3 order-2 lg:order-1 flex justify-center cursor-pointer relative z-10'
          onClick={() => pokeCharacter("left")}
        >
          <div className='relative group hover:scale-105 transition duration-500 animate-float'>
            <img
              src={currentImgLeft(phase)}
              alt='Muslimah'
              className='w-32 md:w-64 drop-shadow-[0_20px_50px_rgba(168,85,247,0.25)]'
            />
            {/* Bubble Chat - Disembunyikan di HP biar tidak menutupi, muncul di Laptop */}
            <div
              className={`hidden md:block absolute -top-12 left-0 glass-panel px-5 py-3 rounded-2xl text-xs font-bold text-purple-200 transition-all duration-300 ${
                bubbles.left
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-90"
              }`}
            >
              {bubbles.msgLeft}
            </div>
          </div>
        </div>

        {/* CENTER TIMER CARD */}
        {/* Di HP: Urutan ke-1 (Paling Atas), Lebar Penuh (2 kolom) */}
        <div className='col-span-2 lg:col-span-6 order-1 lg:order-2 flex justify-center w-full'>
          <div className='glass-panel w-full max-w-xl rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 text-center relative overflow-hidden flex flex-col gap-4 md:gap-6 border border-white/10 shadow-2xl bg-[#0f172a]/30'>
            {/* Header Nama & Input */}
            <div className='flex flex-col items-center gap-3 relative z-10'>
              <div
                className='group flex items-center gap-2 cursor-pointer transition-all hover:scale-105'
                onClick={() => setIsEditingName(true)}
              >
                {isEditingName ? (
                  <input
                    autoFocus
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setIsEditingName(false)
                    }
                    className='bg-transparent border-b-2 border-purple-400 outline-none text-center w-32 text-xl font-bold text-white'
                  />
                ) : (
                  <h2 className='text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-white to-blue-200 flex items-center gap-2 font-[Fredoka]'>
                    {t.greeting}, {userName}{" "}
                    <Pencil
                      size={14}
                      className='text-white/20 group-hover:text-white transition-colors'
                    />
                  </h2>
                )}
              </div>
              <div className='group flex items-center gap-2 text-white/60 text-xs md:text-sm bg-black/20 px-4 py-2 rounded-full border border-white/5 w-full max-w-xs transition-all focus-within:ring-2 focus-within:ring-purple-500/30'>
                <Target
                  size={14}
                  className='group-focus-within:text-purple-400 transition-colors'
                />
                <input
                  type='text'
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder={t.focusPlaceholder}
                  className='bg-transparent text-center focus:outline-none text-white placeholder-white/30 w-full font-medium tracking-wide'
                />
              </div>
            </div>

            {/* Timer Angka Besar */}
            <div className='relative z-10 py-2'>
              <h1 className='text-[5rem] md:text-[7.5rem] leading-none font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tighter font-[Fredoka] tabular-nums'>
                {formatTime(timeLeft)}
              </h1>
              <div
                className={`mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border backdrop-blur-md shadow-lg ${
                  phase === "focus"
                    ? "bg-purple-500/10 border-purple-500/30 text-purple-200"
                    : "bg-green-500/10 border-green-500/30 text-green-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    phase === "focus"
                      ? "bg-purple-400 animate-pulse"
                      : "bg-green-400 animate-pulse"
                  }`}
                ></span>
                {phase === "focus" ? t.focusMode : t.breakMode}
              </div>
            </div>

            {/* Statistik Bar */}
            <div className='flex justify-center gap-3 relative z-10'>
              <div className='glass-btn px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold text-orange-200 cursor-default'>
                <div className='bg-orange-500/20 p-1 rounded-md'>
                  <Flame
                    size={12}
                    className='text-orange-400 fill-orange-400'
                  />
                </div>
                <span>{stats.focus}</span>
              </div>
              <div className='glass-btn px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold text-blue-200 cursor-default'>
                <div className='bg-blue-500/20 p-1 rounded-md'>
                  <Coffee size={12} className='text-blue-400 fill-blue-400' />
                </div>
                <span>{stats.break}</span>
              </div>
              <button
                onClick={resetStats}
                className='p-2 glass-btn rounded-xl text-white/40 hover:text-white hover:rotate-180 transition-all duration-500'
                title={t.resetStats}
              >
                <History size={16} />
              </button>
            </div>

            {/* Tombol Kontrol Utama */}
            <div className='flex justify-center items-center gap-6 relative z-10 mt-1'>
              <button
                onClick={resetTimer}
                className='w-12 h-12 rounded-full glass-btn flex items-center justify-center text-gray-400 hover:text-white hover:rotate-[360deg] transition duration-700 ease-in-out'
              >
                <RotateCcw size={20} />
              </button>
              <button
                onClick={toggleTimer}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-[2rem] flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] transition transform hover:scale-105 active:scale-95 group ${
                  isRunning
                    ? "bg-[#0f172a] border border-white/10"
                    : "bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500"
                }`}
              >
                {isRunning ? (
                  <Pause size={32} className='text-white fill-current' />
                ) : (
                  <Play size={32} className='text-white fill-current ml-2' />
                )}
              </button>
              <button
                onClick={() => setShowTaskList(!showTaskList)}
                className={`w-12 h-12 rounded-full glass-btn flex items-center justify-center transition duration-300 ${
                  showTaskList
                    ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <ListTodo size={20} />
              </button>
            </div>

            {/* Tombol Preset (Study/Work/Health) */}
            <div className='grid grid-cols-4 gap-2 relative z-10 px-1 mt-2'>
              {[
                {
                  id: "study",
                  icon: BookOpen,
                  label: t.study,
                  color: "text-purple-400",
                },
                {
                  id: "work",
                  icon: Code2,
                  label: t.work,
                  color: "text-blue-400",
                },
                {
                  id: "workout",
                  icon: Dumbbell,
                  label: t.health,
                  color: "text-orange-400",
                },
                {
                  id: "custom",
                  icon: SlidersHorizontal,
                  label: t.edit,
                  color: "text-green-400",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    item.id === "custom"
                      ? setShowSettings(true)
                      : changeMode(item.id)
                  }
                  className={`glass-btn p-2 md:p-3 rounded-xl flex flex-col items-center gap-1 transition-all active:scale-95 ${
                    mode === item.id
                      ? "bg-white/10 border-white/20 shadow-lg"
                      : ""
                  }`}
                >
                  <item.icon
                    size={16}
                    className={`${
                      mode === item.id ? "text-white" : item.color
                    } transition-colors`}
                  />
                  <span
                    className={`text-[9px] md:text-[10px] font-bold ${
                      mode === item.id ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT CHARACTER (Engineer) */}
        {/* Di HP: Urutan ke-3 (Bawah Kanan), Lebar 1 kolom */}
        <div
          className='col-span-1 lg:col-span-3 order-3 lg:order-3 flex justify-center cursor-pointer relative z-10'
          onClick={() => pokeCharacter("right")}
        >
          <div className='relative group hover:scale-105 transition duration-500 animate-float-delayed'>
            <img
              src={currentImgRight(phase)}
              alt='Engineer'
              className='w-32 md:w-64 drop-shadow-[0_20px_50px_rgba(59,130,246,0.25)] scale-x-[-1]'
            />
            <div
              className={`hidden md:block absolute -top-12 right-0 glass-panel px-5 py-3 rounded-2xl text-xs font-bold text-blue-200 transition-all duration-300 ${
                bubbles.right
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-90"
              }`}
            >
              {bubbles.msgRight}
            </div>
          </div>
        </div>
      </main>

      {/* SETTINGS MODAL */}
      {showSettings && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in'>
          <div className='glass-panel w-full max-w-sm rounded-3xl p-6 relative flex flex-col bg-[#0f172a]/95 max-h-[80vh] overflow-y-auto custom-scroll'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='font-bold text-lg flex items-center gap-2'>
                <SlidersHorizontal size={20} className='text-purple-400' />{" "}
                {t.settings}
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className='hover:text-white text-white/50'
              >
                <X size={20} />
              </button>
            </div>

            <div className='space-y-6'>
              <div>
                <div className='flex justify-between text-xs font-bold mb-2 text-gray-400 uppercase'>
                  Focus (Min)
                </div>
                <div className='flex items-center gap-3'>
                  <input
                    type='range'
                    min='1'
                    max='120'
                    value={customFocus}
                    onChange={(e) => setCustomFocus(Number(e.target.value))}
                    className='w-full accent-purple-500 h-1.5 bg-white/10 rounded-lg cursor-pointer'
                  />
                  <input
                    type='number'
                    min='1'
                    max='120'
                    value={customFocus}
                    onChange={(e) => setCustomFocus(Number(e.target.value))}
                    className='w-16 bg-white/10 border border-white/10 rounded-lg p-1.5 text-center text-sm text-white font-bold outline-none focus:border-purple-500'
                  />
                </div>
              </div>
              <div>
                <div className='flex justify-between text-xs font-bold mb-2 text-gray-400 uppercase'>
                  Break (Min)
                </div>
                <div className='flex items-center gap-3'>
                  <input
                    type='range'
                    min='1'
                    max='60'
                    value={customBreak}
                    onChange={(e) => setCustomBreak(Number(e.target.value))}
                    className='w-full accent-green-500 h-1.5 bg-white/10 rounded-lg cursor-pointer'
                  />
                  <input
                    type='number'
                    min='1'
                    max='60'
                    value={customBreak}
                    onChange={(e) => setCustomBreak(Number(e.target.value))}
                    className='w-16 bg-white/10 border border-white/10 rounded-lg p-1.5 text-center text-sm text-white font-bold outline-none focus:border-green-500'
                  />
                </div>
              </div>

              <div>
                <div className='flex justify-between text-xs font-bold mb-3 text-gray-400 uppercase'>
                  {t.focusTheme}
                </div>
                <div className='flex gap-2 mb-4'>
                  {Object.keys(themes).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setThemeFocus(key);
                        setCustomBgImage(null);
                      }}
                      className={`w-8 h-8 rounded-full border-2 ${
                        themes[key].bg
                      } ${
                        themeFocus === key && !customBgImage
                          ? "border-white scale-110"
                          : "border-transparent opacity-50"
                      }`}
                    ></button>
                  ))}
                </div>

                <div className='mt-4 border-t border-white/10 pt-4'>
                  <label className='flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 hover:border-white/40 transition'>
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                      <ImageIcon size={24} className='text-gray-400 mb-2' />
                      <p className='text-xs text-gray-400 font-bold'>
                        {t.uploadBtn}
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type='file'
                      className='hidden'
                      accept='image/*'
                      onChange={handleImageUpload}
                    />
                  </label>
                  {customBgImage && (
                    <button
                      onClick={() => setCustomBgImage(null)}
                      className='text-xs text-red-400 mt-2 hover:underline'
                    >
                      Hapus Gambar
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  changeMode("custom");
                  setShowSettings(false);
                }}
                className='w-full py-3 bg-purple-600 rounded-xl font-bold mt-2 hover:bg-purple-500 transition'
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TASK LIST MODAL */}
      {showTaskList && (
        <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in'>
          <div className='glass-panel w-full max-w-md rounded-3xl p-6 relative flex flex-col max-h-[80vh] bg-[#0f172a]/90'>
            <div className='flex justify-between items-center mb-6 border-b border-white/10 pb-4'>
              <h3 className='font-bold text-lg flex items-center gap-2 font-[Fredoka] tracking-wide'>
                <ListTodo size={22} className='text-purple-400' /> {t.taskList}
              </h3>
              <button
                onClick={() => setShowTaskList(false)}
                className='hover:text-white text-white/50 transition bg-white/5 p-2 rounded-full'
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddTask} className='flex gap-2 mb-6'>
              <input
                type='text'
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder={t.addTask}
                className='flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500/50 transition text-sm text-white placeholder-white/30'
              />
              <button
                type='submit'
                className='bg-gradient-to-br from-purple-600 to-blue-600 hover:scale-105 w-12 rounded-xl flex items-center justify-center transition shadow-lg'
              >
                <Plus size={20} className='text-white' />
              </button>
            </form>
            <div className='flex-1 overflow-y-auto custom-scroll pr-2 space-y-2 mb-4'>
              {tasks.length === 0 && (
                <div className='text-center text-white/30 text-sm py-8 italic'>
                  {t.noTask}
                </div>
              )}
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`group flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                    task.completed
                      ? "bg-green-900/10 border-green-500/20 opacity-60"
                      : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-purple-500/30"
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                      task.completed
                        ? "bg-green-500 border-green-500"
                        : "border-white/30 hover:border-purple-400"
                    }`}
                  >
                    {task.completed && (
                      <Check size={12} className='text-white' />
                    )}
                  </button>
                  {editingTaskId === task.id ? (
                    <div className='flex-1 flex gap-2'>
                      <input
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className='flex-1 bg-transparent border-b border-purple-500 outline-none text-sm text-white'
                        autoFocus
                      />
                      <button onClick={() => saveEditing(task.id)}>
                        <Save
                          size={16}
                          className='text-green-400 hover:scale-110 transition'
                        />
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`flex-1 text-sm ${
                        task.completed
                          ? "line-through text-white/40"
                          : "text-white/90"
                      }`}
                    >
                      {task.text}
                    </span>
                  )}
                  <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition'>
                    <button
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditingText(task.text);
                      }}
                      className='text-blue-300 hover:text-white p-1 hover:bg-white/10 rounded'
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className='text-red-400 hover:text-red-300 p-1 hover:bg-white/10 rounded'
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MUSIC SIDEBAR --- */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-[#0a0f1e]/80 backdrop-blur-2xl border-l border-white/10 p-8 transform transition-transform duration-500 z-50 ${
          isMusicOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-white font-bold text-lg flex items-center gap-2'>
            <Headphones size={18} className='text-purple-400' /> {t.soundscape}
          </h3>
          <button onClick={() => setIsMusicOpen(false)}>
            <X size={20} className='text-white/50 hover:text-white' />
          </button>
        </div>

        <div className='flex gap-2 mb-6 p-1 bg-white/5 rounded-xl border border-white/5'>
          <button
            onClick={() => setMusicTab("lofi")}
            className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition ${
              musicTab === "lofi"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            MP3
          </button>
          <button
            onClick={() => setMusicTab("quran")}
            className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition ${
              musicTab === "quran"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            QUR'AN
          </button>
          <button
            onClick={() => setMusicTab("spotify")}
            className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition ${
              musicTab === "spotify"
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            SPOTIFY
          </button>
        </div>

        {/* KONTEN LOFI MP3 */}
        {musicTab === "lofi" && (
          <div className='space-y-3 animate-fade-in'>
            <button
              onClick={() =>
                toggleLofi(
                  "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
                )
              }
              className='w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3 group border border-transparent hover:border-purple-500/30 transition-all'
            >
              <div className='w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition'>
                {isPlayingAudio && currentTrackUrl.includes("1808") ? (
                  <Pause size={14} className='text-purple-300' />
                ) : (
                  <Play size={14} className='text-purple-300' />
                )}
              </div>
              <div>
                <div className='text-sm font-bold text-gray-200'>Chill Hop</div>
                <div className='text-[10px] text-gray-400'>Relaxing Beats</div>
              </div>
            </button>
            <button
              onClick={() =>
                toggleLofi(
                  "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3"
                )
              }
              className='w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3 group border border-transparent hover:border-blue-500/30 transition-all'
            >
              <div className='w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition'>
                {isPlayingAudio && currentTrackUrl.includes("d0a1") ? (
                  <Pause size={14} className='text-blue-300' />
                ) : (
                  <Play size={14} className='text-blue-300' />
                )}
              </div>
              <div>
                <div className='text-sm font-bold text-gray-200'>
                  Rainy Mood
                </div>
                <div className='text-[10px] text-gray-400'>Nature Sounds</div>
              </div>
            </button>
          </div>
        )}

        {/* KONTEN TAB: QUR'AN (MP3 PLAYER) */}
        {musicTab === "quran" && (
          <div className='space-y-3 animate-fade-in'>
            <div className='p-3 bg-skyblue-900/20 border border-blue-500/20 rounded-xl text-center text-xs text-white-200 mb-2 flex items-center justify-center gap-2'>
              <Sparkles size={14} /> Lo-FI Al-Qur'an
            </div>

            {/* 1. SURAH AL-KAHF (Mishary Rashid) - Ketenangan & Cahaya */}
            <button
              onClick={() =>
                toggleLofi("https://server8.mp3quran.net/afs/018.mp3")
              }
              className='w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3 group border border-transparent hover:border-emerald-500/30 transition-all'
            >
              <div className='w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition'>
                {isPlayingAudio && currentTrackUrl.includes("018.mp3") ? (
                  <Pause size={14} className='text-emerald-300' />
                ) : (
                  <Play size={14} className='text-emerald-300' />
                )}
              </div>
              <div>
                <div className='text-sm font-bold text-gray-200'>
                  Surah Al-Kahf
                </div>
                <div className='text-[10px] text-gray-400'>
                  Mishary Rashid (Peace)
                </div>
              </div>
            </button>

            {/* 2. SURAH AL-WAQIAH (Mishary Rashid) - Rezeki (Mode Kerja) */}
            <button
              onClick={() =>
                toggleLofi("https://server8.mp3quran.net/afs/056.mp3")
              }
              className='w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3 group border border-transparent hover:border-emerald-500/30 transition-all'
            >
              <div className='w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition'>
                {isPlayingAudio && currentTrackUrl.includes("056.mp3") ? (
                  <Pause size={14} className='text-emerald-300' />
                ) : (
                  <Play size={14} className='text-emerald-300' />
                )}
              </div>
              <div>
                <div className='text-sm font-bold text-gray-200'>
                  Surah Al-Waqiah
                </div>
                <div className='text-[10px] text-gray-400'>
                  Mishary Rashid (Work)
                </div>
              </div>
            </button>

            {/* 3. SURAH AR-RAHMAN (Mishary Rashid) - Relax/Stress Release */}
            <button
              onClick={() =>
                toggleLofi("https://server8.mp3quran.net/afs/055.mp3")
              }
              className='w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3 group border border-transparent hover:border-emerald-500/30 transition-all'
            >
              <div className='w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition'>
                {isPlayingAudio && currentTrackUrl.includes("055.mp3") ? (
                  <Pause size={14} className='text-emerald-300' />
                ) : (
                  <Play size={14} className='text-emerald-300' />
                )}
              </div>
              <div>
                <div className='text-sm font-bold text-gray-200'>
                  Surah Ar-Rahman
                </div>
                <div className='text-[10px] text-gray-400'>
                  Mishary Rashid (Relax)
                </div>
              </div>
            </button>

            {/* 4. SURAH YASIN (Saad Al Ghamdi) - Fokus Tinggi */}
            <button
              onClick={() =>
                toggleLofi("https://server7.mp3quran.net/s_gmd/036.mp3")
              }
              className='w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3 group border border-transparent hover:border-emerald-500/30 transition-all'
            >
              <div className='w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition'>
                {isPlayingAudio && currentTrackUrl.includes("036.mp3") ? (
                  <Pause size={14} className='text-emerald-300' />
                ) : (
                  <Play size={14} className='text-emerald-300' />
                )}
              </div>
              <div>
                <div className='text-sm font-bold text-gray-200'>
                  Surah Yasin
                </div>
                <div className='text-[10px] text-gray-400'>
                  Saad Al Ghamdi (Focus)
                </div>
              </div>
            </button>

            {/* 5. SURAH AL-MULK (Saad Al Ghamdi) - Istirahat/Break */}
            <button
              onClick={() =>
                toggleLofi("https://server7.mp3quran.net/s_gmd/067.mp3")
              }
              className='w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3 group border border-transparent hover:border-emerald-500/30 transition-all'
            >
              <div className='w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition'>
                {isPlayingAudio && currentTrackUrl.includes("067.mp3") ? (
                  <Pause size={14} className='text-emerald-300' />
                ) : (
                  <Play size={14} className='text-emerald-300' />
                )}
              </div>
              <div>
                <div className='text-sm font-bold text-gray-200'>
                  Surah Al-Mulk
                </div>
                <div className='text-[10px] text-gray-400'>
                  Saad Al Ghamdi (Break)
                </div>
              </div>
            </button>
          </div>
        )}

        {/* KONTEN SPOTIFY */}
        {musicTab === "spotify" && (
          <div className='space-y-4 animate-fade-in'>
            <div className='p-3 bg-green-900/20 border border-green-500/20 rounded-xl text-center text-xs text-green-200 mb-2 flex items-center justify-center gap-2'>
              <Sparkles size={14} /> {t.spotifyConn}
            </div>
            <iframe
              style={{ borderRadius: "12px" }}
              src={spotifyYoga}
              width='100%'
              height='152'
              frameBorder='0'
              allowFullScreen=''
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
              loading='lazy'
            ></iframe>
            <iframe
              style={{ borderRadius: "12px" }}
              src={spotifyLofi}
              width='100%'
              height='152'
              frameBorder='0'
              allowFullScreen=''
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
              loading='lazy'
            ></iframe>
          </div>
        )}
      </div>

      {/* TOAST */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#0f172a] border border-white/20 pl-4 pr-6 py-3 rounded-full flex items-center gap-3 shadow-2xl z-50 transition-all duration-300 ${
          toast.show
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-90 pointer-events-none"
        }`}
      >
        <div className='w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20'>
          <Bell size={14} className='text-white' />
        </div>
        <span className='text-sm font-bold text-white tracking-wide'>
          {toast.msg}
        </span>
      </div>
    </div>
  );
};

export default App;
