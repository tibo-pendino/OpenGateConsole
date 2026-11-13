// Données fictives reprises de https://ia.numerique.gouv.fr/outils-ia/albert-api/modèles/
// À remplacer par l'API OpenGateLLM (GET /v1/models).

export type ModelUsage = "chat" | "code" | "audio" | "rag" | "ocr";

export type Model = {
  /** Identifiant à utiliser dans les appels d'API (alias stable si présent). */
  id: string;
  /** Modèle servi derrière l'identifiant. */
  model: string;
  provider: string;
  description: string;
  usage: ModelUsage;
  license: string;
  /** Réservé aux administrations partenaires. */
  partner?: boolean;
  /** Analyse d'images. */
  vision?: boolean;
  /** En phase d'expérimentation jusqu'à cette date (ISO). */
  testUntil?: string;
  /** Ancre de la fiche sur guides.ia.numerique.gouv.fr, si connue. */
  docAnchor?: string;
};

export const usageGroups: { usage: ModelUsage; label: string }[] = [
  { usage: "chat", label: "Conversation" },
  { usage: "code", label: "Code" },
  { usage: "audio", label: "Transcription audio" },
  { usage: "rag", label: "Recherche (RAG)" },
  { usage: "ocr", label: "OCR" },
];

export const MODELS_DOC_URL =
  "https://guides.ia.numerique.gouv.fr/albert-api/modeles/available-models";

const TEST_UNTIL = "2026-12-01";

export function getModels(): Model[] {
  return [
    {
      id: "openweight-large",
      model: "openai/gpt-oss-120b",
      provider: "OpenAI",
      description: "Modèle de chat pour des tâches complexes.",
      usage: "chat",
      license: "Apache 2.0",
      docAnchor: "gpt-oss-120b",
    },
    {
      id: "openweight-medium",
      model: "mistralai/Mistral-Small-3.2-24B-Instruct-2506",
      provider: "Mistral AI",
      description:
        "Modèle de chat pour des tâches d'une complexité modérée et d'analyse d'images.",
      usage: "chat",
      license: "Apache 2.0",
      vision: true,
    },
    {
      id: "openweight-small",
      model: "mistralai/Ministral-3-8B-Instruct-2512",
      provider: "Mistral AI",
      description: "Modèle de chat pour des tâches simples.",
      usage: "chat",
      license: "Apache 2.0",
    },
    {
      id: "mistral-medium-3-5",
      model: "Mistral Medium 3.5",
      provider: "Mistral AI",
      description:
        "Modèle de chat principal de L'Assistant, conçu pour des tâches complexes.",
      usage: "chat",
      license: "Propriétaire",
      partner: true,
      docAnchor: "mistral-medium-3-5",
    },
    {
      id: "gemma-4-31b-it",
      model: "google/gemma-4-31B-it",
      provider: "Google",
      description:
        "Modèle de chat pour des tâches d'une complexité modérée et d'analyse d'images. Candidat au remplacement d'openweight-medium.",
      usage: "chat",
      license: "Apache 2.0",
      vision: true,
      testUntil: TEST_UNTIL,
    },
    {
      id: "openweight-code",
      model: "Qwen/Qwen3-Coder-30B-A3B-Instruct",
      provider: "Qwen",
      description: "Modèle spécialisé en code, intégrable dans votre IDE.",
      usage: "code",
      license: "Apache 2.0",
    },
    {
      id: "DeepSeek-V4-Flash",
      model: "deepseek-ai/DeepSeek-V4-Flash",
      provider: "DeepSeek",
      description:
        "Modèle spécialisé en code. Candidat au remplacement d'openweight-code.",
      usage: "code",
      license: "MIT",
      testUntil: TEST_UNTIL,
    },
    {
      id: "openweight-audio",
      model: "openai/whisper-large-v3",
      provider: "OpenAI",
      description: "Modèle de transcription audio.",
      usage: "audio",
      license: "Apache 2.0",
    },
    {
      id: "openweight-embeddings",
      model: "BAAI/bge-m3",
      provider: "BAAI",
      description: "Modèle de vectorisation pour construire votre RAG.",
      usage: "rag",
      license: "MIT",
    },
    {
      id: "openweight-rerank",
      model: "BAAI/bge-reranker-v2-m3",
      provider: "BAAI",
      description:
        "Modèle de classement de la pertinence des documents retournés par votre RAG.",
      usage: "rag",
      license: "MIT",
    },
    {
      id: "qwen3-vl-embedding-8B",
      model: "Qwen/Qwen3-VL-Embedding-8B",
      provider: "Qwen",
      description:
        "Modèle de vectorisation multimodal pour un RAG sur des textes et des images.",
      usage: "rag",
      license: "Apache 2.0",
      vision: true,
      testUntil: TEST_UNTIL,
    },
    {
      id: "LightOnOCR-2-1B",
      model: "lightonai/LightOnOCR-2-1B",
      provider: "LightOn",
      description: "Modèle spécialisé dans les tâches d'OCR.",
      usage: "ocr",
      license: "Apache 2.0",
    },
    {
      id: "mistral-ocr-2512",
      model: "Mistral OCR 3",
      provider: "Mistral AI",
      description: "Modèle spécialisé dans les tâches d'OCR.",
      usage: "ocr",
      license: "Propriétaire",
      partner: true,
      docAnchor: "mistral-ocr-2512",
    },
  ];
}
