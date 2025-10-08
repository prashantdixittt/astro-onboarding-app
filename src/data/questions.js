export const knowledgeQuestions = [
  {
    id: 1,
    question: "Hi, I am Priya, born on 15/08/1995, in Mumbai, Maharashtra at 14:30. When will I get married?",
    correctAnswer: "Based on your birth details, you are a Leo with strong 7th house influences. Marriage prospects are favorable between ages 26-29, particularly during Jupiter's transit through your 7th house. The period from March 2024 to May 2025 shows strong marriage indicators. Focus on strengthening Venus in your chart through wearing white on Fridays and donating to charities supporting women.",
    language: "english"
  },
  {
    id: 2,
    question: "Namaste, main Rahul hun, 22/12/1990 ko Lucknow, UP mein subah 6:15 baje paida hua tha. Mere career mein kab success milegi?",
    correctAnswer: "Aapka janam Capricorn rashi mein hua hai aur 10th house mein Saturn ka strong influence hai. Career mein success 32-35 ki umar ke beech expected hai. Saturn return ke baad (2023-2024) se aapke career mein steady growth dikhega. Blue sapphire stone aur Saturday ko Hanuman Chalisa padhna beneficial rahega. Government sector ya structured jobs mein better prospects hain.",
    language: "hindi"
  },
  {
    id: 3,
    question: "Hello, I'm Anjali, born on 03/06/1992, in Delhi at 20:45. What does my financial future look like?",
    correctAnswer: "Being a Gemini with Moon in the 2nd house, your financial growth will be gradual but steady. The period after age 30 shows significant improvement in wealth accumulation. Avoid risky investments until 2025. Property investments after 2026 will be highly beneficial. Wear emerald stone and chant Lakshmi mantras on Fridays for enhanced financial prosperity.",
    language: "english"
  },
  {
    id: 4,
    question: "Main Suresh hun, 10/01/1988 ko Pune, Maharashtra mein raat 11:20 baje janam hua. Meri health ke bare mein batayiye.",
    correctAnswer: "Aap Capricorn ascendant hain aur 6th house mein Mars ki presence hai. Health ke liye extra care ki zarurat hai, especially bones aur joints ki. 35 ke baad regular exercise aur yoga zaruri hai. Saturn ki placement digestive issues de sakti hai. Red coral stone beneficial rahega aur Tuesday ko Hanuman ji ki pooja karni chahiye. Turmeric milk daily lena good rahega.",
    language: "hindi"
  },
  {
    id: 5,
    question: "Hi, I'm Deepak, born on 28/09/1985, in Bangalore, Karnataka at 16:00. Will I succeed in my business venture?",
    correctAnswer: "As a Libra with strong Mars in the 10th house, business success is indicated but requires patience. The period from 2024-2027 is excellent for establishing new ventures. Partnership businesses will be more successful than solo ventures. Avoid major investments during Mercury retrograde periods. Wear diamond or white sapphire and donate to educational institutions for business growth.",
    language: "english"
  }
];

export const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * knowledgeQuestions.length);
  return knowledgeQuestions[randomIndex];
};