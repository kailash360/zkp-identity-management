import React, { useMemo } from 'react'
import { CodeBlock, dracula } from 'react-code-blocks';
import { IProof } from '@components/types'
import { createProofCode } from '@components/utils/createProofCode';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

function ProofRow(props: IProof) {
    const {verifier, proof, timestamp} = props

    const proofCode = useMemo(() => createProofCode(proof), [proof])
    console.log({timestamp})
    const dateTime = useMemo(() => {
        const _dateTime = new Date(timestamp*1000)
        return _dateTime?.toLocaleString("en-IN")?.toUpperCase()
    }, [timestamp])

  return (
    <Accordion>
        <AccordionItem className='rounded bg-slate-100'>
            <AccordionItemHeading>
                <AccordionItemButton>
                    Age
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className='flex flex-col'>
                    <p className="flex flex-col">
                        <span className="font-semibold">Created On</span>
                        <span>{dateTime}</span>
                    </p>
                    <p className="flex flex-col my-1">
                        <span className="font-semibold">Verifier Address</span>
                        <span>{verifier}</span>
                    </p>
                    <p className="flex flex-col my-1">
                        <span className="font-semibold">Proof Vector</span>    
                        <CodeBlock
                            text={proofCode}
                            language={"JSON"}
                            showLineNumbers
                            theme={dracula}
                        />
                    </p>
                </div>
            </AccordionItemPanel>
        </AccordionItem>
    </Accordion>
  )
}

export default ProofRow