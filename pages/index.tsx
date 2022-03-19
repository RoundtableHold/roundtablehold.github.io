import type { GetStaticProps, NextPage } from "next";
import { defaultGetStaticProps } from "src/util/gapi";
import { LayoutProps } from "./_app";

interface Props extends LayoutProps {}

const Home: NextPage<Props> = ({ children }) => {
  return (
    <div className="max-w-screen-lg">
      <p className="text-2xl font-bold mb-4 leading-relaxed">
        Welcome to the Completionist Checklist for Elden Ring.
      </p>
      <p className="mb-4 leading-relaxed">
        This checklist will help you track pretty much every trackable thing
        that is present in Elden Ring. It is still a work-in-progress and
        currently only has Aboveground bosses and Underground bosses. However,
        when it is done, it will track everything: every last boss, every last
        weapon, every last cookbook, and every other thing in between. I am
        working on adding new sections every day and verifying that all the
        information here is accurate.
      </p>
      <p className="mb-4 leading-relaxed">
        Feel free to get in touch with me on{" "}
        <a
          className="underline text-blue-300 visited:text-purple-300"
          href="https://www.reddit.com/user/Quivorian"
          rel="noreferrer nofollow"
          target="_blank"
        >
          Reddit (u/Quivorian)
        </a>{" "}
        or{" "}
        <a
          className="underline text-blue-300 visited:text-purple-300"
          href="https://discord.gg/H2vPeG8u"
          rel="noreferrer nofollow"
          target="_blank"
        >
          Discord (@Quivorian#6564)
        </a>{" "}
        if you have any feedback or think you can help.
      </p>
      <p className="mb-4 leading-relaxed">
        This sheet would not be possible without the incredible work already
        done by the team at Fextralife, the team behind MapGenie, fellow
        redditors <strong className="text-red-500">u/Athrek</strong> and{" "}
        <strong className="text-red-500">u/AcceptablePackMule</strong>, and the
        rest of the community. This website was created by{" "}
        <strong className="text-red-500">@Redmega</strong> from the Roundtable
        Hold Discord. Thanks for all of your hard work!
      </p>
      <p className="mb-4 leading-relaxed bg-stone-800 px-4 py-2 shadow text-center">
        We apologize for any issues that might come about as we update the
        checklist and iron out bugs and other issues. We will do our best to
        ensure that such issues remain few and far between and that your
        experience remains as smooth as possible.
      </p>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return defaultGetStaticProps();
};
