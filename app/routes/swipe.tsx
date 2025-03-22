import { Tindernator } from "~/Map/Tindernator"

export default function Swipe() {
    return (<div className="h-full flex-column">
        <Tindernator cards={[
            {
                id: 1,
                content: "/obstacles/beach.jpg",
            }, {
                id: 2,
                content: "/obstacles/brokenlift.jpg"
            }, {
                id: 3,
                content: "/obstacles/bumpy.jpg"
            }, {
                id: 4,
                content: "/obstacles/handrail.jpg"
            }, {
                id: 5,
                content: "/obstacles/incline.jpg"
            }, {
                id: 6,
                content: "/obstacles/normalstairs.webp"
            }, {
                id: 7,
                content: "/obstacles/weirdstairs.jpg"
            }, {
                id: 8,
                content: "/obstacles/wheelchair.webp"
            }
        ]} />
    </div>);
}