import "./App.css";
import { flattenData } from "./utils/flat-object";
import dataJson from "./data.json";
import CheckboxTree from "./components/CheckboxTree";

function App() {
  const flattenedData = flattenData(dataJson);

  return (
    <>
      <div>
        <h1>🌲</h1>
        <h1>React Tree App</h1>
        <CheckboxTree data={flattenedData} />
      </div>
    </>
  );
}

export default App;
