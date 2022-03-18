import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  Categories,
  Category,
  DataSource,
  defaultGetStaticProps,
  sheet,
} from "src/util/gapi";
import { LayoutProps } from "./_app";

interface Props extends LayoutProps {
  sheet: DataSource[keyof DataSource];
}

const Section: NextPage<Props> = ({ sheet: { _meta, data } }) => {
  return (
    <div key={_meta.title}>
      <h2 className="text-2xl font-bold my-4 text-stone-300">{_meta.title}</h2>
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
                    <td
                      key={boss[key as keyof typeof boss]}
                      className="text-sm font-light px-6 py-4"
                    >
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
  );
};

export default Section;

export const getStaticProps: GetStaticProps<Props, { id: Category }> = async (
  context
) => {
  const id = context.params.id;
  await sheet.init(id);

  return {
    props: {
      sheet: sheet.data[id],
      ...defaultGetStaticProps().props,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    fallback: false,
    paths: Categories.map((category) => ({
      params: { id: category },
    })),
  };
};
