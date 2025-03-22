import { useState, useEffect } from "react";
import InfoPopup from "~/components/InfoPopup"

export const Overlay = (props : {
    selectedObstacle: number | null
    onClose: () => void
}) => {
    const isVisible = props.selectedObstacle !== null;

    const handleClose = () => {
        props.onClose();
    };

    return (
        <div className={`absolute bottom-0 right-0 rounded-lg w-full z-1000 p-4 transition-all duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
            {props.selectedObstacle !== null && <InfoPopup 
                severity={0.2} 
                selectedObstacle={props.selectedObstacle} 
                type="keine Ahnung"
                onClose={handleClose} 
            /> }
        </div>
    )
}