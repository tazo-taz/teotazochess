import { ICoords } from "../interfaces/game";

export const classic = "classic"
export const classicBlue = "classicBlue"
export const classicRed = "classicRed"
export const nacqoci = "nacqoci"

export const pawn = "pawn";
export const bishop = "bishop";
export const knight = "knight";
export const rook = "rook";
export const queen = "queen";
export const king = "king";

export const W = "W";
export const B = "B";

export const EscapedPawn = "EscapedPawn"

export const piecesValues = {
    1: classic,
    2: nacqoci
}

export const colorsValues = {
    1: classic,
    2: classicBlue,
    3: classicRed,
    4: nacqoci,
}

export const piecesArr = [
    { id: 1, pieces: [`${W}-${classic}-${king}`, `${B}-${classic}-${king}`] },
    { id: 2, pieces: [`${W}-${nacqoci}-${king}`, `${B}-${nacqoci}-${king}`] },
]

export const piecesNamesArr = [
    W + pawn,
    B + pawn,
    W + rook,
    B + rook,
    W + knight,
    B + knight,
    W + bishop,
    B + bishop,
    W + queen,
    B + queen,
    W + king,
    B + king,
]

export const timesValues = [
    { id: 1, value: 1 },
    { id: 2, value: 5 },
    { id: 3, value: 10 },
    { id: 4, value: 20 },
    { id: 5, value: null },
]

export const colors = [
    { id: 1, colors: ["#EEEED5", "#7D945D"] },
    { id: 2, colors: ["#EEEED5", "#5d8394"] },
    { id: 3, colors: ["#EEEED5", "#945d5d"] },
    { id: 4, colors: ["#aa3f3f", "#3f5daa"] },

]

export interface IPuzzleLvls {
    id: number,
    arr: string[][],
    moves: { from: ICoords, to: ICoords }[],
    turn: boolean
}

export const puzzleLvls: IPuzzleLvls[] = [
    {
        id: 1,
        turn: false,
        arr: [
            ["", "", "", "", "", "", "Bking", ""],
            ["Bpawn", "", "", "", "", "Bpawn", "Bpawn", "Bpawn"],
            ["Bqueen", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "Wpawn", "", "Brook", "", "Wpawn", "Wking", ""],
            ["", "", "Wrook", "", "", "", "", "Wpawn"],
            ["", "Brook", "", "", "", "Wpawn", "", ""],
            ["", "", "", "", "", "", "", ""]
        ],
        moves: [
            {
                from: { row: 2, column: 0 },
                to: { row: 0, column: 2 },
            },
            {
                from: { row: 5, column: 2 },
                to: { row: 0, column: 2 },
            },
            {
                from: { row: 4, column: 3 },
                to: { row: 0, column: 3 },
            },
            {
                from: { row: 0, column: 2 },
                to: { row: 0, column: 3 },
            },
        ]
    },
    {
        id: 2,
        turn: false,
        arr: [
            ["Brook", "", "", "Bqueen", "Bking", "Bbishop", "", "Brook"],
            ["Bpawn", "Bpawn", "Bpawn", "Bbishop", "", "", "", "Bpawn"],
            ["", "", "", "Bpawn", "", "", "", "",],
            ["", "Bknight", "", "Wknight", "Bpawn", "Bpawn", "", "",],
            ["", "", "Wpawn", "", "", "", "", "",],
            ["", "", "Wknight", "Wpawn", "", "", "Wpawn", "",],
            ["Wpawn", "Wpawn", "", "", "", "Wpawn", "Wbishop", "Wpawn",],
            ["Wrook", "", "", "Wqueen", "", "Wrook", "Wking", "",]
        ],
        moves: [
            {
                from: { row: 3, column: 1 },
                to: { row: 4, column: 3 },
            },
            {
                from: { row: 7, column: 3 },
                to: { row: 3, column: 7 },
            }
        ]
    },
    {
        id: 3,
        turn: true,
        arr: [
            ["Wrook", "", "", "Bbishop", "", "Wking", "", ""],
            ["", "", "", "Brook", "", "Bpawn", "", "Wpawn",],
            ["Wpawn", "", "", "", "", "Bking", "", "",],
            ["Wbishop", "Wpawn", "", "Brook", "", "", "", "Bpawn",],
            ["", "", "Wpawn", "", "", "", "Wrook", "",],
            ["", "", "Bpawn", "", "Wbishop", "", "", "",],
            ["Bpawn", "", "", "", "", "", "", "",],
            ["", "", "", "", "", "", "", "",]
        ],
        moves: [
            {
                from: { row: 3, column: 0 },
                to: { row: 0, column: 3 },
            },
            {
                from: { row: 1, column: 3 },
                to: { row: 0, column: 3 },
            },
            {
                from: { row: 0, column: 0 },
                to: { row: 0, column: 3 },
            },
            {
                from: { row: 3, column: 3 },
                to: { row: 0, column: 3 },
            },
        ]
    },
    {
        "moves": [
            {
                "from":
                    { "row": 0, "column": 0 },
                "to":
                    { "row": 0, "column": 2 }
            },
            {
                "from":
                    { "row": 7, "column": 2 },
                "to":
                    { "row": 0, "column": 2 }
            },
            {
                "from":
                    { "row": 1, "column": 3 },
                "to":
                    { "row": 0, "column": 3 }
            },
            {
                "from":
                    { "row": 0, "column": 2 },
                "to": { "row": 0, "column": 3 }
            }
        ],
        "arr": [
            ["Bqueen", "", "", "", "", "", "Bking", ""],
            ["", "", "", "Brook", "", "Bpawn", "Bpawn", ""],
            ["Bpawn", "", "", "", "", "", "Bbishop", ""],
            ["", "Bpawn", "", "", "", "", "Wknight", "Bpawn"],
            ["", "Wpawn", "", "", "Wpawn", "", "", "Wpawn"],
            ["", "", "", "", "Wpawn", "", "", ""],
            ["Wpawn", "", "", "Bpawn", "", "Wking", "", ""],
            ["", "", "Wrook", "", "", "", "", ""]
        ],
        "turn": false,
        "id": 4
    },
    {
        "moves": [
            {
                "from": {
                    "row": 0,
                    "column": 2
                },
                "to": {
                    "row": 0,
                    "column": 5
                }
            },
            {
                "from": {
                    "row": 1,
                    "column": 7
                },
                "to": {
                    "row": 1,
                    "column": 2
                }
            },
            {
                "from": {
                    "row": 0,
                    "column": 1
                },
                "to": {
                    "row": 0,
                    "column": 0
                }
            },
            {
                "from": {
                    "row": 1,
                    "column": 2
                },
                "to": {
                    "row": 0,
                    "column": 2
                }
            },
            {
                "from": {
                    "row": 0,
                    "column": 5
                },
                "to": {
                    "row": 0,
                    "column": 2
                }
            },
            {
                "from": {
                    "row": 7,
                    "column": 2
                },
                "to": {
                    "row": 0,
                    "column": 2
                }
            }
        ],
        "arr": [
            [
                "", "Wking", "Wrook", "", "", "", "", ""
            ],
            [
                "Wpawn", "Wpawn", "Wpawn", "", "", "", "", "Bqueen"
            ],
            [
                "", "", "", "", "", "", "", ""
            ],
            [
                "", "", "", "", "", "", "", ""
            ],
            [
                "", "", "", "Wpawn", "", "", "", ""
            ],
            [
                "", "", "", "Bpawn", "", "Bpawn", "", ""
            ],
            [
                "Bpawn", "", "", "", "", "Bking", "", "Bpawn"
            ],
            [
                "", "", "Brook", "", "", "Wknight", "", "Wqueen"
            ]
        ],
        "turn": true,
        "id": 5
    }
]

