import React, { useEffect } from "react";
import Card from "./Card";
import { useContext } from "react";
import { Context } from "../Context.jsx";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
function CardCarousel() {
  const { articles, handleChange, readArticlesIndex } = useContext(Context);
  const [articleView, setArticleView] = useState(articles);

  useEffect(() => {
    if (readArticlesIndex > 0) {
      let read = articles.slice(0, readArticlesIndex).reverse();
      let unread = articles.slice(readArticlesIndex);
      setArticleView([...read, ...unread]);
    }
  }, []);

  const mappedArticles = articleView.map((article, i) => (
    <Card
      key="i"
      {...article}
      index={i}
      readArticlesIndex={readArticlesIndex}
    />
  ));

  return (
    <Carousel
      onChange={(i, item) => handleChange(i, item)}
      selectedItem={readArticlesIndex}
      autoFocus={true}
      showArrows={false}
      showStatus={false}
      emulateTouch={true}
      showThumbs={false}
      showIndicators={false}
      useKeyboardArrows={true}
      className="bg-gray-200"
    >
      {Object.keys(articles[0]).length !== 0 && mappedArticles}
    </Carousel>
  );
}

export default CardCarousel;
