import { Tindernator } from "~/Map/Tindernator"

// features: (0: accessible, 1: inaccessible)
// 0: wheelchair accessible
// 1: ascent (energy)
// 2: crowdedness
// 3: Accessebility to blind people

export default function Swipe() {
    const carrrgds = [
        {
            id: 1,
            content: "/obstacles/beach.jpg",
            features: [0.9,0.7,0.2,0.1]
        }, {
            id: 2,
            content: "/obstacles/brokenlift.jpg",
            features: [1, 0.5, 0.2, 0.8]
        }, {
            id: 3,
            content: "/obstacles/bumpy.jpg", 
            features: [0.7, 0.2, 0.0, 0.1]
        }, {
            id: 4,
            content: "/obstacles/handrail.jpg",
            features: [1, 0.3, 0.1, 0.3]
        }, {
            id: 5,
            content: "/obstacles/incline.jpg",
            features: [0.5, 0.9, 0.1, 0]
        }, {
            id: 6,
            content: "/obstacles/normalstairs.webp",
            features: [0.9, 0.8, 0.1, 0.1]
        }
    ]

    return (
        <div className="flex h-full w-full flex-col align-middle">
            <div >
                <div className="flex w-full flex-col align-start ">
                    <img
                        src="/IncluGO.svg"
                        alt="Logo"
                        style={{ width: "60%" }}
                        className="mb-6 mt-6 h-24"
                    />

                    
                </div>
                <div>
                    <Tindernator cards={carrrgds} />
                </div>
            </div>
        </div>
    );
}