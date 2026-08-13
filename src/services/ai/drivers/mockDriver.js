/**
 * Mock AI Driver
 * Provides instant, highly realistic offline responses for Resume Analysis,
 * Mock Interviews, Personalized Placement Roadmaps, and AI Assistant queries.
 */

export const mockDriver = {
  async analyzeResume(resumeText, fileName) {
    // Artificial latency to simulate AI processing
    await new Promise(res => setTimeout(res, 1800));

    return {
      overall_score: 78,
      ats_score: 82,
      file_name: fileName || 'Resume.pdf',
      summary: "Strong project portfolio with solid technical fundamentals. Bullet points would benefit from quantified metrics and technical depth in cloud infrastructure.",
      strengths: [
        "Clear technical project section highlighting modern stack (React, Node.js, SQL).",
        "Proper formatting hierarchy readable by standard ATS systems.",
        "Demonstrated hands-on experience building full-stack applications."
      ],
      improvements: [
        "Include measurable impact metrics (e.g., 'Reduced query latency by 40%', 'Served 2,000+ active users').",
        "Add explicit mention of system design concepts and cloud deployment (AWS/Vercel/Docker).",
        "Consolidate education section to save prime space for project outcomes."
      ],
      missing_keywords: [
        "TypeScript", "Docker", "CI/CD", "RESTful API", "GraphQL", "Redis", "Unit Testing"
      ],
      bullet_feedback: [
        {
          original: "Built a web app for tracking user expenses",
          suggestion: "Architected a scalable expense management web app using React and PostgreSQL, handling 500+ daily transactions with 99.9% uptime."
        },
        {
          original: "Responsible for writing backend API endpoints",
          suggestion: "Engineered 12 RESTful API endpoints with Express and Supabase, implementing JWT authentication and strict input validation."
        }
      ]
    };
  },

  async evaluateInterviewAnswer(question, answer, category = 'Technical') {
    await new Promise(res => setTimeout(res, 1200));

    const wordCount = answer.trim().split(/\s+/).length;
    let score = Math.min(95, Math.max(50, wordCount * 2 + 45));

    return {
      score: score,
      relevance_score: Math.min(100, score + 5),
      technical_accuracy: category === 'Technical' ? Math.min(100, score) : 85,
      communication_score: Math.min(100, score + 2),
      confidence_score: 80,
      feedback: wordCount > 25
        ? "Excellent detail! You effectively explained key trade-offs and structural logic."
        : "Good starting point, but try incorporating STAR method (Situation, Task, Action, Result) and concrete code examples.",
      strengths: [
        "Directly addressed the core of the interviewer's question.",
        "Used clear technical terminology."
      ],
      weaknesses: wordCount < 20 ? ["Response was concise; expand on trade-offs and edge cases."] : ["Could elaborate slightly on performance optimization."],
      suggested_improvement: "Connect your answer back to real-world application scenarios or Big-O complexity."
    };
  },

  async generateRoadmap({ targetRole, targetSalary, preferredCompanies, dailyHours, skillLevel }) {
    await new Promise(res => setTimeout(res, 1500));

    return {
      title: `4-Week Master Placement Plan for ${targetRole || 'Full Stack Engineer'}`,
      target_role: targetRole || 'Full Stack Engineer',
      weekly_plan: [
        {
          week: 1,
          title: "Core Data Structures & Problem Solving",
          focus: "Arrays, Strings, Two Pointers & Sliding Window",
          tasks: [
            { id: "w1t1", title: "Solve 5 Easy Array problems on Two Pointers", category: "Coding", estimated_hours: 3 },
            { id: "w1t2", title: "Master Sliding Window technique & subsegment sums", category: "Coding", estimated_hours: 4 },
            { id: "w1t3", title: "Review Time & Space Complexity (Big-O notation)", category: "Theory", estimated_hours: 2 },
            { id: "w1t4", title: "Quantitative Aptitude: Speed, Distance & Time", category: "Aptitude", estimated_hours: 3 }
          ]
        },
        {
          week: 2,
          title: "Hash Tables, Linked Lists & Recursion",
          focus: "HashMap trade-offs, Fast & Slow Pointers, Backtracking",
          tasks: [
            { id: "w2t1", title: "Solve HashMap frequency & collision problems", category: "Coding", estimated_hours: 4 },
            { id: "w2t2", title: "Implement Linked List reversals & cycle detection", category: "Coding", estimated_hours: 4 },
            { id: "w2t3", title: "Logical Reasoning: Syllogisms & Seating Arrangements", category: "Aptitude", estimated_hours: 3 },
            { id: "w2t4", title: "DBMS Fundamentals: Normalization & Indexing", category: "Core Subject", estimated_hours: 3 }
          ]
        },
        {
          week: 3,
          title: "Trees, Graphs & System Design Basics",
          focus: "Binary Search Trees, BFS/DFS traversal, REST APIs",
          tasks: [
            { id: "w3t1", title: "Tree Traversals (In-order, Pre-order, Post-order, Level-order)", category: "Coding", estimated_hours: 5 },
            { id: "w3t2", title: "Graph Algorithms: Dijkstra & Topological Sort", category: "Coding", estimated_hours: 4 },
            { id: "w3t3", title: "Verbal Ability: Reading Comprehension & Para Jumbles", category: "Aptitude", estimated_hours: 3 },
            { id: "w3t4", title: "Operating Systems: Processes, Threads & Deadlocks", category: "Core Subject", estimated_hours: 4 }
          ]
        },
        {
          week: 4,
          title: "Mock Interviews & Resume Polishing",
          focus: "Company-specific question sets, HR round prep",
          tasks: [
            { id: "w4t1", title: "Complete 2 AI Mock Interviews (Technical + HR)", category: "Interview", estimated_hours: 3 },
            { id: "w4t2", title: "Optimize Resume with ATS missing keywords", category: "Resume", estimated_hours: 2 },
            { id: "w4t3", title: "Solve Top 15 company-tagged SQL queries", category: "Coding", estimated_hours: 4 },
            { id: "w4t4", title: "Review OOPs concepts (Inheritance, Polymorphism, Abstraction)", category: "Core Subject", estimated_hours: 3 }
          ]
        }
      ]
    };
  },

  async chatAssistant(messages, currentContext = '') {
    await new Promise(res => setTimeout(res, 900));

    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

    if (lastMessage.includes('hashmap') || lastMessage.includes('hash table')) {
      return "A **HashMap** is a key-value data structure that provides average **O(1)** time complexity for lookups, insertions, and deletions.\n\n### Key Concepts for Interviews:\n1. **Hashing Function**: Converts keys into array indices.\n2. **Collision Handling**: Chaining (LinkedList/Tree at bucket) or Open Addressing (Linear Probing).\n3. **Load Factor**: Triggers resizing (default ~0.75 in Java HashMap).\n\n*Common Interview Question*: How does Java 8 HashMap improve worst-case lookups? (Answer: Converts bucket LinkedList to a Red-Black Tree when chain length exceeds 8, reducing worst case from O(n) to O(log n)).";
    }

    if (lastMessage.includes('oop') || lastMessage.includes('object oriented')) {
      return "The 4 Pillars of **Object-Oriented Programming (OOP)** are essential for placement technical rounds:\n\n1. **Encapsulation**: Bundling data (variables) and methods inside a single class while restricting direct access (private variables + getters/setters).\n2. **Abstraction**: Hiding internal implementation details and showing only necessary interfaces (Abstract classes & Interfaces).\n3. **Inheritance**: Allowing a child class to acquire properties and methods of a parent class (`extends` keyword).\n4. **Polymorphism**: Ability to take many forms — Compile-time (Method Overloading) vs Runtime (Method Overriding).";
    }

    return `Great question! When preparing for technical placements, focus on understanding underlying trade-offs, Big-O complexity, and clear communication.\n\nHere is a structured tip for your preparation:\n- **Problem Analysis**: First clarify constraints and edge cases.\n- **Brute Force First**: Briefly describe the baseline approach.\n- **Optimize**: Apply HashMaps, Two-Pointers, or Dynamic Programming to reduce complexity.\n\nIs there a specific topic (Arrays, SQL, System Design, HR) you'd like to practice right now?`;
  }
};
