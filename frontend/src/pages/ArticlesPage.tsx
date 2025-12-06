import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import type { Article } from "../types/article.types";
import { ArticleList } from "../components/ArticleList";
import { ArticleDetail } from "../components/ArticleDetail";

export function ArticlesPage() {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null
  );
  const {
    data: articles,
    isLoading: articlesLoading,
    error: articlesError,
  } = useFetch<Article[]>("/articles");
  const {
    data: selectedArticle,
    isLoading: articleLoading,
    error: articleError,
  } = useFetch<Article>(
    selectedArticleId ? `/articles/${selectedArticleId}` : null
  );

  const handleArticleClick = (articleId: number) => {
    setSelectedArticleId(articleId);
  };

  const handleBack = () => {
    setSelectedArticleId(null);
  };

  if (articlesError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-red-800 mb-2">
            Error loading articles
          </h2>
          <p className="text-red-600">{articlesError.message}</p>
        </div>
      </div>
    );
  }

  if (articleError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-red-800 mb-2">
            Error loading article
          </h2>
          <p className="text-red-600 mb-4">{articleError.message}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {selectedArticleId === null ? (
          <ArticleList
            articles={articles || []}
            onArticleClick={handleArticleClick}
            loading={articlesLoading}
          />
        ) : (
          <ArticleDetail
            article={selectedArticle}
            loading={articleLoading}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
