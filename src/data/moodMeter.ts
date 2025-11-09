export type MoodQuadrant = "yellow" | "red" | "green" | "blue";

export interface MoodEmotion {
  id: string;
  nameKo: string;
  nameEn: string;
  quadrant: MoodQuadrant;
  slot: number;
}

const createQuadrant = (
  quadrant: MoodQuadrant,
  pairs: Array<[string, string]>,
): MoodEmotion[] =>
  pairs.map(([nameKo, nameEn], index) => ({
    id: `${quadrant}-${index + 1}`,
    nameKo,
    nameEn,
    quadrant,
    slot: index,
  }));

const yellowPairs: Array<[string, string]> = [
  ["환희", "Elation"],
  ["활기찬", "Lively"],
  ["열정적인", "Passionate"],
  ["들뜬", "Buoyant"],
  ["영감을 받은", "Inspired"],
  ["희망찬", "Hopeful"],
  ["자신감 있는", "Confident"],
  ["승리감", "Triumphant"],
  ["쾌활한", "Cheerful"],
  ["흥분된", "Excited"],
  ["호기심 많은", "Curious"],
  ["낙관적인", "Optimistic"],
  ["고무된", "Motivated"],
  ["감탄하는", "In Awe"],
  ["기쁨이 넘치는", "Joyful"],
  ["열망하는", "Ambitious"],
  ["도전적인", "Adventurous"],
  ["빛나는", "Radiant"],
  ["유쾌한", "Playful"],
  ["몰입한", "Engaged"],
  ["열렬한", "Fervent"],
  ["감동한", "Moved"],
  ["자발적인", "Proactive"],
  ["생동감 있는", "Vibrant"],
  ["열광적인", "Ebullient"],
];

const redPairs: Array<[string, string]> = [
  ["분노한", "Angry"],
  ["격분한", "Furious"],
  ["짜증난", "Irritated"],
  ["초조한", "Restless"],
  ["불안한", "Anxious"],
  ["긴장한", "Tense"],
  ["압박받는", "Pressured"],
  ["질투하는", "Jealous"],
  ["경계하는", "Guarded"],
  ["당혹스러운", "Flustered"],
  ["불만스러운", "Dissatisfied"],
  ["좌절한", "Frustrated"],
  ["과부하된", "Overloaded"],
  ["격앙된", "Agitated"],
  ["예민한", "Edgy"],
  ["성급한", "Impatient"],
  ["놀란", "Alarmed"],
  ["과민한", "Hypersensitive"],
  ["속이 끓는", "Seething"],
  ["불의에 분개한", "Indignant"],
  ["흥분한", "Shaken"],
  ["긴급한", "Urgent"],
  ["초조한", "Hyperfocused"],
  ["방어적인", "Defensive"],
  ["위협을 느낀", "Threatened"],
];

const greenPairs: Array<[string, string]> = [
  ["평온한", "Serene"],
  ["차분한", "Calm"],
  ["고요한", "Still"],
  ["안도한", "Relieved"],
  ["온화한", "Gentle"],
  ["감사한", "Thankful"],
  ["만족한", "Content"],
  ["따뜻한", "Warm"],
  ["안정된", "Settled"],
  ["휴식하는", "Restful"],
  ["균형 잡힌", "Balanced"],
  ["성찰하는", "Reflective"],
  ["유연한", "Flexible"],
  ["사려 깊은", "Considerate"],
  ["포근한", "Cozy"],
  ["온정 어린", "Affectionate"],
  ["자애로운", "Kindhearted"],
  ["느긋한", "Easygoing"],
  ["수용적인", "Accepting"],
  ["넉넉한", "Generous"],
  ["믿음직한", "Trusting"],
  ["든든한", "Grounded"],
  ["평정심 있는", "Even-keeled"],
  ["회복된", "Recovered"],
  ["개방된", "Open"],
];

const bluePairs: Array<[string, string]> = [
  ["무기력한", "Lethargic"],
  ["우울한", "Depressed"],
  ["슬픈", "Sad"],
  ["허탈한", "Deflated"],
  ["지친", "Fatigued"],
  ["외로운", "Lonely"],
  ["불안정한", "Unsteady"],
  ["공허한", "Empty"],
  ["실망한", "Disappointed"],
  ["후회하는", "Regretful"],
  ["주저하는", "Hesitant"],
  ["위축된", "Withdrawn"],
  ["냉담한", "Apathetic"],
  ["비탄에 잠긴", "Grief-stricken"],
  ["침체된", "Stagnant"],
  ["혼란스러운", "Confused"],
  ["망연자실한", "Despondent"],
  ["의욕 없는", "Unmotivated"],
  ["무심한", "Detached"],
  ["불만족스러운", "Unfulfilled"],
  ["절망적인", "Hopeless"],
  ["멍한", "Dazed"],
  ["상실감 있는", "Bereft"],
  ["소극적인", "Passive"],
  ["불확실한", "Uncertain"],
];

export const moodEmotions: MoodEmotion[] = [
  ...createQuadrant("yellow", yellowPairs),
  ...createQuadrant("red", redPairs),
  ...createQuadrant("green", greenPairs),
  ...createQuadrant("blue", bluePairs),
];

export const quadrantMeta: Record<
  MoodQuadrant,
  {
    labelKo: string;
    labelEn: string;
    color: string;
  }
> = {
  yellow: {
    labelKo: "높은 활력 · 즐거움",
    labelEn: "High Energy · Pleasant",
    color: "#F8E27A",
  },
  red: {
    labelKo: "높은 활력 · 불편함",
    labelEn: "High Energy · Unpleasant",
    color: "#FF9A7A",
  },
  green: {
    labelKo: "낮은 활력 · 즐거움",
    labelEn: "Low Energy · Pleasant",
    color: "#8DE0C0",
  },
  blue: {
    labelKo: "낮은 활력 · 불편함",
    labelEn: "Low Energy · Unpleasant",
    color: "#7AA6FF",
  },
};
