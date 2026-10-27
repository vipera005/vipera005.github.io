/* =====================================================================
   AICI îți configurezi site-ul și îți adaugi aplicațiile.
   Nu trebuie să modifici niciun alt fișier.
   ===================================================================== */

const SITE = {
  name: "Viper Downloads",
  title: "Bine ai venit pe Viper Downloads",
  subtitle: "Descarcă aplicațiile mele gratuit, doar pentru uz personal.",
  footer: "© " + new Date().getFullYear() + " Viper Downloads. Toate drepturile rezervate.",
  links: [
    { label: "GitHub", url: "https://github.com/vipera005" },
    { label: "Contact", url: "mailto:viper.downloads.contact@gmail.com" },
  ]
};

/* Câmpuri pentru fiecare aplicație:
   id            - nume unic, fără spații (apare în link: #/app/id)
   name          - numele aplicației
   tagline       - descriere scurtă (apare pe card)
   category      - categoria (se creează automat filtrele)
   version, size, date, platform, license, requirements - informații afișate pe pagina aplicației
   color         - culorile iconiței generate automat, ex. ["#6366f1", "#8b5cf6"]
   icon          - (opțional) calea către o iconiță, ex. "img/miaplicatie/icon.png"
   description   - listă de paragrafe (text)
   features      - listă cu funcționalități
   screenshots   - listă cu poze, ex. ["img/miaplicatie/1.png", "img/miaplicatie/2.png"]
   downloads     - butoane de descărcare: { label, url, note }
   changelog     - istoric versiuni (opțional)
   tags          - cuvinte cheie (ajută la căutare)
*/

const APPS = [
  {
    id: "fast-renamer",
    name: "Viper Launcher",
    tagline: "Laucher pentru jocuri si aplicatii.",
    category: "Game Launcher",
    version: "1.0.3",
    size: "328 MB",
    date: "2026-10-27",
    platform: "Windows 10 / 11",
    license: "Free for Personal Use Only",
    requirements: ["Cel putin 500 MB spațiu liber"],
    color: ["#6366f1", "#8b5cf6"],
    icon: "img/Viper-Launcher-Icon.png",
    tags: [],
    description: [
      "Viper Launcher este o aplicatia care permite deschiderea rapidă a jocurilor și aplicațiilor tale, intr-o interfață simplă și eficientă.",
      
    ],
    features: [
      "Detectare automată a jocurilor și aplicațiilor instalate",
      "Afisarea Achievement-urilor și a datelor relevante pentru fiecare joc sau aplicație",
      "Player muzical integrat pentru a asculta muzica preferată în timp ce te joci",
      "Interfață în limba română/engleză",
      "Compatibilitate cu Windows 10 și 11" 
    ],
    screenshots: ["img/viper-launcher-1.png", "img/viper-launcher-2.png", "img/viper-launcher-3.png"],
    downloads: [
      {
        label: "Descarcă pentru Windows",
        url: "https://github.com/vipera005/viper-updates/releases/download/v1.0.3/ViperLauncher-Setup-1.0.3.exe",
        note: "Fișier .exe, 100 MB"
      }
      /*
      {
        label: "Versiune portabilă (.zip)",
        url: "https://github.com/USERNAME/REPO/releases/latest/download/FastRenamer-portable.zip",
        note: "Fără instalare",
        secondary: true
      }
      */
    ],
    changelog: [
      { version: "1.0.3", date: "2026-09-27", changes: ["Afisarea Achievement-urilor", "Interfață îmbunătățită", "Deschiderea de site-uri direct din interfață"] }
    ]
  },
  /*
  {
    id: "pdf-toolkit",
    name: "PDF Toolkit",
    tagline: "Unește, desparte și comprimă PDF-uri, direct pe calculatorul tău.",
    category: "Birou",
    version: "2.0.1",
    size: "18 MB",
    date: "2026-09-28",
    platform: "Windows 10 / 11",
    license: "Gratuit",
    requirements: "Windows 10 sau mai nou",
    color: ["#ef4444", "#f97316"],
    icon: "",
    tags: ["pdf", "birou", "documente"],
    description: [
      "Toate operațiile uzuale cu PDF-uri într-o singură aplicație. Fișierele tale rămân pe calculator, nu se încarcă nicăieri."
    ],
    features: [
      "Unire și separare de documente",
      "Comprimare cu control al calității",
      "Rotire și reordonare pagini"
    ],
    screenshots: ["img/placeholder-2.svg", "img/placeholder-1.svg"],
    downloads: [
      { label: "Descarcă pentru Windows", url: "https://github.com/USERNAME/REPO/releases/latest/download/PDFToolkit.exe", note: "Fișier .exe, 18 MB" }
    ],
    changelog: [{ version: "2.0.1", date: "2026-09-28", changes: ["Interfață redesenată", "Comprimare mai rapidă"] }]
  },
  {
    id: "focus-timer",
    name: "Focus Timer",
    tagline: "Cronometru Pomodoro minimalist, cu statistici zilnice.",
    category: "Productivitate",
    version: "0.9.5",
    size: "2.1 MB",
    date: "2026-08-15",
    platform: "Windows, Linux",
    license: "Gratuit",
    requirements: "Windows 10+ sau Linux 64-bit",
    color: ["#10b981", "#06b6d4"],
    icon: "",
    tags: ["pomodoro", "timer", "concentrare"],
    description: [
      "Un cronometru simplu care te ajută să te concentrezi. Sesiuni de lucru, pauze și un grafic cu progresul tău."
    ],
    features: ["Sesiuni personalizabile", "Notificări discrete", "Mod întunecat"],
    screenshots: ["img/placeholder-3.svg"],
    downloads: [
      { label: "Descarcă pentru Windows", url: "https://github.com/USERNAME/REPO/releases/latest/download/FocusTimer.exe", note: ".exe" },
      { label: "Descarcă pentru Linux", url: "https://github.com/USERNAME/REPO/releases/latest/download/FocusTimer.AppImage", note: ".AppImage", secondary: true }
    ],
    changelog: []
  },
  {
    id: "snake-retro",
    name: "Snake Retro",
    tagline: "Clasicul joc Snake, cu grafică pixel-art și clasamente.",
    category: "Jocuri",
    version: "1.0.0",
    size: "9 MB",
    date: "2026-07-03",
    platform: "Windows 10 / 11",
    license: "Gratuit",
    requirements: "Windows 10 sau mai nou",
    color: ["#f59e0b", "#ec4899"],
    icon: "",
    tags: ["joc", "retro", "arcade"],
    description: ["Un joc retro pentru pauzele de cafea. Mănâncă, crește și bate-ți propriul record."],
    features: ["Trei niveluri de dificultate", "Scoruri salvate local", "Sunete 8-bit"],
    screenshots: ["img/placeholder-1.svg", "img/placeholder-3.svg"],
    downloads: [
      { label: "Descarcă pentru Windows", url: "https://github.com/USERNAME/REPO/releases/latest/download/SnakeRetro.exe", note: "Fișier .exe, 9 MB" }
    ],
    changelog: []
  }
  */
];
