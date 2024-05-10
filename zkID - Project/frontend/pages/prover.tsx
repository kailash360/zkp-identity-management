import React, { useCallback, useContext, useEffect, useState } from 'react'
import Navbar from '@components/components/navbar'
import * as styles from "../styles/prover"
import { UserContext } from '@components/context'
import { getProofs, addProof } from '@components/services'
import { IProof } from '@components/types'
import ProofRow from '@components/components/proofRow'
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import { MESSAGES, URL } from '@components/constant'
import Modal from 'react-responsive-modal'

function Prover() {

  const {account} = useContext(UserContext)

  const [proof, setProof] = useState<IProof>({})
  const [value, setValue] = useState<number>()
  const [isCreatingProof, setIsCreatingProof] = useState<boolean>(false)
  const [type, setType] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const fetchProof = useCallback(async () => {
    if(!account) return;
    const response = await getProofs(account)
    setProof(response.data.data)
  }, [account])

  useEffect(() => {
    fetchProof()
  }, [account])

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  const createProof = async() => {
    console.log("Creating...",{value})
    if(!account || !value) return;

    setIsCreatingProof(true)

    const response = await addProof(value, account)
    setIsCreatingProof(false)
    
    if(response.success) {
      setMessage(MESSAGES.CREATE_PROOF_SUCCESS)
      setIsModalOpen(true)
    }

    fetchProof()
  }

  const handleTypeChange = () => {
    setType("age")
  }

  const handleCloseModal = () => setIsModalOpen(false)

  useEffect(() => {
    if (message.length === 0) return;

    setTimeout(() => {
      setIsModalOpen(false) 
      setMessage("")
    }, 3000)
  }, [message])

  return (
    <div className='w-full h-full'>
      <Navbar address={account} />
      <div className="flex flex-col  p-4 h-full">
        <Tabs>
          <TabList>
            <Tab>Add Proof</Tab>
            <Tab>My Proofs</Tab>
          </TabList>
          <TabPanel>
            <div className="mx-auto w-3/5">
              <p className='font-semibold'>User Secret</p>
              <input value={value} onChange={handleChange} type="number" max={150} min={0} className='w-full h-10 mt-1 rounded border-2 px-1' placeholder='Enter your age' />
              <p className='font-semibold mt-2'>Property</p>
              <select onSelect={handleTypeChange} className='w-full h-10 mt-1 rounded border-2 p-1 cursor-pointer' defaultValue={"default"}>
                <option value="default" unselectable="on">Select Property</option>
                <option value="age">Age</option>
              </select>
              <button className='px-4 py-2 rounded font-semibold w-fit mt-4 text-sm' style={styles.button} disabled={isCreatingProof} onClick={createProof}>
                {isCreatingProof ? "Submitting..." :"Submit"}
              </button>
              <Modal open={isModalOpen} onClose={handleCloseModal} center classNames={{modal: 'w-1/5'}}>
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src={URL.SUCCESS_LOTTIE}
                  style={{
                    width: "100px",
                    minHeight: "100px",
                    margin: "8px auto"
                  }}
                />
                <p className='mx-auto text-center'>
                {message}
                </p>
              </Modal>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col  p-4 mx-auto my-2">
              <ProofRow {...proof} />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default Prover