import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [articles, setArticles] = useState(
    JSON.parse(localStorage.getItem("articles")) || [{}]
  );
  const [readArticlesIndex, setReadArticlesIndex] = useState(
    localStorage.getItem("readArticlesIndex") || 0
  );
  const todayDate = new Date().toISOString().slice(0, 10);

  if (Object.keys(articles[0]).length === 0) {
    useEffect(() => {
      fetch(
        `https://newsapi.org/v2/everything?q=politics&from=${todayDate}&sortBy=publishedAt&apiKey=95c3200ab6194121b55919cdd3cb537d`
      )
        .then((response) => response.json())
        .then((data) => filterArticles(data.articles));
    }, []);
  }

  useEffect(() => {
    if (readArticlesIndex < articles.length - 1) {
      localStorage.setItem("readArticlesIndex", Number(readArticlesIndex) + 1);
    }
  }, []);

  function filterArticles(articles) {
    const filteredArticles = articles.filter((article) => {
      const { author, title, description, url, urlToImage, publishedAt } =
        article;
      return (
        author &&
        title &&
        description &&
        url &&
        urlToImage &&
        publishedAt &&
        title.length + description.length < 430 &&
        author.length < 40
      );
    });
    setArticles(filteredArticles);
    localStorage.setItem("articles", JSON.stringify(filteredArticles));
    location.reload();
  }

  function handleChange(i, item) {
    if (i > readArticlesIndex && i < articles.length - 1) {
      setReadArticlesIndex(i);
      localStorage.setItem("readArticlesIndex", i + 1);
    }
  }

  return (
    <Context.Provider value={{ articles, handleChange, readArticlesIndex }}>
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
