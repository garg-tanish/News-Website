import React, { useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import TtsButton from "./Text-to-speech";

const Time = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      <h5>Current Date & Time</h5>
      <span>
        {currentDateTime.toDateString() +
          ", " +
          currentDateTime.toLocaleTimeString()}
      </span>
    </div>
  );
};

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(null);
  const [text, setText] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchData = async (page = 1) => {
    if (totalResults !== articles.length) {
      const url =
        text === ""
          ? `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
          : `https://newsapi.org/v2/everything?q=${text}&sortBy=publishedAt&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      const response = await fetch(url);
      props.setProgress(50);
      const { articles, totalResults } = await response.json();
      if (page === 1) {
        setArticles(articles);
        setTotalResults(totalResults);
        setPage(page);
        props.setProgress(100);
      } else {
        setArticles((prevState) => [...prevState, ...articles]);
        setTotalResults(totalResults);
        setPage(page);
      }
    }
  };

  React.useEffect(() => {
    document.title = `HeadineHub - ${capitalizeFirstLetter(props.category)}`;
    props.setProgress(10);

    fetchData().finally(() => {
      props.setProgress(100);
    });
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    props.setProgress(10);
    await fetchData(page + 1);
    props.setProgress(100);
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-12 col-md-7 col-lg-9 d-flex text-center">
          Top {capitalizeFirstLetter(props.category)} Headlines
        </h2>
        <form
          className="col-12 col-md-5 col-lg-3 d-flex"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className={`btn btn-${props.mode === "light" ? "dark" : "primary"}`}
            type="submit"
            onClick={() => fetchData(1)}
          >
            Search
          </button>
        </form>
      </div>
      <Time />
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-12 my-2" key={element.url}>
                  <NewsItems
                    index={index}
                    mode={props.mode}
                    srcUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://static.wixstatic.com/media/69caee_69bce7d290ab4d158406b41d76450590~mv2.png/v1/fill/w_280,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/webpage_under_construction_0.png"
                    }
                    title={
                      element.title
                        ? element.title
                        : "The title is not available at this moment. Kindly click to Read More."
                    }
                    description={
                      element.description
                        ? element.description
                        : "The description is not available at this moment. Kindly click to Read More."
                    }
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      <TtsButton news={articles} mode={props.mode} />
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
