export interface AtomicModel {
  id: 'dalton' | 'thomson' | 'rutherford' | 'bohr' | 'quantum';
  name: string;
  year: number;
  scientist: string;
  popularName: string;
  concept: string;
  keyDiscovery: string;
  limitations: string[];
  macroscopicAnalogy: string;
  epistemologicalObstacle: string;
  color: string;
  iconName: string;
}

export interface QuizQuestion {
  id: string;
  modelId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  epistemologicalFocus: string; // Focus on breaking misbeliefs
}

export interface AnomalyChallenge {
  id: string;
  modelId: string;
  title: string;
  historicalContext: string;
  experimentalFact: string;
  question: string;
  hint: string;
  solutionExplanation: string;
  nextModelUnlocked: 'thomson' | 'rutherford' | 'bohr' | 'quantum';
}

export interface StudentAnalytics {
  timeSpentPerModel: Record<string, number>; // in seconds
  anomaliesResolved: string[];
  quizScore: number;
  totalQuizAttempts: number;
  conceptualMisconceptionsIdentified: string[];
  bloomLevelAchieved: 'Conhecimento' | 'Compreensão' | 'Análise' | 'Avaliação/Sintese';
}
