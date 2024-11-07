import { useState } from 'react'
import { ethers } from 'ethers'
import EyeOnIcon from "./assets/eye-on.svg";
import EyeOffIcon from "./assets/eye-off.svg";

interface props { }

const App: React.FC<props> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [seed, setSeed] = useState<string[]>([]);
  const [walletPage, setWalletPage] = useState<Number>(0);
  const [showSeed, setShowSeed] = useState<Boolean>(false);
  const [walletAccount, setWalletAccount] = useState<string>("");
  const [formattedWalletAccount, setFormattedWalletAccount] = useState<string>("");
  const [walletPrivateKey, setWalletPrivateKey] = useState<string>("");
  const [formattedWalletPrivateKey, setFormattedWalletPrivateKey] = useState<string>("");

  const GeneraticeWallet = async (): Promise<void> => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic;
    
    setOpenModal(false);
    setSeed([]);
    setWalletPage(0);
    setShowSeed(false);
    setWalletAccount("");
    setWalletPrivateKey("");
    setFormattedWalletAccount("");
    setFormattedWalletPrivateKey("");
    
    if (mnemonic && mnemonic.phrase) {
      const wallet = ethers.Wallet.fromPhrase(mnemonic?.phrase)
      setOpenModal(true);
      setSeed(mnemonic.phrase.split(' '));
      setWalletAccount(wallet.address);
      setWalletPrivateKey(wallet.privateKey.substring(2));
      setFormattedWalletAccount(FormattedWallet(wallet.address));
      setFormattedWalletPrivateKey(FormattedWallet(walletPrivateKey));
    } else {
      setOpenModal(false);
      console.log("No wallet!");
    }
  }

  const FormattedWallet = (address: string): string => {
    if (address.length <= 15) return address;
    const leftPart = address.slice(0, 7);
    const rightPart = address.slice(-7);

    console.log(address);
    console.log(`${leftPart}...${rightPart}`);
    
    return `${leftPart}...${rightPart}`;
  }

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center relative'>
      <div className='z-1 w-[40vw] h-[30px] bg-[black] opacity-80 rounded-lg text-center' onClick={() => GeneraticeWallet()
      }>
        Create Wallet
      </div>
      {
        openModal &&
        <div className='absolute z-1 w-[300px] h-[500px] bg-gray-900 border-2 rounded-[20px] flex flex-col justify-start items-center gap-5 p-[10px]'>
          <div className='w-full flex justify-center items-center relative text-[20px] mt-[10px]'>
            Create Wallet
            <div className='absolute right-2 rounded-full text-white bg-gray-700 w-[20px] h-[20px] flex items-center justify-center text-[15px]' 
                  onClick={() => setOpenModal(false)}>X</div>
          </div>
          {
            !walletPage && 
            <div className='mt-[30px] flex flex-row flex-wrap justify-around items-center py-[30px] gap-3 border-2 border-white rounded-lg relative'>
              {
                seed.map(item => {
                  return (
                    <>
                      <div className={`w-[100px] bg-white flex justify-center items-center text-[15px] text-black rounded-lg ${!showSeed && "select-none blur-lg"}`}>{item}</div>
                    </>
                  )
                })
              }
              <div className='absolute flex flex-col gap-2 text-[15px] justify-center items-center mt-[60px]'>
                {!showSeed && <div>Make sure Nobody is looking!</div>}
              </div>
              <div className='absolute flex flex-col gap-2 text-[15px] justify-center items-center'>
                <img src={showSeed?EyeOffIcon:EyeOnIcon} onClick={() => setShowSeed(!showSeed)} className='bg-gray-400 rounded-full text-white w-[35px] h-[30px] cursor-pointer'/>
              </div>
            </div> 
          }
          {
            !walletPage && 
            <div className='w-[80%] max-w-[250px] rounded-lg bg-white text-black text-center text-[15px] px-5 py-3 font-bold' onClick={() => setWalletPage(1)}>
               Generated From Seed
            </div>
          }
          {
            walletPage && 
            <div className='flex flex-col justify-start items-center mt-[100px]'>
              <div className='flex flex-row gap-2 justify-around items-center'>
                <div className='text-left w-[100px]'>Account: </div>
                <div className='w-[150px] rounded-lg h-[30px] overflow-hidden'>{formattedWalletAccount}</div>
              </div>
              <div className='flex flex-row gap-1 justify-around items-center'>
                <div className='text-left w-[100px]'>Private Key: </div>
                <div className='w-[150px] select-none blur-sm rounded-lg h-[30px] overflow-hidden'>{formattedWalletPrivateKey}</div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default App
