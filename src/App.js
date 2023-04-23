import Query3 from './Query3';
import './App.css';


function App() {
  const list = [
    {
      text:"item1"
    },{
      text:"item2"
    },{
      text:"item3"
    },{
      text:"item4"
    }
  ]
  return (
    <div className="App">
      <Query3 items={list}/>
    </div>
  );
}

export default App;
