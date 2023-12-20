import React from "react";

const AccessDenied = () => {
  return (
    <div className="body">
      <div className="wrapper">
        <div className="box">
          <h1 className="text-8xl text-shadow">403</h1>
          <p className="mb-6 text-2xl text-orange-500">
            Sorry, it&apos;s not allowed to go beyond this point!
          </p>
          <p className="text-2xl">
            <a
              href="/"
              className="border-b border-dashed border-gray-700 italic text-gray-700 hover:text-shadow"
            >
              Please, go back this way.
            </a>
          </p>
        </div>

        {/* Additional styling using the provided CSS */}
       
      </div>
      <style jsx>{`
          .body {
            background: #fff
              url("https://www.dropbox.com/s/0czxq7wr862we98/texture.jpg?raw=1")
              repeat 0 0;
            color: #fff;
          }

          .wrapper {
            position: relative;
            max-width: 1298px;
            height: auto;
            margin: 0 auto 0 auto;
            background: transparent
              url("https://www.dropbox.com/s/qq5n8w99q40wtrg/wood-fence.png?raw=1")
              no-repeat center top 24em;
          }

          .box {
            max-width: 70%;
            min-height: 600px;
            margin: 0 auto;
            padding: 1em 1em;
            text-align: center;
            background: transparent
              url("https://www.dropbox.com/s/ft9vhk6720t1k86/dog-family-colored-doodle-drawing.jpg?raw=1")
              no-repeat top 10em center;
          }

          h1 {
            margin: 0 0 1rem 0;
            font-size: 8em;
            text-shadow: 0 0 6px #8b4d1a;
          }

          p {
            margin-bottom: 0;
            font-size: 1.75em;
            color: #ea8a1a;
          }

          p:first-of-type {
            margin-top: 16em;
            text-shadow: none;
          }

          p > a {
            border-bottom: 1px dashed #837256;
            font-style: italic;
            text-decoration: none;
            color: #837256;
          }

          p > a:hover {
            text-shadow: 0 0 3px #8b4d1a;
          }

          p img {
            vertical-align: bottom;
          }

          @media screen and (max-width: 600px) {
            .wrapper {
              background-size: 300px 114px;
              background-position: center top 22em;
            }

            .box {
              max-width: 100%;
              margin: 0 auto;
              padding: 0;
              background-size: 320px 185px;
            }

            p:first-of-type {
              margin-top: 12em;
            }
          }
        `}</style>
    </div>
  );
};

export default AccessDenied;