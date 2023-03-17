export interface ICoords {
    row: number,
    column: number
}

export type activeBoxType = ICoords | null

export interface IEscapedPawn {
    from: ICoords,
    to: ICoords,
    type: string
}

export interface ICanMoveCoords extends ICoords {
    type?: string
}