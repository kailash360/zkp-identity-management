import Navbar from '@components/components/navbar'
import { UserContext } from '@components/context'
import React, { useContext, useState } from 'react'
import * as styles from "../styles/prover"
import { verifyProof } from '@components/services'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { URL } from '@components/constant'

type Props = {}

function Verifier({}: Props) {

  const {account} = useContext(UserContext)

  const [userAddress, setUserAddress] = useState<string>("")
  const [isVeifying, setIsVerifying] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [verdict, setVerdict] = useState<boolean>(true)
  const [type,setType] = useState<string>("")
  
  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  const handleChange = (e:any) => setUserAddress(e.target.value)

  const handleVerify = async() => {
    if(!account) return;

    setIsVerifying(true)
    const response = await verifyProof(userAddress, account)

    setIsVerifying(false)
    setVerdict(response.data.verdict)
    onOpenModal()
  }

  const handleTypeChange = () => {
    setType("age")
  }

  return (
    <div className="w-full h-full">
      <Navbar address={account} />
      <div className="flex flex-col bg-slate-200 p-2 w-2/5 mx-auto my-2">

        <p className='font-semibold'>User Attribute Verification</p>
        <input value={userAddress} onChange={handleChange} className='w-full h-8 mt-1 rounded border-2 px-1' placeholder='Enter prover address here' />

        <p className='font-semibold mt-2'>Property</p>
        <select onSelect={handleTypeChange} className='w-full h-10 mt-1 rounded border-2 p-1 cursor-pointer' defaultValue={"default"}>
          <option value="default" unselectable="on">Select Property</option>
          <option value="age">Age</option>
        </select>

        <button className='px-4 py-2 rounded font-semibold w-fit mt-4 text-sm' style={styles.button} disabled={isVeifying} onClick={handleVerify}>
          {isVeifying ? "Verifying..." :"Verify"}
        </button>
      </div>
      <Modal open={isOpen} onClose={onCloseModal} center classNames={{modal: 'w-1/5'}}>
        <p className='font-semibold'>Verification Result</p>
        <lottie-player
          autoplay
          loop
          mode="normal"
          src={verdict ? URL.SUCCESS_LOTTIE : URL.FAILURE_LOTTIE}
          style={{
            width: "100px",
            minHeight: "100px",
            margin: "8px auto"
          }}
        />
        <p className='mx-auto text-center'>
        {verdict ? "Passed!" : "Failed!"}
        </p>
      </Modal>
    </div>
  )
}

export default Verifier