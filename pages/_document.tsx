import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body style={{ transition: "all ease .3s" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
