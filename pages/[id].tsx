import clsx from "clsx";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ChangeEventHandler, MouseEventHandler, useCallback } from "react";
import { defaultGetStaticProps, sheet } from "src/util/gapi";
import { Categories, Category, DataSource } from "src/util/types";
import useIndexedDb from "src/util/useIndexedDB";
import { LayoutProps } from "./_app";

import Check from "src/components/icons/Check.svg";

interface Props extends LayoutProps {
  sheet: DataSource[keyof DataSource];
}

const Section: NextPage<Props> = ({ sheet: { _meta, data } }) => {
  const [state, setState] = useIndexedDb(_meta.id, {});

  const onUpdate = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const key = e.currentTarget.name;
      const value = e.currentTarget.checked;

      setState(key, value);
    },
    [setState]
  );

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
              <Row
                i={i}
                key={`${area}_${boss.name}`}
                id={`${area}_${boss.name}`}
                checked={state[`${area}_${boss.name}`] ?? false}
                groupedColumn={_meta.groupBy}
                groupedRowSpan={data[area].length}
                data={boss}
                onUpdate={onUpdate}
              />
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Section;

function Row({
  i,
  id,
  checked,
  data,
  groupedColumn,
  groupedRowSpan,
  onUpdate,
}: {
  i: number;
  id: string;
  checked: boolean;
  data: any;
  groupedColumn: string;
  groupedRowSpan: number;
  onUpdate: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <tr className="even:bg-stone-800 transition-opacity duration-150 ease-in-out">
      {i === 0 && (
        <td
          className="px-3 py-4 align-top opacity-100"
          rowSpan={groupedRowSpan}
        >
          <span className="sticky top-4 bg-stone-900">
            {data[groupedColumn]}
          </span>
        </td>
      )}
      {Object.keys(data).map((key) =>
        key === groupedColumn ? null : (
          <td
            key={data[key as keyof typeof data]}
            className={clsx(
              "text-sm font-light px-6 py-4 line-through decoration-transparent transition duration-150 ease-in-out",
              checked && "opacity-50 decoration-inherit"
            )}
          >
            {data[key as keyof typeof data]}
          </td>
        )
      )}
      <td className="text-sm px-5 py-3">
        <label className="block p-1 rounded border border-stone-700">
          <input
            className="hidden"
            name={id}
            type="checkbox"
            onChange={onUpdate}
            checked={checked}
          />
          <Check
            className={clsx(
              "h-6 w-6 text-stone-50 transition-opacity duration-150 ease-in-out",
              checked ? "opacity-100" : "opacity-0"
            )}
          />
        </label>
      </td>
    </tr>
  );
}

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
