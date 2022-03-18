import type { GetStaticProps, NextPage } from "next";
import { defaultGetStaticProps } from "src/util/gapi";
import { LayoutProps } from "./_app";

interface Props extends LayoutProps {
  statusCode?: number;
}

const ServerError: NextPage<Props> = ({ children }) => {
  return <div>Something went wrong...</div>;
};

export default ServerError;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return defaultGetStaticProps();
};
