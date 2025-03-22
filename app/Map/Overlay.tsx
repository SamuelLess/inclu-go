import { useState, useEffect } from "react";
import InfoPopup from "~/components/InfoPopup"

export const Overlay = (props : {
    selectedObstacle: number
}) => {
    const [isVisible, setIsVisible] = useState(true);

    // Reset visibility when a new obstacle is selected
    useEffect(() => {
        setIsVisible(true);
    }, [props.selectedObstacle]);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <div className={`absolute bottom-0 right-0 rounded-lg w-full z-1000 p-4 transition-all duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
            <InfoPopup 
                severity={0.2} 
                selectedObstacle={props.selectedObstacle} 
                type="keine Ahnung"
                onClose={handleClose} 
            /> 
        </div>
    )
}