type DebugControl = {
  values: any;
};
const DebugControl = ({ values }: DebugControl) => {
  return (
    <div className="formGroup">
      <pre
        style={{
          // vs code theme night owl
          backgroundColor: "#011627",
          color: "#d6deeb",
          padding: "4px",
          borderRadius: "5px",
          fontSize: "14px",
          whiteSpace: "pre-wrap",
        }}
      >
        <p>Display only for Development</p>
        {JSON.stringify(values, null, 2)}
      </pre>
    </div>
  );
};
export default DebugControl;
