import InfoPopup from "~/components/InfoPopup"

export const Overlay = (props : {
    selectedObstacles: number
}) => {
    return (
        <div className="absolute bottom-0 right-0 rounded-lg w-full z-1000 p-4">
            <InfoPopup selectedObstacles={props.selectedObstacles} /> 
        </div>
    )
}