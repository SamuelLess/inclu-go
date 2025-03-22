import { Tindernator } from "~/Map/Tindernator"

export default function Swipe() {
    return (<div className="h-full flex-column">
        <Tindernator cards={[
            {
                id: 1,
                content: "/public/obstacles/beach.jpg",
            }, {
                id: 2,
                content: "/public/obstacles/brokenlift.jpg"
            }, {
                id: 3,
                content: "/public/obstacles/bumpy.jpg"
            }, {
                id: 4,
                content: "/public/obstacles/handrail.jpg"
            }, {
                id: 5,
                content: "/public/obstacles/incline.jpg"
            }, {
                id: 6,
                content: "/public/obstacles/normalstairs.webp"
            }, {
                id: 7,
                content: "/public/obstacles/weirdstairs.jpg"
            }, {
                id: 8,
                content: "/public/obstacles/wheelchair.webp"
            }
        ]} />
    </div>);
}