import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import type { Article } from "../types/article.types";
import { ArticleList } from "../components/ArticleList";
import { ArticleDetail } from "../components/ArticleDetail";
import { apiService } from "../services/api.service";

export function ArticlesPage() {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    data: articles,
    isLoading: articlesLoading,
    error: articlesError,
    refetch: refetchArticles,
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

  const handleGenerateArticle = async () => {
    setIsGenerating(true);
    try {
      const newArticle = await apiService.post<Article>("/articles/generate", {
        topic: "technology",
        style: "light and informal",
        paragraphs: 3,
      });

      // Refresh articles list
      await refetchArticles();

      // Automatically open the newly generated article
      if (newArticle) {
        setSelectedArticleId(newArticle.id);
      }
    } catch (error) {
      console.error("Error generating article:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to generate article. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800">
                Blog AI Generator v1
              </h1>
              <button
                onClick={handleGenerateArticle}
                disabled={isGenerating || articlesLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>+</span>
                    <span>Generate New Article</span>
                  </>
                )}
              </button>
            </div>
            <ArticleList
              articles={articles || []}
              onArticleClick={handleArticleClick}
              loading={articlesLoading}
            />
          </div>
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
