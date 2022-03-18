import type { GetStaticProps, NextPage } from "next";
import { defaultGetStaticProps } from "src/util/gapi";
import { LayoutProps } from "./_app";

interface Props extends LayoutProps {
  statusCode?: number;
}

const NotFound: NextPage<Props> = ({ children }) => {
  return <div>Page Not Found</div>;
};

export default NotFound;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return defaultGetStaticProps();
};
