import { MapPin, Flag } from '@phosphor-icons/react'
import React from 'react'
import { Input } from '~/components/ui/input'

export function InputRoute(props: {
    dest: string,
    setDest: React.Dispatch<React.SetStateAction<string>>,
    destRef: React.RefObject<HTMLInputElement | null>,
    start: string,
    setStart: React.Dispatch<React.SetStateAction<string>>,
    startRef: React.RefObject<HTMLInputElement | null>,
    update: any,
    error: any
}) {
    return (
        <div className="flex flex-col bg-white p-6 gap-y-2 pt-6">
            <div className="flex flex-row items-center gap-x-4">
                <MapPin size={32} />

                <Input size={32}
                    className={`p-2 border-2 rounded-md ${
                        props.error == 1 || props.error == 3 ? "border-red-500" : "border-gray-300"
                    }`}
                    ref={props.startRef}
                    value={props.start}
                    onKeyUp={(event) => {
                        if (event.key == "Enter") {
                            props.update();
                            props.destRef.current?.focus()
                        }
                    }}
                    onChange={(event) => {
                        props.setStart(event.target.value)
                    }} />
            </div>

            <div className="flex flex-row items-center gap-x-4">
            <Flag size={32} />

                <Input size={32}
                    className={`p-2 border-2 rounded-md ${
                        props.error == 2 || props.error == 3 ? "border-red-500" : "border-gray-300"
                    }`}
                    ref={props.destRef}
                    value={props.dest}
                    onKeyPress={(event) => {
                        if (event.key == "Enter"){
                            props.update()
                            props.destRef.current?.blur()
                        }
                    }}
                    onChange={(event) => {
                        props.setDest(event.target.value)
                    }} />
                </div>
           
        </div>
    )
}