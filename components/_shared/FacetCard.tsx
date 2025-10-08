import { useTheme } from "../theme/theme-provider";

export default function FacetCard({
  title,
  children,
  showClear,
  clearAction,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  showClear?: boolean;
  clearAction?: Function;
}) {
  const {
    theme: { styles },
  } = useTheme();

  return (
    <section className={`bg-white rounded-[10px] py-4 mb-4  ${styles.shadowMd}`}>
      <div className="flex items-center pb-4 px-4">
        {title && <h1 className="font-bold m-0">{title}</h1>}
      </div>
      <div>{children}</div>
      {showClear && (
        <div className="px-4">
          <span
            role="button"
            className="text-sm cursor-pointer hover:underline"
            onClick={() => clearAction && clearAction()}
          >
            Clear
          </span>
        </div>
      )}
    </section>
  );
}
