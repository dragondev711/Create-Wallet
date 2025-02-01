import { useState } from 'react'
import { ethers } from 'ethers'
import EyeOnIcon from "./assets/eye-on.svg";
import EyeOffIcon from "./assets/eye-off.svg";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import TextField from '@mui/material/TextField';
import InputPassword from './components/InputPassword';

interface props { }

const App: React.FC<props> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [seed, setSeed] = useState<string[]>([]);
  const [phrase, setPhrase] = useState<string>("");
  const [whichModal, setWhichModal] = useState<Number>(0);
  const [showSeed, setShowSeed] = useState<Boolean>(false);
  const [isCopied, setIsCopied] = useState<Boolean>(false);
  const [walletAccount, setWalletAccount] = useState<string>("");
  const [formattedWalletAccount, setFormattedWalletAccount] = useState<string>("");
  const [walletPrivateKey, setWalletPrivateKey] = useState<string>("");

  const [matchPassword, setMatchPassword] = useState<Boolean>(true);

  const [password, setPassword] = useState<string>("");

  const GeneraticeWallet = async (): Promise<void> => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic;

    setOpenModal(false);

    setSeed([]);
    setPhrase("");
    setShowSeed(false);
    setWalletAccount("");
    setFormattedWalletAccount("");
    setWalletPrivateKey("");

    setWhichModal(0);

    setIsCopied(false);

    setPassword("");
    setMatchPassword(false);

    if (mnemonic && mnemonic.phrase) {
      const wallet = ethers.Wallet.fromPhrase(mnemonic?.phrase)
      setOpenModal(true);
      setPhrase(mnemonic.phrase);
      setSeed(mnemonic.phrase.split(' '));
      setWalletAccount(wallet.address);
      setWalletPrivateKey(wallet.privateKey.substring(2));
      setFormattedWalletAccount(FormattedWallet(wallet.address));
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

  const CopyClipboard = async (name: string, text: string): Promise<void> => {
    setIsCopied(false);
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success(name + " Copied!", { autoClose: 1500 });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to Copy!")
    }
  }

  return (
    <>
      <ToastContainer />
      <div className='w-[100vw] h-[100vh] flex justify-center items-center relative'>
        <div className='z-1 w-[40vw] h-[30px] bg-[black] opacity-80 rounded-lg text-center' onClick={() => GeneraticeWallet()
        }>
          Create Wallet
        </div>
        {
          openModal &&
          <div className='absolute z-1 w-[300px] h-[500px] bg-gray-900 border-2 rounded-[20px] flex flex-col justify-start items-center gap-5 p-[10px]'>
            <div className='w-full flex justify-center items-center relative text-[20px] mt-[10px]'>
              { whichModal != 2 && "No Account" }
              <div className='cursor-pointer absolute right-2 rounded-full text-white bg-gray-700 w-[25px] h-[25px] flex items-center justify-center text-[15px]'
                title="Close" onClick={() => setOpenModal(false)}>X</div>
            </div>
            {
              !whichModal &&
              <div className='flex flex-col justify-center items-center gap-1'>
                <div className='w-full flex justify-end'>
                  <div className='d-inline cursor-pointer' onClick={() => CopyClipboard("Seed", phrase)}>
                    {isCopied ?
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                      </svg>}
                  </div>
                </div>
                <div className='h-[305px] mt-[5px] flex flex-row flex-wrap justify-around items-center py-[30px] gap-3 border-2 border-white rounded-lg relative'>
                  {
                    seed.map((item, index) => {
                      return (
                        <div className={`flex flex-row ${!showSeed && "select-none blur-lg"}`}>
                          <div className='mr-1 w-[20px] text-right'>{`${index + 1}. `}</div>
                          <div className={`w-[100px] bg-white flex justify-center items-center text-[15px] text-black rounded-lg`}>{item}</div>
                        </div>
                      )
                    })
                  }
                  <div className='absolute flex flex-col gap-2 text-[15px] justify-center items-center mt-[60px]'>
                    {!showSeed && <div>Make sure Nobody is looking!</div>}
                  </div>
                  <div className='absolute flex flex-col gap-2 text-[15px] justify-center items-center'>
                    <img src={showSeed ? EyeOffIcon : EyeOnIcon} onClick={() => setShowSeed(!showSeed)} className='bg-gray-400 rounded-full text-white w-[35px] h-[30px] cursor-pointer' />
                  </div>
                </div>
                <div className='flex flex-row gap-5 mt-[20px] text-center text-[15px] font-bold'>
                  <div className='cursor-pointer bg-white max-w-[250px] text-black rounded-lg bg-white px-5 py-3' onClick={() => GeneraticeWallet()}>
                    Reset
                  </div>
                  <div className='cursor-pointer bg-lime-600 max-w-[250px] rounded-lg bg-white px-5 py-3' onClick={() => setWhichModal(1)}>
                    Set Password
                  </div>
                </div>
              </div>
            }
            {
              whichModal == 1 &&
              <div className='flex flex-col justify-center items-center text-[13px]'>
                <div className='flex flex-col border-l-2 rounded-xl pl-2'>
                  <div>Password must contain letters, numbers, symbols, lowercase and uppercase letters. For security reasons, make sure the length is greater than 8.</div>
                  <div>You will need to use this password for every transactions.</div>
                  <div className='italic text-[12px]'>If you forget your password, you will need to delete the chat and start over again.</div>
                </div>
                <div className='flex flex-col w-full rounded-lg'>
                    <InputPassword inputName={"Input your Password"} setPassword={setPassword} setMatchPassword={setMatchPassword} />
                </div>

                <div className='flex flex-row gap-5 mt-[20px] text-center text-[15px] font-bold'>
                  <div className='cursor-pointer max-w-[250px] rounded-lg bg-white text-black px-5 py-3 ' onClick={() => setWhichModal(0)}>
                    Back
                  </div>
                  <div className={`cursor-pointer bg-lime-600 max-w-[250px] rounded-lg text-white px-5 py-3  ${!matchPassword && "opacity-50 pointer-events-none cursor-not-allowed"}`} onClick={() => setWhichModal(2) }>
                    Create Wallet
                  </div>
                </div>
              </div>
            }
            {
              whichModal == 2 &&
              <div className='flex flex-col justify-center items-center gap-1 h-full'>
                <div className='flex flex-row justify-between items-center gap-3'>
                  <div className='text-[25px]'>{formattedWalletAccount}</div>
                  <div className='justify-end' title="Copy Address" onClick={() => CopyClipboard("Wallet Account", walletAccount)}>
                    {isCopied ?
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                      </svg>}
                  </div>
                </div>
                <div className='text-center'>Your wallet has been successfully created.</div>
              </div>
            }
          </div>
        }
      </div>
    </>

  )
}

export default App
