"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import {
  moodEmotions,
  quadrantMeta,
  type MoodEmotion,
  type MoodQuadrant,
} from "@/data/moodMeter";

type Language = "ko" | "en";

type NavItem = {
  id: string;
  label: string;
};

type TranslationCopy = {
  languageLabel: string;
  languageShort: string;
  nav: NavItem[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  why: {
    title: string;
    description: string;
    cards: { title: string; description: string }[];
  };
  pipeline: {
    title: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  library: {
    title: string;
    description: string;
    callout: string;
    filters: {
      all: string;
      yellow: string;
      red: string;
      green: string;
      blue: string;
    };
    axes: {
      energyHigh: string;
      energyLow: string;
      pleasantHigh: string;
      pleasantLow: string;
    };
  };
  ritual: {
    eyebrow: string;
    title: string;
    description: string;
    features: { title: string; description: string }[];
  };
  tech: {
    title: string;
    description: string;
    points: { title: string; description: string }[];
    meta: string;
  };
  testimonials: {
    title: string;
    items: { quote: string; name: string; role: string }[];
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  footer: {
    whisper: string;
  };
};

const translations: Record<Language, TranslationCopy> = {
  ko: {
    languageLabel: "한국어",
    languageShort: "KO",
    nav: [
      { id: "why", label: "왜 Auto Zen Garden인가" },
      { id: "pipeline", label: "경험 흐름" },
      { id: "ritual", label: "감정 리추얼" },
      { id: "library", label: "감정 라이브러리" },
      { id: "testimonials", label: "정원의 목소리" },
      { id: "faq", label: "FAQ" },
    ],
    hero: {
      eyebrow: "AI 반려돌 감정 정원",
      title: "대화가 감정으로 감정이 모래 위의 예술로",
      description:
        "Zen Garden 앱은 반려돌과 나눈 대화를 실시간 감정 분석과 샌드 아트 패턴으로 번역합니다. 그레이 톤의 감성 UI와 자동화된 기술이 어우러져, 도시 속에서도 차분한 리추얼을 발견하게 됩니다.",
    },
    why: {
      title: "왜 Auto Zen Garden인가",
      description:
        "반려돌과의 대화를 통해 감정을 재발견하고, 그것이 모래 위 시각 언어로 번져 나가는 과정을 한 자리에서 경험할 수 있습니다.",
      cards: [
        {
          title: "깊어진 자기 통찰",
          description:
            "대화 내용이 감정 분석 리포트로 정리되어, 내가 느낀 감정을 다른 각도에서 확인할 수 있습니다.",
        },
        {
          title: "감성적인 정서 회복",
          description:
            "감정에 맞는 색과 패턴이 시각적 휴식을 제공합니다. 조용한 인터랙션이 마음을 안정시킵니다.",
        },
        {
          title: "기억에 남는 예술적 흔적",
          description:
            "샌드 패턴은 매번 달라집니다. 정원에서 기록된 감정은 나만의 감정 지도이자 새로운 예술이 됩니다.",
        },
      ],
    },
    pipeline: {
      title: "대화가 예술이 되는 흐름",
      description:
        "앱은 대화를 끊지 않고 감정을 포착하고, 모래 위에서 즉시 패턴으로 번역합니다.",
      steps: [
        {
          title: "1. 반려돌과 대화",
          description:
            "따뜻하고 호기심 많은 톤으로 반려돌이 이야기를 이끕니다. 최소 다섯 턴 이후 자동 감정 분석이 시작됩니다.",
        },
        {
          title: "2. 감정 분석",
          description:
            "OpenAI Responses API가 감정을 구조화해 대표 감정, 신뢰도, 상위 감정 스코어를 제시합니다.",
        },
        {
          title: "3. 모래 패턴 탄생",
          description:
            "분석된 감정과 매핑된 G-code가 Zen Garden 하드웨어로 전송되어 차분한 패턴을 그려냅니다.",
        },
      ],
    },
    library: {
      title: "감정 무드미터 100",
      description:
        "플리에커–로웬 무드미터 축을 따라 100개의 감정을 한눈에 볼 수 있어요. 활력(세로)과 즐거움(가로) 좌표가 감정의 위치를 보여줍니다.",
      callout:
        "사분면 토글로 감정을 하이라이트하고, 말풍선을 눌러 한국어·영어 이름을 확인해 보세요.",
      filters: {
        all: "전체 감정",
        yellow: "높은 활력 · 즐거움",
        red: "높은 활력 · 불편함",
        green: "낮은 활력 · 즐거움",
        blue: "낮은 활력 · 불편함",
      },
      axes: {
        energyHigh: "높은 활력",
        energyLow: "낮은 활력",
        pleasantHigh: "즐거움",
        pleasantLow: "불편함",
      },
    },
    ritual: {
      eyebrow: "앱 전용 기능",
      title: "나만의 감정 리추얼이 되는 이유",
      description:
        "앱은 단발성 체험에 머무르지 않습니다. 반복 방문할수록 감정 히스토리가 쌓여 나만의 정원이 완성됩니다.",
      features: [
        {
          title: "감정 로그 타임라인",
          description:
            "감정 분석 결과가 날짜별로 저장되어, 지난 패턴과 감정 변화를 한눈에 볼 수 있습니다.",
        },
        {
          title: "패턴 히스토리 갤러리",
          description:
            "직접 체험한 모래 패턴이 이미지 클립으로 아카이빙되어 감정 지도처럼 누적됩니다.",
        },
        {
          title: "돌의 부드러운 속삭임",
          description:
            "반려돌은 같은 질문을 반복하지 않고, 사용자의 키워드를 되짚어 주며 대화를 이어갑니다.",
        },
      ],
    },
    tech: {
      title: "조용한 안정성을 만드는 기술",
      description:
        "감성적인 프런트 경험 뒤에는 안전한 기술 스택이 작동합니다. 운영자는 최소 개입으로 안정적인 순환을 보장합니다.",
      points: [
        {
          title: "OpenAI Responses API",
          description:
            "감정 추출과 분석 결과를 구조화된 JSON으로 제공해 대화가 끊기지 않습니다.",
        },
        {
          title: "Firebase 세션 저장",
          description:
            "세션별 메시지, 감정 결과, 패턴 상태를 저장해 재방문 시 동일한 감정을 이어갈 수 있습니다.",
        },
        {
          title: "GRBL 기반 샌드 패턴",
          description:
            "Arduino Uno와 gShield가 감정에 맞는 G-code 패턴을 안정적으로 실행하고 진행률을 피드합니다.",
        },
      ],
      meta: "모든 데이터는 비공개 환경에서 처리되며, .env로 키가 관리됩니다.",
    },
    testimonials: {
      title: "정원이 건네온 목소리",
      items: [
        {
          quote:
            "대화를 나눌수록 반려돌이 내 감정을 비춰주는 거울이 되었어요. 모래 패턴을 보는 순간 마음이 정리됐습니다.",
          name: "현우",
          role: "관람객",
        },
        {
          quote:
            "전시 현장을 운영하면서도 앱이 세션을 자동으로 리셋해 주니 관람 동선이 매끄러웠습니다.",
          name: "지은",
          role: "큐레이터",
        },
        {
          quote:
            "AI와 인터랙티브 아트가 이렇게 부드럽게 결합된 사례는 드뭅니다. 감정 데이터가 예술로 확장되는 순간이 인상적입니다.",
          name: "Leo",
          role: "Creative Technologist",
        },
      ],
    },
    faq: {
      title: "자주 묻는 질문",
      items: [
        {
          question: "체험은 어떤 방식으로 진행되나요?",
          answer:
            "앱에서 반려돌과 대화를 나누면, 자동으로 감정 분석이 실행되고 패턴 실행을 요청할 수 있습니다. 대화는 감정 분석 중에도 지속됩니다.",
        },
        {
          question: "얼마나 시간이 걸리나요?",
          answer:
            "평균 3~5분 정도 대화를 나누고 감정 분석을 확인한 뒤 패턴을 실행합니다. 패턴 실행은 5~10분 정도 소요됩니다.",
        },
        {
          question: "접근성은 어떤가요?",
          answer:
            "큰 글자, 높은 대비의 다크 테마, 44px 이상의 버튼을 적용했습니다. 네트워크 장애 시에는 임시 감정 결과로 상황을 안내합니다.",
        },
        {
          question: "네트워크가 불안정하면 어떻게 되나요?",
          answer:
            "감정 분석 응답이 실패하면 앱이 mock 결과를 표시하고, 안정화 이후 다시 분석 시도를 안내합니다.",
        },
      ],
    },
    footer: {
      whisper: "“정원은 늘 여기서 너를 기다리고 있어.” – 반려돌",
    },
  },
  en: {
    languageLabel: "English",
    languageShort: "EN",
    nav: [
      { id: "why", label: "Why Auto Zen Garden" },
      { id: "pipeline", label: "How It Flows" },
      { id: "ritual", label: "Ritual Loop" },
      { id: "library", label: "Emotion Library" },
      { id: "testimonials", label: "Voices" },
      { id: "faq", label: "FAQ" },
    ],
    hero: {
      eyebrow: "AI Companion Sand Garden",
      title: "When conversation turns into emotion and art",
      description:
        "Auto Zen Garden translates your dialogue with a gentle AI companion into real-time emotion analysis and sand art patterns. Immersive dark aesthetics and calm automation shape a ritual you can always return to.",
    },
    why: {
      title: "Why people fall for Auto Zen Garden",
      description:
        "You witness your feelings being mirrored, understood, and finally painted as living sand art—without ever breaking the conversation.",
      cards: [
        {
          title: "Deeper self insight",
          description:
            "Dialogue is distilled into clear emotion summaries so you can look at your feelings from a gentle new angle.",
        },
        {
          title: "Sensory emotional care",
          description:
            "Color, light, and motion align with the detected emotion, giving your mind a momentary breathing space.",
        },
        {
          title: "Memorable visual language",
          description:
            "Each sand pattern is unique. Your session becomes a personal emotion map you can revisit in the app.",
        },
      ],
    },
    pipeline: {
      title: "How conversation becomes art",
      description:
        "The app keeps the dialogue alive while your emotions are analysed and rendered into calming sand choreography.",
      steps: [
        {
          title: "1. Share with the companion stone",
          description:
            "A caring, curious tone guides the exchange. After at least five turns, the first automated analysis begins.",
        },
        {
          title: "2. Emotion insight arrives",
          description:
            "OpenAI Responses API delivers structured results with confidence, top emotions, and a reflective summary.",
        },
        {
          title: "3. Sand pattern takes shape",
          description:
            "Mapped G-code streams to the Zen Garden hardware, turning emotion metadata into graceful motion.",
        },
      ],
    },
    library: {
      title: "Mood Meter · 100 Emotions",
      description:
        "Explore the Plutchik–Löwen mood meter across energy (vertical) and pleasantness (horizontal). Each dot keeps the companion app’s emotion palette within reach.",
      callout:
        "Toggle quadrants to highlight regions. Hover or tap an emotion to see its bilingual name.",
      filters: {
        all: "All emotions",
        yellow: "High Energy · Pleasant",
        red: "High Energy · Unpleasant",
        green: "Low Energy · Pleasant",
        blue: "Low Energy · Unpleasant",
      },
      axes: {
        energyHigh: "High Energy",
        energyLow: "Low Energy",
        pleasantHigh: "Pleasant",
        pleasantLow: "Unpleasant",
      },
    },
    ritual: {
      eyebrow: "App-only rituals",
      title: "Why the app becomes a personal sanctuary",
      description:
        "Beyond a single exhibit visit, your app keeps gathering feelings and patterns so the garden grows with you.",
      features: [
        {
          title: "Emotion log timeline",
          description:
            "Every analysis is stored by session, helping you trace emotional shifts with ease.",
        },
        {
          title: "Pattern history gallery",
          description:
            "Captured sand patterns live inside the app, forming a private atlas of your experiences.",
        },
        {
          title: "Soft-spoken companion",
          description:
            "The AI stone avoids repetitive questions and reflects your keywords to keep the flow organic.",
        },
      ],
    },
    tech: {
      title: "Technology that keeps the calm",
      description:
        "Under the poetic interface sits a resilient stack, letting operators focus on storytelling instead of troubleshooting.",
      points: [
        {
          title: "OpenAI Responses API",
          description:
            "Structured outputs keep dialogue and analysis in sync without abrupt stops.",
        },
        {
          title: "Firebase session layer",
          description:
            "Session states, emotion results, and pattern progress persist for continuity across visits.",
        },
        {
          title: "GRBL-driven choreography",
          description:
            "Arduino Uno with gShield streams precise G-code, reporting progress back in real time.",
        },
      ],
      meta: "All secrets stay offline inside the exhibit network. Environment variables guard the keys.",
    },
    testimonials: {
      title: "Voices from the garden",
      items: [
        {
          quote:
            "The companion stone mirrored my mood without judgment. Watching the sand move felt like reading my own diary.",
          name: "Hannah",
          role: "Visitor",
        },
        {
          quote:
            "Automation kept the flow steady. We welcomed more guests with less intervention—pure magic for curators.",
          name: "Mina",
          role: "Curator",
        },
        {
          quote:
            "Few installations marry AI and tangible art this gracefully. Emotion data blossoming into patterns is irresistible.",
          name: "Elias",
          role: "Creative Technologist",
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          question: "How does the experience unfold?",
          answer:
            "You chat with the companion stone, emotions are analysed automatically after several turns, and you can trigger the sand pattern without ending the dialogue.",
        },
        {
          question: "How long does it take?",
          answer:
            "Expect 3–5 minutes for conversation and insight, then 5–10 minutes for the physical pattern drawing.",
        },
        {
          question: "Is it accessible?",
          answer:
            "Large typography, high-contrast dark theme, and generous buttons support most visitors. If network issues occur, the app displays a temporary mock result.",
        },
        {
          question: "What happens if the network is unstable?",
          answer:
            "The app generates a marked mock analysis and invites you to retry once the connection recovers.",
        },
      ],
    },
    footer: {
      whisper:
        "“The garden is always here, waiting for you.” – Companion Stone",
    },
  },
};

const ASSET_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withAssetPath = (path: string) => `${ASSET_BASE_PATH}${path}`;

const heroImage = {
  src: withAssetPath("/img/main_5.png"),
  alt: {
    ko: "흰 모래 위에서 감정 패턴을 그리는 기계 팔",
    en: "Robotic arm carving emotion patterns into the zen sand bed",
  },
};

const whyCardImages: Array<{ src: string; alt: Record<Language, string> }> = [
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=520&q=80",
    alt: {
      ko: "감정 노트를 기록하는 손",
      en: "Hand journaling emotions in a notebook",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=520&q=80",
    alt: {
      ko: "차분한 조명 속 편안한 라운지",
      en: "Calming lounge space with warm lighting",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1477511801984-4ad318ed9846?auto=format&fit=crop&w=520&q=80",
    alt: {
      ko: "샌드 가든에 그려진 패턴",
      en: "Sand garden intricate pattern",
    },
  },
];

const pipelineStepImages: Array<{ src: string; alt: Record<Language, string> }> =
  [
    {
      src: withAssetPath("/img/talk/1.png"),
      alt: {
        ko: "따뜻한 톤으로 반려돌과 대화하는 장면",
        en: "Conversational moment with the companion stone",
      },
    },
    {
      src: withAssetPath("/img/talk/2.png"),
      alt: {
        ko: "감정 분석이 진행되는 인터페이스",
        en: "Emotion analysis interface in action",
      },
    },
    {
      src: withAssetPath("/img/talk/3.png"),
      alt: {
        ko: "감정을 모래 패턴으로 그려내는 장면",
        en: "Capturing emotions as a sand pattern output",
      },
    },
  ];

const ritualFeatureImages: Array<{ src: string; alt: Record<Language, string> }> =
  [
    {
      src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=520&q=80",
      alt: {
        ko: "앱에서 감정 로그를 확인하는 손",
        en: "Hand scrolling emotion log inside the app",
      },
    },
    {
      src: "https://images.unsplash.com/photo-1526481280695-3c469ecbf885?auto=format&fit=crop&w=520&q=80",
      alt: {
        ko: "아카이브된 패턴 이미지를 전시한 갤러리",
        en: "Gallery wall displaying archived pattern images",
      },
    },
    {
      src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=520&q=80",
      alt: {
        ko: "은은한 빛을 내는 AI 반려돌 스피커",
        en: "AI companion speaker glowing softly",
      },
    },
  ];

const techPointImages: Array<{ src: string; alt: Record<Language, string> }> = [
  {
    src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=520&q=80",
    alt: {
      ko: "정리된 서버 랙과 케이블",
      en: "Organised server rack and cabling",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=520&q=80",
    alt: {
      ko: "센서를 점검 중인 엔지니어",
      en: "Engineer calibrating sensors",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=520&q=80",
    alt: {
      ko: "데이터 보호를 상징하는 조명 설치",
      en: "Light installation symbolising data security",
    },
  },
];

const testimonialBackdrop = {
  src: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
  alt: {
    ko: "정원 설치물을 둘러싼 관람객들",
    en: "Visitors gathered around the garden installation",
  },
};

const quadrantBadgeStyles: Record<MoodQuadrant, string> = {
  yellow:
    "bg-[#D2D2D2]/90 text-[#333239] shadow-[0_12px_30px_rgba(210,210,210,0.26)] ring-1 ring-inset ring-accent-dawn/20",
  red:
    "bg-[#D6D6D6]/90 text-[#333239] shadow-[0_12px_30px_rgba(214,214,214,0.28)] ring-1 ring-inset ring-accent-dawn/18",
  green:
    "bg-[#E8E8E8]/90 text-[#333239] shadow-[0_12px_30px_rgba(232,232,232,0.3)] ring-1 ring-inset ring-accent-dawn/16",
  blue:
    "bg-[#F1F1F1]/90 text-[#333239] shadow-[0_12px_30px_rgba(241,241,241,0.32)] ring-1 ring-inset ring-accent-dawn/14",
};

const hexToRgba = (hex: string, alpha: number) => {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const quadrantOrder: MoodQuadrant[] = ["red", "yellow", "blue", "green"];
const BADGES_PER_ROW = 4;
const ROWS_PER_QUADRANT = 7;

export default function Home() {
  const [language, setLanguage] = useState<Language>("ko");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeQuadrant, setActiveQuadrant] =
    useState<"all" | MoodQuadrant>("all");

  const copy = translations[language];
  const testimonials = copy.testimonials.items;

  useEffect(() => {
    setTestimonialIndex(0);
  }, [language]);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const interval = window.setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(interval);
  }, [testimonials]);

  const navItems = useMemo(() => copy.nav, [copy.nav]);

  const activeTestimonial = testimonials[testimonialIndex];

  const filterOptions = useMemo<
    Array<{ key: "all" | MoodQuadrant; label: string }>
  >(
    () => [
      { key: "all", label: copy.library.filters.all },
      { key: "yellow", label: copy.library.filters.yellow },
      { key: "red", label: copy.library.filters.red },
      { key: "green", label: copy.library.filters.green },
      { key: "blue", label: copy.library.filters.blue },
    ],
    [copy.library.filters],
  );

  const handleQuadrantToggle = useCallback(
    (key: "all" | MoodQuadrant) => {
      if (key === "all") {
        setActiveQuadrant("all");
        return;
      }
      setActiveQuadrant((prev) => (prev === key ? "all" : key));
    },
    [],
  );

  const quadrantEmotions = useMemo(() => {
    return moodEmotions.reduce<Record<MoodQuadrant, MoodEmotion[]>>(
      (acc, emotion) => {
        acc[emotion.quadrant].push(emotion);
        return acc;
      },
      { yellow: [], red: [], green: [], blue: [] },
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-base text-base-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-base-100 opacity-70" />
        <div className="absolute left-[-20%] top-[-20%] h-[420px] w-[420px] rounded-full bg-accent-dawn/20 blur-[160px]" />
        <div className="absolute right-[-30%] top-1/3 h-[480px] w-[480px] rounded-full bg-accent-dawn/15 blur-[180px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[360px] w-[360px] rounded-full bg-accent-dawn/25 blur-[150px]" />
      </div>

      <header className="sticky top-0 z-40 bg-base-100 backdrop-blur-xl shadow-[0_12px_40px_rgba(51,50,57,0.12)]">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <Link
            href="#hero"
            className="flex items-center gap-2 text-sm font-semibold tracking-[0.28em] uppercase text-accent-dawn transition hover:text-accent-dawn"
          >
            Zen Garden
          </Link>

          <div className="hidden items-center gap-4 text-sm md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full px-3 py-1.5 text-base-900/70 transition hover:bg-base-900/10 hover:text-base-900"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-base-900/15 bg-base-900/5 p-1">
            {(Object.keys(translations) as Language[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={clsx(
                  "rounded-full px-3 py-1 text-xs font-semibold transition",
                  language === code
                    ? "bg-accent-dawn text-base-50 shadow-[0_16px_35px_rgba(122,139,132,0.28)]"
                    : "text-base-900/60 hover:text-base-900",
                )}
                aria-pressed={language === code}
              >
                {translations[code].languageShort}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative pb-32 pt-0 lg:pt-0">
        <section
          id="hero"
          className="relative mb-28 w-full overflow-hidden"
        >
          <motion.figure
            initial={{ opacity: 0.65 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt[language]}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.figure>

          <div className="relative mx-auto flex min-h-[600px] max-w-6xl items-center justify-center px-6 py-20 sm:px-10 lg:min-h-[680px]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="max-w-2xl space-y-6 bg-base-900/55 p-8 shadow-[0_24px_60px_rgba(51,50,57,0.3)] backdrop-blur-sm lg:max-w-xl lg:p-10"
            >
              <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/90">
                {copy.hero.eyebrow}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {copy.hero.title}
              </h1>
              <p className="text-base text-white/85 sm:text-lg">
                {copy.hero.description}
              </p>
            </motion.div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <section id="why" className="mb-28 scroll-mt-32">
          <div className="rounded-[40px] bg-base-300 p-8 shadow-[0_30px_80px_rgba(51,50,57,0.08)] sm:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-semibold text-base-900 sm:text-4xl">
                {copy.why.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base text-base-900/70 sm:text-lg">
                {copy.why.description}
              </p>
            </motion.div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {copy.why.cards.map((card, index) => {
                const toneLayers = [
                  "bg-base-100/90",
                  "bg-base-200/80",
                  "bg-base-300/70",
                ];
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={clsx(
                      "rounded-3xl border border-base-900/12 p-6 shadow-[0_18px_38px_rgba(51,50,57,0.08)] backdrop-blur-sm",
                      toneLayers[index % toneLayers.length],
                    )}
                  >
                    <div className="relative mb-4 h-32 overflow-hidden rounded-2xl border border-base-900/12 bg-base-100">
                      <Image
                        src={whyCardImages[index % whyCardImages.length].src}
                        alt={
                          whyCardImages[index % whyCardImages.length].alt[language]
                        }
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 260px, 220px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-base-900/10" />
                    </div>
                    <h3 className="text-lg font-semibold text-base-900">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm text-base-900/65">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          </section>

          <section id="pipeline" className="mb-28 scroll-mt-32">
          <div className="rounded-[40px] bg-base-400 p-8 shadow-[0_34px_88px_rgba(51,50,57,0.08)] sm:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-semibold text-base-900 sm:text-4xl">
                  {copy.pipeline.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base text-base-900/70 sm:text-lg">
                  {copy.pipeline.description}
                </p>
              </motion.div>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {copy.pipeline.steps.map((step, index) => {
                const stepLayers = [
                  "bg-base-100/95",
                  "bg-base-200/85",
                  "bg-base-300/75",
                ];
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className={clsx(
                      "relative overflow-hidden rounded-3xl border border-base-900/12 p-6 shadow-[0_22px_44px_rgba(51,50,57,0.08)] backdrop-blur-sm",
                      stepLayers[index % stepLayers.length],
                    )}
                  >
                    <div className="relative mb-4 h-32 overflow-hidden rounded-2xl border border-base-900/12 bg-base-100">
                      <Image
                        src={
                          pipelineStepImages[index % pipelineStepImages.length].src
                        }
                        alt={
                          pipelineStepImages[index % pipelineStepImages.length].alt[
                            language
                          ]
                        }
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 260px, 220px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-base-900/10" />
                    </div>
                    <h3 className="text-lg font-semibold text-base-900">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm text-base-900/65">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          </section>

          <section id="ritual" className="mb-28 scroll-mt-32">
          <div className="rounded-[40px] bg-base-100 p-8 shadow-[0_32px_84px_rgba(51,50,57,0.08)] sm:p-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-110px" }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center rounded-full border border-base-900/10 bg-base-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-base-900/70">
                {copy.ritual.eyebrow}
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-base-900 sm:text-4xl">
                {copy.ritual.title}
              </h2>
              <p className="mt-4 text-base text-base-900/70 sm:text-lg">
                {copy.ritual.description}
              </p>
            </motion.div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {copy.ritual.features.map((feature, index) => {
                const featureImage =
                  ritualFeatureImages[index % ritualFeatureImages.length];
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-110px" }}
                    transition={{ duration: 0.6, delay: index * 0.06 }}
                    className="rounded-3xl border border-base-900/10 bg-base-50/80 p-6 shadow-[0_20px_44px_rgba(51,50,57,0.08)] backdrop-blur-sm"
                  >
                    <div className="relative mb-4 h-32 overflow-hidden rounded-2xl border border-base-900/10 bg-base-200">
                      <Image
                        src={featureImage.src}
                        alt={featureImage.alt[language]}
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 260px, 220px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-base-900/10" />
                    </div>
                    <h3 className="text-lg font-semibold text-base-900">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm text-base-900/65">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          </section>

          <section id="library" className="mb-28 scroll-mt-32">
          <div className="rounded-[40px] bg-base-200 p-8 shadow-[0_36px_96px_rgba(51,50,57,0.08)] sm:p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-140px" }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h2 className="text-3xl font-semibold text-base-900 sm:text-4xl">
                {copy.library.title}
              </h2>
              <p className="mt-4 text-base text-base-900/70 sm:text-lg">
                {copy.library.description}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                {filterOptions.map((option) => {
                  const isActive = activeQuadrant === option.key;
                  const isQuadrant = option.key !== "all";
                  const quadrantKey =
                    option.key === "all" ? "yellow" : option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleQuadrantToggle(option.key)}
                      className={clsx(
                        "border rounded-full px-4 py-2 font-semibold uppercase tracking-[0.18em] transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent-dawn/40",
                        isActive
                          ? isQuadrant
                            ? clsx(
                                "border-transparent text-base-900 shadow-[0_16px_32px_rgba(51,50,57,0.12)]",
                                quadrantBadgeStyles[quadrantKey as MoodQuadrant],
                              )
                            : "border-transparent bg-accent-dawn text-base-50 shadow-[0_16px_35px_rgba(122,139,132,0.28)]"
                          : "border-base-900/20 text-base-900/60 hover:border-accent-dawn/40 hover:bg-accent-dawn/10 hover:text-accent-dawn",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 max-w-2xl text-sm text-base-900/60 sm:text-base">
                {copy.library.callout}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6 }}
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {quadrantOrder.map((quadrant) => {
                const emotions = quadrantEmotions[quadrant];
                const rows = chunkArray(emotions, BADGES_PER_ROW);
                while (rows.length < ROWS_PER_QUADRANT) {
                  rows.push([]);
                }
                const isHighlighted =
                  activeQuadrant === "all" || activeQuadrant === quadrant;
                const meta =
                  language === "ko"
                    ? quadrantMeta[quadrant].labelKo
                    : quadrantMeta[quadrant].labelEn;
                return (
                  <div
                    key={quadrant}
                    className={clsx(
                      "relative overflow-hidden rounded-3xl border border-base-900/12 p-5 sm:p-6 transition",
                      isHighlighted ? "opacity-100" : "opacity-45",
                    )}
                    style={{
                      background: hexToRgba(quadrantMeta[quadrant].color, 0.16),
                      boxShadow: isHighlighted
                        ? `0 18px 40px ${hexToRgba(quadrantMeta[quadrant].color, 0.18)}`
                        : undefined,
                    }}
                  >
                    <div className="absolute inset-0 bg-accent-dawn/15" />
                    <div className="relative flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.28em] text-base-900/70 sm:text-xs">
                      <span>{meta}</span>
                      <span className="text-base-900/40">
                        {emotions.length.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <div className="relative mt-4 flex flex-col gap-2">
                      {rows.map((row, rowIndex) => (
                        <div
                          key={`${quadrant}-row-${rowIndex}`}
                          className="grid grid-cols-4 gap-2"
                        >
                          {Array.from({ length: BADGES_PER_ROW }).map(
                            (_, colIndex) => {
                              const emotion = row[colIndex];
                              if (!emotion) {
                                return (
                                  <span
                                    key={`${quadrant}-placeholder-${rowIndex}-${colIndex}`}
                                    className="h-9 w-full rounded-full invisible"
                                    aria-hidden="true"
                                  />
                                );
                              }
                              const primaryLabel =
                                language === "ko"
                                  ? emotion.nameKo
                                  : emotion.nameEn;
                              const secondaryLabel =
                                language === "ko"
                                  ? emotion.nameEn
                                  : emotion.nameKo;
                              return (
                                <motion.span
                                  key={emotion.id}
                                  className={clsx(
                                    "inline-flex w-full min-h-[36px] flex-col items-center justify-center rounded-full px-3 py-1 text-[10px] font-semibold leading-tight text-base-900/80 sm:px-4 sm:text-xs",
                                    quadrantBadgeStyles[emotion.quadrant],
                                  )}
                                  animate={{
                                    opacity: isHighlighted ? 1 : 0.45,
                                    scale: isHighlighted ? 1 : 0.95,
                                  }}
                                  transition={{ duration: 0.3, ease: "easeOut" }}
                                  title={`${emotion.nameKo} · ${emotion.nameEn}`}
                                >
                                  <span>{primaryLabel}</span>
                                  <span className="text-[9px] font-medium opacity-75">
                                    {secondaryLabel}
                                  </span>
                                </motion.span>
                              );
                            },
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
          </section>

          <section id="tech" className="mb-28 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7 }}
            className="rounded-[40px] bg-base-400 p-6 shadow-[0_34px_88px_rgba(51,50,57,0.08)] sm:p-12 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-semibold text-base-900 sm:text-4xl">
              {copy.tech.title}
            </h2>
            <p className="mt-4 text-base text-base-900/70 sm:text-lg">
              {copy.tech.description}
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {copy.tech.points.map((point, index) => {
                const techLayers = [
                  "bg-base-100/90",
                  "bg-base-200/80",
                  "bg-base-300/70",
                ];
                return (
                  <div
                    key={point.title}
                    className={clsx(
                      "rounded-3xl border border-base-900/12 p-6 shadow-[0_18px_38px_rgba(51,50,57,0.08)]",
                      techLayers[index % techLayers.length],
                    )}
                  >
                    <div className="relative mb-4 h-28 overflow-hidden rounded-2xl border border-base-900/12 bg-base-100">
                      <Image
                        src={techPointImages[index % techPointImages.length].src}
                        alt={
                          techPointImages[index % techPointImages.length].alt[
                            language
                          ]
                        }
                        fill
                        sizes="(min-width: 1024px) 260px, (min-width: 640px) 220px, 200px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-base-900/10" />
                    </div>
                    <h3 className="text-base font-semibold text-base-900">
                      {point.title}
                    </h3>
                    <p className="mt-3 text-sm text-base-900/65">
                      {point.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.35em] text-base-900/40">
              {copy.tech.meta}
            </p>
          </motion.div>
          </section>

          <section id="testimonials" className="mb-28 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="rounded-[40px] bg-base-200 p-6 shadow-[0_30px_80px_rgba(51,50,57,0.08)] sm:p-12"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-base-900 sm:text-4xl">
                  {copy.testimonials.title}
                </h2>
                <p className="mt-3 text-sm text-accent-dawn/80">
                  {testimonialIndex + 1} / {testimonials.length}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIndex(
                      (testimonialIndex - 1 + testimonials.length) %
                        testimonials.length,
                    )
                  }
                  className="rounded-full border border-accent-dawn/30 p-2 text-accent-dawn transition hover:bg-accent-dawn/10 hover:text-accent-dawn"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIndex(
                      (testimonialIndex + 1) % testimonials.length,
                    )
                  }
                  className="rounded-full border border-accent-dawn/30 p-2 text-accent-dawn transition hover:bg-accent-dawn/10 hover:text-accent-dawn"
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-6 lg:flex-row">
              <div className="relative h-60 flex-1 overflow-hidden rounded-3xl border border-base-900/12 bg-base-100">
                <Image
                  src={testimonialBackdrop.src}
                  alt={testimonialBackdrop.alt[language]}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-base-900/10" />
              </div>
              <div className="relative min-h-[200px] flex-1 rounded-3xl border border-base-900/12 bg-base-100/95 p-6 shadow-[0_18px_36px_rgba(51,50,57,0.08)]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={`${activeTestimonial.name}-${language}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-4 text-lg text-base-900/80 sm:text-xl"
                  >
                    <p>“{activeTestimonial.quote}”</p>
                    <footer className="text-sm uppercase tracking-[0.32em] text-base-900/50">
                      {activeTestimonial.name} · {activeTestimonial.role}
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
          </section>

          <section id="faq" className="mb-28 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[40px] bg-base-300 p-6 shadow-[0_34px_88px_rgba(51,50,57,0.08)] sm:p-12"
          >
            <h2 className="text-3xl font-semibold text-base-900 sm:text-4xl">
              {copy.faq.title}
            </h2>
            <div className="mt-8 space-y-4">
              {copy.faq.items.map((item, index) => {
                const faqLayers = [
                  "bg-base-100/90",
                  "bg-base-200/80",
                  "bg-base-300/75",
                ];
                return (
                  <details
                    key={item.question}
                    className={clsx(
                      "group rounded-3xl border border-base-900/12 p-6 backdrop-blur-sm transition",
                      faqLayers[index % faqLayers.length],
                    )}
                  >
                    <summary className="cursor-pointer text-lg font-semibold text-base-900 transition group-open:text-accent-dawn">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm text-base-900/70">{item.answer}</p>
                  </details>
                );
              })}
            </div>
          </motion.div>
          </section>
        </div>
      </main>

      <footer className="bg-base-100 px-6 py-8 text-center text-sm text-base-900/50 shadow-[0_-12px_32px_rgba(51,50,57,0.12)]">
        {copy.footer.whisper}
      </footer>

    </div>
  );
}
