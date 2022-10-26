import React from "react";

function Card(props) {
  const {
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    index,
    readArticlesIndex,
  } = props;
  const [date, time] = publishedAt ? publishedAt.split(/[TZ]/g) : ["", ""];
  const formatedTime = time ? time.slice(0, 5) : "";
  return (
    <div className="h-screen d-flex lg:w-1/3 m-auto">
      <div
        className="h-1/3 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url("${urlToImage}")`,
        }}
      >
        {index < readArticlesIndex && (
          <div className="bg-yellow-500 h-1/6 w-1/6 text-white">Read</div>
        )}
      </div>
      <div className="h-2/3 text-left bg-white tracking-wide select-none">
        <div className="bg-red-500 py-2 px-4 text-white tracking-wider font-bold text-lg">
          {title}
        </div>
        <div className="flex text-gray-500 italic px-4 pt-2 text-sm">
          <div>{date}</div>
          <div className="ml-auto">{formatedTime}</div>
        </div>
        <div className="pt-2 px-4">
          {description}{" "}
          <a
            href={url}
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            (read full article)
          </a>
        </div>
        <div className="pt-2 text-gray-500 text-center italic uppercase">
          {author}
        </div>
      </div>
    </div>
  );
}

export default Card;
