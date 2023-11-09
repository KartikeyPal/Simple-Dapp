import {useState,useEffect} from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";
import Web3 from "web3";
import './App.css';
function App() {
  const [state,setstate]=useState({
    web3: null,
    contract: null
  })

  const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

  useEffect(()=>{
    async function template(){
     
      const web3= new Web3(provider);
      //To get contract address
      const networkId = await web3.eth.net.getId();
      // console.log(networkId)]]
      const deployedNetwork = SimpleStorage.networks[networkId];//Contract_name.networks[networkId] it will provide us address of the contract
      // console.log(SimpleStorage.networks[networkId]);
      const contract = new web3.eth.Contract(SimpleStorage.abi,deployedNetwork.address);
      console.log(contract);
      setstate({
        web3:web3,
        contract:contract
      });
    }
     provider && template();

     

  },[]);
  // console.log(state);

  async function getAccounts(){
    const { web3 }= state;
    const accounts= await web3.eth.getAccounts();
    console.log(accounts);
   }
   async function read(){
    const {  contract}= state;
    const value = await contract.methods.getter().call();
    console.log(value);
   }
   async function setdefault(){
    const {contract}=state;
    await contract.methods.setter(0).send({from: "0x1cCbD632ca6A124cc37601a9e9eae45e0F878CF3"});
   }
   async function set(){
    const {contract}=state;
    const value=document.querySelector("#data").value;
    await contract.methods.setter(value).send({from: "0x1cCbD632ca6A124cc37601a9e9eae45e0F878CF3"});
   }


  return (
    <div className="App">
      <button onClick={getAccounts}>getAccounts</button>
      <button onClick={read}>get value</button>
      <br/>
      <input type="number" id="data" name="input data"></input>
      <button onClick={set}>setvalue</button>
      <button onClick={setdefault}>setdefault</button>;
    </div>
  );
}

export default App;
