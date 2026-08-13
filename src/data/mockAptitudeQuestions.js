export const MOCK_APTITUDE_CATEGORIES = [
  { id: 'quant', title: 'Quantitative Aptitude', count: 45, icon: 'Calculator', desc: 'Percentages, Speed & Distance, Profit & Loss, Probability, Algebra' },
  { id: 'logical', title: 'Logical Reasoning', count: 38, icon: 'BrainCircuit', desc: 'Syllogisms, Blood Relations, Seating Arrangements, Coding-Decoding' },
  { id: 'verbal', title: 'Verbal Ability', count: 32, icon: 'BookOpen', desc: 'Grammar, Reading Comprehension, Synonyms, Sentence Completion' },
  { id: 'di', title: 'Data Interpretation', count: 25, icon: 'BarChart3', desc: 'Pie Charts, Bar Graphs, Tables, Line Charts & Data Sufficiency' }
];

export const MOCK_APTITUDE_QUESTIONS = {
  quant: [
    {
      id: 'q-1',
      question: 'A train 150 meters long is running at a speed of 54 km/hr. How long will it take to pass a telegraph post?',
      options: ['8 seconds', '10 seconds', '12 seconds', '15 seconds'],
      correctIndex: 1,
      explanation: 'Speed = 54 * (5/18) = 15 m/sec. Distance = 150 meters. Time = Distance / Speed = 150 / 15 = 10 seconds.'
    },
    {
      id: 'q-2',
      question: 'If a sweater is sold for $480 at a gain of 20%, what was the cost price of the sweater?',
      options: ['380', '400', '420', '440'],
      correctIndex: 1,
      explanation: 'Cost Price = (Selling Price * 100) / (100 + Gain%) = (480 * 100) / 120 = $400.'
    },
    {
      id: 'q-3',
      question: 'Two pipes A and B can fill a tank in 20 minutes and 30 minutes respectively. If both pipes are opened together, how long will it take to fill the tank?',
      options: ['10 mins', '12 mins', '15 mins', '18 mins'],
      correctIndex: 1,
      explanation: 'Combined 1 min work = (1/20 + 1/30) = (3+2)/60 = 5/60 = 1/12. Therefore, it takes 12 minutes.'
    }
  ],
  logical: [
    {
      id: 'l-1',
      question: 'In a certain code language, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?',
      options: ['EOJDJEFM', 'EOJDEJFM', 'MFEJDJOE', 'MFEJDJEF'],
      correctIndex: 1,
      explanation: 'Reverse the word: MEDICINE -> ENICIDEM. Shift each letter forward by 1: E->F, N->O, etc., maintaining reverse boundary letters.'
    },
    {
      id: 'l-2',
      question: 'Pointing to a photograph, a man said, "I have no brother or sister, but that man\'s father is my father\'s son." Whose photograph was it?',
      options: ['His own', 'His son\'s', 'His father\'s', 'His nephew\'s'],
      correctIndex: 1,
      explanation: 'Since the man has no brother or sister, "my father\'s son" is the man himself. So, the photograph\'s father is the man himself. Thus, it is his son\'s photograph.'
    }
  ],
  verbal: [
    {
      id: 'v-1',
      question: 'Choose the word which is most SIMILAR in meaning to "PRAGMATIC":',
      options: ['Theoretical', 'Practical', 'Arrogant', 'Elusive'],
      correctIndex: 1,
      explanation: 'Pragmatic means dealing with things sensibly and realistically based on practical considerations.'
    }
  ],
  di: [
    {
      id: 'd-1',
      question: 'If Company A produced 40,000 units in 2024 and expanded output by 25% in 2025, how many total units were produced across both years?',
      options: ['80,000', '90,000', '95,000', '100,000'],
      correctIndex: 1,
      explanation: '2025 production = 40,000 * 1.25 = 50,000. Total = 40,000 + 50,000 = 90,000 units.'
    }
  ]
};
