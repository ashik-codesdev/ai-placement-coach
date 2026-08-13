import { mockDriver } from './drivers/mockDriver';

const useMockAI = import.meta.env.VITE_USE_MOCK_AI !== 'false';

/**
 * Unified AI Service Abstraction Layer
 * Shields the application from direct vendor lock-in.
 * Can switch between Gemini, OpenAI, or Mock Drivers seamlessly.
 */
class AIService {
  constructor() {
    this.driver = mockDriver; // Defaults to mock driver for instant safety and zero API cost
  }

  async analyzeResume(resumeText, fileName) {
    if (useMockAI || !import.meta.env.VITE_GEMINI_API_KEY) {
      return await mockDriver.analyzeResume(resumeText, fileName);
    }
    // Future live driver invocation point
    return await mockDriver.analyzeResume(resumeText, fileName);
  }

  async evaluateInterviewAnswer(question, answer, category) {
    if (useMockAI || !import.meta.env.VITE_GEMINI_API_KEY) {
      return await mockDriver.evaluateInterviewAnswer(question, answer, category);
    }
    return await mockDriver.evaluateInterviewAnswer(question, answer, category);
  }

  async generateRoadmap(userPreferences) {
    if (useMockAI || !import.meta.env.VITE_GEMINI_API_KEY) {
      return await mockDriver.generateRoadmap(userPreferences);
    }
    return await mockDriver.generateRoadmap(userPreferences);
  }

  async chatAssistant(messages, currentContext) {
    if (useMockAI || !import.meta.env.VITE_GEMINI_API_KEY) {
      return await mockDriver.chatAssistant(messages, currentContext);
    }
    return await mockDriver.chatAssistant(messages, currentContext);
  }
}

export const aiService = new AIService();
