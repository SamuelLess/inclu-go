import { MapPin, Path } from '@phosphor-icons/react'
import React from 'react'
import { Input } from '~/components/ui/input'

export function InputRoute(props: {
    dest: string,
    setDest: React.Dispatch<React.SetStateAction<string>>,
    destRef: React.RefObject<HTMLInputElement | null>,
    start: string,
    setStart: React.Dispatch<React.SetStateAction<string>>,
    startRef: React.RefObject<HTMLInputElement | null>,
    update: any
}) {
    return (
        <div className="flex flex-col bg-white p-2 gap-y-2 pt-4">
            <div className="flex flex-row items-center gap-x-4">
                <MapPin size={32} />

                <Input size={32}
                    ref={props.startRef}
                    value={props.start}
                    onKeyPress={(event) => {
                        if (event.key == "Enter")props.update();
                    }}
                    onChange={(event) => {
                        props.setStart(event.target.value)
                    }} />
            </div>

            <div className="flex flex-row items-center gap-x-4">
            <Path size={32} />

                <Input size={32}
                    ref={props.destRef}
                    value={props.dest}
                    onKeyPress={(event) => {
                        if (event.key == "Enter")props.update();
                    }}
                    onChange={(event) => {
                        props.setDest(event.target.value)
                    }} />
                </div>
           
        </div>
    )
}