import { useState } from 'react'
import { ethers } from 'ethers'

interface props { }

const App: React.FC<props> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const GeneraticeWallet = async (): Promise<void> => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic;
    console.log(mnemonic?.phrase);
    
    if (mnemonic && mnemonic.phrase) {
      const wallet = ethers.Wallet.fromPhrase(mnemonic?.phrase)
      console.log(wallet);
      setOpenModal(true);
    } else {
      setOpenModal(false);
      console.log("No wallet!");
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center relative'>
      <div className='z-1 w-[40vw] h-[30px] bg-[black] opacity-80 rounded-lg text-center' onClick={() => GeneraticeWallet()
      }>
        Create Wallet
      </div>
      {
        openModal &&
        <div className='absolute z-1 w-[300px] h-[500px] bg-gray-900 border-2 rounded-[20px] flex flex-col gap-5 p-[10px]'>
          <div className='w-full flex justify-center items-center relative text-[20px]'>
            Create Wallet
            <div className='absolute right-5 rounded-full text-white bg-gray-700 w-[20px] h-[20px] flex items-center justify-center text-[15px]' 
                  onClick={() => setOpenModal(false)}>X</div>
          </div>
        </div>
      }
    </div>
  )
}

export default App
