import { FirebaseDatabaseProvider } from "@react-firebase/database";
import './App.css';

function App() {
  return (
    <div className="App">
     <FirebaseDatabaseProvider>
      <div>
        This is my app
      </div>
    </FirebaseDatabaseProvider>
    </div>
  );
}

export default App;
