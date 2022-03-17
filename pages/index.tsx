import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { DataSource, sheet } from "../src/util/gapi";

interface Props {
  data: DataSource;
}

const Home: NextPage<Props> = ({
  data: {
    aboveground_bosses: { _meta, data },
  },
}) => {
  return (
    <div>
      <Head>
        <title>Roundtable Tracker</title>
        <meta
          name="description"
          content="The ultimate tool for Elden Ring completionists"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 bg-stone-900 text-stone-50">
        <div key={_meta.title}>
          <h2 className="text-2xl font-bold my-4 text-stone-300">
            {_meta.title}
          </h2>
          <table className="w-full max-w-screen-xl">
            <thead className="border-b border-stone-300">
              <tr>
                {_meta.schema.map((shape) => (
                  <th
                    key={shape.name}
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left capitalize"
                  >
                    {shape.name}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            {Object.keys(data).map((area) => (
              <tbody key={area} className="border-b border-stone-300 relative">
                {data[area].map((boss, i) => (
                  <tr key={i} className="even:bg-stone-800">
                    {i === 0 && (
                      <td
                        className="px-3 py-4 align-top sticky top-0 bg-stone-900"
                        rowSpan={data[area].length}
                      >
                        {boss.area}
                      </td>
                    )}
                    {Object.keys(boss).map((key) =>
                      key === _meta.groupBy ? null : (
                        <td className="text-sm font-light px-6 py-4">
                          {boss[key as keyof typeof boss]}
                        </td>
                      )
                    )}
                    <td className="text-sm">
                      <label className="px-6 py-4">
                        <input type="checkbox" />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span></span>
        </a>
      </footer>
    </div>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  await sheet.init();

  return {
    props: {
      data: sheet.data,
    },
  };
}

export default Home;
