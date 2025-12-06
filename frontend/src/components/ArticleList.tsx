import type { Article } from "../types/article.types";

interface ArticleListProps {
  articles: Article[];
  onArticleClick: (articleId: number) => void;
  loading?: boolean;
}

export function ArticleList({
  articles,
  onArticleClick,
  loading = false,
}: ArticleListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No articles found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Articles</h2>
      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.id}>
            <button
              onClick={() => onArticleClick(article.id)}
              className="w-full text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {article.title}
              </h3>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

