import { Tindernator } from "~/Map/Tindernator"

// features: (0: accessible, 1: inaccessible)
// 0: wheelchair accessible
// 1: ascent (energy)
// 2: crowdedness
// 3: Accessebility to blind people

export default function Swipe() {
    const cards = [
        {
            id: 1,
            content: "/pictures/unbekanntetreppe.webp",
            features: [1, 0.1, 0.1, 0.0]
        }, 
        {
            id: 2,
            content: "/pictures/kleineBaustelle.webp",
            features: [0.1,0.1,0.2,1.0]
        },
        {
            id: 3,
            content: "/pictures/sandweghinterhaus.webp", 
            features: [0.6, 0.8, 0.0, 0.1]
        }, {
            id: 4,
            content: "/pictures/bhftreppesued.webp",
            features: [1, 0.3, 0.1, 0.1]
        }, {
            id: 5,
            content: "/pictures/meckstrasse.jpg",
            features: [0.2, 0, 0.1, 0.9]
        }
    ]

    return (
        <div className="flex px-6 h-full w-full flex-col align-middle">
            <div >
                <div className="flex w-full flex-col align-start ">
                    <img
                        src="/IncluGO.svg"
                        alt="Logo"
                        style={{ width: "60%" }}
                        className="mb-4 mt-8 h-24" />
                </div>
                <div>
                    <Tindernator cards={cards} />
                </div>
            </div>
        </div>
    );
}