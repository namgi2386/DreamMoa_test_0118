import { RecoilRoot } from "recoil";
import Counter from "./components/test/Counter";
import CounterList from "./components/test/CounterList";
import ThemeToggle from "./components/common/themeToggle";


function App() {
  return (
    <RecoilRoot>
        <Counter />
        <CounterList/>
        <hr />
        <ThemeToggle/>
        <div className="border bg-gray-200  dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          check
        </div>
        <div className="border bg-white text-black dark:bg-black dark:text-white">
          check
        </div>
        <div className="border bg-black text-white dark:bg-white dark:text-black">
          check
        </div>
    </RecoilRoot>
  );
}

export default App;