export const LoadingCustom: React.FC<any> = () => {
  document.addEventListener("DOMContentLoaded", (event) => {
    //Removing article link when on mobiforge
    if (
      window.parent !== window &&
      document.referrer.indexOf("https://mobiforge.com") === 0 &&
      document.referrer.indexOf("http://mobiforge.com") === 0
    ) {
      const articleLink = document.getElementById(
        "article-link"
      ) as HTMLElement;
      if (articleLink) {
        articleLink.className = "fade-out";
      }
    }
  });
  return (
    <>
      <div className="loading-wrapper">
        <div id="container">
          <svg
            id="svg-spinner"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <circle cx="24" cy="4" r="4" fill="#fff" />
            <circle cx="12.19" cy="7.86" r="3.7" fill="rgb(195, 205, 229)" />
            <circle cx="5.02" cy="17.68" r="3.4" fill="rgb(30, 82, 203)" />
            <circle cx="5.02" cy="30.32" r="3.1" fill="rgb(29, 22, 238)" />
            <circle cx="12.19" cy="40.14" r="2.8" fill="rgb(18, 11, 213) " />
            <circle cx="24" cy="44" r="2.5" fill="rgb(16, 10, 192)" />
            <circle cx="35.81" cy="40.14" r="2.2" fill="rgb(14, 9, 170)" />
            <circle cx="42.98" cy="30.32" r="1.9" fill="rgb(13, 8, 154)" />
            <circle cx="42.98" cy="17.68" r="1.6" fill="rgb(11, 7, 132)" />
            <circle cx="35.81" cy="7.86" r="1.3" fill="rgb(6, 4, 76)" />
          </svg>
        </div>
      </div>
    </>
  );
};
