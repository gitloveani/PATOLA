// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en"> {/* Optional: Add a lang attribute */}
        <Head>
          {/* Manifest and Theme Color */}
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#ffffff" />

          {/* Apple Touch Icon (for iOS home screen) */}
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

          {/* Specific favicon sizes (PNG) */}
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

          {/* favicon.ico is often picked up automatically but can be linked too if desired: */}
          {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
