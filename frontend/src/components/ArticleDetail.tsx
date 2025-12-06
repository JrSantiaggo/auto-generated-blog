import type { Article } from "../types/article.types";

interface ArticleDetailProps {
  article: Article | null;
  loading?: boolean;
  onBack: () => void;
}

export function ArticleDetail({
  article,
  loading = false,
  onBack,
}: ArticleDetailProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Article not found.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
      >
        <span>←</span> Back to list
      </button>

      <article className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {article.title}
        </h1>
        <div className="prose max-w-none">
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </p>
        </div>
      </article>
    </div>
  );
}

