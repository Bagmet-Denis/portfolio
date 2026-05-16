export default {
  menu: {
    home: 'Home',
    experience: 'Experience',
    projects: 'Projects',
  },
  controls: {
    languageLabel: 'Language',
    downloadCv: 'Download CV',
  },
  hero: {
    title: 'Hi, I am a Frontend Developer',
    subtitle:
      'I build fast and user-friendly interfaces. Here you will find my experience, projects, and contacts.',
    name: 'Denis Bagmet',
    role: 'Mobile Developer',
    secondaryRole: 'Security Research',
    about:
      'I build fast and user-friendly apps and interfaces. I also enjoy security research and turning ideas into working products.',
  },
  home: {
    latestProjectsTitle: 'Latest work',
    selectedProjectsTitle: 'Selected projects',
    latestProjectsCta: 'View all projects',
    featuredCaseEyebrow: 'Featured case',
    featuredCaseTitle: 'The Tone of Victory',
    featuredCaseLead:
      'An iOS project for TAG Heuer, connected to Formula 1 and the launch of a limited TAG Heuer Connected edition. The project included a premium interface, localized content, video and audio scenarios, and a real stand launch in South Korea.',
    featuredCaseFacts: {
      clientLabel: 'Client',
      clientValue: 'TAG Heuer, the Swiss watch Maison within Louis Vuitton Moet Hennessy (LVMH).',
      formatLabel: 'Format',
      formatValue: 'An iOS app for a presentation stand and international launch of a branded Formula 1 project.',
      stackLabel: 'Stack',
      stackValue: 'Swift, SwiftUI, localization, video and audio handling, and a stable interface for a stand-based scenario.',
    },
    featuredCaseStand: {
      title: 'Stand photos',
      description: 'Real photos of the stand with the app running. They show that the project was used not only as an interface, but also as part of an offline brand presentation.',
      meta: 'Seoul / Spring 2025 / presentation stand',
    },
    socialsTitle: 'Get in touch',
    stats: {
      title: 'Portfolio Snapshot',
      totalProjects: 'Total projects',
      mobileProjects: 'Mobile projects',
      desktopProjects: 'Desktop and desktop-first work',
    },
    socials: {
      github: 'GitHub',
      telegram: 'Telegram',
      email: 'Email',
    },
    contactCard: {
      title: 'Contacts',
      subtitle: 'Open to interesting projects, collaborations, and good conversations.',
      items: [
        {
          key: 'telegram',
          label: 'Telegram',
          value: '@Debug0',
          href: 'https://t.me/Debug0'
        },
        {
          key: 'instagram',
          label: 'Instagram',
          value: '@instagram',
          href: 'https://www.instagram.com/bagmet__denis'
        },
        {
          key: 'email',
          label: 'Email',
          value: 'dnsbagmet@gmail.com',
          href: 'mailto:dnsbagmet@gmail.com'
        }
      ]
    }
  },
  experience: {
    name: 'Bagmet Denis',
    headline: 'Mobile developer whose job is also his hobby.',
    segments: {
      personal: 'Personal',
      education: 'Education',
      contact: 'Contact',
      experience: 'Experience',
    },
    sections: {
      personal: 'Personal',
      education: 'Education',
      contact: 'Contact',
      experience: 'Experience Timeline',
    },
    personal: [
      { key: 'name', label: 'Name', value: 'Bagmet Denis' },
      { key: 'birth', label: 'Date of Birth', value: '16 March 1999 (26)' },
      { key: 'location', label: 'City of Residence', value: 'Rostov-on-Don' },
      { key: 'university', label: 'University', value: 'Donetsk National University' },
      { key: 'specialty', label: 'Specialty', value: '09.03.01 Computer Science and Engineering' },
      { key: 'educationLevel', label: 'Education', value: "Bachelor's degree completed, currently on academic leave from the Master's program" },
      {
        key: 'languages',
        label: 'Languages',
        value: ['Ukrainian', 'Russian', 'English']
      }
    ],
    skillsCard: {
      title: 'Skills & Stack',
      expanded: {
        show: 'Show',
        hide: 'Hide'
      },
      categories: [
        {
          key: 'mobile',
          label: 'Mobile Development',
          items: ['Swift', 'SwiftUI', 'UIKit', 'Flutter', 'Dart', 'iOS SDK', 'Android SDK']
        },
        {
          key: 'programmingLanguages',
          label: 'Programming Languages',
          items: ['JavaScript', 'TypeScript', 'Python']
        },
        {
          key: 'frameworks',
          label: 'Frameworks & Patterns',
          items: ['SwiftUI', 'UIKit', 'Flutter', 'Combine', 'async/await', 'MVVM', 'BLoC', 'REST API']
        },
        {
          key: 'databases',
          label: 'Databases & Storage',
          items: ['SQLite', 'Core Data', 'Realm', 'Firebase', 'PostgreSQL', 'MySQL']
        },
        {
          key: 'toolsDev',
          label: 'Development Tools',
          items: ['Xcode', 'Android Studio', 'Visual Studio Code', 'Cursor', 'PyCharm', 'Git', 'Postman']
        },
        {
          key: 'toolsTraffic',
          label: 'Traffic Analysis',
          items: ['Postman', 'Proxyman', 'Burp Suite', 'Charles Proxy']
        },
        {
          key: 'toolsReverse',
          label: 'Reverse Engineering & Dynamic Analysis',
          items: ['Frida', 'Objection', 'Jadx', 'apktool', 'Ghidra', 'Hopper', 'MobSF']
        }
      ]
    },
    factsCard: {
      title: 'Interesting Facts',
      expanded: {
        show: 'Show countries',
        hide: 'Hide countries',
        title: 'Countries and regions'
      },
      items: [
        {
          key: 'travel',
          label: 'Travel',
          value: 'I love traveling and collecting new impressions.',
          note: 'I post travel photos and small notes on Instagram.',
          link: {
            label: 'Instagram',
            href: 'https://www.instagram.com/bagmet__denis'
          },
          countries: [
            { name: 'Azerbaijan', flag: '/flags/azerbaijan.svg' },
            { name: 'China', flag: '/flags/china.svg' },
            { name: 'Egypt', flag: '/flags/egypt.svg' },
            { name: 'Georgia', flag: '/flags/georgia.svg' },
            { name: 'Hong Kong', flag: '/flags/hong kong.svg' },
            { name: 'Israel', flag: '/flags/israel.svg' },
            { name: 'Kazakhstan', flag: '/flags/kazakhstan.svg' },
            { name: 'Macao', flag: '/flags/macao.svg' },
            { name: 'Malaysia', flag: '/flags/malaysia.svg' },
            { name: 'Montenegro', flag: '/flags/montenegro.svg' },
            { name: 'North Korea', flag: '/flags/north korea.svg' },
            { name: 'Palestine', flag: '/flags/palestine.svg' },
            { name: 'Russia', flag: '/flags/russia.svg' },
            { name: 'South Korea', flag: '/flags/south korea.svg' },
            { name: 'Turkey', flag: '/flags/turkey.svg' },
            { name: 'Ukraine', flag: '/flags/ukraine.svg' },
            { name: 'United Arab Emirates', flag: '/flags/united arab emirates.svg' }
          ]
        },
        {
          key: 'graffiti',
          label: 'Hobby',
          value: 'I enjoy drawing and graffiti.'
        }
      ]
    },
    education: [{ label: 'Main focus', value: 'Self-education, practical commercial development, and security research.' }],
    contact: [
      { label: 'Location', value: 'Available remotely' },
      { label: 'Email', value: 'dnsbagmet@gmail.com' },
      { label: 'Telegram', value: '@Debug0' },
    ],
    items: [
      {
        title: 'iOS / Mobile Developer',
        period: '2019 — Present',
        description: 'Built native Swift and SwiftUI applications for iPhone, iPad, Apple Watch, and Mac: from adaptive interfaces and user flows to backend integrations, analytics, stability, and releases.',
        stack: ['Swift', 'SwiftUI', 'UIKit', 'watchOS', 'macOS', 'Combine', 'async/await', 'REST API', 'CI/CD'],
        bullets: [
          'Designed and implemented product features with SwiftUI’s declarative approach: screens, user flows, reusable UI components, and navigation.',
          'Adapted interfaces and behavior for different Apple devices: iPhone, iPad, Apple Watch, and Mac.',
          'Integrated apps with backend services through REST API: authentication, networking layer, error handling, retries, pagination, and loading states.',
          'Implemented product analytics and user metric collection: events, parameters, funnels, failure points, and tracking validation.',
          'Worked with app state and data: MVVM, Combine, async/await, caching, local persistence, and server synchronization.',
          'Maintained production quality: crash/bug triage, issue diagnostics, performance tuning, and release preparation.',
        ],
        links: [{ label: 'Portfolio (projects)', href: '/projects' }],
      },
      {
        title: 'Flutter Developer',
        period: '2021 — Present',
        description:
          'Built cross-platform Flutter applications for iOS and Android: architecture, UI, business logic, backend integrations, analytics, builds, and publishing.',
        stack: ['Dart', 'Flutter', 'BLoC', 'REST API', 'Firebase', 'Android', 'iOS', 'CI/CD'],
        bullets: [
          'Built app architecture: BLoC/layers, domain/data/presentation separation, dependency injection, and reusable widgets.',
          'Integrated backend services through REST API: authentication, DTOs/models, serialization, error handling, retries, timeouts, and stable UI states.',
          'Implemented Firebase and product analytics: events, user properties, crash reporting, push notifications, and post-release data validation.',
          'Developed complex user flows: forms, lists, filters, offline/cache behavior, local storage, deep links, and platform-specific behavior.',
          'Supported the full release flow: flavor/config management, signing, iOS/Android builds, publishing, crash triage, and quick fixes.',
        ],
        links: [{ label: 'Portfolio (projects)', href: '/projects' }],
      },
      {
        title: 'Penetration Tester / Android Reverse Engineer',
        period: 'Jan 2017 - Sep 2019',
        description:
          'Performed security assessments for mobile and web apps, handled Android reverse engineering, and built OSINT automation for large client projects: from app analysis and PoCs to finding public links between profiles, contacts, and asset owners.',
        stack: ['Mobile AppSec', 'Web AppSec', 'Android RE', 'OSINT', 'Python', 'Frida', 'Bug Bounty'],
        bullets: [
          'Found vulnerabilities across Android/iOS/web, validated impact, and documented attack paths.',
          'Reverse engineered Android apps: analyzed logic, networking, and sensitive areas, then built tooling for runtime instrumentation and behavioral analysis.',
          'Built OSINT tools similar to aggregated people-search products across social networks and public sources: Avito, QIWI, Mail.ru, Odnoklassniki, VK, Facebook, Instagram, and other platforms.',
          'Helped write scripts and identify vehicle owners for service and recall programs where owners needed to be contacted about required fixes.',
          'Wrote detailed reports: reproduction steps, impact, prioritization, fixes, and artifacts for further investigation.',
          'Published security articles and practical research materials on Codeby.net.',
          'Found and responsibly disclosed vulnerabilities through HackerOne, receiving confirmations and bounty rewards for reports.',
          'Passed Web Application Penetration Testing (WAPT) exam by Codeby.net.',
        ],
        links: [
          { label: 'Codeby.net publications', href: 'https://codeby.net/members/debug.77915/' },
          { label: 'HackerOne: confirmed reports', href: 'https://hackerone.com/debug_denis' },
        ],
      },
    ],
  },
  projects_completed: 'mobile projects',
  desktop_completed: 'desktop projects',
  projects: {
    title: 'Projects',
    subtitle: 'Selected projects with goals, stack, and implementation details.',
    controlEyebrow: 'Case navigator',
    activeCategoryCountSuffix: 'projects in this selection',
    openLink: 'Open',
    showInfo: 'Show info',
    infoModalLabel: 'Additional information',
    closeModal: 'Close',
    noImages: 'No images for this project yet.',
    galleryHint: 'Swipe or drag to browse screenshots',
    fallbackDescription: 'Description will be added later.',
    caseLabels: {
      engineeringContribution: 'Engineering contribution',
      solvedTasks: 'Solved tasks',
    },
    categories: {
      mobile: 'Mobile',
      fullstack: 'Front + Back',
      desktop: 'Desktop',
      cybersecurity: 'Cybersecurity',
    },
    categoryMeta: {
      mobile: {
        eyebrow: 'iOS / Android',
        description: 'Product-grade mobile apps: UX, motion, subscriptions, store releases, and the shipping work around them.',
      },
      fullstack: {
        eyebrow: 'Front + Back',
        description: 'Projects where I handled both the client side and backend work: APIs, integrations, server logic, and the full product flow.',
      },
      desktop: {
        eyebrow: 'Desktop / Utility',
        description: 'Desktop apps and internal tools where speed, dense UI, and day-to-day usability matter more than marketing gloss.',
      },
      cybersecurity: {
        eyebrow: 'Research / Offensive',
        description: 'Security research, assessments, PoCs, and applied work that often cannot be shown in full public detail.',
      },
    },
    insentry: {
      solvedTasks: [
        'Investigated a RAW video stream that VLC and similar players could not render.',
        'Built a native decoder: video rendering directly from bytes/NALU payloads.',
        'Packaged it as a Flutter library with a native-to-Flutter bridge.',
      ],
    },
    descriptions: {
      trezorSuite: 'A Flutter desktop clone of Trezor Suite: an experiment with crypto-wallet UX, dense navigation, desktop windows, and application state.',
      berry: 'A Flutter desktop app focused on a fast interface, local data, and comfortable use in a standalone desktop window.',
      avProtection: 'A desktop-first security utility concept with an interface for control, checks, and security-related workflows.',
      gifMaker: 'An app for creating GIF animations from photos directly on the phone. Users select images, build an animation, and quickly share the result.',
      storekeeper: 'An app for tracking consumables, goods, and warehouse operations for property managers, offices, beauty salons, and small stockrooms.',
      countdownWidget: 'An app with countdown timers and widgets for tracking important events, dates, and personal deadlines right from the phone screen.',
      boxingTimer: 'A sports interval timer for boxing, MMA, CrossFit, and workouts. Users can configure rounds, rest periods, sound cues, and training scenarios.',
      teleprompterAutomatic: 'A native iOS teleprompter product where I implemented video recording, the script-scrolling engine, built-in video editing, a web control panel, and the related backend.',
      partyDay: 'A “Never Have I Ever” party game for groups and home parties. The app provides ready-made question packs, helps people start quickly, and keeps the flow lively with different categories, themes, and adult-party scenarios.',
      truthOrDare: 'A Truth or Dare party game for groups of friends. It includes multiple packs of tasks and questions for different moods, a bright game mechanic, and a quick way to start a party without setup friction.',
      truthOrDare2: 'A second Truth or Dare party game for quick parties and groups of friends. The app continues the idea of the first project with ready-made question and dare packs, a bright game flow, and an easy launch without extra setup.',
      passwordManager: 'A password manager for securely storing sensitive information. Users can save accounts, bank cards, documents, addresses, and other records, quickly find what they need, and keep it protected.',
      powerFit: 'A fitness tracker for building workout programs and logging training progress. The app helps plan exercises, record sets and weights, track result dynamics, and see how performance changes over time.',
      armira: 'A mobile store for Armira, an institute of scientific beauty, with a catalog of professional cosmetology products, preparations, devices, consumables, and care goods. The app helps users browse categories, promotions, and products for home or professional use.<br><br><a href="https://drive.google.com/file/d/1Jr5mk5f3wvo_uNVrbF1rHVn9K09lA0rf/view" target="_blank" rel="noopener noreferrer">Download APK</a>',
      tableCoins: 'Table Coins is a native iOS app built with SwiftUI 2.0 for managing and browsing a coin collection. The interface helps users work with the catalog, coin cards, and the visual state of the collection directly on iPhone.',
      blurPhoto: 'A photo editor for precise blur of unwanted objects, details, and visual imperfections. The app helps hide distracting parts of a shot, work with specific areas, and quickly get a cleaner image.',
      prostor: 'An online grocery store for products from Russia and CIS countries in the UAE. The app lets users browse a large catalog, order home delivery across the UAE, and buy familiar groceries, dairy, meat, fish, drinks, sweets, and household goods.',
      skin: 'An iPhone customization app with widgets, icons, themes, and visual packs for personalizing the home screen.',
      iHaveNeverAdult: 'A “Never Have I Ever” game for adult groups with ready-made questions and a quick party-start flow.',
      gold585: 'A mobile catalog for the 585Gold jewelry chain, focused on 585 gold items. Users can browse rings, earrings, chains, bracelets, and pendants, explore discounts, choose delivery across Russia, fitting, installments, and trade-in options.',
      honeyWarehouse: 'An internal app for a honey supplier that helps track sales, warehouse stock, estimates, and related operations. It simplifies daily work with orders, calculations, and documents without scattered spreadsheets.',
      projectEstimator: 'A finance tracker for personal projects and everyday expenses. The app helps track spending and income, manage cash flow, keep operation history, and understand where money goes and how the financial result changes.',
      modPack: 'A mod catalog for Melon Playground where users can find, preview, and install new game modifications. The app simplifies the whole flow from choosing content to preparing it for use in Melon Playground.',
      passportPhotos: 'ID & Passport Photos is an app for creating document photos for different countries, IDs, passports, and visas directly from a smartphone.<br><br>It includes the key tools needed to prepare a compliant image: background removal and replacement, a simple built-in photo editor, format adjustment, and print-sheet preparation.<br><br>The app helps users go from a source photo to a ready result: edit the image, adapt it to the required document, and save or print it as a PDF.',
      faceYoga: 'A face fitness app with exercises, massage practices, and facial workout programs. Users can follow programs, repeat techniques step by step, and keep a regular care routine in a convenient mobile format.',
      femina: 'A women’s calendar for tracking the cycle, well-being, and important days. The app helps log events, monitor regularity, view predictions in a clear calendar, and better understand body changes through history.',
      allo: 'An app for recording incoming and outgoing calls with convenient audio management. Users can save conversations, listen to them, organize the history, share important recordings, and quickly return to key calls.',
      proScan: 'A mobile scanner and document manager. The app lets users scan papers with the camera, store documents in a library, compress files, add watermarks and signatures, work with PDFs, and prepare documents for sharing.',
      tiktokSaver: 'A utility for saving TikTok videos without watermarks. Users paste a video link, download a clean clip to the device, and can save it to the gallery or use it further without extra processing.',
      simpleBlock: 'An ad blocker for the device, similar in purpose to AdBlock. The app helps remove intrusive ads, enable filtering rules, and make web browsing cleaner, faster, and calmer.',
      dmt: 'A mobile client for DMT body-worn video recorders. The app connects to wearable devices, shows a live camera stream, saves the stream as a recording, downloads files from the recorder, and lets users view saved materials inside the app.',
      tales: 'An app for generating children’s fairy tales with AI. Users provide an idea or story parameters, while the backend API and DeepSeek integration help create a personalized tale for a child.',
      gamerMinimap: 'An iPhone and Apple Watch app with interactive minimaps for popular games. Users can choose game maps, add their own real-world objects, markers, and routes, then use the map from the phone or watch.',
      stService: 'An app for SafeTec service and warranty support. It helps industrial employees manage their objects, register requests, work with service tasks, and keep maintenance history in one place.',
      gorodKurort: 'An app for the Gorod-Kurort tour operator, made for browsing and booking tours around Samara, the Samara region, and Russia. It includes bus tours, river cruises, walking routes, weekend trips, and custom programs with online booking.<br><br><a href="https://vk.com/gorod_kurort" target="_blank" rel="noopener noreferrer">Gorod-Kurort on VK</a>',
      insentryRawStream: 'For <strong>Insentry</strong>, I did not build an app from scratch; I built a complex module inside a video-surveillance system: playback of a RAW video stream that VLC and similar players could not render.<br><br>The solution: a byte/NALU-level decoder and a Flutter library with a native bridge.',
      toneOfVictory: 'I pulled this case out separately: <strong>The Tone of Victory</strong>, a premium native iOS project for <strong>TAG Heuer</strong>, the watch Maison within <strong>Louis Vuitton Moët Hennessy (LVMH)</strong>.<br><br>The project was built for <strong>Formula 1 activation stands</strong> and premium brand spaces in spring <strong>2025</strong>, with launch across multiple markets. The project materials include real stand photos from <strong>South Korea</strong>, which clearly show how the product reached offline installations and a real audience.<br><br>From the engineering side, it was a modern 2024-2025 mobile production stack: <strong>Swift</strong>, <strong>SwiftUI</strong>, advanced <strong>video and audio</strong> work, localization, content adaptation for different countries, premium brand-experience UI, and the engineering plumbing needed for stable kiosk-style operation.',
      toneOfVictoryListing: 'A demonstration iOS project for the TAG Heuer Connected Calibre E5 x Formula 1 Edition. The app presented a branded Formula 1 experience with racing visuals, video and audio scenarios, localized content, and a premium interface for brand activations.',
      plates: 'Blin-da-Grif is a mobile workout app with training programs, statistics, and personal progress tracking.',
      beautify: 'Beautify is an app for service professionals who want to keep client bookings, schedules, and services in one convenient place.<br><br>The service helps automate appointments and client tracking: the schedule is always available, and a new client only needs to be added once instead of re-entering data for every booking.<br><br>The fast session creation flow is handled separately: services can be preconfigured with fixed price and duration, making it possible to book a client in about 10 seconds.',
      browserCredentials: 'A Raspberry Pi Zero W-based device built to demonstrate the risk of browser credential theft in a controlled lab environment.<br><br>A detailed guide from idea to implementation:<br><a href="https://codeby.net/resources/krazha-uchetnykh-dannykh-brauzerov-c-pomoshch-yu-raspberry-pi-zero-w-chast-1.349/" target="_blank" rel="noopener noreferrer">Part 1: preparation and concept</a><br><a href="https://codeby.net/resources/krazha-uchetnykh-dannykh-s-brauzerov-pomoshch-yu-raspberry-pi-zero-w-chast-2-podgotovka.351/" target="_blank" rel="noopener noreferrer">Part 2: setup and launch</a>',
      meestExpress: 'My first discovered vulnerability: research into Meest Express authorization logic and a scenario that could allow access to user accounts.<br><br><a href="https://codeby.net/threads/poluchaem-dostup-k-akkauntam-meest-express-moja-pervaja-najdennaja-ujazvimost.70233/" target="_blank" rel="noopener noreferrer">Read the article on Codeby.net</a>',
      whosHome: 'An ESP8266-based device for detecting users in a room through network activity.<br><br><a href="https://codeby.net/threads/opredelyayem-kto-doma-s-pomoshch-yu-esp8266.66662/" target="_blank" rel="noopener noreferrer">Read the article</a>',
      deauthDetector: 'A Wi-Fi client deauthentication detector: an experimental project for spotting suspicious disconnect/deauth events in a wireless network.',
      yaraAntivirus: 'An educational project for building a signature-based antivirus in C# using YARA rules to identify suspicious files.',
      hellion: 'A research project implementing an RMS trojan in a controlled lab environment to understand remote-control techniques and defensive measures.',
      closedOsintTool: 'A closed NDA project for a specific client: a series of scripts and modules for a complex OSINT tool that searched for a person’s digital footprint by phone number, email, and other initial identifiers.<br><br>The task involved aggregating public traces from social networks and open sources, including Avito, QIWI, Mail.ru, Odnoklassniki, VK, Facebook, Instagram, and other platforms. Conceptually, it was an aggregated people-search tool similar to products such as “Glaz Boga”, but built for the client’s internal scenario.<br><br>The project was delivered to a working state, but implementation details, architecture, collection methods, client identity, and results are not disclosed because of NDA obligations, data sensitivity, and legal-risk considerations. In the public portfolio, the case is described only at the level of role, task class, and general outcome.',
    },
    teleprompter: {
      info: {
        eyebrow: 'Front + Back case',
        title: 'Teleprompter Automatic',
        lead: 'An app for video recording, teleprompter-based text reading, script management, built-in editing, and remote control through a web panel and Apple Watch.',
        platforms: {
          items: ['iOS app', 'Web panel', 'Backend logic', 'Apple Watch control'],
        },
        roleLabel: 'About the app',
        roleTitle: 'Functionality for the full recording workflow',
        roleLead: 'Teleprompter Automatic combines video recording, text reading, script handling, editing, and remote control into a single product flow.',
        scopeLabel: 'Core focus',
        scopeText: 'The main focus is the full workflow: from script preparation and recording to post-processing, synchronization, and remote control.',
        mobileGalleryEyebrow: 'iOS interface',
        mobileGalleryTitle: 'Mobile product screens',
        webGalleryEyebrow: 'Web + backend',
        webGalleryTitle: 'Web panel and backend flows',
        webGalleryLead: 'Below is a dedicated set of screens for the web side of the project. These views cover subscription management, script operations, remote control, and other backend-dependent product flows.',
        capture: {
          title: 'Capture and camera',
          items: [
            'Video recording in multiple resolutions with full camera and media-processing logic.',
            'Real-time image processing including filters, background blur, and custom background overlays.',
            'Recording, teleprompter behavior, and editing combined into one continuous in-app workflow.',
          ],
        },
        teleprompter: {
          title: 'Teleprompter engine',
          items: [
            'Multiple script-scrolling modes tailored to different recording formats and text-reading styles.',
            'Fixed-speed, adaptive, and jump-to-position flows so the script can follow the required point during recording.',
            'Comfortable script control during the actual recording process.',
          ],
        },
        scripts: {
          title: 'Scripts and text workflow',
          items: [
            'Custom script creation, storage, and editing with a flexible text workflow.',
            'Import support for external sources including PDF, TXT, and other text-based formats.',
            'A folder and subfolder hierarchy for structured script libraries.',
          ],
        },
        editor: {
          title: 'Built-in video editor',
          items: [
            'An extended post-processing toolset including mirroring, rotation, crop, trim, and playback speed controls.',
            'Advanced text overlays with custom fonts, colors, spacing, background images, solid fills, gradients, and visual effects.',
            'Compositing workflows such as video merging, custom image overlays, background blur via segmentation, and background replacement via segmentation and green screen.',
          ],
        },
        web: {
          title: 'Web panel and backend',
          items: [
            'The web panel supports subscription management, script handling, and remote product scenarios.',
            'The backend includes APIs for data synchronization between devices, remote scroll control, and server-driven product behavior.',
            'Because of that, the project includes not only the mobile app, but also a full web/backend part.',
          ],
        },
        watch: {
          title: 'Apple Watch integration',
          items: [
            'Teleprompter scroll control through Apple Watch as a dedicated remote interaction surface.',
            'A hands-free recording flow with more practical on-set control.',
          ],
        },
      },
    },
  },
  restrictedProjectsNotice: {
    title: 'Restricted projects',
    description: [
      'Some projects are not publicly displayed in the portfolio due to legal restrictions or the sensitive nature of information security-related work.',
      'This includes vulnerability research and security analysis. Such projects are shared only upon request in private discussions, following responsible disclosure principles.',
    ],
  },
  antiAiNotice: {
    badge: 'Anti vibe coding notice',
    title: 'Almost everything here was built by hand, without vibe coding.',
    lead: 'About 95% of these projects came from actual engineering, manual decisions, debugging, and careful delivery.',
    description: [
      'I do use AI as a tool when it genuinely helps, but not as a substitute for thinking and ownership.',
    ],
  },
} as const
