import { Tindernator } from "~/Map/Tindernator"

export default function Swipe() {
    const carrrgds = [
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
    ]

    return (
        <div className="flex h-full w-full flex-col align-middle">
            <div>
            <div className="flex w-full flex-col ">
                <img
                    src="/IncluGO.svg"
                    alt="Logo"
                    className="mb-6 h-24"
                />

                <p className="mb-8">
                Swipe through obstacles, tell us what matters, 
                and let our smart system guide you on the smoothest path.

                Ready to move freely?
                </p>
            </div>
            <div>
                <Tindernator cards={carrrgds} />
            </div>
            </div>
        </div>
    );
}