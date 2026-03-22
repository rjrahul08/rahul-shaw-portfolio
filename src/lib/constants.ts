export const personalInfo = {
  name: 'Rahul Prasad Shaw',
  role: 'AI Backend Engineer',
  location: 'Kolkata, West Bengal, India',
  email: 'rj08rahul@gmail.com',
  phone: '+91 9163536485',
  github: 'https://github.com/rjrahul08',
  linkedin: 'https://linkedin.com/in/rahul-shaw008',
}

export const navLinks = [
  { id: 'hero', label: 'hero' },
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'pipeline', label: 'pipeline' },
  { id: 'terminal', label: 'terminal' },
  { id: 'metrics', label: 'metrics' },
  { id: 'constellation', label: 'constellation' },
  { id: 'ai-demo', label: 'ai demo' },
  { id: 'timeline3d', label: 'timeline' },
  { id: 'github', label: 'github' },
  { id: 'now', label: 'now' },
  { id: 'contact', label: 'contact' },
]

export const heroTypeSequence = [
  'AI Backend Engineer',
  2000,
  'RAG Systems Builder',
  2000,
  'LLM Integration Expert',
  2000,
  'Vector Search Architect',
  2000,
  'Cloud-Native Builder',
  2000,
  'AWS Serverless Expert',
  2000,
] as const

export const stats = [
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 4, suffix: '+', label: 'AI Projects Shipped' },
  { value: 30, suffix: '%', label: 'Performance Improvement' },
  { value: 1, suffix: '', label: 'Current Company' },
]

export const skillGroups = [
  {
    title: 'AI Systems',
    icon: '🧠',
    skills: ['RAG', 'LLM Integration', 'Embeddings', 'Prompt Engineering'],
  },
  {
    title: 'Vector DBs',
    icon: '🗃️',
    skills: ['Pinecone', 'FAISS', 'Semantic Search', 'ANN Retrieval'],
  },
  {
    title: 'Languages',
    icon: '💻',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: ['Flask', 'Node.js', 'Express.js', 'REST APIs'],
  },
  {
    title: 'Cloud / Infra',
    icon: '☁️',
    skills: ['AWS EC2', 'AWS Lambda', 'AWS S3', 'Docker'],
  },
  {
    title: 'Frontend',
    icon: '🎨',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
  },
]

export const proficiency = [
  { label: 'Python', value: 95 },
  { label: 'RAG / LLM', value: 90 },
  { label: 'Vector DBs', value: 88 },
  { label: 'AWS / Cloud', value: 80 },
  { label: 'Backend APIs', value: 90 },
  { label: 'React / Next', value: 75 },
]

export const experience = [
  {
    title: 'Software Developer',
    company: 'RoboAnalytics',
    period: 'Jan 2024 – Present',
    location: 'Kolkata, India (Remote)',
    accent: 'cyan',
    points: [
      'Built scalable AI automation backend services for SaaS products serving global users.',
      'Designed AWS Lambda scraping pipelines delivering 75–80% extraction accuracy.',
      'Optimized AWS backend response performance by ~30% through system refinements.',
      'Created modular AI-driven workflow architecture for production automation.',
      'Delivered REST APIs with Python (Flask) and Node.js, plus React-based product features.',
    ],
    tags: ['Python', 'Flask', 'AWS Lambda', 'React', 'Node.js'],
  },
  {
    title: 'B.Sc. Computer Science',
    company: 'New Alipore College, University of Calcutta',
    period: '2021',
    location: 'CGPA: 7.29',
    accent: 'violet',
    points: ['Built a strong foundation in computer science, software engineering, and problem solving.'],
    tags: ['Computer Science'],
  },
]

export const projects = [
  {
    id: 1,
    title: 'Stock Market Analysis System',
    badge: 'FEATURED',
    badgeColor: 'cyan',
    description:
      'RAG-powered chatbot for contextual financial query answering. Ingests market data, embeds and stores it in Pinecone for grounded semantic retrieval and cited answers.',
    techStack: ['Python', 'RAG', 'Pinecone', 'Vector Embeddings', 'Data Pipelines'],
    size: 'large',
  },
  {
    id: 2,
    title: 'Linkomatic — AI SaaS Platform',
    badge: 'SHIPPED',
    badgeColor: 'green',
    description:
      'Full-stack AI SaaS product with Flask APIs, React frontend, scraping pipelines, similarity scoring, and AI-assisted decision modules deployed on AWS.',
    techStack: ['Python', 'Flask', 'React.js', 'AWS', 'Similarity Scoring'],
    size: 'small',
  },
  {
    id: 3,
    title: 'Enterprise Component Builder',
    badge: 'NDA',
    badgeColor: 'orange',
    description:
      'Automated generation of reusable UI components from prompts, screenshots, and URLs through a multimodal LLM-powered backend pipeline.',
    techStack: ['JavaScript', 'React.js', 'LLM APIs', 'Backend APIs'],
    size: 'small',
  },
  {
    id: 4,
    title: 'Vector Search System',
    badge: 'NDA',
    badgeColor: 'orange',
    description:
      'High-performance FAISS semantic retrieval with LLM-based query expansion, improving recall while sustaining sub-200ms average retrieval latency.',
    techStack: ['Python', 'FAISS', 'LLM APIs', 'Vector Indexing', 'Query Expansion'],
    size: 'large',
  },
]

export const pipelineNodes = [
  {
    title: 'User Query',
    icon: '🧑',
    subtitle: 'Natural language question',
    tooltip: 'Raw natural language input from user — no preprocessing needed.',
  },
  {
    title: 'Embedding Model',
    icon: '🔢',
    subtitle: 'text-embedding-ada-002 / local',
    tooltip:
      'Converts query text into a dense vector using OpenAI embeddings or a local sentence-transformer.',
  },
  {
    title: 'Vector DB',
    icon: '🗄️',
    subtitle: 'Pinecone / FAISS',
    tooltip: 'Stores and indexes millions of embeddings for fast semantic retrieval.',
  },
  {
    title: 'Retriever',
    icon: '🔍',
    subtitle: 'Top-K relevant chunks',
    tooltip: 'Approximate nearest-neighbor search returns the most relevant context chunks.',
  },
  {
    title: 'LLM',
    icon: '🤖',
    subtitle: 'GPT / Claude',
    tooltip: 'Combines query and retrieved context to generate grounded answers.',
  },
  {
    title: 'Response',
    icon: '💬',
    subtitle: 'Grounded, cited answer',
    tooltip: 'Final response is factual and hallucination-resistant because it is anchored to retrieved data.',
  },
]

export const ragCode = `from pinecone import Pinecone\nfrom openai import OpenAI\n\npc = Pinecone(api_key=PINECONE_KEY)\nindex = pc.Index("market-data-embeddings")\nclient = OpenAI()\n\ndef rag_query(user_query: str) -> str:\n    embedding = client.embeddings.create(\n        model="text-embedding-ada-002",\n        input=user_query\n    ).data[0].embedding\n\n    results = index.query(\n        vector=embedding,\n        top_k=5,\n        include_metadata=True\n    )\n\n    context = "\\n\\n".join([\n        r["metadata"]["text"] for r in results["matches"]\n    ])\n\n    response = client.chat.completions.create(\n        model="gpt-4o",\n        messages=[\n            {"role": "system", "content": "Answer using only the provided context."},\n            {"role": "user", "content": f"Context:\\n{context}\\n\\nQuestion: {user_query}"}\n        ]\n    )\n    return response.choices[0].message.content`;

export const metrics = [
  { label: 'AWS_OPTIMIZATION', value: '~30%', title: 'Response Time Boost', subtitle: 'AWS backend' },
  { label: 'SCRAPING_PIPELINES', value: '~78%', title: 'Scraping Accuracy', subtitle: 'Lambda pipeline' },
  { label: 'AI_PROJECTS', value: '4+', title: 'AI Projects Shipped', subtitle: 'Production work' },
  { label: 'EXPERIENCE', value: '2+', title: 'Years Experience', subtitle: 'Backend + AI' },
  { label: 'EMBEDDINGS', value: '1536', title: 'Embedding Dimensions', subtitle: 'Per vector' },
  { label: 'LATENCY', value: '<200ms', title: 'Retrieval Latency', subtitle: 'FAISS optimized' },
]

export const constellationNodes = [
  { id: 'python', label: 'Python', color: '#00f5ff', category: 'AI/ML' },
  { id: 'rag', label: 'RAG', color: '#00f5ff', category: 'AI/ML' },
  { id: 'llm', label: 'LLM APIs', color: '#00f5ff', category: 'AI/ML' },
  { id: 'pinecone', label: 'Pinecone', color: '#00f5ff', category: 'AI/ML' },
  { id: 'faiss', label: 'FAISS', color: '#00f5ff', category: 'AI/ML' },
  { id: 'aws', label: 'AWS', color: '#7b2fff', category: 'Cloud' },
  { id: 'lambda', label: 'Lambda', color: '#7b2fff', category: 'Cloud' },
  { id: 'docker', label: 'Docker', color: '#7b2fff', category: 'Cloud' },
  { id: 'flask', label: 'Flask', color: '#00ff88', category: 'Backend' },
  { id: 'node', label: 'Node.js', color: '#00ff88', category: 'Backend' },
  { id: 'rest', label: 'REST APIs', color: '#00ff88', category: 'Backend' },
  { id: 'react', label: 'React.js', color: '#ff6b35', category: 'Frontend' },
  { id: 'ts', label: 'TypeScript', color: '#ff6b35', category: 'Frontend' },
  { id: 'tailwind', label: 'Tailwind', color: '#ff6b35', category: 'Frontend' },
]

export const timeline = [
  { year: '2021', title: 'B.Sc. Computer Science', description: 'University of Calcutta · CGPA 7.29' },
  { year: '2024', title: 'Joined RoboAnalytics', description: 'Software Developer building RAG, AWS, and Flask systems' },
  { year: '2025', title: 'Still Building', description: 'Open to AI backend roles and global freelance work' },
]

export const githubRepos = [
  {
    name: 'rag-finance-lab',
    description: 'Experiments in grounded market intelligence with retrieval pipelines.',
    language: 'Python',
    stars: 12,
  },
  {
    name: 'aws-ai-automation',
    description: 'Cloud-native backend patterns for automation and orchestration.',
    language: 'TypeScript',
    stars: 8,
  },
  {
    name: 'vector-search-notes',
    description: 'Semantic retrieval experiments with FAISS, Pinecone, and embeddings.',
    language: 'Jupyter Notebook',
    stars: 5,
  },
]

export const nowCards = [
  {
    title: 'Building',
    icon: '●',
    text: 'Exploring agentic AI workflows with LangGraph and multi-agent orchestration patterns for production systems.',
  },
  {
    title: 'Learning',
    icon: '●',
    text: 'LLM fine-tuning, LoRA adapters, and serving models efficiently on AWS SageMaker.',
  },
  {
    title: 'Open To',
    icon: '🎯',
    text: 'Full-time AI backend roles and freelance AI product development with globally remote teams.',
  },
  {
    title: 'Based In',
    icon: '📍',
    text: 'Kolkata, India — available for remote collaboration worldwide in IST-friendly workflows.',
  },
]

export const aiAnswers: Record<string, string> = {
  rag: 'Rahul specializes in Retrieval-Augmented Generation systems that combine embeddings, vector databases like Pinecone or FAISS, and LLMs to produce grounded answers from real data.',
  aws: 'Rahul has built cloud-native AI backends on AWS using Lambda, EC2, and S3, including optimized services that improved response performance by around 30%.',
  freelance: 'Yes — Rahul is open to freelance AI product development as well as full-time AI backend roles. The fastest way to reach him is at rj08rahul@gmail.com.',
  availability: 'Rahul is currently open to work for full-time opportunities and freelance collaborations globally from Kolkata, India.',
  projects: 'Key projects include a Stock Market Analysis RAG system, Linkomatic AI SaaS platform, an Enterprise Component Builder, and a high-performance Vector Search System.',
  contact: 'You can contact Rahul at rj08rahul@gmail.com, call +91 9163536485, or connect through GitHub and LinkedIn.',
  default: 'Rahul is an AI Backend Engineer focused on RAG systems, LLM integration, vector search, and AWS-native backend architecture. Ask about skills, projects, experience, or availability.',
}
