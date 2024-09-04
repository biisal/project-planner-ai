interface FormatListProps {
  header?: string;
  list: string[];
  makeCounter?: boolean;
}
const FormatList = ({ header, list, makeCounter }: FormatListProps) => {
  return (
    <div>
      {header && (
        <div className="flex items-center gap-1 mb-2">
          <h2 className="text-xl">{header} :</h2>
        </div>
      )}
      {list.map((fea, index) => (
        <ul
          key={index}
          className={`flex gap-1 ${
            !makeCounter && "mb-1.5"
          }  items-start text-muted-foreground`}
        >
          {makeCounter && <li className="h-full">{index + 1}.</li>}
          <li className="h-full">{fea}</li>
        </ul>
      ))}
    </div>
  );
};

export default FormatList;
