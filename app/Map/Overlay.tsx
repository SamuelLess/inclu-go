import InfoPopup from "~/components/InfoPopup"

export const Overlay = (props : {
    selectedObstacle: number
}) => {
    return (
        <div className="absolute bottom-0 right-0 rounded-lg w-full z-1000 p-4">
            <InfoPopup severity={0.2} selectedObstacle={props.selectedObstacle} type ="keine Ahnung" /> 
        </div>
    )
}